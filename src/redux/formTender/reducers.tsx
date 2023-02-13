import {DeliveryDriver, Tender} from "../../model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface SavingState {
  loading: boolean,
  uid ?: false,
  retry ?: number
  result: "HANDLE" | "PROGRESS" | "SAVED" | "ERROR"
}

const initialState = {
  activeKey: 0 as number,

  fromUpload: false,

  formTender: {} as Tender,


  formFsu: {} as DeliveryDriver,

  saving: {
    loading: false,
    result: "HANDLE"
  } as SavingState
}


const formTenderSlice = createSlice({
  name: 'formTenderSlice',
  initialState,
  reducers : {
    clearFormState: () => initialState,
    goUploadStep: (state) => {
      if (state.formTender?.code ){
        state.activeKey = 2;
        state.fromUpload = true
      }
    },
    goFSUStep: (state) => {
      if (state.formTender?.code){
        state.activeKey = 1;
        state.fromUpload = false
      }
    },
    goTenderDriversStep: (state) => {
      if (state.formTender?.code && state.formFsu?.uniqueCode){
        state.activeKey = 2;
        state.fromUpload = false
      }
    },
    changeKey: (state, action) => {
      state.activeKey = action.payload.key;
    },
    backStep: (state) => {
      state.activeKey = (state.activeKey > 0) ? state.activeKey-1 : 0
    },
    addedTender:(state, action:PayloadAction<Tender>) => {
      state.formTender = action.payload
    },
    addedFSU: (state, action:PayloadAction<DeliveryDriver>) => {
      state.formFsu = action.payload
    }
  }
})

export const {clearFormState, goUploadStep, goFSUStep, goTenderDriversStep, changeKey, backStep, addedTender, addedFSU} = formTenderSlice.actions;

export default formTenderSlice;