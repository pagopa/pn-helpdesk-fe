import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import * as italianStyle from "date-fns/locale";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DeliveryDriver} from "../../../../model";
import * as paperChannelApi from "../../../../api/paperChannelApi";
import * as reactRedux from "../../../../redux/hook";
import {DeliveryDriverForm} from "../DeliveryDriverForm";
import {AxiosError, AxiosResponse} from "axios";



describe("DeliveryDriverFormTest", () => {

  const dispatchMockFn = jest.fn();
  const createDriverMockFn = jest.fn((code:string, body:DeliveryDriver) => Promise.resolve());
  const createDriverSpy = jest.spyOn(paperChannelApi, "createDeliveryDriver");

  beforeEach(() => {
    const dispatchSpy = jest.spyOn(reactRedux, "useAppDispatch");
    dispatchSpy.mockReturnValue(dispatchMockFn);
    createDriverSpy.mockImplementation(createDriverMockFn);
  })

  it('whenClickSaveWithoutRequiredFields', async function () {
    render((<LocalizationProvider locale={italianStyle.it} dateAdapter={AdapterDateFns}>
        <DeliveryDriverForm  fsu={false} initialValue={undefined} tenderCode={"abc-1234"}/>
      </LocalizationProvider>
    ))
    const [taxId, ragSoc, denomination, office, fiscalCode, pec, tel, uniqueCode,] = screen.getAllByRole("textbox")
    expect(taxId).toBeInTheDocument()
    expect(ragSoc).toBeInTheDocument()
    expect(denomination).toBeInTheDocument()
    expect(office).toBeInTheDocument()
    expect(fiscalCode).toBeInTheDocument()
    expect(pec).toBeInTheDocument()
    expect(tel).toBeInTheDocument()
    expect(uniqueCode).toBeInTheDocument()

    const btnSave = screen.getByTestId("btn-save-driver");
    expect(btnSave).toBeInTheDocument();
    fireEvent.click(btnSave);

    await act(async () => {
      await expect(createDriverMockFn).toBeCalledTimes(0)
    })

  });


  it('whenInsertTaxIdBadlyFormat', async function () {
    render((<LocalizationProvider locale={italianStyle.it} dateAdapter={AdapterDateFns}>
        <DeliveryDriverForm  fsu={false} initialValue={undefined} tenderCode={"abc-1234"}/>
      </LocalizationProvider>
    ))
    const [taxId, ragSoc, , , , , , ] = screen.getAllByRole("textbox")
    fireEvent.input(taxId, {
      target: {
        value: "1234"
      }
    })


    const btnSave = screen.getByTestId("btn-save-driver");
    expect(btnSave).toBeInTheDocument();
    fireEvent.click(btnSave);

    await act(async () => {
      await expect(createDriverMockFn).toBeCalledTimes(0)
    })

  });

  it('whenSaveWithAllRequiredField', async function () {
    render((<LocalizationProvider locale={italianStyle.it} dateAdapter={AdapterDateFns}>
        <DeliveryDriverForm  fsu={false} initialValue={undefined} tenderCode={"abc-1234"}/>
      </LocalizationProvider>
    ))
    const [taxId, ragSoc, , , , , , ] = screen.getAllByRole("textbox")

    fireEvent.input(taxId, {
      target: {
        value: "12345678901"
      }
    })

    fireEvent.input(ragSoc, {
      target: {
        value: "Ragione Sociale"
      }
    })

    await act(async () => {
      await expect(taxId.getAttribute("value")).toEqual("12345678901");
      await expect(ragSoc.getAttribute("value")).toEqual("Ragione Sociale");
    })


    const btnSave = screen.getByTestId("btn-save-driver");
    expect(btnSave).toBeInTheDocument();
    fireEvent.click(btnSave);

    await waitFor(async () => {
      await expect(createDriverMockFn).toBeCalledTimes(1)
      await expect(dispatchMockFn).toBeCalledWith({
        payload: true,
        type: "snackbar/updateSnackbacrOpened"
      })
      await expect(dispatchMockFn).toBeCalledWith({
        payload: 200,
        type: "snackbar/updateStatusCode"
      })    })

  });

  it('whenSaveWithGenericError', async function () {
    createDriverSpy.mockRejectedValue(new Error("Error with Creation"))

    render((<LocalizationProvider locale={italianStyle.it} dateAdapter={AdapterDateFns}>
        <DeliveryDriverForm  fsu={false} initialValue={undefined} tenderCode={"abc-1234"}/>
      </LocalizationProvider>
    ))
    const [taxId, ragSoc, , , , , , ] = screen.getAllByRole("textbox")

    fireEvent.input(taxId, {
      target: {
        value: "12345678901"
      }
    })

    fireEvent.input(ragSoc, {
      target: {
        value: "Ragione Sociale"
      }
    })

    await act(async () => {
      await expect(taxId.getAttribute("value")).toEqual("12345678901");
      await expect(ragSoc.getAttribute("value")).toEqual("Ragione Sociale");
    })


    const btnSave = screen.getByTestId("btn-save-driver");
    expect(btnSave).toBeInTheDocument();
    fireEvent.click(btnSave);

    await waitFor(async () => {
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

  it('whenSaveWithGenericErrorAPI', async function () {
    const response = {
      data: {
        detail: "Errore durante il salvataggio"
      }
    } as AxiosResponse
    createDriverSpy.mockRejectedValue(new AxiosError("Error request", "400", undefined, undefined, response))

    render((<LocalizationProvider locale={italianStyle.it} dateAdapter={AdapterDateFns}>
        <DeliveryDriverForm  fsu={false} initialValue={undefined} tenderCode={"abc-1234"}/>
      </LocalizationProvider>
    ))
    const [taxId, ragSoc, , , , , , ] = screen.getAllByRole("textbox")

    fireEvent.input(taxId, {
      target: {
        value: "12345678901"
      }
    })

    fireEvent.input(ragSoc, {
      target: {
        value: "Ragione Sociale"
      }
    })

    await act(async () => {
      await expect(taxId.getAttribute("value")).toEqual("12345678901");
      await expect(ragSoc.getAttribute("value")).toEqual("Ragione Sociale");
    })


    const btnSave = screen.getByTestId("btn-save-driver");
    expect(btnSave).toBeInTheDocument();
    fireEvent.click(btnSave);

    await waitFor(async () => {
      await expect(dispatchMockFn).toBeCalledWith({
        payload: true,
        type: "snackbar/updateSnackbacrOpened"
      })
      await expect(dispatchMockFn).toBeCalledWith({
        payload: 400,
        type: "snackbar/updateStatusCode"
      })
      await expect(dispatchMockFn).toBeCalledWith({
        payload: "Errore durante il salvataggio",
        type: "snackbar/updateMessage"
      })
    })

  });


})