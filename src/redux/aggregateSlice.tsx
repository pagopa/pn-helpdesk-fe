import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AggregateSummary, GetAggregateParams, GetAggregateResponse } from '../types'
import type { RootState } from './store'

interface KeyPage {
    lastEvaluatedId: string,
    lastEvaluatedName: string
}

export interface AggregateState {
    aggregates: Array<AggregateSummary>,
    filters: {
        name: string
    },
    pagination: {
        limit: number,
        page: number,
        total: number,
        pagesKey: Array<KeyPage>
    }
}

const initialState : AggregateState = {
    aggregates : [],
    filters : {
        name : ""
    },
    pagination : {
        limit : 10,
        page: 0,
        total: 0,
        pagesKey: []
    }
}

export const aggregateSlice = createSlice({
    name: 'aggregate',
    initialState,
    reducers: {
        resetState: () => initialState,
        setPagination: (state, action: PayloadAction<{page: number; limit: number}>) => {
            //Reset pagination
            if(action.payload.limit !== state.pagination.limit) {
                state.pagination.pagesKey = [];
                state.pagination.page = 0;
            }

            state.pagination.limit = action.payload.limit;
            state.pagination.page = action.payload.page;
        },
        setFilters: (state, action: PayloadAction<GetAggregateParams>) => {
            state.filters.name = action.payload.name!;
            // reset pagination
            state.pagination.page = 0;
            state.pagination.pagesKey = [];
        },
        setAggregates: (state, action: PayloadAction<GetAggregateResponse>) => {
            state.aggregates = action.payload.items;
            state.pagination.total = action.payload.total;

            //Add keys in pagesKey if not already stored.
            const { lastEvaluatedId, lastEvaluatedName } = action.payload;
            if (state.pagination.pagesKey.findIndex(pageKey => lastEvaluatedId === pageKey.lastEvaluatedId) === -1) {
                state.pagination.pagesKey.push({
                    lastEvaluatedId,
                    lastEvaluatedName
                });
            }
        }
    }
})

export const paginationSelector = (state: RootState) => state.aggregate.pagination;

export const filtersSelector = (state: RootState) => state.aggregate.filters;

export const aggregatesSelector = (state: RootState) => state.aggregate.aggregates;

export const { setPagination, setFilters, resetState, setAggregates } = aggregateSlice.actions

export default aggregateSlice.reducer;
  