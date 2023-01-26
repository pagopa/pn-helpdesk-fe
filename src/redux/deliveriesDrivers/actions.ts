import {createAsyncThunk} from "@reduxjs/toolkit";
import {FilterRequest, Page} from "../../model";
import {DeliveryDriverDto} from "../../generated";
import {apiPaperChannel} from "../../api/paperChannelApi";

export enum DELIVERY_DRIVERS_ACTIONS {
  GET_ALL_FROM_TENDER = 'getDeliveryFromTender',
}

export const getAllDrivers = createAsyncThunk<
  Page<DeliveryDriverDto>,
  FilterRequest
>(
  DELIVERY_DRIVERS_ACTIONS.GET_ALL_FROM_TENDER,
  async (filter:FilterRequest, thunkAPI) => {
    try {
      const response = await apiPaperChannel().takeDeliveriesDrivers(filter.tenderCode || "", filter.page, filter.tot);
      const page: Page<DeliveryDriverDto> ={
        total: (response.data.totalElements) ? response.data.totalElements  : 0,
        size: response.data.size ?  response.data.size : 0,
        page: response.data.number ? response.data.number : 0,
        content: response.data.content ? response.data.content : []
      }
      return page;
    } catch (e){
      return thunkAPI.rejectWithValue(e);
    }
  }
)