import { useState } from "react";

import Button from "components/button/Button";
import Dropdown from "components/dropdown/Dropdown";

import { ReactComponent as SvgSearch } from "../../assets/icon/search.svg";
import { ReactComponent as SvgNext } from "../../assets/icon/redo.svg";
import { ReactComponent as SvgBack } from "../../assets/icon/undo.svg";
import { ReactComponent as SvgPrint } from "../../assets/icon/print.svg";
import { ReactComponent as SvgBold } from "../../assets/icon/bold.svg";
import { ReactComponent as SvgItalic } from "../../assets/icon/italic.svg";
import { ReactComponent as SvgStrikethrough } from "../../assets/icon/strikethrough.svg";
import { ReactComponent as SvgUnderline } from "../../assets/icon/underline.svg";
import { ReactComponent as SvgFill } from "../../assets/icon/fill.svg";
import { ReactComponent as SvgAlignLeft } from "../../assets/icon/align-left.svg";
import { ReactComponent as SvgAlignCenter } from "../../assets/icon/align-center.svg";
import { ReactComponent as SvgAlignRight } from "../../assets/icon/align-right.svg";


function Tools() {

    const [value, setValue] = useState("left");

    const iconsData: any = {
        left: <SvgAlignLeft />,
        center: <SvgAlignCenter />,
        right: <SvgAlignRight />
    }

    const renderContent = (key: any) => {
        return iconsData[key];
    }

    return (
        <div className="tools">
            <Button>
                <SvgSearch />
            </Button>
            <Button>
                <SvgBack />
            </Button>
            <Button>
                <SvgNext />
            </Button>
            <Button>
                <SvgPrint />
            </Button>
            <div className="tools__separator"></div>
            <Button>
                <SvgBold />
            </Button>
            <Button>
                <SvgItalic />
            </Button>
            <Button>
                <SvgStrikethrough />
            </Button>
            <Button>
                <SvgUnderline />
            </Button>
            <div className="tools__separator"></div>
            <Button>
                <SvgFill />
            </Button>
            <Dropdown
                className={"tools__dropdown"}
                type={"_align"}
                items={Object.keys(iconsData)}
                value={value}
                setValue={setValue}
                renderContent={renderContent}
                isArrow={true}
            />
        </div>
    )
}

export default Tools;