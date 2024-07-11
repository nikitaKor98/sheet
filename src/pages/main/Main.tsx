import Header from "components/header/Header";
import Sheets from "components/sheets/Sheets";
import { useState } from "react";

function Main() {

    const [headerHeight, setHeaderHeight] = useState(null);

    return (
        <div className="main">
            <Header setHeaderHeight={setHeaderHeight}/>
            <Sheets headerHeight={headerHeight}/>
        </div>
    )
}

export default Main;