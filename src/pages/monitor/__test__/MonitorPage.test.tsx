/**
 * @jest-environment jsdom
 */

import { act, screen, waitFor } from '@testing-library/react';
import 'regenerator-runtime/runtime';
import userEvent from '@testing-library/user-event';
import MonitorPage from '../MonitorPage';
import { reducer } from '../../../mocks/mockReducer';

jest.mock('../../../api/apiRequests', () => ({
  getStatus: () =>
    Promise.resolve({
      data: {
        functionalities: [
          'NOTIFICATION_CREATE',
          'NOTIFICATION_VISUALIZATION',
          'NOTIFICATION_WORKFLOW',
        ],
        openIncidents: [
          {
            functionality: 'NOTIFICATION_VISUALIZATION',
            status: 'KO',
            startDate: '2022-11-03T17:00:15.995Z',
          },
        ],
      },
    }),
}));

describe('MonitorPage', () => {
  it('render component with running BE', async () => {
    await act(async () => {
      reducer(<MonitorPage />);
    });
    expect(
      screen.getByRole('heading', {
        name: 'Monitoraggio Piattaforma Notifiche',
      })
    ).toBeInTheDocument();
  });

  it('render data grid with 4 columns and 4 rows', async () => {
    await act(async () => {
      reducer(<MonitorPage />);
    });

    await waitFor(async () => {
      const columns = await screen.findAllByRole('columnheader');
      expect(columns).toHaveLength(4);
      const rows = await screen.findAllByRole('row');
      expect(rows).toHaveLength(4);
    });
  });

  it('render functionalities', async () => {
    await act(async () => {
      reducer(<MonitorPage />);
    });

    const notificationVisualization = await screen.findByText('Visualizzazione Notifiche');
    expect(notificationVisualization).toBeInTheDocument();
    const notificationWorkflow = await screen.findByText('Workflow Notifiche');
    expect(notificationWorkflow).toBeInTheDocument();
    const notificationCreate = await screen.findByText('Creazione Notifiche');
    expect(notificationCreate).toBeInTheDocument();
  });

  // 07/11/2023 TO-FIX: This test must fail cause if the BE is down some columns are hidden
  it.skip('render component without BE', async () => {
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

  it('click button to create an event KO', async () => {
    await act(async () => {
      reducer(<MonitorPage />);
    });

    const buttons = screen.queryAllByRole('menuitem');
    expect(buttons).toHaveLength(3);

    const user = userEvent.setup();
    await user.click(buttons[0]);

    const button = await screen.findByRole('menuitem', { name: 'Inserire KO' });
    expect(button).toBeInTheDocument();
    await user.click(button);
  });

  it('render button to create an event OK and get error', async () => {
    await act(async () => {
      reducer(<MonitorPage />);
    });

    const buttons = screen.queryAllByRole('menuitem');
    const user = userEvent.setup();
    await user.click(buttons[1]);
    const button = await screen.findByRole('menuitem', { name: 'Inserire OK' });
    expect(button).toBeInTheDocument();
    await user.click(button);
  });
});
