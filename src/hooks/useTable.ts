import { useState } from "react";

export function useTable() {
    const [table, setTable] = useState({});

    const updateCell = (cell: any, id: any) => {
        setTable({
            ...table,
            [id]: cell
        });

    }

    return { table, updateCell };
}