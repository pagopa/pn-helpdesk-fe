import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiPaperChannel} from "../../api/paperChannelApi";
import {apiUpload} from "../../api/apiUpload";


export enum DOWNLOAD_UPLOAD_ACTIONS {
  GET_FILE = 'getFile',
  GET_PRESIGNED_URL = 'getPresignedUrl',
  UPLOAD_FILE = 'uploadFile'
}

interface DownloadResponse {
  code?: number
  data ?:string,
  uid ?: string,
  retry ?: number,
  loading: boolean,
}

interface DownloadRequest {
  tenderCode ?: string,
  uid?: string
}
interface PresignedUrlResponse {
  url: string,
  uid: string,
}

export const getFile = createAsyncThunk<
  DownloadResponse,
  DownloadRequest
>(
  DOWNLOAD_UPLOAD_ACTIONS.GET_FILE,
  async (request:DownloadRequest, thunkAPI) => {
    try {
      const response = await apiPaperChannel().downloadTenderFile(request.tenderCode, request.uid);
      if (response?.data?.status){
        if (response.data.status === "UPLOADING") {
          return {
            code: Math.random(),
            uid: response.data?.uuid,
            retry: response.data?.retryAfter,
            url: undefined,
            loading: true
          }
        } else if (response.data.status === "UPLOADED"){
          return {
            code: Math.random(),
            uid: response.data?.uuid,
            data: response.data?.data,
            retry: undefined,
            loading:false
          }
        }
      }
      return {
        retry: undefined,
        uid: undefined,
        url: undefined,
        loading:false
      };
    } catch (e){
      return thunkAPI.rejectWithValue(e);
    }
  }
)

export const getPresignedUrl = createAsyncThunk<
  PresignedUrlResponse,
  Object
>(
  DOWNLOAD_UPLOAD_ACTIONS.GET_PRESIGNED_URL,
  async (_, thunkAPI) => {
    try {
      const response = await apiPaperChannel().addTenderFromFile();
      return {
        url: response.data.presignedUrl,
        uid: response.data.uuid
      } as PresignedUrlResponse
    } catch (e){
      return thunkAPI.rejectWithValue(e);
    }
  }
)

interface UploadFileRequest{
  url: string,
  file: File,
}

interface UploadFileResponse {

}

export const uploadFile = createAsyncThunk<
  UploadFileResponse,
  UploadFileRequest
>(
  DOWNLOAD_UPLOAD_ACTIONS.UPLOAD_FILE,
  async (request, thunkAPI) => {
    try {
      await apiUpload(request.url, request.file);
      return {}
    } catch (e){
      return thunkAPI.rejectWithValue(e);
    }
  }
)