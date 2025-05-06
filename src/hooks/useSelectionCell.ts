import { useDispatch, useSelector } from "react-redux";

import { selectCell } from "features/selectCell/selectCellSlice";
import { useEffect, useState } from "react";

export function useSelectionCell() {

    const [controlPress, setControlPress] = useState(null);
    const [shiftPress, setShiftPress] = useState(null);

    useEffect(() => {
        const handelKeybord = (e: any) => {

            setControlPress(e.ctrlKey);
            setShiftPress(e.shiftKey);

            // window.removeEventListener("keydown", handelKeybord);
            // window.removeEventListener("keyup", handelKeybord);
        }

        window.addEventListener("keydown", handelKeybord);
        window.addEventListener("keyup", handelKeybord);
    }, []);

    const dispatch = useDispatch();

    const selectedCells = useSelector((store: any) => store.selectCell.selectedCells);

    const selectionCell = (id: string) => {
        if (selectedCells.find((item: string) => item === id) && controlPress) {
            dispatch(selectCell({
                activeCell: id === selectedCells[selectedCells.length - 1] ? selectedCells[selectedCells.length - 2] : selectedCells[selectedCells.length - 1],
                selectedCells: selectedCells.filter((item: string) => item !== id)
            }));
        }

        else if (selectedCells.find((item: string) => item !== id) && controlPress) {
            dispatch(selectCell({
                activeCell: id,
                selectedCells: [...selectedCells, id]
            }));
        }

        if (!controlPress && !shiftPress) {
            dispatch(selectCell({
                activeCell: id,
                selectedCells: [id]
            }));
        }
    }

    return selectionCell;
} 