import React from 'react';
import configureStore from 'redux-mock-store';
import { cleanup, screen } from '@testing-library/react';
import * as router from 'react-router';
import * as reactRedux from '../../../redux/hook';
import { DeliveryDriver, Tender } from '../../../model';
import { FormTenderPage } from '../FormTenderPage';
import { reducer } from '../../../mocks/mockReducer';

jest.mock('../../../components/steps/StepTender', () => ({
  StepTender: () => <div data-testid="step-tender-mock" />,
}));

jest.mock('../../../components/steps/StepFSU', () => ({
  StepFSU: () => <div data-testid="step-fsu-mock" />,
}));

jest.mock('../../../components/steps/StepDeliveriesDrivers', () => ({
  StepDeliveriesDrivers: () => <div data-testid="step-deliveries-drivers-mock" />,
}));

jest.mock('../../../components/steps/StepSummary', () => ({
  StepSummary: () => <div data-testid="step-summary-mock" />,
}));

const initialState = {
  activeKey: 0 as number,

  fromUpload: false,

  formTender: {} as Tender,

  formFsu: {} as DeliveryDriver,

  saveWithFile: {
    loading: false,
    result: 'HANDLE',
  },
};

describe('FormTenderPage test', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useAppDispatch');
  const useParamsSpy = jest.spyOn(router, 'useParams');

  const mockingStore = (state: any) => {
    useSelectorMock.mockReturnValue(state);
    const mockStore = configureStore();
    const updatedStore = mockStore(state);
    const mockDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockDispatch);
    updatedStore.dispatch = mockDispatch;
  };

  beforeEach(() => {
    useParamsSpy.mockReturnValue({ tenderCode: undefined });
    jest.spyOn(React, 'useEffect').mockImplementation(() => jest.fn());
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
    mockingStore(initialState);
  });

  afterEach(() => {
    cleanup();
  });

  it('whenPageRendered', () => {
    reducer(<FormTenderPage />);

    const titlePage = screen.getByTestId('title-page');
    expect(titlePage).toBeInTheDocument();
    expect(titlePage.textContent).toEqual('Nuova Gara');

    expect(screen.getByTestId('step-tender-mock')).toBeInTheDocument();
  });

  it('whenPageRenderedAndHaveATenderCode', () => {
    useParamsSpy.mockReturnValue({ tenderCode: '123455' });
    reducer(<FormTenderPage />);

    const titlePage = screen.getByTestId('title-page');
    expect(titlePage).toBeInTheDocument();
    expect(titlePage.textContent).toEqual('Modifica Gara');

    expect(screen.getByTestId('step-tender-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('step-fsu-mock')).not.toBeInTheDocument();
    expect(screen.queryByTestId('step-deliveries-drivers-mock')).not.toBeInTheDocument();
    expect(screen.queryByTestId('step-summary-mock')).not.toBeInTheDocument();
  });

  it('whenActiveKey1FsuDetailRendered', () => {
    mockingStore({
      ...initialState,
      activeKey: 1,
    });
    reducer(<FormTenderPage />);

    expect(screen.queryByTestId('step-tender-mock')).not.toBeInTheDocument();
    expect(screen.getByTestId('step-fsu-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('step-deliveries-drivers-mock')).not.toBeInTheDocument();
    expect(screen.queryByTestId('step-summary-mock')).not.toBeInTheDocument();
  });

  it('whenActiveKey2DriversDetailRendered', () => {
    mockingStore({
      ...initialState,
      activeKey: 2,
    });
    reducer(<FormTenderPage />);

    expect(screen.queryByTestId('step-tender-mock')).not.toBeInTheDocument();
    expect(screen.queryByTestId('step-fsu-mock')).not.toBeInTheDocument();
    expect(screen.getByTestId('step-deliveries-drivers-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('step-summary-mock')).not.toBeInTheDocument();
  });

  it('whenActiveKey3DriversDetailRendered', () => {
    mockingStore({
      ...initialState,
      activeKey: 3,
    });
    reducer(<FormTenderPage />);

    expect(screen.queryByTestId('step-tender-mock')).not.toBeInTheDocument();
    expect(screen.queryByTestId('step-fsu-mock')).not.toBeInTheDocument();
    expect(screen.queryByTestId('step-deliveries-drivers-mock')).not.toBeInTheDocument();
    expect(screen.getByTestId('step-summary-mock')).toBeInTheDocument();
  });
});
