import { createSlice } from "@reduxjs/toolkit";

export const selectCellSlice = createSlice({
    name: "select-cell",
    initialState: {
        activeCell: "A1",
        selectedCells: []
    },
    reducers: {
        selectCell: (state: any, action) => (
            { ...state, ...action.payload }
        )
    }
});

export const { selectCell } = selectCellSlice.actions;

export default selectCellSlice.reducer;