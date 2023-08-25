import { fireEvent, RenderResult, screen, waitFor } from '@testing-library/react';
import { reducer } from '../../../mocks/mockReducer';
import * as hook from '../../../redux/hook';
import * as hookPaperChannel from '../../../hooks/usePaperChannel';
import { ButtonsActionDriverTable, ButtonShowCosts } from '../ButtonsActionDriverTable';
import { DeliveryDriver } from '../../../model';
import * as hookPermission from '../../../hooks/useHasPermissions';

const driver: DeliveryDriver = {
  businessName: '',
  denomination: '',
  fiscalCode: '',
  fsu: false,
  pec: '',
  phoneNumber: '',
  registeredOffice: '',
  taxId: '12345678901',
  tenderCode: 'ABC-POI',
  uniqueCode: '',
};

describe('ButtonActionsDriverTable Test', () => {
  let mockDispatchFn: jest.Mock;
  let mockDeleteFn: jest.Mock;

  const setHasPermission = (value: boolean = true) => {
    const spyUsePermission = jest.spyOn(hookPermission, 'useHasPermissions');
    spyUsePermission.mockReturnValue(value);
  };

  beforeEach(async () => {
    const scenario = await doPrepareTestScenario();
    mockDispatchFn = scenario.mockDispatchFn;
    mockDeleteFn = scenario.mockDeleteFn;
    setHasPermission();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('Button rendered', async () => {
    reducer(<ButtonsActionDriverTable value={driver} />);
    const element = screen.getByTestId('menu-button-driver');
    const menuElement = screen.queryByTestId('action-menu-button-driver');

    expect(menuElement).toBeNull();
    expect(element).toBeInTheDocument();
  });

  it('When click on Button show Menu', async function () {
    reducer(<ButtonsActionDriverTable value={driver} />);
    const element = screen.getByTestId('menu-button-driver');
    fireEvent.click(element);
    expect(screen.getByTestId('action-menu-button-driver')).toBeInTheDocument();
    expect(screen.getByText('Modifica')).toBeInTheDocument();
    expect(screen.getByText('Elimina')).toBeInTheDocument();
  });

  it('When click on edit menu item', async function () {
    reducer(<ButtonsActionDriverTable value={driver} />);
    const element = screen.getByTestId('menu-button-driver');
    fireEvent.click(element);
    const menuItemEdit = screen.getByText('Modifica');
    expect(menuItemEdit).toBeInTheDocument();
    fireEvent.click(menuItemEdit);
    await waitFor(async () => {
      expect(mockDispatchFn).toBeCalledTimes(1);
      expect(mockDispatchFn).toBeCalledWith({
        payload: {
          ...driver,
        },
        type: 'deliveriesDriverSlice/setDetailDriver',
      });
    });
  });

  it('When click on delete menu item', async function () {
    reducer(<ButtonsActionDriverTable value={driver} />);
    const element = screen.getByTestId('menu-button-driver');
    fireEvent.click(element);
    const menuItemEdit = screen.getByText('Elimina');
    expect(menuItemEdit).toBeInTheDocument();
    fireEvent.click(menuItemEdit);
    await waitFor(async () => {
      expect(mockDeleteFn).toBeCalledTimes(1);
      expect(mockDeleteFn).toBeCalledWith(driver.tenderCode, driver.taxId);
    });
  });

  it('When permission of write is false', async () => {
    setHasPermission(false);
    reducer(<ButtonsActionDriverTable value={driver} />);

    expect(screen.queryByTestId('menu-button-driver')).not.toBeInTheDocument();
  });
});

describe('ButtonShowCosts Driver test', () => {
  let mockDispatchFn: jest.Mock;

  beforeEach(async () => {
    const scenario = await doPrepareTestScenario();
    mockDispatchFn = scenario.mockDispatchFn;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('Test in document', () => {
    reducer(<ButtonShowCosts value={driver} />);
    const element = screen.getByTestId('show-cost-button');
    expect(element).toBeInTheDocument();
  });

  it('Test on click button', async () => {
    reducer(<ButtonShowCosts value={driver} />);
    const element = screen.getByTestId('show-cost-button');
    expect(element).toBeInTheDocument();
    fireEvent.click(element);

    await waitFor(async () => {
      expect(mockDispatchFn).toBeCalledTimes(1);
      expect(mockDispatchFn).toBeCalledWith({
        payload: {
          tenderCode: driver.tenderCode,
          driverCode: driver.taxId,
        },
        type: 'deliveriesDriverSlice/setDialogCosts',
      });
    });
  });
});

type TestScenario = {
  result?: RenderResult;
  mockDispatchFn: jest.Mock;
  mockDeleteFn: jest.Mock;
};

async function doPrepareTestScenario(): Promise<TestScenario> {
  const mockDispatchFn = jest.fn(() => ({
    then: () => Promise.resolve(),
  }));

  const mockDeleteFn = jest.fn();

  // mock dispatch
  const useDispatchSpy = jest.spyOn(hook, 'useAppDispatch');
  useDispatchSpy.mockReturnValue(mockDispatchFn as any);

  const mockUsePaperChannelHook = jest.spyOn(hookPaperChannel, 'usePaperChannel');
  mockUsePaperChannelHook.mockReturnValue({
    deleteCost(): Promise<void> {
      return Promise.resolve(undefined);
    },
    changeStatusTender(): Promise<void> {
      return Promise.resolve(undefined);
    },
    deleteDriver: mockDeleteFn,
    deleteTender(): Promise<void> {
      return Promise.resolve(undefined);
    },
  });

  return { mockDispatchFn, mockDeleteFn };
}
