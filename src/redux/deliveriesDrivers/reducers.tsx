import {Page} from "../../model";
import {createSlice} from "@reduxjs/toolkit";
import {DeliveryDriverDTO} from "../../generated";
import {getAllDrivers} from "./actions";


const initialState = {
  tenderCode: undefined,
  loading: false,
  allData: {} as Page<DeliveryDriverDTO>,
}



const deliveriesDriverSlice = createSlice({
  name: 'deliveriesDriverSlice',
  initialState,
  reducers : {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDrivers.pending, (state, action) => {
      console.log("ACTION GET ALL DRIVER : ", action)
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
  }
})


export default deliveriesDriverSlice;