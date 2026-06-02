import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import { updateCell, updateColumns, updateRows } from "features/table/tableSlice";
import { selectCell } from "features/selectCell/selectCellSlice";
import { getListCellsFromStartToCurrent } from "utils";
import { useSelectionCell } from "hooks/useSelectionCell";

function Cell(props: any) {

    const {
        idCell,
        className,
        type,
        cellWidth,
        cellHeight,
        setCellWidth,
        setCellHeight,
        setShowPositionLineX,
        setLineX,
        setShowPositionLineY,
        setLineY
    } = props;

    const cellRef = useRef<HTMLDivElement>(null);

    const cell = useSelector((store: any) => store.table.cells[idCell], shallowEqual);
    const column = useSelector((store: any) => store.table.columns[idCell.replace(/[^A-Z]/g, "")], shallowEqual);
    const row = useSelector((store: any) => store.table.rows[idCell.replace(/\D/g, "")], shallowEqual);

    const { dragAndDropCell, selectionCell } = useSelectionCell();

    const selectCellById = (id: string) =>
        createSelector(
            (store: any) => store.selectCell.activeCell,
            (activeCell) => activeCell === id
        )

    const selectCellByIds = (id: string) =>
        createSelector(
            (store: any) => store.selectCell.selectedCells,
            (selectedCells: string[]) => ({
                isSelect: selectedCells.includes(id),
                index: selectedCells.indexOf(id)
            })
        )

    const isActive = useSelector(selectCellById(idCell), shallowEqual);
    const isSelectedCell = useSelector(selectCellByIds(idCell), shallowEqual);

    // console.log(`render: ${idCell}`)

    const dispatch = useDispatch();

    useEffect(() => {
        if (cellRef.current) {
            setCellWidth(cellRef.current.getBoundingClientRect().width);
            setCellHeight(cellRef.current.getBoundingClientRect().height);
        }
    }, [cellWidth, cellHeight]);

    const handleMouseDown = (event: any) => {

        let startLine: number;
        let widthOrHeight: number;
        let endLine: number;
        let prop: string
        const id = event.target.getAttribute("id");

        if (className.split("__")[1].split("_")[0] === "top") {
            startLine = event.pageX;
            widthOrHeight = event.target.offsetParent.clientWidth;
            prop = "width"
            setShowPositionLineX(true);
            setLineX(event.pageX);
        } else {
            startLine = event.pageY;
            widthOrHeight = event.target.offsetParent.clientHeight;
            prop = "height"
            setShowPositionLineY(true);
            setLineY(event.pageY);
        }

        const handelMouseMove = (event: any) => {
            if (className.split("__")[1].split("_")[0] === "top") {
                setLineX(event.pageX);
                endLine = event.pageX;
            } else {
                setLineY(event.pageY);
                endLine = event.pageY;
            }
        }

        const handelMouseUp = () => {
            if (prop === "width") dispatch(updateColumns({ [id]: { [prop]: endLine - startLine + widthOrHeight } }));
            if (prop === "height") dispatch(updateRows({ [id]: { [prop]: endLine - startLine + widthOrHeight } }));
            setShowPositionLineX(false);
            setShowPositionLineY(false);
            window.removeEventListener("mousemove", handelMouseMove);
            window.removeEventListener("mouseup", handelMouseUp);
        }

        window.addEventListener("mousemove", handelMouseMove);
        window.addEventListener("mouseup", handelMouseUp);
    }

    return (
        <div
            data-select={isSelectedCell.isSelect}
            data-index={isSelectedCell.index}
            data-active={isActive}
            ref={cellRef}
            className="cell"
            id={idCell}
        >
            <div
                style={{
                    width: `${column ? column.width : className.split("__")[1].split("_")[0] === "left" ? "100%" : cellWidth}px`,
                    height: `${row && row.height}px`
                }}
                className={className}
            >
                {type === "web_change" ? <input
                    className="sheet__cell-input"
                    value={cell ? cell.value : ""}
                    onChange={(e: any) => {
                        dispatch(updateCell({
                            [idCell]: { value: e.target.value }
                        }));
                    }}
                    onMouseDown={() => dragAndDropCell(idCell)}
                    onClick={() => selectionCell(idCell)}
                    id={idCell}
                /> : idCell}
            </div>
            <div
                id={idCell}
                onMouseDown={handleMouseDown}
                className={"resizer resizer__" + className.split("__")[1].split("_")[0]} >
            </div>
        </div >
    );
}

export default React.memo(Cell);
