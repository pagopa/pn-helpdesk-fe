import {createAsyncThunk} from "@reduxjs/toolkit";
import {DeliveryDriverDto, TenderCreateRequestDTO, TenderUploadRequestDto} from "../../generated";
import {apiPaperChannel} from "../../api/paperChannelApi";
import {DeliveryDriver, Tender} from "../../model";


export enum FORM_TENDER_ACTIONS {
  SAVED_WITH_EXCEL = 'saveWithExcel',
  CREATE_TENDER = 'createTender',
  CREATE_DELIVERY_DRIVER = 'createDeliveryDriver'
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
      //const response = await apiPaperChannel().notifyUpload(body);

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


export const createTender = createAsyncThunk<
  Tender,
  Tender
>(
  FORM_TENDER_ACTIONS.CREATE_TENDER,
  async (body:Tender, thunkAPI) => {
    try {
      const request = {
        name: body.description,
        startDate: body.startDate,
        endDate: body.endDate,
        code: body.code,
      } as TenderCreateRequestDTO
      const response = await apiPaperChannel().createUpdateTender(request);
      return {
        code: response.data.tender?.code,
        description: response.data.tender?.name || "",
        startDate: response.data.tender?.startDate || "",
        endDate: response.data.tender?.endDate || ""
      } as Tender
    } catch (e){
      return thunkAPI.rejectWithValue(e);
    }
  }
)


interface DeliveryDriverRequest {
  tenderCode: string,
  body: DeliveryDriver
}
export const createDeliveryDriver = createAsyncThunk<
  DeliveryDriver,
  DeliveryDriverRequest
>(
  FORM_TENDER_ACTIONS.CREATE_DELIVERY_DRIVER,
  async (data:DeliveryDriverRequest, thunkAPI) => {
    try {
      const request = {
        ...data.body,
      } as DeliveryDriverDto
      await apiPaperChannel().createUpdateDriver(data.tenderCode, request);
      return data.body;
    } catch (e){
      return thunkAPI.rejectWithValue(e);
    }
  }
)