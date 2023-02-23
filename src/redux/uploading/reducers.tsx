import {createSlice} from "@reduxjs/toolkit";
import {getFile, getPresignedUrl, notifyFileUpload, uploadFile} from "./actions";
import {ErrorsNotify, UPLOAD_STATUS_ENUM} from "../../model";

interface DownloadingState {
  uid ?: string,
  data ?: string
  loading: boolean
  retry ?: number
  error: boolean,
  force:boolean
}

interface UploadingState {
  presignedUrl ?: string
  uid ?: string
  loading: boolean
  status: UPLOAD_STATUS_ENUM
  retry: number | undefined
  error: string | ErrorsNotify | undefined,
  attemptNotify: number
}

const initialState = {
  download : {
    loading: false,
    error:false,
    force: false,
  } as DownloadingState,
  upload: {
    loading: false,
    error: undefined,
    status: UPLOAD_STATUS_ENUM.WAITING_FILE,
    attemptNotify: 0
  } as UploadingState
}



const uploadingDownloadingSlice = createSlice({
  name: 'uploadingDownloadingSlice',
  initialState,
  reducers : {
    resetState: () => initialState,
    resetStateUpload: (state) => {
      state.upload = initialState.upload
    },
    resetStateDownload: (state) => {
      state.download = initialState.download
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFile.pending, (state, action) => {
      state.download.loading = true
      state.download.error= false
    });
    builder.addCase(getFile.fulfilled, (state, action) => {
      state.download.retry = action.payload.retry;
      state.download.data = action.payload.data;
      state.download.uid = action.payload.uid;
      state.download.loading = action.payload.loading;
      state.download.error = false
      state.download.force = !state.download.force;
    })
    builder.addCase(getFile.rejected, (state, action) => {
      state.download.loading = false;
      state.download.error = true;
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

    builder.addCase(notifyFileUpload.pending, (state, action) => {
      state.upload.status = UPLOAD_STATUS_ENUM.NOTIFY_IN_PROGRESS
      state.upload.loading = true
      state.upload.error = undefined;
    });
    builder.addCase(notifyFileUpload.fulfilled, (state, action) => {
      state.upload.status = (action.payload.status === "IN_PROGRESS") ? UPLOAD_STATUS_ENUM.NOTIFY_IN_PROGRESS :
                            (action.payload.status === "COMPLETE") ? UPLOAD_STATUS_ENUM.DATA_SAVED : UPLOAD_STATUS_ENUM.ERROR_VALIDATION_EXCEL
      state.upload.loading = (action.payload.status === "IN_PROGRESS")
      state.upload.retry = action.payload.retry
      state.upload.uid = action.payload.uid
      state.upload.attemptNotify = state.upload.attemptNotify+1
    })
    builder.addCase(notifyFileUpload.rejected, (state, action) => {
      state.upload.status = UPLOAD_STATUS_ENUM.ERROR_VALIDATION_EXCEL
      state.upload.loading = false;
      state.upload.error = action.payload as ErrorsNotify;
    })
  }
})

export const {resetStateUpload, resetStateDownload} = uploadingDownloadingSlice.actions;

export default uploadingDownloadingSlice;