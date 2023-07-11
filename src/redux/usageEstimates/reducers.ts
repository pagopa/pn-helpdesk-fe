import {EstimateDetailResponse, EstimatesPageableRequest, EstimatesPageableResponse} from "../../model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAllEstimate, getDetailEstimate} from "./actions";

interface UsageEstimatesState {
  historyEstimate: EstimatesPageableResponse;
  detail: EstimateDetailResponse | undefined;
  pagination: {
    page: number;
    tot: number;
    paId: string | undefined;
  };
  loading: boolean;
  error: string | number | undefined
}

const initialState: UsageEstimatesState = {
  historyEstimate: {} as EstimatesPageableResponse,
  detail: undefined,
  pagination: {
    page: 1,
    tot: 5,
    paId: undefined
  },
  loading: false,
  error: undefined
};


const usageEstimateSlice = createSlice({
  name: "usageEstimateSlice",
  initialState,
  reducers: {
    changeFilterEstimates: (state, action:PayloadAction<EstimatesPageableRequest>) => {
      state.pagination = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllEstimate.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    })
    builder.addCase(getAllEstimate.fulfilled, (state, payload) => {
      state.historyEstimate = payload.payload;
      state.loading = false;
      state.error = undefined;
    })
    builder.addCase(getAllEstimate.rejected, (state, payload) => {
      state.historyEstimate = {} as EstimatesPageableResponse
      state.loading = false;
      state.error = "ERROR ESTIMATE";
    })
    builder.addCase(getDetailEstimate.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    })
    builder.addCase(getDetailEstimate.fulfilled, (state, payload) => {
      state.detail = payload.payload;
      state.loading = false;
      state.error = undefined;
    })
    builder.addCase(getDetailEstimate.rejected, (state, payload) => {
      state.detail = undefined
      state.loading = false;
      state.error = "ERROR ESTIMATE";
    })
  }
});

export const {changeFilterEstimates} = usageEstimateSlice.actions;

export default usageEstimateSlice;