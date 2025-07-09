import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface SnackbarState {
  opened: boolean;
  statusCode: number | undefined;
  message: string;
  autoHideDuration: number | null;
}

const initialState: SnackbarState = {
  opened: false,
  statusCode: undefined,
  message: '',
  autoHideDuration: 5000,
};
/* istanbul ignore next */
export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    resetState: () => initialState,
    updateSnackbarOpened: (state, action: PayloadAction<boolean>) => {
      state.opened = action.payload;
      // reset initial state after each closure
      if (!action.payload) {
        state.message = initialState.message;
        state.statusCode = initialState.statusCode;
        state.autoHideDuration = initialState.autoHideDuration;
      }
    },
    updateStatusCode: (state, action: PayloadAction<any>) => {
      state.statusCode = action.payload;
    },
    updateMessage: (state, action: PayloadAction<any>) => {
      state.message = action.payload;
    },
    updateAutoHideDuration: (state, action: PayloadAction<number | null>) => {
      state.autoHideDuration = action.payload;
    },
  },
});

export const {
  updateSnackbarOpened,
  updateStatusCode,
  updateMessage,
  resetState,
  updateAutoHideDuration,
} = snackbarSlice.actions;

export const opened = (state: RootState) => state.snackbar.opened;

export const statusCode = (state: RootState) => state.snackbar.statusCode;

export const message = (state: RootState) => state.snackbar.message;

export const autoHideDuration = (state: RootState) => state.snackbar.autoHideDuration;

export default snackbarSlice.reducer;
