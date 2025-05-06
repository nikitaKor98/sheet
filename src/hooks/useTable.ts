import { useState } from "react";

export function useTable() {
    const [table, setTable] = useState({});

    const updateCell = (cell: any, prop: any, id: any) => {

        setTable({
            ...table,
            [id]: { [prop]: cell }
        });
    }

    return { table, updateCell };
}