import {createAsyncThunk} from "@reduxjs/toolkit";
import {TenderUploadRequestDto} from "../../generated";
import {apiPaperChannel} from "../../api/paperChannelApi";


export enum FORM_TENDER_ACTIONS {
  SAVED_WITH_EXCEL = 'saveWithExcel',
}

interface NotifyResponseDTO {
  uuid: string,
  status: "IN_PROGRESS" | "COMPLETE",
  retryAfter ?: number
}

export const saveWithExcel = createAsyncThunk<
  NotifyResponseDTO,
  TenderUploadRequestDto
>(
  FORM_TENDER_ACTIONS.SAVED_WITH_EXCEL,
  async (body:TenderUploadRequestDto, thunkAPI) => {
    try {
      const response = await apiPaperChannel().notifyUpload(body);

      return {
        uuid: "pi22233edddss",
        status: "IN_PROGRESS",
        retryAfter: 1000
      }
    } catch (e){
      return thunkAPI.rejectWithValue(e);
    }
  }
)