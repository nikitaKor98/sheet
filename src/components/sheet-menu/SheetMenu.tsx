import { useRef, useEffect } from "react";

import Button from "components/button/Button";


function SheetMenu(props: any) {

    const { setSheetMenuHeight } = props;

    const sheetMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sheetMenuRef.current) {
            setSheetMenuHeight(sheetMenuRef.current.getBoundingClientRect().height);
        }
    }, [sheetMenuRef]);


    return (
        <div
            ref={sheetMenuRef}
            className="sheet-menu">
            <Button className="btn-circle">
                <div className="btn-circle__plus"></div>
            </Button>
            <Button className="btn-circle">
                <div className="btn-circle__hamburger"></div>
            </Button>
            <Button>
                List1
            </Button>
        </div >
    )
}

export default SheetMenu;