import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getFile, getPresignedUrl} from "./actions";

interface DownloadingState {
  uid ?: string,
  url ?: string
  loading: boolean
  retry ?: number
}

interface UploadingState {
  presignedUrl ?: string
  uid ?: string
  loading: boolean
  error?: string
}

const initialState = {
  download : {
    loading: false
  } as DownloadingState,
  upload: {
    loading: false,
    error: undefined
  } as UploadingState
}



const uploadingDownloadingSlice = createSlice({
  name: 'uploadingDownloadingSlice',
  initialState,
  reducers : {
    resetState: () => initialState,
    resetStateUpload: (state) => {
      state.upload = initialState.upload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFile.pending, (state, action) => {
      state.download.loading = true
    });
    builder.addCase(getFile.fulfilled, (state, action) => {
      state.download.retry = action.payload.retry;
      state.download.url = action.payload.url;
      state.download.uid = action.payload.uid;
      state.download.loading = !!(action.payload.retry && action.payload.uid);
    })
    builder.addCase(getFile.rejected, (state, action) => {
      console.error(action.payload);
      state.download.loading = false;
    });

    builder.addCase(getPresignedUrl.pending, (state, action) => {
      state.upload.loading = true
      state.upload.error = undefined;
    });
    builder.addCase(getPresignedUrl.fulfilled, (state, action) => {
      state.upload.presignedUrl = action.payload.url;
      state.upload.uid = action.payload.uid;
    })
    builder.addCase(getPresignedUrl.rejected, (state, action) => {
      console.error(action.payload);
      state.upload.loading = false;
      state.upload.error = "Error";
    })
  }
})

export const {resetStateUpload} = uploadingDownloadingSlice.actions;

export default uploadingDownloadingSlice;