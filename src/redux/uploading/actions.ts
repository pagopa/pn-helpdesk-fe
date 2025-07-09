import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { apiPaperChannel } from '../../api/paperChannelApi';
import { apiUpload } from '../../api/apiUpload';
import { NotifyUploadRequestDto } from '../../api/paperChannel/';
import * as snackbarActions from '../snackbarSlice';
import { ErrorsNotify } from '../../model';

export enum DOWNLOAD_UPLOAD_ACTIONS {
  GET_FILE = 'getFile',
  GET_PRESIGNED_URL = 'getPresignedUrl',
  UPLOAD_FILE = 'uploadFile',
  NOTIFY_FILE_UPLOAD = 'notifyFileUpload',
}

interface DownloadResponse {
  data?: string;
  uid?: string;
  retry?: number;
  loading: boolean;
}

interface DownloadRequest {
  tenderCode?: string;
  uid?: string;
}
interface PresignedUrlResponse {
  url: string;
  uid: string;
}

export const getFile = createAsyncThunk<DownloadResponse, DownloadRequest>(
  DOWNLOAD_UPLOAD_ACTIONS.GET_FILE,
  async (request: DownloadRequest, thunkAPI) => {
    try {
      const response = await apiPaperChannel().downloadTenderFile(request.tenderCode, request.uid);
      if (response?.data?.status) {
        if (response.data.status === 'UPLOADING') {
          return {
            uid: response.data?.uuid,
            retry: response.data?.retryAfter,
            url: undefined,
            loading: true,
          };
        } else if (response.data.status === 'UPLOADED') {
          return {
            uid: response.data?.uuid,
            data: response.data?.data,
            retry: undefined,
            loading: false,
          };
        }
      }
      return {
        retry: undefined,
        uid: undefined,
        url: undefined,
        loading: false,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getPresignedUrl = createAsyncThunk<PresignedUrlResponse, object>(
  DOWNLOAD_UPLOAD_ACTIONS.GET_PRESIGNED_URL,
  async (_, thunkAPI) => {
    try {
      const response = await apiPaperChannel().addTenderFromFile();
      return {
        url: response.data.presignedUrl,
        uid: response.data.uuid,
      } as PresignedUrlResponse;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

interface UploadFileRequest {
  url: string;
  file: File;
  sha: string;
}

export const uploadFile = createAsyncThunk<object, UploadFileRequest>(
  DOWNLOAD_UPLOAD_ACTIONS.UPLOAD_FILE,
  async (request, thunkAPI) => {
    try {
      await apiUpload(request.url, request.file, request.sha);
      return {};
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

interface NotifyFileRequest {
  tenderCode: string;
  uid: string | undefined;
}

interface NotifyFileResponse {
  retry: number | undefined;
  uid: string | undefined;
  status: 'IN_PROGRESS' | 'COMPLETE' | 'ERROR';
}

export const notifyFileUpload = createAsyncThunk<NotifyFileResponse, NotifyFileRequest>(
  DOWNLOAD_UPLOAD_ACTIONS.NOTIFY_FILE_UPLOAD,
  async (request, thunkAPI) => {
    try {
      const modelRequest: NotifyUploadRequestDto = {
        uuid: request.uid,
      };
      const response = await apiPaperChannel().notifyUpload(request.tenderCode, modelRequest);
      return {
        retry: response.data.retryAfter,
        uid: response.data.uuid,
        status: response.data.status,
      } as NotifyFileResponse;
    } catch (e) {
      const error = {
        detail: "Errore durante l'elaborazione del file excel",
        errors: [],
      } as ErrorsNotify;

      if (e instanceof AxiosError) {
        if (e.response?.data.detail) {
          error.detail = e.response.data.detail;
        }
        if (e.response?.data?.errors && e.response.data.errors instanceof Array) {
          error.errors = e.response.data.errors.map((item: any) => ({
            col: item.detail as string,
            row: item.code as string,
            message: item.element as string,
          }));
        }
      }
      thunkAPI.dispatch(snackbarActions.updateSnackbarOpened(true));
      thunkAPI.dispatch(snackbarActions.updateStatusCode(400));
      thunkAPI.dispatch(
        snackbarActions.updateMessage("Errore durante l'elaborazione del file Excel")
      );
      return thunkAPI.rejectWithValue(error);
    }
  }
);
