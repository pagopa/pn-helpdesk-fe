import React from "react";
import * as reactRedux from "../../../redux/hook";
import * as router from "react-router";
import {act, fireEvent, render, screen} from "@testing-library/react";
import {StepDeliveriesDrivers} from "../StepDeliveriesDrivers";

describe('StepDeliveriesDriversTest', function () {

  const mockDispatchFn = jest.fn()
  const mockNavigateFn = jest.fn()

  const spyUseSelector = jest.spyOn(reactRedux, "useAppSelector");

  beforeEach(() => {
    const spyUseDispatch = jest.spyOn(reactRedux, "useAppDispatch");
    const spyUseRouter = jest.spyOn(router, "useNavigate");
    spyUseRouter.mockReturnValue(mockNavigateFn);
    spyUseDispatch.mockReturnValue(mockDispatchFn);
    changeStore()
  })

  const changeStore = (stepsState:any = tenderFormWithUpload, drivers: any = driverEmptyState) => {
    const reduxStore = {
      deliveries: drivers,
      tenderForm: stepsState
    }
    spyUseSelector.mockImplementation(
      (selector:any) => selector(reduxStore)
    );
  }

  it('whenUploadFile', function () {
    render(<StepDeliveriesDrivers/>)

    expect(screen.getByTestId("driver-upload-mock")).toBeInTheDocument()
    expect(screen.queryByTestId("driver-cost-form-mock")).not.toBeInTheDocument()
    expect(screen.queryByTestId("drivers-table-mock")).not.toBeInTheDocument()

  });

  it('whenShowDetailDriver', async function () {

    changeStore({...tenderFormWithUpload, fromUpload: false})
    render(<StepDeliveriesDrivers/>)

    expect(screen.queryByTestId("driver-upload-mock")).not.toBeInTheDocument()
    expect(screen.getByTestId("driver-cost-form-mock")).toBeInTheDocument()
    expect(screen.queryByTestId("drivers-table-mock")).not.toBeInTheDocument()

    const btnBack = screen.getByTestId("btn-back-on-drivers")
    expect(btnBack).toBeInTheDocument()
    fireEvent.click(btnBack);
    await act(async () => {
      await expect(mockDispatchFn).toBeCalledWith({
        payload: undefined,
        type: "deliveriesDriverSlice/resetDetailDriver"
      })
      await expect(mockDispatchFn).toBeCalledWith({
        payload: {
          ...driverEmptyState.pagination,
          force: true
        },
        type: "deliveriesDriverSlice/changeFilterDrivers"
      })
    })


  });

  it('whenAllDrivers', async function () {

    const driversStore = {
      ...driverEmptyState,
      detail: undefined
    }
    delete driversStore.detail
    changeStore({...tenderFormWithUpload, fromUpload: false}, driversStore)
    render(<StepDeliveriesDrivers/>)

    expect(screen.queryByTestId("driver-upload-mock")).not.toBeInTheDocument()
    expect(screen.queryByTestId("driver-cost-form-mock")).not.toBeInTheDocument()
    expect(screen.getByTestId("drivers-table-mock")).toBeInTheDocument()

    const btnAdd = screen.getByTestId("btn-add-new-driver")
    const btnNext = screen.getByTestId("btn-next")
    const btnBack = screen.getByTestId("btn-back-fsu")
    expect(btnAdd).toBeInTheDocument()
    expect(btnNext).toBeInTheDocument()
    expect(btnBack).toBeInTheDocument()

    fireEvent.click(btnAdd);
    await act(async () => {
      await expect(mockDispatchFn).toBeCalledWith({
        payload: {},
        type: "deliveriesDriverSlice/setDetailDriver"
      })
    })

  });

  it('whenAllDriversClickNextButton', async function () {

    const driversStore = {
      ...driverEmptyState,
      detail: undefined
    }
    delete driversStore.detail
    changeStore({...tenderFormWithUpload, fromUpload: false}, driversStore)
    render(<StepDeliveriesDrivers/>)

    const btnNext = screen.getByTestId("btn-next")
    const btnBack = screen.getByTestId("btn-back-fsu")
    expect(btnNext).toBeInTheDocument()
    expect(btnBack).toBeInTheDocument()

    fireEvent.click(btnNext);
    await act(async () => {
      await expect(mockDispatchFn).toBeCalledWith({
        payload: undefined,
        type: "formTenderSlice/goFinalStep"
      })

    })

    fireEvent.click(btnBack);
    await act(async () => {
      await expect(mockDispatchFn).toBeCalledWith({
        payload: undefined,
        type: "formTenderSlice/goFSUStep"
      })

    })

  });


});


const tenderFormWithUpload = {
  activeKey: 0 as number,

  fromUpload: true,

  formTender: {
    code: "abcd"
  },
  formFsu: {},

  saveWithFile: {
    loading: false,
    result: "HANDLE"
  }
}


const driverEmptyState = {
  loading: false,
  detail: {
    taxId: "123456789010",
    fsu: false
  },
  allData: {},
  pagination: {
    page:1,
    tot:10,
    fsu: undefined
  },
  dialogCost: undefined
}


jest.mock("../../deliveriesDrivers/DriverAndCostForm",
  () => ({
    DriverAndCostForm: () => {
      // @ts-ignore
      return <mock-table data-testid="driver-cost-form-mock"/>;
    },
  }));

jest.mock("../StepDriverUpload",
  () => ({
    StepDriverUpload: () => {
      // @ts-ignore
      return <mock-table data-testid="driver-upload-mock"/>;
    },
  }));


jest.mock("../../deliveriesDrivers/DeliveriesDriverTable",
  () => ({
    DeliveriesDriverTable: () => {
      // @ts-ignore
      return <mock-table data-testid="drivers-table-mock"/>;
    },
  }));