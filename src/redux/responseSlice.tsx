import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface ResponseState {
  opened: boolean;
  responseData: {};
}

const initialState: ResponseState = {
  opened: false,
  responseData: {},
};

export const responseSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    updateResponseOpened: (state, action: PayloadAction<boolean>) => {
      state.opened = action.payload;
    },
    updateResponseData: (state, action: PayloadAction<{}>) => {
      state.responseData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("snackbar/resetState", () => initialState);
  },
});

// Action creators are generated for each case reducer function
export const { updateResponseOpened, updateResponseData } =
  responseSlice.actions;

export const opened = (state: RootState) => state.response.opened;

export const responseData = (state: RootState) => state.response.responseData;

export default responseSlice.reducer;
