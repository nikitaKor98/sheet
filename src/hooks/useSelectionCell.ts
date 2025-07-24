import { useDispatch, useSelector } from "react-redux";

import { selectCell } from "features/selectCell/selectCellSlice";
import { useCallback, useEffect, useState } from "react";

import { LETTERS } from "constants/letters";

const removeMatchingElements = (sourceArray: any, valuesToRemove: any) => {
    return valuesToRemove ? sourceArray.filter((item: string) => !valuesToRemove.includes(item)) : sourceArray;
}
const getColumnIndex = (cell: string) => LETTERS.indexOf(cell.replace(/\d+/g, ''));
const getRowNumber = (cell: string) => parseInt(cell.replace(/\D/g, ''), 10);

export function useSelectionCell() {

    const [controlPress, setControlPress] = useState<boolean>(false);
    const [shiftPress, setShiftPress] = useState<boolean>(false);
    const [cacheCells, setCacheCells] = useState<any>(null);
    const [invisibleCells, setInvisibleCells] = useState<any>(null);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [startCell, setStartCell] = useState<string | null>();
    const [currentCell, setCurrentCell] = useState<string | null>();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey) setControlPress(true);
            if (e.shiftKey) setShiftPress(true);
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (!e.ctrlKey) setControlPress(false);
            if (!e.shiftKey) setShiftPress(false);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const dispatch = useDispatch();

    const selectedCells = useSelector((store: any) => store.selectCell.selectedCells);
    const activeCell = useSelector((store: any) => store.selectCell.activeCell);

    const dragAndDropCell = (id: string, type: string) => {

        const handelMouseUp = () => {
            setIsActive(false);
            setStartCell(null);
            setCurrentCell(null);
            window.removeEventListener("mouseup", handelMouseUp);
        }

        if (type === "mousedown") {
            setIsActive(true);
            setStartCell(id);

            dispatch(selectCell({ activeCell: id, selectedCells: [id] }));
        }

        if (type === "mousemove" && isActive && currentCell !== id) {
            setCurrentCell(id);

            const res = [];

            if (startCell) {
                const a = getColumnIndex(startCell);
                const b = getColumnIndex(id);
                const num1 = getRowNumber(startCell);
                const num2 = getRowNumber(id);

                const startCol = Math.min(a, b);
                const endCol = Math.max(a, b) + 1;
                const startRow = Math.min(num1, num2);
                const endRow = Math.max(num1, num2);
                const activeLetters = LETTERS.slice(startCol, endCol);

                for (let i = startRow; i <= endRow; i++) {
                    for (const letter of activeLetters) {
                        res.push(`${letter}${i}`);
                    }
                }
            }

            dispatch(selectCell({ activeCell: startCell, selectedCells: res }));

            window.addEventListener("mouseup", handelMouseUp);
        }

        // if (type === "mouseup") {
        //     setIsActive(false);
        //     setStartCell(null);
        //     setCurrentCell(null);
        //     console.log(id)
        // }
    }

    const selectionCell = useCallback((id: string) => {

        const a = getColumnIndex(activeCell);
        const b = getColumnIndex(id);
        const num1 = getRowNumber(activeCell);
        const num2 = getRowNumber(id);

        const startCol = Math.min(a, b);
        const endCol = Math.max(a, b) + 1;
        const startRow = Math.min(num1, num2);
        const endRow = Math.max(num1, num2);

        const activeLetters = LETTERS.slice(startCol, endCol);
        const res = [];

        for (let i = startRow; i <= endRow; i++) {
            for (const letter of activeLetters) {
                res.push(`${letter}${i}`);
            }
        }

        const isSelected = selectedCells.includes(id);

        if (controlPress && isSelected) {
            const updatedSelection = selectedCells.filter((cell: any) => cell !== id);
            const newActive = id === selectedCells[selectedCells.length - 1]
                ? selectedCells[selectedCells.length - 2]
                : selectedCells[selectedCells.length - 1];

            setCacheCells(null);
            dispatch(selectCell({ activeCell: newActive, selectedCells: updatedSelection }));
            return;
        }

        if (controlPress && !shiftPress && !isSelected) {
            setCacheCells(null);
            dispatch(selectCell({ activeCell: id, selectedCells: [...selectedCells, id] }));
            return;
        }

        if (shiftPress && !controlPress) {
            dispatch(selectCell({ activeCell, selectedCells: res }));
            return;
        }

        if (shiftPress && controlPress) {
            setCacheCells(res);
            const invisibleCellsIsNull = invisibleCells ? invisibleCells : [];
            const merged = [...res, ...removeMatchingElements(selectedCells, cacheCells), ...invisibleCellsIsNull];
            const unique = merged.sort();

            setInvisibleCells(unique.filter((item: any, index: any, arr: any) => item === arr[index - 1]));

            dispatch(selectCell({ activeCell, selectedCells: unique.filter((item: any, index: any, arr: any) => item !== arr[index - 1]) }));
            return;
        }

        dispatch(selectCell({ activeCell: id, selectedCells: [id] }));

    }, [selectedCells, activeCell, controlPress, shiftPress, cacheCells, dispatch]);

    return { selectionCell, dragAndDropCell };
} 