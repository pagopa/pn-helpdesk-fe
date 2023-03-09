import { DeliveriesDriverTable } from "../DeliveriesDriverTable";
import * as reactRedux from "../../../redux/hook";
import {act, cleanup, fireEvent, screen, waitFor} from "@testing-library/react";
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
describe("DeliveriesDriverTableTest", () => {

  const useSelectorSpy = jest.spyOn(reactRedux, 'useAppSelector');
  const useDispatchSpy = jest.spyOn(reactRedux, 'useAppDispatch');
  const dispatchMockFn = jest.fn()

  const changeStore = (state: any) => {
    const reduxStore = {
      deliveries: state
    }
    useSelectorSpy.mockImplementation((s: any) => s(reduxStore));
  }

  beforeEach(() => {
    useDispatchSpy.mockReturnValue(dispatchMockFn);
    changeStore(driversStore);
  });

  afterEach(() => {
    cleanup()
    useSelectorSpy.mockClear()
    useDispatchSpy.mockClear()
  });

  it("whenDeliveryDriverIsRecovered", async () => {
    reducer(<DeliveriesDriverTable tenderCode={"12345"} onlyFsu={true} withActions={true}/>)
    const grid = await screen.findByRole('grid');
    expect(grid.getAttribute("aria-rowcount")).toEqual("2");
  })

  it("whenDeliveryDriverIsNotRecovered", async () => {
    const local = {...driversStore, allData: undefined }
    delete local.allData;
    changeStore(local);
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
    changeStore(local)
    reducer(<DeliveriesDriverTable tenderCode={"12345"} onlyFsu={true} withActions={true}/>)

    const dialog = await screen.findByTestId('driver-cost-dialog');
    expect(dialog).toBeInTheDocument()

    // @ts-ignore
    fireEvent.click(dialog["firstChild"])


    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( async  () => {
      await expect(dispatchMockFn).toBeCalledWith({
        payload: undefined,
        type: "deliveriesDriverSlice/setDialogCosts"
      })
    })
  })

  it("whenChangedPageSize", async () => {

    changeStore({...driversStore, allData: {}})
    reducer( <DeliveriesDriverTable  tenderCode={"12345"} onlyFsu={true} withActions={true} />);


    const button =  screen.getByRole('button', {
      name: /10/i
    })

    fireEvent.mouseDown(button);



    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( async ()=> {
      const role = screen.queryByRole("listbox");
      expect(role).toBeInTheDocument();
      const options = screen.getAllByRole("option");
      expect(options[1]).toBeInTheDocument();
      expect(options[1].textContent).toEqual("25");
      options[1].click()
      await waitFor(async ()=> {
        expect(dispatchMockFn).toBeCalledWith({
          payload: {
            ...driversStore.pagination,
            page: 1,
            tot: 25
          },
          type: "deliveriesDriverSlice/changeFilterDrivers"
        })
      })
    })

  });

})

jest.mock("../CostsTable",
  () => ({
    CostsTable: () => {
      // @ts-ignore
      return <mock-table data-testid="cost-table-mock"/>;
    },
  }));