import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface SnackbarState {
  opened: boolean;
  statusCode: any;
  message: string;
}

const initialState: SnackbarState = {
  opened: false,
  statusCode: undefined,
  message: "",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    resetState: () => initialState,
    updateSnackbacrOpened: (state, action: PayloadAction<boolean>) => {
      state.opened = action.payload;
    },
    updateStatusCode: (state, action: PayloadAction<any>) => {
      state.statusCode = action.payload;
    },
    updateMessage: (state, action: PayloadAction<any>) => {
      state.message = action.payload;
    },
  },
});

export const {
  updateSnackbacrOpened,
  updateStatusCode,
  updateMessage,
  resetState,
} = snackbarSlice.actions;

export const opened = (state: RootState) => state.snackbar.opened;

export const statusCode = (state: RootState) => state.snackbar.statusCode;

export const message = (state: RootState) => state.snackbar.message;

export default snackbarSlice.reducer;
