import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./snackbarSlice";
import responseReducer from "./responseSlice";
import spinnerReducer from "./spinnerSlice";
import aggregateReducer from './aggregateSlice';
import tenderSlice from "./tender/reducers";
import formTenderSlice from "./formTender/reducers";
import uploadingDownloadingSlice from "./uploading/reducers";
import deliveriesDriverSlice from "./deliveriesDrivers/reducers";
import costSlice from "./costs/reducers";
import usageEstimateSlice from "./usageEstimates/reducers";
import reportEstimateSlice from "./report/reducers";


export const store = configureStore({
  reducer: {
    response: responseReducer,
    snackbar: snackbarReducer,
    spinner: spinnerReducer,
    tender: tenderSlice.reducer,
    tenderForm: formTenderSlice.reducer,
    uploadAndDownload: uploadingDownloadingSlice.reducer,
    deliveries: deliveriesDriverSlice.reducer,
    costs: costSlice.reducer,
    aggregate: aggregateReducer,
    usageEstimate: usageEstimateSlice.reducer,
    reportEstimate: reportEstimateSlice.reducer,
  },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
