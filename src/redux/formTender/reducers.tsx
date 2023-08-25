import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeliveryDriver, Tender } from '../../model';

interface SavingState {
  loading: boolean;
  uid?: false;
  retry?: number;
  result: 'HANDLE' | 'PROGRESS' | 'SAVED' | 'ERROR';
}

const initialState = {
  activeKey: 0 as number,

  fromUpload: false,

  formTender: {} as Tender,

  formFsu: {} as DeliveryDriver,

  saveWithFile: {
    loading: false,
    result: 'HANDLE',
  } as SavingState,
};

const formTenderSlice = createSlice({
  name: 'formTenderSlice',
  initialState,
  reducers: {
    clearFormState: () => initialState,
    goUploadStep: (state) => {
      if (state.formTender?.code) {
        state.activeKey = 2;
        state.fromUpload = true;
      }
    },
    goFSUStep: (state) => {
      if (state.formTender?.code) {
        state.activeKey = 1;
        state.fromUpload = false;
      }
    },
    goTenderDriversStep: (state) => {
      if (state.formTender?.code && state.formFsu?.taxId) {
        state.activeKey = 2;
        state.fromUpload = false;
      }
      if (state.formTender?.code && state.fromUpload) {
        state.activeKey = 2;
        state.fromUpload = true;
      }
    },
    goFinalStep: (state) => {
      state.activeKey = 3;
    },
    changeKey: (state, action) => {
      state.activeKey = action.payload.key;
    },
    backStep: (state) => {
      state.activeKey = state.activeKey > 0 ? state.activeKey - 1 : 0;
    },
    addedTender: (state, action: PayloadAction<Tender>) => {
      state.formTender = action.payload;
    },
    addedFSU: (state, action: PayloadAction<DeliveryDriver>) => {
      state.formFsu = action.payload;
    },
  },
});

export const {
  clearFormState,
  goUploadStep,
  goFSUStep,
  goTenderDriversStep,
  changeKey,
  backStep,
  addedTender,
  addedFSU,
  goFinalStep,
} = formTenderSlice.actions;

export default formTenderSlice;
