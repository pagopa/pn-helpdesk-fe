import {createAsyncThunk} from "@reduxjs/toolkit";
import {DeliveryDriver, FilterRequest, Page} from "../../model";
import {apiPaperChannel} from "../../api/paperChannelApi";
import * as spinnerActions from "../spinnerSlice";
import * as snackbarActions from "../snackbarSlice";
import {AxiosError} from "axios";

export const getAllDrivers = createAsyncThunk<
  Page<DeliveryDriver>,
  FilterRequest
>(
  "getDeliveryFromTender",
  async (filter:FilterRequest, thunkAPI) => {
    try {
      const response = await apiPaperChannel().takeDeliveriesDrivers(filter!.tenderCode as string, filter.page, filter.tot, filter?.fsu);
      const page: Page<DeliveryDriver> ={
        total: (response.data.totalElements) ? response.data.totalElements  : 0,
        size: response.data.size ?  response.data.size : 0,
        page: response.data.number ? response.data.number : 0,
        content: response.data.content ? response.data.content.map(item => item as DeliveryDriver) : []
      }
      return page;
    } catch (e){
      return thunkAPI.rejectWithValue(e);
    }
  }
)

export const getDriverDetails = createAsyncThunk<
  DeliveryDriver,
  { tenderCode:string, driverCode:string }
>(
  "getDriverDetails",
  async (request:{ tenderCode:string, driverCode:string }, thunkAPI) => {

    try {
      thunkAPI.dispatch(spinnerActions.updateSpinnerOpened(true));
      const response = await apiPaperChannel().getDriverDetails(request.tenderCode, request.driverCode);
      thunkAPI.dispatch(spinnerActions.updateSpinnerOpened(false));
      return {
        ...response.data.driver
      } as DeliveryDriver;
    } catch (e){
      thunkAPI.dispatch(spinnerActions.updateSpinnerOpened(false));
      thunkAPI.dispatch(snackbarActions.updateSnackbacrOpened(true));
      thunkAPI.dispatch(snackbarActions.updateStatusCode(400));
      thunkAPI.dispatch(snackbarActions.updateMessage("Errore con dei costi"));
      return thunkAPI.rejectWithValue(e)
    }
  }
)


export const getFsuDetail = createAsyncThunk<
  DeliveryDriver,
  string
>(
  "getFsuDetail",
  async (tenderCode:string, thunkAPI) => {

    try {
      thunkAPI.dispatch(spinnerActions.updateSpinnerOpened(true));
      const response = await apiPaperChannel().getDetailFSU(tenderCode);
      thunkAPI.dispatch(spinnerActions.updateSpinnerOpened(false));
      return {
        ...response.data.fsu
      } as DeliveryDriver;
    } catch (e){
      thunkAPI.dispatch(spinnerActions.updateSpinnerOpened(false));
      if (e instanceof AxiosError){
        console.error(e?.response?.status);
        return thunkAPI.rejectWithValue(new Error("Driver Not Found!"));
      }

      thunkAPI.dispatch(snackbarActions.updateSnackbacrOpened(true));
      thunkAPI.dispatch(snackbarActions.updateStatusCode(400));
      thunkAPI.dispatch(snackbarActions.updateMessage("Errore con il recupero dettagli"));
      return thunkAPI.rejectWithValue(e)
    }
  }
)