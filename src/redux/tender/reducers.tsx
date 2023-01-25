import {Page} from "../../model";
import {createSlice} from "@reduxjs/toolkit";
import {getTenders} from "./actions";
import {TenderDTO} from "../../generated";


const initialState = {
  loading: false,
  allData: {} as Page<TenderDTO>,
  selected: {} as TenderDTO

}

const tenderSlice = createSlice({
  name: 'tenderSlice',
  initialState,
  reducers : {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getTenders.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(getTenders.fulfilled, (state, action) => {
      state.allData = action.payload
      state.loading = false
    })
    builder.addCase(getTenders.rejected, (state, action) => {
      console.error(action.payload);
      state.loading = false
    })
  }
})

export default tenderSlice;