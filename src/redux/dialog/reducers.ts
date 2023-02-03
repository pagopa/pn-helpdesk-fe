import {createSlice} from "@reduxjs/toolkit";
import {TYPE_DIALOG} from "../../components/dialogs";

interface Extra {
  title: string,
  message: string
}

interface State {
  open: boolean,
  type ?: TYPE_DIALOG,
  extra ?: Extra
}

const initialState:State = {
  open: false,
  type: undefined,
  extra: undefined
}

export const dialogSlice = createSlice({
  name: "dialogSlice",
  initialState,
  reducers: {
    resetState: () => initialState,
    showDialog: (state, action) => {
      state.open = true;
      state.extra = action.payload.extra
      state.type = action.payload.type
    }
  },
  extraReducers: (builder) => {
    builder.addCase("snackbar/resetState", () => initialState);
  },
});


export const {resetState, showDialog} = dialogSlice.actions

export default dialogSlice.reducer;