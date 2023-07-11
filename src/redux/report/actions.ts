import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  ReportPageableRequest,
  ReportPageableResponse
} from "../../model";
import {ReportEstimatesAPI} from "../../api/usageEstimates";
import * as snackbarActions from "../snackbarSlice";


export enum REPORTS_ACTIONS {
  GET_ALL_REPORT = 'getAllReport',
}

export const getAllReport = createAsyncThunk<
  ReportPageableResponse,
  ReportPageableRequest
>(
  REPORTS_ACTIONS.GET_ALL_REPORT,
  async (filter:ReportPageableRequest, thunkAPI) => {
    try {
      return await ReportEstimatesAPI.getAll(filter);
    } catch (e){
      thunkAPI.dispatch(snackbarActions.updateSnackbacrOpened(true));
      thunkAPI.dispatch(snackbarActions.updateStatusCode(400));
      thunkAPI.dispatch(snackbarActions.updateMessage("Errore durante il recupero dei report"));
      return thunkAPI.rejectWithValue(e);
    }
  }
)

