import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import { DriverAndCostForm } from '../DriverAndCostForm';
import * as reactRedux from '../../../redux/hook';
import { reducer } from '../../../mocks/mockReducer';

const driverDetail = {
  tenderCode: '12345',
  denomination: 'denomination',
  businessName: 'businessName',
  registeredOffice: 'registeredOffice',
  pec: 'pec@pec.it',
  fiscalCode: 'fiscalCode',
  taxId: '0987654321',
  phoneNumber: '0123456',
  uniqueCode: 'q1w2e3r4t5',
  fsu: false,
};

const costSelected = {};

jest.mock('../../../components/forms/deliveryDriver/DeliveryDriverForm', () => ({
  DeliveryDriverForm: () => <div data-testid="delivery-driver-form-mock" />,
}));

jest.mock('../CostsTable', () => ({
  CostsTable: () => <div data-testid="driver-costs-table-mock" />,
}));

describe('DriverAndCostFormTest', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useAppDispatch');
  const mockDispatch = jest.fn();

  const mockingStoreDriver = (deliveries: any = {}, costStore = costSelected) => {
    const reduxStore = {
      deliveries: {
        detail: deliveries,
        dialogCost: undefined,
      },
      costs: {
        selectedCost: costStore,
      },
    } as any;

    useSelectorMock.mockImplementation((selector) => selector(reduxStore));
    // useSelectorMock.mockReturnValue(state)
  };

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();

    useDispatchMock.mockReturnValue(mockDispatch);
    mockingStoreDriver();
  });

  afterEach(() => {
    cleanup();
  });

  it('whenIsCreatedFSU', async () => {
    reducer(<DriverAndCostForm tenderCode={'1234'} fsu={true} />);
    expect(screen.getByTestId('delivery-driver-form-mock')).toBeInTheDocument();
    expect(mockDispatch).toBeCalledTimes(1);
  });

  it('whenIsCreatedDriver', async () => {
    reducer(<DriverAndCostForm tenderCode={'1234'} fsu={false} />);
    expect(screen.getByTestId('delivery-driver-form-mock')).toBeInTheDocument();
  });

  it('whenIsEditingFSU', async () => {
    mockingStoreDriver(driverDetail);
    reducer(<DriverAndCostForm tenderCode={'1234'} fsu={true} />);
    expect(screen.getByTestId('delivery-driver-form-mock')).toBeInTheDocument();
    expect(screen.getByTestId('driver-costs-table-mock')).toBeInTheDocument();

    expect(mockDispatch).toBeCalledTimes(2);
  });

  it('whenDeliveryDriverAndCostAreRecovered', async () => {
    mockingStoreDriver(driverDetail);
    reducer(<DriverAndCostForm tenderCode={'12345'} driverCode={'0987654321'} fsu={true} />);
    const driverMockTable = screen.getByTestId('delivery-driver-form-mock');
    expect(driverMockTable).toBeInTheDocument();

    const dialogMockTable = screen.getByTestId('driver-costs-table-mock');
    expect(dialogMockTable).toBeInTheDocument();
  });
});
