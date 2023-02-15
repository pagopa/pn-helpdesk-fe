import {DeliveryDriver, FilterRequest, Page} from "../../model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {getDriverDetails, getAllDrivers, getFsuDetail} from "./actions";

interface DeliveriesDriverState {
  loading: boolean,
  detail: DeliveryDriver | undefined,
  allData: Page<DeliveryDriver>,
  pagination: FilterRequest
}

const initialState:DeliveriesDriverState = {
  loading: false,
  detail: undefined,
  allData: {} as Page<DeliveryDriver>,
  pagination: {
    page:1,
    tot:10,
    fsu: undefined
  } as FilterRequest
}



const deliveriesDriverSlice = createSlice({
  name: 'deliveriesDriverSlice',
  initialState,
  reducers : {
    resetStateDrivers: () => initialState,
    resetDetailDriver: (state) => {
      state.detail = undefined
    },
    setDetailDriver: (state, action) => {
      state.detail = action.payload
    },
    changeFilterDrivers: (state, action:PayloadAction<FilterRequest>) => {
      state.pagination = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDrivers.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(getAllDrivers.fulfilled, (state, action) => {
      state.allData = action.payload
      state.loading = false
    })
    builder.addCase(getAllDrivers.rejected, (state, action) => {
      console.error(action.payload);
      state.loading = false
    })
    builder.addCase(getFsuDetail.fulfilled, (state, action) => {
      state.detail = action.payload
    });
    builder.addCase(getDriverDetails.fulfilled, (state, action) => {
      state.detail = action.payload
    });
  }
})


export const {resetStateDrivers, resetDetailDriver, setDetailDriver, changeFilterDrivers} = deliveriesDriverSlice.actions

export default deliveriesDriverSlice;