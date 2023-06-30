import * as reactRedux from "../../../redux/hook";
import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import * as router from "react-router";
import {StepSummary} from "../StepSummary";



const initialState = {
  activeKey: 0 as number,

  fromUpload: false,

  formTender: {},


  formFsu: {},

  saveWithFile: {
    loading: false,
    result: "HANDLE"
  }
}

describe("StepFSU test", () => {
  const mockDispatchFn = jest.fn()
  const mockNavigateFn = jest.fn()

  const spyUseSelector = jest.spyOn(reactRedux, "useAppSelector");

  beforeEach(() => {
    const spyUseDispatch = jest.spyOn(reactRedux, "useAppDispatch");
    const spyUseRouter = jest.spyOn(router, "useNavigate");
    spyUseRouter.mockReturnValue(mockNavigateFn);
    spyUseDispatch.mockReturnValue(mockDispatchFn);
    changeStore(initialState)
  })

  const changeStore = (tenderFormState:any) => {
    const reduxStore = {
      tenderForm : tenderFormState
    }
    spyUseSelector.mockImplementation(
      (selector:any) => selector(reduxStore)
    );
  }

  it('whenNotHaveATenderCode', async function () {
    render(<StepSummary />)

    await expect(mockDispatchFn).toBeCalledTimes(1)
    expect(mockDispatchFn).toBeCalledWith({
      payload: {
        key: 0
      },
      type: "formTenderSlice/changeKey"
    })

  });

  it('whenHaveTenderCode', async function () {
    const newState = {
      ...initialState,
      formTender: {
        code: "12345",
      }
    }
    changeStore(newState)
    render(<StepSummary />)

    const buttonEnd = screen.getByTestId("btn-save-exit")
    const buttonBack = screen.getByTestId("btn-back-step")
    const dataInfo = screen.getByTestId("data-info-mock")
    const driversTable = screen.getByTestId("drivers-table-mock")
    expect(buttonEnd).toBeInTheDocument()
    expect(buttonBack).toBeInTheDocument()
    expect(dataInfo).toBeInTheDocument()
    expect(driversTable).toBeInTheDocument()

    await expect(mockDispatchFn).toBeCalledTimes(0)

  });

  it('whenBackStep', async function () {
    const newState = {
      ...initialState,
      formTender: {
        code: "12345",
      }
    }
    changeStore(newState)
    render(<StepSummary />)

    const buttonBack = screen.getByTestId("btn-back-step")
    const buttonSave = screen.getByTestId("btn-save-exit")
    expect(buttonBack).toBeInTheDocument()
    expect(buttonBack).toBeEnabled()
    expect(buttonSave).toBeInTheDocument()
    expect(buttonSave).toBeEnabled()

    fireEvent.click(buttonBack)

    await expect(mockDispatchFn).toBeCalledWith({
      payload: undefined,
      type: "formTenderSlice/goTenderDriversStep"
    })

    fireEvent.click(buttonSave)

    await expect(mockDispatchFn).toBeCalledWith({
      payload: undefined,
      type: "formTenderSlice/clearFormState"
    })
    expect(mockNavigateFn).toBeCalledTimes(1)
  })

})



jest.mock("../../dataInfo/DataInfo",
  () => ({
    DataInfo: () => {
      // @ts-ignore
      return <mock-table data-testid="data-info-mock"/>;
    },
  }));
jest.mock("../../deliveriesDrivers/DeliveriesDriverTable",
  () => ({
    DeliveriesDriverTable: () => {
      // @ts-ignore
      return <mock-table data-testid="drivers-table-mock"/>;
    },
  }));
