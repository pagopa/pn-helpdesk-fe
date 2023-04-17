import * as reactRedux from "../../../redux/hook";
import React from "react";
import {fireEvent, screen} from "@testing-library/react";

import {render} from "@testing-library/react";
import {StepFSU} from "../StepFSU";




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

describe("StepFSUTest", () => {
  const mockDispatchFn = jest.fn()
  const spyUseSelector = jest.spyOn(reactRedux, "useAppSelector");

  beforeEach(() => {
    const spyUseDispatch = jest.spyOn(reactRedux, "useAppDispatch");
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


  it('whenEmptyStateStepRenderedWithoutFormDriverAndNextBtnDisabled', async function () {
    render(<StepFSU/>)

    const buttonNext = screen.getByTestId("btn-next-fsu")
    expect(buttonNext).toBeInTheDocument()
    expect(buttonNext).toBeDisabled()

    const buttonBack = screen.getByTestId("btn-back-fsu")
    expect(buttonBack).toBeInTheDocument()

    const driverForm = screen.queryByTestId("driver-and-cost-form")
    expect(driverForm).not.toBeInTheDocument()

    fireEvent.click(buttonBack);

    await expect(mockDispatchFn).toBeCalledTimes(1)
    expect(mockDispatchFn).toBeCalledWith({
      payload: undefined,
      type: "formTenderSlice/backStep"
    })

  });

  it('whenHaveTenderCodeButNoDriverNextButtonDisabled', function () {
    const newState = {
      ...initialState,
      formTender: {
        code: "12344",
        description: "Test-Gara-2023"
      }
    }
    changeStore(newState)
    render(<StepFSU/>)

    const buttonNext = screen.getByTestId("btn-next-fsu")
    expect(buttonNext).toBeInTheDocument()
    expect(buttonNext).toBeDisabled()

    const buttonBack = screen.getByTestId("btn-back-fsu")
    expect(buttonBack).toBeInTheDocument()

    const driverForm = screen.getByTestId("driver-and-cost-form")
    expect(driverForm).toBeInTheDocument()
  });


  it('whenHaveTenderCodeAndDetailDriverAllRendered', async function () {
    const newState = {
      ...initialState,
      formTender: {
        code: "12344",
        description: "Test-Gara-2023"
      },
      formFsu: {
        taxId: "12345678910"
      }
    }
    changeStore(newState)
    render(<StepFSU/>)

    const buttonNext = screen.getByTestId("btn-next-fsu")
    expect(buttonNext).toBeInTheDocument()
    expect(buttonNext).toBeEnabled()

    const buttonBack = screen.getByTestId("btn-back-fsu")
    expect(buttonBack).toBeInTheDocument()

    const driverForm = screen.getByTestId("driver-and-cost-form")
    expect(driverForm).toBeInTheDocument()


    fireEvent.click(buttonNext);

    await expect(mockDispatchFn).toBeCalledTimes(1)
    expect(mockDispatchFn).toBeCalledWith({
      payload: undefined,
      type: "formTenderSlice/goTenderDriversStep"
    })

  });


})




jest.mock("../../deliveriesDrivers/DriverAndCostForm",
  () => ({
    DriverAndCostForm: () => {
      // @ts-ignore
      return <mock-table data-testid="driver-and-cost-form"/>;
    },
  }));