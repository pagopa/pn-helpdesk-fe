import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Cost, FilterRequest, Page} from "../../model";
import {getCosts} from "./actions";
import {CostDTO} from "../../api/paperChannel";


interface State {
  costs: Page<CostDTO> | undefined,
  selectedCost: Cost | undefined,
  pagination: FilterRequest,
  error: boolean
}




const initialState:State = {
  costs: undefined,
  selectedCost: undefined,
  pagination: {
    tenderCode: undefined,
    page: 1,
    tot: 10
  },
  error: false
}


const costSlice = createSlice({
  name: 'costSlice',
  initialState,
  reducers : {
    resetStateCost: () => initialState,
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCosts.fulfilled, (state, action) => {
      state.costs = action.payload
    });
  }
})

export const {resetStateCost, changePaginationCost, resetSelectedCost, setSelectedCost} = costSlice.actions

export default costSlice;