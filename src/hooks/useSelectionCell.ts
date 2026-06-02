import { useDispatch } from "react-redux";

import { selectCell } from "features/selectCell/selectCellSlice";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getListCellsFromStartToCurrent } from "utils";

const removeMatchingElements = (sourceArray: any, valuesToRemove: any) => {
    return valuesToRemove ? sourceArray.filter((item: string) => !valuesToRemove.includes(item)) : sourceArray;
}


export function useSelectionCell() {

    let controlPress: boolean = false;
    let shiftPress: boolean = false;

    useEffect(() => {

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey) controlPress = true;
            if (e.shiftKey) shiftPress = true;
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            if (!e.ctrlKey) controlPress = false;
            if (!e.shiftKey) shiftPress = false;
        }

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        }

    }, []);

    const dispatch = useDispatch();

    const dragAndDropCell = useCallback((id: string) => {

        const startCell = id;
        const getActiveCell = document.querySelector('[data-active="true"]');
        const getCurrentCells = document.querySelectorAll('[data-select="true"]');
        // @ts-ignore
        const currentCells = getCurrentCells.values().toArray().map((item: any) => item.id);
        const activeCell = getActiveCell && getActiveCell.id
        let currentCell: any;

        const handelMouseMove = (e: MouseEvent) => {
            const cell = document.elementFromPoint(e.clientX, e.clientY);
            const id = cell && cell.id;

            if (currentCell !== id) {
                currentCell = id;

                if (controlPress && !shiftPress) {
                    dispatch(selectCell({
                        activeCell: startCell,
                        selectedCells: [...getListCellsFromStartToCurrent(startCell, id), ...currentCells]
                            .sort()
                            .filter((item: any, index: any, arr: any) => item !== arr[index - 1])
                    }));
                } else if (shiftPress) {
                    dispatch(selectCell({
                        activeCell: activeCell,
                        selectedCells: getListCellsFromStartToCurrent(activeCell, id)
                    }));
                } else {
                    dispatch(selectCell({
                        activeCell: startCell,
                        selectedCells: getListCellsFromStartToCurrent(startCell, id)
                    }));
                }
            }
        }

        const handelMouseUp = () => {
            window.removeEventListener("mousemove", handelMouseMove);
            window.removeEventListener("mouseup", handelMouseUp);
        }

        window.addEventListener("mousemove", handelMouseMove);
        window.addEventListener("mouseup", handelMouseUp);

    }, [dispatch, selectCell]);

    const selectionCell = useCallback((id: string) => {

        const getActiveCell = document.querySelector('[data-active="true"]');
        const getCurrentCells = document.querySelectorAll('[data-select="true"]');
        // @ts-ignore
        const currentCells = getCurrentCells.values().toArray().sort((a, b) => {
            // @ts-ignore
            return Number(a.dataset.index) - Number(b.dataset.index);
        }).map((cell: any) => cell.id);

        const activeCell = getActiveCell && getActiveCell.id
        const isSelected = currentCells.includes(id);

        if (controlPress && !shiftPress && isSelected) {
            const newActive = id === activeCell ?
                currentCells[currentCells.length - 2] :
                currentCells[currentCells.length - 1];

            dispatch(selectCell({
                activeCell: newActive,
                selectedCells: currentCells.filter((cell: string) => cell !== id)
            }));
            return;
        }

        if (controlPress && !shiftPress && !isSelected) {
            dispatch(selectCell({
                activeCell: id,
                selectedCells: [...currentCells, id]
            }));
            return;
        }

        if (shiftPress && !controlPress) {
            dispatch(selectCell({ activeCell, selectedCells: getListCellsFromStartToCurrent(activeCell, id) }));
            return;
        }

        if (shiftPress && controlPress) {
            dispatch(selectCell({
                activeCell,
                selectedCells: [...currentCells, ...getListCellsFromStartToCurrent(activeCell, id)]
                    .sort()
                    .filter((item: any, index: any, arr: any) => item !== arr[index - 1])
            }));
            return;
        }

        dispatch(selectCell({
            activeCell: id,
            selectedCells: [id]
        }));

    }, [dispatch, selectCell]);


    //     if (shiftPress && controlPress) {
    //         setCacheCells(res);
    //         const invisibleCellsIsNull = invisibleCells ? invisibleCells : [];
    //         const merged = [...res, ...removeMatchingElements(selectedCells, cacheCells), ...invisibleCellsIsNull];
    //         const unique = merged.sort();

    //         setInvisibleCells(unique.filter((item: any, index: any, arr: any) => item === arr[index - 1]));

    //         dispatch(selectCell({ activeCell, selectedCells: unique.filter((item: any, index: any, arr: any) => item !== arr[index - 1]) }));
    //         return;
    //     }

    return useMemo(() => ({ dragAndDropCell, selectionCell }), [dragAndDropCell, selectionCell]);
} 