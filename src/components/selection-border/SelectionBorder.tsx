import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useSelectionCell } from "hooks/useSelectionCell";

function SelectionBorder() {

    const [cell, setCell] = useState<DOMRect | null>(null);
    const [webPosition, setWebPosition] = useState<any>();

    const activeCell = useSelector((store: any) => store.selectCell.activeCell);
    const selectedCells = useSelector((store: any) => store.selectCell.selectedCells);

    const { selectionCell } = useSelectionCell();

    // useEffect(() => {
    //     setCell(document.getElementById(activeCell)?.getBoundingClientRect());
    //     setWebPosition(document.getElementById("web")?.getBoundingClientRect());
    // }, [activeCell]);

    useEffect(() => {
        setWebPosition(document.getElementById("web")?.getBoundingClientRect());
    }, []);

    useEffect(() => {
        if (activeCell) {
            const cellEl = document.getElementById(activeCell);
            if (cellEl) {
                setCell(cellEl.getBoundingClientRect());
            }
        }
    }, [activeCell]);

    return (
        <>
            <div
                style={{
                    top: cell && webPosition && cell.top - webPosition.top,
                    left: cell && webPosition && cell.left - webPosition.left
                }}
                className="selection-border">
                <div
                    style={{ width: cell?.width, top: "-2px" }}
                    className="selection-border__item-top"></div>
                <div
                    style={{ height: cell?.height, left: "-2px" }}
                    className="selection-border__item-left"></div>
                <div
                    style={{ top: cell?.height + "px", width: cell?.width }}
                    className="selection-border__item-bottom"></div>
                <div
                    style={{ left: cell?.width + "px", height: cell?.height }}
                    className="selection-border__item-right"></div>
            </div>
            <div className="selected-cells">
                {selectedCells.map((item: string) => {
                    const position = document.getElementById(item)?.getBoundingClientRect();
                    return (
                        <div
                            onClick={() => selectionCell(item)}
                            key={item}
                            id={item}
                            className={`selected-cells__item ${item}`}
                            style={{
                                top: position && webPosition && position.top - webPosition.top,
                                left: position && webPosition && position.left - webPosition.left,
                                width: position && position.width,
                                height: position && position.height
                            }}
                        ></div>
                    );
                })}
            </div>
        </>
    );
}

export default SelectionBorder;