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
    id: 'functionality'
  },
  {
    field: 'state',
    headerName: 'Stato',
    width: 400,
    renderCell: (params: any) =>
      params.row.state ? <CheckCircleIcon color="success" /> : <CancelIcon color={'error'} />,
    flex: 1,
    minWidth: 100,
    id: 'state'
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
    id: 'data'
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
        ? [
          // @ts-expect-error incompatibilità @types/react con MUI GridActionsCellItem
          <GridActionsCellItem label="Inserire KO" showInMenu key={params.row.id} />,
        ]
        : [
          // @ts-expect-error incompatibilità @types/react con MUI GridActionsCellItem
          <GridActionsCellItem label="Inserire OK" showInMenu key={params.row.id} />,
        ],
    id: 'actions'

  },
];

describe('DataGridComponent', () => {
  let getComputedStyleSpy: jest.SpyInstance;

  beforeAll(() => {
    getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle').mockImplementation((element) =>
    ({
      position: 'relative',
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
    } as CSSStyleDeclaration)
    );
  });

  afterAll(() => getComputedStyleSpy.mockRestore());
  afterEach(cleanup);

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
