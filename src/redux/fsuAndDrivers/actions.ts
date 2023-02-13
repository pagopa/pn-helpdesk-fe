import {createAsyncThunk} from "@reduxjs/toolkit";
import {DeliveryDriver, FilterRequest, Page} from "../../model";
import {apiPaperChannel} from "../../api/paperChannelApi";
import * as spinnerActions from "../spinnerSlice";
import * as snackbarActions from "../snackbarSlice";
import {AxiosError} from "axios";
import {CostDTO, PageableCostResponseDto} from "../../generated";

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

export const getCosts = createAsyncThunk<
  Page<CostDTO>,
  FilterRequest
>(
  "getCosts",
  async (request:FilterRequest, thunkAPI) => {

    try {
      const response = await apiPaperChannel().getAllCostOfDriverAndTender(request!.tenderCode as string ,request!.driverCode as string,  request.page, request.tot);
      const fromResponse:PageableCostResponseDto = response.data;
      return {
        page: fromResponse.number,
        total: fromResponse.totalElements,
        size: fromResponse.size,
        content: fromResponse.content
      } as Page<CostDTO>;
    } catch (e){

      thunkAPI.dispatch(snackbarActions.updateSnackbacrOpened(true));
      thunkAPI.dispatch(snackbarActions.updateStatusCode(400));
      thunkAPI.dispatch(snackbarActions.updateMessage("Errore con dei costi"));
      return thunkAPI.rejectWithValue(e)
    }
  }
)

