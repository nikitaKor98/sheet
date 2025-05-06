import { configureStore } from '@reduxjs/toolkit';
import selectCellReducer from 'features/selectCell/selectCellSlice';
import tableReducer from 'features/table/tableSlice';


export default configureStore({
    reducer: {
        table: tableReducer,
        selectCell: selectCellReducer
    },
})