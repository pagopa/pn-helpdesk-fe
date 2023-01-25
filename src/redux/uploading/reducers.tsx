import {createSlice} from "@reduxjs/toolkit";

interface DownloadingState {
  uid ?: string,
  url ?: string
  loading: boolean
}

interface UploadingState {
  presignedUrl ?: string
  loading: boolean
}

const initialState = {
  download : {
    loading: false
  } as DownloadingState,
  upload: {
    loading: false
  } as UploadingState
}



const uploadingDownloadingSlice = createSlice({
  name: 'uploadingDownloadingSlice',
  initialState,
  reducers : {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
  }
})

export default uploadingDownloadingSlice;