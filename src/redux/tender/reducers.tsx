import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterRequest, Page, Tender } from '../../model';
import { TenderDTO } from '../../api/paperChannel';
import { getTenders } from './actions';

const initialState = {
  loading: false,
  allData: {} as Page<Tender>,
  selected: {} as TenderDTO,
  pagination: {
    page: 1,
    tot: 10,
    force: false,
  } as FilterRequest,
};

const tenderSlice = createSlice({
  name: 'tenderSlice',
  initialState,
  reducers: {
    resetState: () => initialState,
    resetAllTenderState: (state) => {
      state.pagination = {
        ...initialState.pagination,
        force: state.pagination.force ? !state.pagination.force : true,
      };
      state.allData = initialState.allData;
    },
    setLoadingTenders: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addSelected: (state, action) => {
      state.selected = action.payload;
    },
    removeSelected: (state) => {
      state.selected = {} as TenderDTO;
    },
    changeFilterTenders: (state, action: PayloadAction<FilterRequest>) => {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTenders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTenders.fulfilled, (state, action) => {
      state.allData = action.payload;
      state.loading = false;
    });
    builder.addCase(getTenders.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { resetAllTenderState, addSelected, changeFilterTenders, setLoadingTenders } =
  tenderSlice.actions;

export default tenderSlice;
