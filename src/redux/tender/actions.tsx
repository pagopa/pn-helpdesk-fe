import {createAsyncThunk} from "@reduxjs/toolkit";
import {FilterRequest, Page} from "../../model";
import {apiPaperChannel} from "../../api/paperChannelApi";
import {TenderDTO} from "../../generated";

export enum TENDER_ACTIONS {
  GET_TENDERS = 'getTenders',
}

export const getTenders = createAsyncThunk<
  Page<TenderDTO>,
  FilterRequest
>(
  TENDER_ACTIONS.GET_TENDERS,
  async (filter:FilterRequest, thunkAPI) => {
    try {
      const response = await apiPaperChannel().takeTender(filter.page, filter.tot);
      const page: Page<TenderDTO> ={
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