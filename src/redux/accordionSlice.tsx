import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AccordionState = {
    expanded: Record<string, boolean>;
};

const initialState: AccordionState = {
    expanded: {},
};

const accordionSlice = createSlice({
    name: 'accordion',
    initialState,
    reducers: {
        toggleSingle: (state, action: PayloadAction<string>) => {
            state.expanded[action.payload] = !state.expanded[action.payload];
        },
        expandAll: (state, action: PayloadAction<Array<string>>) => {
            action.payload.forEach(key => { state.expanded[key] = true; });
        },
        collapseAll: (state, action: PayloadAction<Array<string>>) => {
            action.payload.forEach(key => { state.expanded[key] = false; });
        },
    },
});

export const { toggleSingle, expandAll, collapseAll } = accordionSlice.actions;
export const selectExpanded = (state: any) => state.accordion.expanded;
export default accordionSlice.reducer;