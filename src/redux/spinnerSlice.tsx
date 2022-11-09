import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface SpinnerState {
  opened: boolean;
}

const initialState: SpinnerState = {
  opened: false,
};
/* istanbul ignore next */
export const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    updateSpinnerOpened: (state, action: PayloadAction<boolean>) => {
      return { ...state, opened: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase("snackbar/resetState", () => initialState);
  },
});

// Action creators are generated for each case reducer function
export const { updateSpinnerOpened } = spinnerSlice.actions;

export const opened = (state: RootState) => state.spinner.opened;

export default spinnerSlice.reducer;
