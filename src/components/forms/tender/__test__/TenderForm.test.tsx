import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { act } from 'react';
import * as reactRedux from '../../../../redux/hook';
import * as paperChannelApi from '../../../../api/paperChannelApi';
import { reducer } from '../../../../mocks/mockReducer';
import { TenderForm } from '../TenderForm';
import { TenderDTO } from '../../../../api/paperChannel';
import { vi } from 'vitest';

const tenderResponse = {
  code: 'abc',
  endDate: new Date().toDateString(),
  name: 'Gara 2023',
  startDate: new Date().toDateString(),
  status: 'CREATED',
} as TenderDTO;

describe('TenderFormTest', () => {
  const dispatchMockFn = vi.fn();
  const createTenderMockFn = vi.fn(() => Promise.resolve(tenderResponse));
  const createTenderSpy = vi.spyOn(paperChannelApi, 'createTender');

  beforeEach(() => {
    const dispatchSpy = vi.spyOn(reactRedux, 'useAppDispatch');
    dispatchSpy.mockReturnValue(dispatchMockFn);
    createTenderSpy.mockImplementation(createTenderMockFn);
  });

  it('whenClickSaveOnEmptyDescription', async function () {
    reducer(<TenderForm />);
    // description field, startDate field, endDateField
    const [inputDescription, ,] = screen.getAllByRole('textbox');
    expect(inputDescription).toBeInTheDocument();
    expect(inputDescription.getAttribute('value')).toEqual('');

    const btnSave = screen.getByTestId('btn-save-tender');
    expect(btnSave).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(btnSave);
    });

    expect(createTenderMockFn).toBeCalledTimes(0);
  });

  it('whenClickSaveOnRealDescription', async function () {
    reducer(<TenderForm />);
    // description field, startDate field, endDateField
    const [inputDescription, ,] = screen.getAllByRole('textbox');
    expect(inputDescription).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(inputDescription, {
        target: {
          value: 'ABCD',
        },
      });
    });

    expect(inputDescription.getAttribute('value')).toEqual('ABCD');

    const btnSave = screen.getByTestId('btn-save-tender');
    expect(btnSave).toBeInTheDocument();

    await act(async () => {
      fireEvent.submit(btnSave);
    });
    await waitFor(async () => {
      expect(createTenderMockFn).toBeCalledTimes(1);
      expect(dispatchMockFn).toBeCalledWith({
        payload: true,
        type: 'snackbar/updateSnackbarOpened',
      });
      expect(dispatchMockFn).toBeCalledWith({
        payload: 200,
        type: 'snackbar/updateStatusCode',
      });
    });
  });

  it('whenClickSaveOnError', async function () {
    createTenderSpy.mockRejectedValue(new Error('Error with creation'));
    reducer(<TenderForm />);
    // description field, startDate field, endDateField
    const [inputDescription, ,] = screen.getAllByRole('textbox');
    expect(inputDescription).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(inputDescription, {
        target: {
          value: 'ABCD',
        },
      });
    });

    expect(inputDescription.getAttribute('value')).toEqual('ABCD');

    const btnSave = screen.getByTestId('btn-save-tender');
    expect(btnSave).toBeInTheDocument();

    await act(async () => {
      fireEvent.submit(btnSave);
    });

    await waitFor(async () => {
      expect(dispatchMockFn).toBeCalledWith({
        payload: true,
        type: 'snackbar/updateSnackbarOpened',
      });
      expect(dispatchMockFn).toBeCalledWith({
        payload: 400,
        type: 'snackbar/updateStatusCode',
      });
    });
  });
});
