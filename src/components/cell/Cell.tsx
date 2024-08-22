import { useEffect, useRef } from "react";

import { useTableContext } from "providers/tableProvider";

function Cell(props: any) {

    const {
        idCell,
        className,
        children,
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

    const { updateCell, table } = useTableContext();

    const id = Number(idCell[0]) ? idCell : idCell.slice(1, idCell.length);

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
            updateCell(endLine - startLine + widthOrHeight, prop, id);
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
            ref={cellRef}
            className="cell">
            <div
                style={{
                    width: `${table[idCell[0]] ? table[idCell[0]].width : className.split("__")[1].split("_")[0] === "left" ? "100%" : cellWidth}px`,
                    height: `${table[id] && table[id].height}px`
                }}
                className={className}>
                {children}
            </div>
            <div
                id={idCell}
                onMouseDown={handleMouseDown}
                className={"resizer resizer__" + className.split("__")[1].split("_")[0]} ></div>
        </div >
    )
}

export default Cell;