/**
 * @jest-environment jsdom
 */

import { act, cleanup, screen } from '@testing-library/react';
import 'regenerator-runtime/runtime';
import { rest } from 'msw';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { format } from 'date-fns';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import React from 'react';
import MonitorPage from '../../../pages/monitor/MonitorPage';
import DataGridComponent from '../DataGridComponent';
import { server } from '../../../mocks/server';
import { reducer } from '../../../mocks/mockReducer';

const rows = [
  {
    id: 1,
    functionality: 'Creazione Notifiche',
    data: '',
    state: true,
    functionalityName: 'NOTIFICATION_CREATE',
  },
  {
    id: 2,
    functionality: 'Visualizzazione Notifiche',
    data: '',
    state: true,
    functionalityName: 'NOTIFICATION_VISUALIZATION',
  },
  {
    id: 3,
    functionality: 'Workflow Notifiche',
    data: '',
    state: true,
    functionalityName: 'NOTIFICATION_WORKFLOW',
  },
];

const columns = [
  {
    field: 'functionality',
    headerName: 'Funzionalità',
    width: 200,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'state',
    headerName: 'Stato',
    type: 'actions',
    width: 400,
    renderCell: (params: any) =>
      params.row.state ? <CheckCircleIcon color="success" /> : <CancelIcon color={'error'} />,
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'data',
    headerName: 'Data di creazione',
    type: 'date',
    width: 400,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    hide: false,
    renderCell: (params: any) =>
      params.row.data ? format(new Date(params.row.data.substring(0, 16)), 'dd-MM-yyyy HH:mm') : '',
  },
  {
    field: 'actions',
    headerName: 'Cambio Stato',
    width: 200,
    type: 'actions',
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    hide: false,
    getActions: (params: any) =>
      params.row.state
        ? [<GridActionsCellItem label="Inserire KO" showInMenu key={params.row.id} />]
        : [<GridActionsCellItem label="Inserire OK" showInMenu key={params.row.id} />],
  },
];

describe('DataGridComponent', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation(() => jest.fn());
  });

  it('render DataGridComponent with 4 columns and 4 rows', async () => {
    await act(async () => {
      reducer(<DataGridComponent columns={columns} rows={rows} />);
    });
    const columnsHeader = await screen.findAllByRole('columnheader');
    expect(columnsHeader).toHaveLength(4);
    const rowsDataGrid = await screen.findAllByRole('row');
    expect(rowsDataGrid).toHaveLength(4);
  });

  it('render 3 functionalities', async () => {
    await act(async () => {
      reducer(<DataGridComponent columns={columns} rows={rows} />);
    });

    const notificationVisualization = await screen.findByText('Visualizzazione Notifiche');
    expect(notificationVisualization).toBeInTheDocument();
    const notificationWorkflow = await screen.findByText('Workflow Notifiche');
    expect(notificationWorkflow).toBeInTheDocument();
    const notificationCreate = await screen.findByText('Creazione Notifiche');
    expect(notificationCreate).toBeInTheDocument();
  });

  // 07/11/2023 TO-FIX: This test must fail cause if the BE is down some
  it.skip('render DataGridComponent without BE', async () => {
    server.resetHandlers(
      rest.get('http://localhost/downtime/v1/status', (req, res) =>
        res.networkError('Failed to connect')
      )
    );

    await act(async () => {
      reducer(<MonitorPage />);
    });

    expect(
      screen.getByRole('heading', {
        name: 'Monitoraggio Piattaforma Notifiche',
      })
    ).toBeInTheDocument();

    const dateCol = screen.queryByRole('columnheader', {
      name: 'Data di creazione',
    });

    expect(dateCol).not.toBeInTheDocument();
    expect(await screen.findAllByRole('columnheader')).toHaveLength(2);
  });
});
