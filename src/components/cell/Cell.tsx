import { useEffect, useRef, useState } from "react";

import { useTableContext } from "providers/tableProvider";

function Cell(props: any) {

    const { updateCell, table } = useTableContext();

    const {
        className,
        children,
        cellWidth,
        cellHeight,
        setCellWidth,
        setCellHeight,
        setShowPositionLine,
        setLineX
    } = props;

    const cellRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cellRef.current) {
            setCellWidth(cellRef.current.getBoundingClientRect().width);
            setCellHeight(cellRef.current.getBoundingClientRect().height);
        }
    }, [cellWidth, cellHeight]);

    const handleMouseDown = (event: any) => {

        const startLine = event.pageX;
        const width = event.target.offsetParent.clientWidth;
        let endLine: number;
        const id = event.target.getAttribute("id");

        setShowPositionLine(true);
        setLineX(event.pageX);

        const handelMouseMove = (event: any) => {
            setLineX(event.pageX);
            endLine = event.pageX;
        }

        const handelMouseUp = () => {
            updateCell(endLine - startLine + width, id);
            setShowPositionLine(false);
            window.removeEventListener("mousemove", handelMouseMove);
            window.removeEventListener("mouseup", handelMouseUp);
        }

        window.addEventListener("mousemove", handelMouseMove);
        window.addEventListener("mouseup", handelMouseUp);
    }

    return (
        <div
            ref={cellRef}
            className="cell">
            <div
                style={{
                    width: `${table[children] ? table[children] : className.split("__")[1].split("_")[0] === "left" ? "100%" : cellWidth}px`,
                    height: `${cellHeight}px`
                }}
                className={className}>
                {children}
            </div>
            <div
                id={children}
                onMouseDown={handleMouseDown}
                className={"resizer resizer__" + className.split("__")[1].split("_")[0]} ></div>
        </div >
    )
}

export default Cell;