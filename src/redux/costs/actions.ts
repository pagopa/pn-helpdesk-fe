import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilterRequest, Page } from '../../model';
import { apiPaperChannel } from '../../api/paperChannelApi';
import * as snackbarActions from '../snackbarSlice';
import { CostDTO, PageableCostResponseDto } from '../../api/paperChannel';

export const getCosts = createAsyncThunk<Page<CostDTO>, FilterRequest>(
  'getCosts',
  async (request: FilterRequest, thunkAPI) => {
    try {
      const response = await apiPaperChannel().getAllCostOfDriverAndTender(
        request!.tenderCode as string,
        request!.driverCode as string,
        request.page,
        request.tot
      );
      const fromResponse: PageableCostResponseDto = response.data;
      return {
        page: fromResponse.number,
        total: fromResponse.totalElements,
        size: fromResponse.size,
        content: fromResponse.content,
      } as Page<CostDTO>;
    } catch (e) {
      thunkAPI.dispatch(snackbarActions.updateSnackbacrOpened(true));
      thunkAPI.dispatch(snackbarActions.updateStatusCode(400));
      thunkAPI.dispatch(snackbarActions.updateMessage('Errore con dei costi'));
      return thunkAPI.rejectWithValue(e);
    }
  }
);
