import {createAsyncThunk} from "@reduxjs/toolkit";
import {FilterRequest, Page, Tender} from "../../model";
import {apiPaperChannel} from "../../api/paperChannelApi";

export enum TENDER_ACTIONS {
  GET_TENDERS = 'getTenders',
}


export const getTenders = createAsyncThunk<
  Page<Tender>,
  FilterRequest
>(
  TENDER_ACTIONS.GET_TENDERS,
  async (filter:FilterRequest, thunkAPI) => {

    try {
      const response = await apiPaperChannel().takeTender(filter.page, filter.tot);
      const page: Page<Tender> ={
        total: (response.data.totalElements) ? response.data.totalElements  : 0,
        size: response.data.size ?  response.data.size : 0,
        page: response.data.number ? response.data.number : 0,
        content: response.data.content ? response.data.content.map(item => item as Tender) : []
      }
      return page;
    } catch (e){
      return thunkAPI.rejectWithValue(e);
    }
  }
)
