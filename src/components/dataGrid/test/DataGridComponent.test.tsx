/**
 * @jest-environment jsdom
 */

import { act, screen } from "@testing-library/react";
import "regenerator-runtime/runtime";
import { reducer } from "../../../__tests__/testReducer";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import DataGridComponent from "../DataGridComponent";
import MonitorPage from "../../../pages/monitor/MonitorPage";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { format } from "date-fns";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const rows = [
  {
    id: 1,
    functionality: "Creazione Notifiche",
    data: "",
    state: true,
    functionalityName: "NOTIFICATION_CREATE",
  },
  {
    id: 2,
    functionality: "Visualizzazione Notifiche",
    data: "",
    state: true,
    functionalityName: "NOTIFICATION_VISUALIZATION",
  },
  {
    id: 3,
    functionality: "Workflow Notifiche",
    data: "",
    state: true,
    functionalityName: "NOTIFICATION_WORKFLOW",
  },
];

const columns = [
  {
    field: "functionality",
    headerName: "Funzionalità",
    width: 200,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "state",
    headerName: "Stato",
    type: "actions",
    width: 400,
    renderCell: (params: any) => {
      return params.row.state ? (
        <CheckCircleIcon color="success" />
      ) : (
        <CancelIcon color={"error"} />
      );
    },
    flex: 1,
    minWidth: 100,
  },
  {
    field: "data",
    headerName: "Data di creazione",
    type: "date",
    width: 400,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    hide: false,
    renderCell: (params: any) => {
      return params.row.data
        ? format(new Date(params.row.data.substring(0, 16)), "dd-MM-yyyy HH:mm")
        : "";
    },
  },
  {
    field: "actions",
    headerName: "Cambio Stato",
    width: 200,
    type: "actions",
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    hide: false,
    getActions: (params: any) => {
      return params.row.state
        ? [<GridActionsCellItem label="Inserire KO" showInMenu />]
        : [<GridActionsCellItem label="Inserire OK" showInMenu />];
    },
  },
];

describe("DataGridComponent", () => {
  it("render DataGridComponent with 4 columns and 4 rows", async () => {
    await act(async () => {
      reducer(<DataGridComponent columns={columns} rows={rows} />);
    });
    const columnsHeader = await screen.findAllByRole("columnheader");
    expect(columnsHeader).toHaveLength(4);
    const rowsDataGrid = await screen.findAllByRole("row");
    expect(rowsDataGrid).toHaveLength(4);
  });

  it("render 3 functionalities", async () => {
    await act(async () => {
      reducer(<MonitorPage email="test@test.com" />);
    });

    const notificationVisualization = await screen.findByText(
      "Visualizzazione Notifiche"
    );
    expect(notificationVisualization).toBeInTheDocument();
    const notificationWorkflow = await screen.findByText("Workflow Notifiche");
    expect(notificationWorkflow).toBeInTheDocument();
    const notificationCreate = await screen.findByText("Creazione Notifiche");
    expect(notificationCreate).toBeInTheDocument();
  });

  it("render DataGridComponent without BE", async () => {
    server.resetHandlers(
      rest.get("http://localhost/downtime/v1/status", (req, res, ctx) =>
        res.networkError("Failed to connect")
      )
    );

    await act(async () => {
      reducer(<MonitorPage email="test@test.com" />);
    });

    expect(
      screen.getByRole("heading", {
        name: "Monitoraggio Piattaforma Notifiche",
      })
    ).toBeInTheDocument();

    const dateCol = screen.queryByRole("columnheader", {
      name: "Data di creazione",
    });

    expect(dateCol).not.toBeInTheDocument();
    expect(await screen.findAllByRole("columnheader")).toHaveLength(2);
  });
});
