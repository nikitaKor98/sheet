import { createSlice } from '@reduxjs/toolkit'

export const tableSlice = createSlice({
    name: "table",
    initialState: {
        cells: {},
        columns: {},
        rows: {}
    },
    reducers: {
        updateCell: (state: any, action) => ({
            ...state,
            cells: { ...state.cells, ...action.payload },
        }),
        updateColumns: (state: any, action) => ({
            ...state,
            columns: { ...state.columns, ...action.payload },
        }),
        updateRows: (state: any, action) => ({
            ...state,
            rows: { ...state.rows, ...action.payload },
        }),
    }
});

export const { updateCell, updateColumns, updateRows } = tableSlice.actions;

export default tableSlice.reducer;