import {DeliveryDriver, Tender} from "../../model";
import {createSlice} from "@reduxjs/toolkit";


const initialState = {
  activeKey: 0 as number,
  fromUpload: false,
  formTender: {} as Tender,
  formFsu: {} as DeliveryDriver
}



const formTenderSlice = createSlice({
  name: 'formTenderSlice',
  initialState,
  reducers : {
    clearFormState: () => initialState,
    changeKey: (state, action) => {
      state.activeKey = action.payload.key;
    },
    backStep: (state, action) => {
      state.activeKey = (state.activeKey > 0) ? state.activeKey-1 : 0
    },
    addedTender:(state, action) => {
      state.formTender = action.payload.data
      state.activeKey = action.payload.key
      state.fromUpload = action.payload.fromUpload
    },
    addedFSU: (state, action) => {
      state.formFsu = action.payload.data
      state.activeKey = state.activeKey+1
    }
  },
  extraReducers: (builder) => {
  }
})

export const {clearFormState, changeKey, backStep, addedTender, addedFSU} = formTenderSlice.actions;

export default formTenderSlice;