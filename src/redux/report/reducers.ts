import {ReportPageableRequest, ReportPageableResponse} from "../../model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAllReport} from "./actions";


interface ReportEstimateState {
  loading: boolean,
  data: ReportPageableResponse,
  pagination: ReportPageableRequest,
}

const initialState: ReportEstimateState = {
  loading: false,
  data: {} as ReportPageableResponse,
  pagination: {
    page: 1,
    tot: 10,
    paId: "cc1c6a8e-5967-42c6-9d83-bfb12ba1665a",
    status: undefined
  }
}

const reportEstimateSlice = createSlice({
  name: 'reportEstimateSlice',
  initialState,
  reducers : {
    resetReportState: () => initialState,
    changeFilterReport: (state, action:PayloadAction<ReportPageableRequest>) => {
      state.pagination = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllReport.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllReport.fulfilled, (state, action: PayloadAction<ReportPageableResponse>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getAllReport.rejected, (state, action) => {
      state.loading = false;
    })
  }
})


export const {resetReportState, changeFilterReport} = reportEstimateSlice.actions

export default reportEstimateSlice;