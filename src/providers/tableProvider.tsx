import { createContext, useContext } from "react";

import { useTable } from "hooks/useTable";

const TableContext = createContext<{
    table: any,
    updateCell: (cell: any, prop: any, cellWidth: any) => void
}>({
    table: {},
    updateCell: (args?: any) => { }
});

export const useTableContext = () => useContext<any>(TableContext);

export function TableProvider({ children }: any) {

    const { updateCell, table } = useTable();

    return (
        <TableContext.Provider value={{
            updateCell,
            table
        }}>
            {children}
        </TableContext.Provider>)
}