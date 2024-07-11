import { useEffect, useRef, useState } from "react";

import Cell from "components/cell/Cell";

function Sheet(props: any) {

    const { headerHeight, sheetMenuHeight } = props;

    const dataLetters = ["A", "B", "C", "D", "E", 'F', "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const [dataNumber, setDataNumber] = useState(100);
    const numberColumn: number[] = [];
    const [cellWidthLetter, setCellWidthLetter] = useState<number>();
    const [cellHeightLetter, setCellHeightLetter] = useState();
    const [showPositionLine, setShowPositionLine] = useState(false);
    const [lineX, setLineX] = useState();

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
                    "style", `grid-template-rows: 3rem ${styleRow}px 1.5rem; grid-template-columns: 5vw ${styleColunm}px 1.5rem`
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
            numberColumn.push(i);
        }
        return numberColumn.map((num: number) =>
            <Cell
                key={num}
                setLineX={setLineX}
                setShowPositionLine={setShowPositionLine}
                cellWidth={cellWidthLetter}
                cellHeight={cellHeightLetter}
                setCellWidth={setCellWidthLetter}
                setCellHeight={setCellHeightLetter}
                className={`sheet__${type}`}>
                {num}
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
                        setLineX={setLineX}
                        setShowPositionLine={setShowPositionLine}
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
                    gridTemplateColumns: `repeat(${dataLetters.length}, 10rem)`,
                    gridTemplateRows: `repeat(${numberColumn.length}, 3rem)`
                }}>
                {renderContent(dataLetters.length * dataNumber, "web_change")}
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
            {showPositionLine && <div
                style={{ left: `${lineX}px` }}
                className="sheet__line sheet__line_x"></div>}
        </div>
    )
}

export default Sheet;