import {FilterRequest, Page, Tender} from "../../model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getTenders} from "./actions";
import {TenderDTO} from "../../api/paperChannel";




const initialState = {
  loading: false,
  allData: {} as Page<Tender>,
  selected: {} as TenderDTO,
  pagination: {
    page:1,
    tot:10,
    force: false
  } as FilterRequest,
}

const tenderSlice = createSlice({
  name: 'tenderSlice',
  initialState,
  reducers : {
    resetState: () => initialState,
    resetAllTenderState: (state) => {
      state.pagination = {
        ...initialState.pagination,
        force: !!(state.pagination.force) ? !state.pagination.force : true
      } 
      state.allData = initialState.allData
      console.log(state.pagination);
    },
    setLoadingTenders: (state, action:PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    addSelected: (state, action) => {
      state.selected = action.payload
    },
    removeSelected: (state, action) => {
      state.selected = {} as TenderDTO
    },
    changeFilterTenders: (state, action:PayloadAction<FilterRequest>) => {
      state.pagination = action.payload
    },
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
      state.loading = false
    })
  }
})

export const {resetAllTenderState, addSelected, changeFilterTenders,setLoadingTenders} = tenderSlice.actions

export default tenderSlice;