import {DeliveryDriver, Tender} from "../../model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface SavingState {
  loading: boolean,
  uid ?: false,
  retry ?: number
  result: "HANDLE" | "PROGRESS" | "SAVED" | "ERROR"
}

interface FormState<T> {
  loading: boolean,
  error: boolean,
  value : T | undefined
}

const initialState = {
  activeKey: 0 as number,

  fromUpload: false,

  formTender: {
    loading: false,
    error: false,
    value: undefined
  } as FormState<Tender>,


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
      if (state.formTender.value !== undefined){
        state.activeKey = 2;
        state.fromUpload = true
      }
    },
    goFSUStep: (state) => {
      if (state.formTender.value !== undefined){
        state.activeKey = 1;
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
      state.formTender.value = action.payload
    },
    addedFSU: (state, action:PayloadAction<DeliveryDriver>) => {
      state.formFsu = action.payload
    }
  },
  extraReducers: (builder) => {
  }
})

export const {clearFormState, goUploadStep, goFSUStep,changeKey, backStep, addedTender, addedFSU} = formTenderSlice.actions;

export default formTenderSlice;