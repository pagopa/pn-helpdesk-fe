import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  EstimateDetailRequest,
  EstimateDetailResponse,
  EstimatesPageableRequest,
  EstimatesPageableResponse,
} from "../../model";
import {UsageEstimatesAPI} from "../../api/usageEstimates";
import * as spinnerActions from "../spinnerSlice";
import * as snackbarActions from "../snackbarSlice";

export enum ESTIMATE_ACTIONS {
  GET_DETAIL_ESTIMATE = 'getDetailEstimate',
  GET_ALL_ESTIMATE = 'getAllEstimate',
}

export const getAllEstimate = createAsyncThunk<
  EstimatesPageableResponse,
  EstimatesPageableRequest
>(
  ESTIMATE_ACTIONS.GET_ALL_ESTIMATE,
  async (filter:EstimatesPageableRequest, thunkAPI) => {
    try {
      return await UsageEstimatesAPI.getAllEstimate(filter);
    } catch (e){
      thunkAPI.dispatch(snackbarActions.updateSnackbacrOpened(true));
      thunkAPI.dispatch(snackbarActions.updateStatusCode(400));
      thunkAPI.dispatch(snackbarActions.updateMessage("Errore durante il recupero delle stime"));
      return thunkAPI.rejectWithValue(e);
    }
  }
)

export const getDetailEstimate = createAsyncThunk<
  EstimateDetailResponse,
  EstimateDetailRequest
>(
  ESTIMATE_ACTIONS.GET_DETAIL_ESTIMATE,
  async (filter:EstimateDetailRequest, thunkAPI) => {
    try {
      return await UsageEstimatesAPI.getDetailEstimate(filter.paId, filter.referenceMonth);
    } catch (e){
      thunkAPI.dispatch(spinnerActions.updateSpinnerOpened(false));
      thunkAPI.dispatch(snackbarActions.updateSnackbacrOpened(true));
      thunkAPI.dispatch(snackbarActions.updateStatusCode(400));
      thunkAPI.dispatch(snackbarActions.updateMessage("Errore durante il recupero del dettaglio della stima"));
      return thunkAPI.rejectWithValue(e);
    }
  }
)
