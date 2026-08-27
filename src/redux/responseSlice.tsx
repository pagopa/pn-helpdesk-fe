import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { emptyNotification, NotificationDataModel } from '../model/notification';
import type { RootState } from './store';

export interface ResponseState {
  opened: boolean;
  responseData: object;
  notificationData: NotificationDataModel;
}


const initialState: ResponseState = {
  opened: false,
  responseData: {},
  notificationData: emptyNotification,
};

export const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    resetState: () => initialState,
    updateResponseOpened: (state, action: PayloadAction<boolean>) => {
      state.opened = action.payload;
    },
    updateResponseData: (state, action: PayloadAction<object>) => {
      state.responseData = action.payload;
    },
    updateNotificationData: (state, action: PayloadAction<NotificationDataModel>) => {
      state.notificationData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase('snackbar/resetState', () => initialState);
  },
});

// Action creators are generated for each case reducer function
export const { updateResponseOpened, updateResponseData, resetState, updateNotificationData } = responseSlice.actions;

export const opened = (state: RootState) => state.response.opened;

export const responseData = (state: RootState) => state.response.responseData;

export const responseNotificationData = (state: RootState) => state.response.notificationData;

export default responseSlice.reducer;
