import { DriverAndCostForm } from "../DriverAndCostForm";
import * as reactRedux from "../../../redux/hook";
import configureStore from "redux-mock-store";
import { cleanup, screen } from "@testing-library/react";
import { DeliveryDriver, FilterRequest, Page } from "../../../model";
import { reducer } from "../../../mocks/mockReducer";
import React from "react";
import { DriverCostsDialog } from "../../dialogs/index";

const driversStore = {
  loading: false,
  detail: { tenderCode: "12345", denomination: "denomination", businessName: "businessName", registeredOffice: "registeredOffice", pec: "pec@pec.it", fiscalCode: "fiscalCode", taxId: "0987654321", phoneNumber: "0123456", uniqueCode: "q1w2e3r4t5", fsu: false },
  allData: {
    page: 1,
    size: 10,
    total: 1,
    content: Array<DeliveryDriver>(
      { tenderCode: "12345", denomination: "denomination", businessName: "businessName", registeredOffice: "registeredOffice", pec: "pec@pec.it", fiscalCode: "fiscalCode", taxId: "0987654321", phoneNumber: "0123456", uniqueCode: "q1w2e3r4t5", fsu: false } )
  } as Page<DeliveryDriver>,
  pagination: {
    page:1,
    tot:10,
    fsu: undefined
  } as FilterRequest,
  dialogCost: undefined,
};

const costSelected = {
    type: "NATIONAL", nationalProductType: "AR", internationalProductType: "AR", price: 123, priceAdditional: 456, cap: ["01234", "56789"], zone: "ZONE_1"
};

jest.mock("../../../components/forms/deliveryDriver/DeliveryDriverForm", () => ({
  DeliveryDriverForm: () => {
      // @ts-ignore
      return <mock-table data-testid="delivery-driver-form-mock"/>;
      },
  }));

jest.mock("../../../components/dialogs/index", () => ({
  index: () => {
    // @ts-ignore
    return <mock-table data-testid="driver-costs-dialog-mock"/>;
  },
}));

describe(DriverAndCostForm, () => {

  const useSelectorMockDriver = jest.spyOn(reactRedux, 'useAppSelector');
  const useSelectorMockCost = jest.spyOn(reactRedux, 'useAppSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useAppDispatch');
  const useEffectMock = jest.spyOn(React, "useEffect").mockImplementation(() => jest.fn());
  const useCallbackMock = jest.spyOn(React, "useCallback").mockImplementation(() => jest.fn());

  const mockingStoreDriver = (state:any) => {
    useSelectorMockDriver.mockReturnValueOnce(state);
    const mockStore = configureStore();
    let updatedStore = mockStore(state);
    mockingDispatch(updatedStore);
  }
  const mockingStoreCost = (state:any) => {
    useSelectorMockCost.mockReturnValueOnce(state);
    const mockStore = configureStore();
    let updatedStore = mockStore(state);
    mockingDispatch(updatedStore);
  }
  const mockingDispatch = (updatedStore:any) => {
    const mockDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockDispatch);
    updatedStore.dispatch = mockDispatch;
  }

  beforeEach(() => {
    useSelectorMockDriver.mockClear()
    useSelectorMockCost.mockClear()
    useDispatchMock.mockClear()
    mockingStoreDriver(driversStore);
    mockingStoreCost(costSelected);
  });

  afterEach(() => {
    cleanup()
  });

  it("whenDeliveryDriverAndCostAreRecovered", async () => {
    reducer(<DriverAndCostForm tenderCode={"12345"} driverCode={"0987654321"} fsu={true} />);
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug()
    const driverMockTable = screen.getByTestId("delivery-driver-form-mock")
    expect(driverMockTable).toBeInTheDocument()

    const dialogMockTable = screen.getByTestId("driver-costs-dialog-mock")
    expect(dialogMockTable).toBeInTheDocument()
  })

  it("whenDeliveryDriverAndCostAreRecovered2", async () => {
    reducer(<DriverAndCostForm tenderCode={"12345"} fsu={false} />);
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug()
  })
})