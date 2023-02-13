import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CostDTO} from "../../generated";
import {Cost, DeliveryDriver, FilterRequest, Page} from "../../model";
import {getCosts, getDriverDetails, getFsuDetail} from "./actions";


interface State {
  costs: Page<CostDTO> | undefined,
  driver: DeliveryDriver | undefined,
  selectedCost: Cost | undefined,
  pagination: FilterRequest,
  error: boolean
}




const initialState:State = {
  costs: undefined,
  driver: undefined,
  selectedCost: undefined,
  pagination: {
    tenderCode: undefined,
    page: 1,
    tot: 10
  },
  error: false
}


const driverAndCostSlice = createSlice({
  name: 'driverAndCostSlice',
  initialState,
  reducers : {
    resetStateDriverAndCost: () => initialState,
    resetPaginationCost: (state) => {
      state.pagination = initialState.pagination
    },
    resetSelectedCost: (state) => {
      state.selectedCost = initialState.selectedCost
    },
    changePaginationCost: (state, action:PayloadAction<FilterRequest>) => {
      state.pagination = action.payload;
    },
    setSelectedCost: (state, action:PayloadAction<Cost>) => {
      state.selectedCost = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFsuDetail.fulfilled, (state, action) => {
      state.driver = action.payload
    });
    builder.addCase(getDriverDetails.fulfilled, (state, action) => {
      state.driver = action.payload
    });
    builder.addCase(getCosts.fulfilled, (state, action) => {
      state.costs = action.payload
    });
  }
})

export const {changePaginationCost, resetPaginationCost, resetStateDriverAndCost, resetSelectedCost, setSelectedCost} = driverAndCostSlice.actions

export default driverAndCostSlice;