import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import * as reactRedux from "../../../../redux/hook";
import * as paperChannelApi from "../../../../api/paperChannelApi";
import {reducer} from "../../../../mocks/mockReducer";
import {TenderForm} from "../TenderForm";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import * as italianStyle from "date-fns/locale";
import {Tender} from "../../../../model";
import {TenderDTO} from "../../../../api/paperChannel";


const tenderResponse = {
  code: "abc",
  endDate: new Date().toDateString(),
  name: "Gara 2023",
  startDate: new Date().toDateString(),
  status: "CREATED"
} as TenderDTO

describe("TenderFormTest", () => {
  const dispatchMockFn = jest.fn();
  const createTenderMockFn = jest.fn((body:Tender) => Promise.resolve(tenderResponse));
  const createTenderSpy = jest.spyOn(paperChannelApi, "createTender");

  beforeEach(() => {
    const dispatchSpy = jest.spyOn(reactRedux, "useAppDispatch");
    dispatchSpy.mockReturnValue(dispatchMockFn);
    createTenderSpy.mockImplementation(createTenderMockFn);
  })


  it('whenClickSaveOnEmptyDescription', async function () {
    reducer(<TenderForm />)
    // description field, startDate field, endDateField
    const [inputDescription,,] = screen.getAllByRole("textbox");
    expect(inputDescription).toBeInTheDocument();
    expect(inputDescription.getAttribute("value")).toEqual("")

    const btnSave = screen.getByTestId("btn-save-tender");
    expect(btnSave).toBeInTheDocument();
    fireEvent.click(btnSave);

    await expect(createTenderMockFn).toBeCalledTimes(0)

  });

  it('whenClickSaveOnRealDescription', async function () {
    render((<LocalizationProvider locale={italianStyle.it} dateAdapter={AdapterDateFns}>
        <TenderForm />
    </LocalizationProvider>
    ))
    // description field, startDate field, endDateField
    const [inputDescription, , ] = screen.getAllByRole("textbox");
    expect(inputDescription).toBeInTheDocument();
    fireEvent.input(inputDescription, {
      target: {
        value: "ABCD"
      }
    })

    await expect(inputDescription.getAttribute("value")).toEqual("ABCD");

    const btnSave = screen.getByTestId("btn-save-tender");
    expect(btnSave).toBeInTheDocument();
    fireEvent.submit(btnSave)
    await waitFor( async () => {
      await expect(createTenderMockFn).toBeCalledTimes(1)
      await expect(dispatchMockFn).toBeCalledWith({
        payload: true,
        type: "snackbar/updateSnackbacrOpened"
      })
      await expect(dispatchMockFn).toBeCalledWith({
        payload: 200,
        type: "snackbar/updateStatusCode"
      })
    })


  });


  it('whenClickSaveOnError', async function () {
    createTenderSpy.mockRejectedValue(new Error("Error with creation"));
    render((<LocalizationProvider locale={italianStyle.it} dateAdapter={AdapterDateFns}>
        <TenderForm />
      </LocalizationProvider>
    ))
    // description field, startDate field, endDateField
    const [inputDescription,,] = screen.getAllByRole("textbox");
    expect(inputDescription).toBeInTheDocument();
    fireEvent.input(inputDescription, {
      target: {
        value: "ABCD"
      }
    })

    await expect(inputDescription.getAttribute("value")).toEqual("ABCD");


    const btnSave = screen.getByTestId("btn-save-tender");
    expect(btnSave).toBeInTheDocument();
    fireEvent.submit(btnSave)
    await waitFor( async () => {
      await expect(dispatchMockFn).toBeCalledWith({
        payload: true,
        type: "snackbar/updateSnackbacrOpened"
      })
      await expect(dispatchMockFn).toBeCalledWith({
        payload: 400,
        type: "snackbar/updateStatusCode"
      })
    })


  });


})