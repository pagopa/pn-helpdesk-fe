import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { virtualKey, searchApikeyResponse } from '../api/apiRequestTypes';
import { RootState } from './store';

export interface virtualKeysState {
    virtualKeys: Array<virtualKey>,
    filters: {
        name: string
    }
}
const initialState: virtualKeysState = {
    virtualKeys: [],
    filters: {
        name: ""
    }
}
export const virtualKeysSlice = createSlice({
    name: 'virtualkey',
    initialState,
    reducers: {
        resetState: () => initialState,
        setVirtualKeys: (state, action: PayloadAction<searchApikeyResponse>) => {
            state.virtualKeys = action.payload.items;
        }
    }
})

export default virtualKeysSlice;

export const VirtualKeySelector = (state: RootState) => state.virtualkey.virtualKeys

export const { setVirtualKeys } = virtualKeysSlice.actions