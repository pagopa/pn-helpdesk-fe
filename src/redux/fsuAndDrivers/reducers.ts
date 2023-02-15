import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CostDTO} from "../../generated";
import {Cost, DeliveryDriver, FilterRequest, Page} from "../../model";
import {getCosts} from "./actions";


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
      state.pagination = {
        ...state.pagination,
        force: !state.pagination.force
      }
    },
    changePaginationCost: (state, action:PayloadAction<FilterRequest>) => {
      state.pagination = action.payload;
    },
    setSelectedCost: (state, action:PayloadAction<Cost>) => {
      state.selectedCost = action.payload
    },
    setCurrentDriver: (state, action:PayloadAction<DeliveryDriver>) => {
      state.driver = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCosts.fulfilled, (state, action) => {
      state.costs = action.payload
    });
  }
})

export const {changePaginationCost, resetPaginationCost, resetStateDriverAndCost, resetSelectedCost, setSelectedCost, setCurrentDriver} = driverAndCostSlice.actions

export default driverAndCostSlice;