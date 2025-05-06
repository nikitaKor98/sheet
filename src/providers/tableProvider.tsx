import { createContext, useContext } from "react";

import { useTable } from "hooks/useTable";

/**
 * board
 *  for (1000x1000)
 *      <Cell  coord />
 *          const {table, getColumn} = useTableContext();
 * 
 *        <div class="cell" style="width={getColumn(coord).width}">
 *          if input
 *              <input coord />
 *          else
 *              <customBlock coord
 * 
 * 
 * input ({coord})
 *     const {table, getCellByCoord} = useTableContext();
 * 
 *      const cell = getCellByCoord(coord)
 */

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
        </TableContext.Provider>
    )
}