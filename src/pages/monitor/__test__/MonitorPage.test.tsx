/**
 * @jest-environment jsdom
 */

import { act, cleanup, screen } from "@testing-library/react";
import "regenerator-runtime/runtime";
import MonitorPage from "../MonitorPage";
import { reducer } from "../../../mocks/mockReducer";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

describe("MonitorPage", () => {
  afterEach(cleanup);

  it("render component with running BE", async () => {
    await act(async () => {
      reducer(<MonitorPage email="test@test.com" />);
    });
    expect(
      screen.getByRole("heading", {
        name: "Monitoraggio Piattaforma Notifiche",
      })
    ).toBeInTheDocument();
  });

  it("render data grid with 4 columns and 4 rows", async () => {
    await act(async () => {
      reducer(<MonitorPage email="test@test.com" />);
    });

    const columns = await screen.findAllByRole("columnheader");
    expect(columns).toHaveLength(4);
    const rows = await screen.findAllByRole("row");
    expect(rows).toHaveLength(4);
  });

  it("render functionalities", async () => {
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

  it("render component without BE", async () => {
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

  it("click button to create an event KO", async () => {
    await act(async () => {
      reducer(<MonitorPage email="test@test.com" />);
    });

    const buttons = screen.queryAllByRole("menuitem");
    expect(buttons).toHaveLength(3);

    const user = userEvent.setup();
    await act(async () => await user.click(buttons[0]));

    const button = await screen.findByRole("menuitem", {
      name: "Inserire KO",
    });
    await act(async () => await user.click(button));
  });

  it("render button to create an event OK and get error", async () => {
    server.resetHandlers(
      rest.post("http://localhost/downtime/v1/events", (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get("http://localhost/downtime/v1/status", (req, res, ctx) => {
        return res(
          ctx.json({
            functionalities: [
              "NOTIFICATION_CREATE",
              "NOTIFICATION_VISUALIZATION",
              "NOTIFICATION_WORKFLOW",
            ],
            openIncidents: [
              {
                functionality: "NOTIFICATION_VISUALIZATION",
                status: "KO",
                startDate: "2022-11-03T17:00:15.995Z",
              },
            ],
          })
        );
      })
    );

    await act(async () => {
      reducer(<MonitorPage email="test@test.com" />);
    });

    const buttons = screen.queryAllByRole("menuitem");
    expect(buttons).toHaveLength(3);

    const user = userEvent.setup();
    await act(async () => await user.click(buttons[1]));

    const button = await screen.findByRole("menuitem", {
      name: "Inserire OK",
    });
    await act(async () => await user.click(button));
  });
});
