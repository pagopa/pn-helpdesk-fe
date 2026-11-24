import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import * as router from 'react-router';
import * as reactRedux from '../../../redux/hook';
import { StepSummary } from '../StepSummary';
import { Mocked, vi, type Mock } from 'vitest';

const initialState = {
  activeKey: 0 as number,

  fromUpload: false,

  formTender: {},

  formFsu: {},

  saveWithFile: {
    loading: false,
    result: 'HANDLE',
  },
};

describe('StepFSU test', () => {
  const mockDispatchFn = vi.fn();
  const mockNavigateFn = vi.fn();

  const spyUseSelector = vi.spyOn(reactRedux, 'useAppSelector');

  beforeEach(() => {
    const spyUseDispatch = vi.spyOn(reactRedux, 'useAppDispatch');
    const spyUseRouter = vi.spyOn(router, 'useNavigate');
    spyUseRouter.mockReturnValue(mockNavigateFn);
    spyUseDispatch.mockReturnValue(mockDispatchFn);
    changeStore(initialState);
  });

  const changeStore = (tenderFormState: any) => {
    const reduxStore = {
      tenderForm: tenderFormState,
    };
    spyUseSelector.mockImplementation((selector: any) => selector(reduxStore));
  };

  it('whenNotHaveATenderCode', async function () {
    render(<StepSummary />);

    expect(mockDispatchFn).toBeCalledTimes(1);
    expect(mockDispatchFn).toBeCalledWith({
      payload: {
        key: 0,
      },
      type: 'formTenderSlice/changeKey',
    });
  });

  it('whenHaveTenderCode', async function () {
    const newState = {
      ...initialState,
      formTender: {
        code: '12345',
      },
    };
    changeStore(newState);
    render(<StepSummary />);

    const buttonEnd = screen.getByTestId('btn-save-exit');
    const buttonBack = screen.getByTestId('btn-back-step');
    const dataInfo = screen.getByTestId('data-info-mock');
    const driversTable = screen.getByTestId('drivers-table-mock');
    expect(buttonEnd).toBeInTheDocument();
    expect(buttonBack).toBeInTheDocument();
    expect(dataInfo).toBeInTheDocument();
    expect(driversTable).toBeInTheDocument();

    expect(mockDispatchFn).toBeCalledTimes(0);
  });

  it('whenBackStep', async function () {
    const newState = {
      ...initialState,
      formTender: {
        code: '12345',
      },
    };
    changeStore(newState);
    render(<StepSummary />);

    const buttonBack = screen.getByTestId('btn-back-step');
    const buttonSave = screen.getByTestId('btn-save-exit');
    expect(buttonBack).toBeInTheDocument();
    expect(buttonBack).toBeEnabled();
    expect(buttonSave).toBeInTheDocument();
    expect(buttonSave).toBeEnabled();

    fireEvent.click(buttonBack);

    expect(mockDispatchFn).toBeCalledWith({
      payload: undefined,
      type: 'formTenderSlice/goTenderDriversStep',
    });

    fireEvent.click(buttonSave);

    expect(mockDispatchFn).toBeCalledWith({
      payload: undefined,
      type: 'formTenderSlice/clearFormState',
    });
    expect(mockNavigateFn).toBeCalledTimes(1);
  });
});

vi.mock('../../dataInfo/DataInfo', () => ({
  DataInfo: () => <div data-testid="data-info-mock" />,
}));
vi.mock('../../deliveriesDrivers/DeliveriesDriverTable', () => ({
  DeliveriesDriverTable: () => <div data-testid="drivers-table-mock" />,
}));
