import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeliveryDriver, FilterRequest, Page } from '../../model';

import { getDriverDetails, getAllDrivers, getFsuDetail } from './actions';

interface DialogCostState {
  driverCode: string;
  tenderCode: string;
}

interface DeliveriesDriverState {
  loading: boolean;
  detail: DeliveryDriver | undefined;
  allData: Page<DeliveryDriver>;
  pagination: FilterRequest;
  dialogCost: DialogCostState | undefined;
}

const initialState: DeliveriesDriverState = {
  loading: false,
  detail: undefined,
  allData: {} as Page<DeliveryDriver>,
  pagination: {
    page: 1,
    tot: 10,
    fsu: undefined,
  } as FilterRequest,
  dialogCost: undefined,
};

const deliveriesDriverSlice = createSlice({
  name: 'deliveriesDriverSlice',
  initialState,
  reducers: {
    resetStateDrivers: () => initialState,
    resetDetailDriver: (state) => {
      state.detail = undefined;
    },
    setDetailDriver: (state, action) => {
      state.detail = action.payload;
    },
    changeFilterDrivers: (state, action: PayloadAction<FilterRequest>) => {
      state.pagination = action.payload;
    },
    setDialogCosts: (state, action: PayloadAction<DialogCostState | undefined>) => {
      state.dialogCost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDrivers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllDrivers.fulfilled, (state, action) => {
      state.allData = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllDrivers.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getFsuDetail.fulfilled, (state, action) => {
      state.detail = action.payload;
    });
    builder.addCase(getDriverDetails.fulfilled, (state, action) => {
      state.detail = action.payload;
    });
  },
});

export const {
  resetStateDrivers,
  resetDetailDriver,
  setDetailDriver,
  changeFilterDrivers,
  setDialogCosts,
} = deliveriesDriverSlice.actions;

export default deliveriesDriverSlice;
