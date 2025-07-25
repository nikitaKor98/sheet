import { useCallback, useEffect, useState } from "react";

/**
 * select one cell by mouse down -> mouse up (clear)
 *      setActiveCell
 *      setSelectedCells
 *
 *
 * add to selection one cell by mouse down + ctrlKey -> mouse up (clear)
 *
 *
 * add to selection a set of cells by mouse down -> mouse move -> mouse up (clear)
 *
 * add to selection a set of cells by mouse down + shiftKey -> mouse up (clear)
 */

// ------- HELPERS ------

const updateCellsByCellRange = (
  activeCell: any,
  targetCell: any,
  cells: any[]
) => {
  return [];
};

const isCellActive = (cell: any, cells: any[]) => {
  return false;
};

const updateCellsByCell = (cell: any, cells: any[]) => {
  const isCellSelected = !!cells.find(
    (selectedCell) => selectedCell.id === cell.id
  );

  if (isCellSelected) {
    return cells.filter((selectedCell) => selectedCell.id !== cell.id);
  } else {
    return [...cells, cell];
  }
};

// ----------------------

export const useCellPicker = () => {
  const [activeCell, setActiveCell] = useState<any>();
  const [selectedCells, setSelectedCells] = useState<any[]>([]);

  useEffect(() => {
    console.log("activeCell", activeCell);
    console.log("selectedCells", selectedCells);
  }, [activeCell, selectedCells]);

  const handleMouseDown = useCallback(
    (event: any, cell: any) => {
      if (event.shiftKey) {
        setSelectedCells((cells) =>
          updateCellsByCellRange(activeCell, cell, cells)
        );

        return;
      }

      console.log(Object.keys(event).filter((prop) => prop.includes("Key")));

      if (event.metaKey || event.ctrlKey) {
        setSelectedCells((cells) => updateCellsByCell(cell, cells));
        setActiveCell(cell);

        return;
      }

      setActiveCell(cell);
      setSelectedCells([cell]);
    },
    [activeCell, setActiveCell, setSelectedCells]
  );

  return {
    activeCell,
    selectedCells,
    handleMouseDown,
  };
};
