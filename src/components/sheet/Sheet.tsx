import { useEffect, useRef, useState } from "react";

import Cell from "components/cell/Cell";

function Sheet(props: any) {

    const { headerHeight, sheetMenuHeight } = props;

    const dataLetters = ["A", "B", "C", "D", "E", 'F', "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const [dataNumber, setDataNumber] = useState(100);
    const numberColumn: number[] = [];
    const [cellWidthLetter, setCellWidthLetter] = useState<number>();
    const [cellHeightLetter, setCellHeightLetter] = useState();
    const [showPositionLineX, setShowPositionLineX] = useState(false);
    const [lineX, setLineX] = useState();
    const [showPositionLineY, setShowPositionLineY] = useState(false);
    const [lineY, setLineY] = useState<number>();

    const scrollRefTop = useRef<HTMLDivElement>(null);
    const scrollRefLeft = useRef<HTMLDivElement>(null);
    const scrollRefWeb = useRef<HTMLDivElement>(null);
    const scrollbarRefX = useRef<HTMLDivElement>(null);
    const scrollbarRefY = useRef<HTMLDivElement>(null);
    const sheetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        function handleWindowResize() {
            if (scrollbarRefX.current && scrollRefTop.current && sheetRef.current && scrollRefLeft.current) {

                const topHeight = scrollRefTop.current.getBoundingClientRect().height;
                const scrollbarHeight = scrollbarRefX.current.getBoundingClientRect().height;
                const leftWidth = scrollRefLeft.current.getBoundingClientRect().width;
                const scrollbarWidth = scrollbarRefX.current.getBoundingClientRect().height;

                const styleRow = Math.floor(window.innerHeight - headerHeight - topHeight - scrollbarHeight - sheetMenuHeight);
                const styleColunm = Math.floor(window.innerWidth - leftWidth - scrollbarWidth);

                sheetRef.current.setAttribute(
                    "style", `grid-template-rows: 3rem ${styleRow}px 1.2rem; grid-template-columns: 5vw ${styleColunm}px 1.2rem`
                );
            }
        }

        window.addEventListener('resize', handleWindowResize);

        handleWindowResize();
        // return () => {
        //     window.removeEventListener('resize', handleWindowResize);
        // }

    }, [headerHeight, sheetMenuHeight]);

    const renderContent = (value: any, type: string) => {

        let i = 0;
        numberColumn.splice(0, numberColumn.length);

        while (i < value) {
            i++;
            if (type === "web_change") {
                const data: any = dataLetters.map(letter => letter + i);
                numberColumn.push(...data);
            } else {
                numberColumn.push(i);
            }
        }
        return numberColumn.map((id: number) =>
            <Cell
                key={id}
                idCell={`${id}`}
                setLineX={setLineX}
                setShowPositionLineX={setShowPositionLineX}
                setLineY={setLineY}
                setShowPositionLineY={setShowPositionLineY}
                cellWidth={cellWidthLetter}
                cellHeight={cellHeightLetter}
                setCellWidth={setCellWidthLetter}
                setCellHeight={setCellHeightLetter}
                className={`sheet__${type}`}>
                {type === "web_change" ? <input className="sheet__cell-input" /> : `${id}`}
            </Cell>);
    }

    const handleScroll = (scroll: any) => {
        if (scrollRefLeft.current) {
            scrollRefLeft.current.scrollTop = scroll.target.scrollTop;
        }
        if (scrollRefTop.current) {
            scrollRefTop.current.scrollLeft = scroll.target.scrollLeft;
        }
    }

    const handleScrollTop = (scroll: any) => {
        if (scrollRefWeb.current) {
            scrollRefWeb.current.scrollLeft = scroll.target.scrollLeft;
        }
    }

    const handleScrollLeft = (scroll: any) => {
        if (scrollRefWeb.current) {
            scrollRefWeb.current.scrollTop = scroll.target.scrollTop;
        }
    }

    const handelWheel = (mouve: any) => {
        if (scrollRefWeb.current) {
            scrollRefWeb.current.scrollTop += mouve.deltaY;
            scrollRefWeb.current.scrollLeft += mouve.deltaX;
        }
        if (scrollbarRefX.current) {
            scrollbarRefX.current.scrollLeft += mouve.deltaX;
        }
        if (scrollbarRefY.current) {
            scrollbarRefY.current.scrollTop += mouve.deltaY;
        }
    }

    return (
        <div
            ref={sheetRef}
            onWheel={handelWheel}
            style={{ width: `${window.innerWidth}` }}
            className="sheet">
            <div style={{ width: `${cellWidthLetter && cellWidthLetter * dataLetters.length}px` }} />
            <div
                ref={scrollRefTop}
                onScroll={handleScrollTop}
                className="sheet__top">
                {dataLetters.map(letter =>
                    <Cell
                        key={letter}
                        idCell={letter}
                        setLineX={setLineX}
                        setShowPositionLineX={setShowPositionLineX}
                        setLineY={setLineY}
                        setShowPositionLineY={setShowPositionLineY}
                        cellWidth={cellWidthLetter}
                        cellHeight={cellHeightLetter}
                        setCellWidth={setCellWidthLetter}
                        setCellHeight={setCellHeightLetter}
                        className={"sheet__top_letter"}>
                        {letter}
                    </Cell>)}
            </div>
            <div
                ref={scrollRefLeft}
                onScroll={handleScrollLeft}
                className="sheet__left">
                {renderContent(dataNumber, "left_number")}
            </div>
            <div
                ref={scrollRefWeb}
                onScroll={handleScroll}
                className="sheet__web"
                style={{
                    gridTemplateColumns: `repeat(${dataLetters.length}, min-content)`,
                    gridTemplateRows: `repeat(${numberColumn.length}, min-content)`
                }}>
                {renderContent(dataNumber, "web_change")}
            </div>
            <div
                ref={scrollbarRefY}
                onScroll={handleScrollLeft}
                className="sheet__scrollbar sheet__scrollbar_y">
                <div style={{ height: `${cellHeightLetter && cellHeightLetter * dataNumber}px`, width: "1px" }} />
            </div>
            <div
                ref={scrollbarRefX}
                onScroll={handleScrollTop}
                className="sheet__scrollbar sheet__scrollbar_x">
                <div style={{ width: `${cellWidthLetter && cellWidthLetter * dataLetters.length}px`, height: "1px" }} />
            </div>
            {showPositionLineX && <div
                style={{ left: `${lineX}px` }}
                className="sheet__line sheet__line_x"></div>}
            {showPositionLineY && lineY && <div
                style={{ top: `${lineY - headerHeight}px` }}
                className="sheet__line sheet__line_y"></div>}
        </div>
    )
}

export default Sheet;