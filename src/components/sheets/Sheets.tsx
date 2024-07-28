import { useState } from "react";


import Sheet from "components/sheet/Sheet";
import SheetMenu from "components/sheet-menu/SheetMenu";

function Sheets(props: any) {

    const { headerHeight } = props;

    const [sheetMenuHeight, setSheetMenuHeight] = useState(null);

    return (
        <div
            style={{ width: "100%", overflow: "hidden" }}
            className="sheets">
            <Sheet headerHeight={headerHeight} sheetMenuHeight={sheetMenuHeight} />
            <SheetMenu setSheetMenuHeight={setSheetMenuHeight} />
        </div>
    )
}

export default Sheets;