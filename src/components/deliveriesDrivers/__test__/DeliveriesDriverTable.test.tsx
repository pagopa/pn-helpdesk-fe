import { DeliveriesDriverTable } from "../DeliveriesDriverTable";
import * as reactRedux from "../../../redux/hook";
import configureStore from "redux-mock-store";
import { act, cleanup, fireEvent, screen } from "@testing-library/react";
import { DeliveryDriver, FilterRequest, Page } from "../../../model";
import { reducer } from "../../../mocks/mockReducer";
import React from "react";

const driversStore = {
  loading: false,
  detail: undefined,
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
describe(DeliveriesDriverTable, () => {

  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useAppDispatch');

  const mockingStore  = (state:any) => {
    useSelectorMock.mockReturnValue(state);
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
    useSelectorMock.mockClear()
    useDispatchMock.mockClear()
    mockingStore(driversStore);
  });

  afterEach(() => {
    cleanup()
  });

  it("whenDeliveryDriverIsRecovered", async () => {
    reducer(<DeliveriesDriverTable tenderCode={"12345"} onlyFsu={true} withActions={true}/>)
    const grid = await screen.findByRole('grid');
    expect(grid.getAttribute("aria-rowcount")).toEqual("2");
  })

  it("whenDeliveryDriverIsNotRecovered", async () => {
    const local = {...driversStore, allData: undefined }
    delete local.allData;
    mockingStore(local);
    reducer(<DeliveriesDriverTable tenderCode={"12345"} onlyFsu={true} withActions={true}/>)
    const grid = await screen.findByRole('grid');
    expect(grid.getAttribute("aria-rowcount")).toEqual("1");
  })

  it("whenDeliveryDriverWithNoActions", async () => {
    reducer(<DeliveriesDriverTable tenderCode={"12345"} onlyFsu={true} withActions={false}/>)

    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      const grid = screen.getByRole("grid");
      expect(grid).toBeInTheDocument();
      expect(grid.getAttribute("aria-colcount")).toEqual("5");
    });
  })

  it("whenDeliveryDriverWithDialogCost", async () => {
    const local = {...driversStore, dialogCost: {
        driverCode: "67890",
        tenderCode: "12345"
      }
    }
    mockingStore(local);
    reducer(<DeliveriesDriverTable tenderCode={"12345"} onlyFsu={true} withActions={true}/>)
    // const dd = await screen.findByTestId('deliveryDriverTable');
    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug(dd);

    const dialog = await screen.findByTestId('driver-cost-dialog');
    fireEvent.click(dialog);
    const buttonPreviousPage = screen.getByRole("button", {name: "Go to previous page"});
    fireEvent.click(buttonPreviousPage);

    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug(buttons);
    const buttonNextPage = screen.getByRole("button", {name: "Go to next page"});
    fireEvent.click(buttonNextPage);



    // await waitFor(async() => {
    //   await expect(navigateMock).toBeCalledTimes(1);
    //   expect(navigateMock).toBeCalledWith(TENDERS_TABLE_ROUTE);
    // })
    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug(dialog);
  })
})