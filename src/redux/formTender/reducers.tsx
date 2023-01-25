import {Tender} from "../../model";
import {createSlice} from "@reduxjs/toolkit";


const initialState = {
  activeKey: 0 as number,

  formTender: {} as Tender
}



const formTenderSlice = createSlice({
  name: 'formTenderSlice',
  initialState,
  reducers : {
    resetState: () => initialState,
    changeKey: (state, action) => {
      state.activeKey = action.payload.key;
    },
    addedTender:(state, action) => {
      state.formTender = action.payload.data
      state.activeKey = action.payload.key
    }
  },
  extraReducers: (builder) => {
  }
})

export const {changeKey, addedTender} = formTenderSlice.actions;

export default formTenderSlice;