import {createSlice} from "@reduxjs/toolkit";
import {getFile, getPresignedUrl, uploadFile} from "./actions";
import {UPLOAD_STATUS_ENUM} from "../../model";

interface DownloadingState {
  uid ?: string,
  data ?: string
  loading: boolean
  retry ?: number
}

interface UploadingState {
  presignedUrl ?: string
  uid ?: string
  loading: boolean
  status: UPLOAD_STATUS_ENUM
  error?: string
}

const initialState = {
  download : {
    loading: false
  } as DownloadingState,
  upload: {
    loading: false,
    error: undefined,
    status: UPLOAD_STATUS_ENUM.WAITING_FILE
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
      state.download.data = action.payload.data;
      state.download.uid = action.payload.uid;
      state.download.loading = action.payload.loading;
    })
    builder.addCase(getFile.rejected, (state, action) => {
      console.error(action.payload);
      state.download.loading = false;
    });

    builder.addCase(getPresignedUrl.pending, (state, action) => {
      state.upload.loading = true
      state.upload.status = UPLOAD_STATUS_ENUM.RETRIEVING_PRESIGNED_URL
    });
    builder.addCase(getPresignedUrl.fulfilled, (state, action) => {
      state.upload.presignedUrl = action.payload.url;
      state.upload.uid = action.payload.uid;
      state.upload.status = UPLOAD_STATUS_ENUM.RETRIEVED_PRESIGNED_URL
    });
    builder.addCase(getPresignedUrl.rejected, (state, action) => {
      state.upload.status = UPLOAD_STATUS_ENUM.ERROR_PRESIGNED_URL
      state.upload.loading = false;
      state.upload.error = "Error";
    });

    builder.addCase(uploadFile.pending, (state, action) => {
      state.upload.status = UPLOAD_STATUS_ENUM.UPLOADING_FILE_S3
      state.upload.loading = true
      state.upload.error = undefined;
    });
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.upload.status = UPLOAD_STATUS_ENUM.UPLOADED_FILE_S3
      state.upload.loading = false
    })
    builder.addCase(uploadFile.rejected, (state, action) => {
      state.upload.status = UPLOAD_STATUS_ENUM.ERROR_UPLOADING_FILE_S3
      state.upload.loading = false;
      state.upload.error = "Error with upload s3";
    })
  }
})

export const {resetStateUpload} = uploadingDownloadingSlice.actions;

export default uploadingDownloadingSlice;