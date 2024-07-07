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
        left: <SvgAlignLeft width={20} height={20} />,
        center: <SvgAlignCenter width={20} height={20} />,
        right: <SvgAlignRight width={20} height={20} />
    }

    const renderContent = (key: any) => {
        return iconsData[key];
    }


    return (
        <div className="tools">
            <Button>
                <SvgSearch width={20} height={20} />
            </Button>
            <Button>
                <SvgBack width={20} height={20} />
            </Button>
            <Button>
                <SvgNext width={20} height={20} />
            </Button>
            <Button>
                <SvgPrint width={20} height={20} />
            </Button>
            <Button>
                <SvgBold width={18} height={18} />
            </Button>
            <Button>
                <SvgItalic width={18} height={18} />
            </Button>
            <Button>
                <SvgStrikethrough width={18} height={18} />
            </Button>
            <Button>
                <SvgUnderline width={20} height={20} />
            </Button>
            <Button>
                <SvgFill width={20} height={20} />
            </Button>
            <Dropdown
                className={"tools__dropdown"}
                type={"_align"}
                items={["left", "center", "right"]}
                value={value}
                setValue={setValue}
                renderContent={renderContent}
                isArrow={true}
            />
        </div>
    )
}

export default Tools;