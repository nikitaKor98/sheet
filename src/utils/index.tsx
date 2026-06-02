import { LETTERS } from "constants/letters";

const getColumnIndex = (cell: any) => LETTERS.indexOf(cell.replace(/\d+/g, ''));
const getRowNumber = (cell: any) => parseInt(cell.replace(/\D/g, ''), 10);

export const generateIds = () => {
    const ids = [];

    for (let charCode = 65; charCode <= 90; charCode++) {
        const letter = String.fromCharCode(charCode);
        for (let i = 1; i <= 100; i++) {
            ids.push(letter + i);
        }
    }

    return ids;
}


export const getListCellsFromStartToCurrent = (startCell: any, currentCell: any): string[] => {
    const res: any = [];

    const a = getColumnIndex(startCell);
    const b = getColumnIndex(currentCell);
    const num1 = getRowNumber(startCell);
    const num2 = getRowNumber(currentCell);

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
    return res;
}