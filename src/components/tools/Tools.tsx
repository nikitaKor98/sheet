import { useState } from "react";

import Button from "components/button/Button";
import Dropdown from "components/dropdown/Dropdown";
import ColorSelector from "components/color-selector/ColorSelector";

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
import { ReactComponent as BorderAll } from "../../assets/icon/border-all.svg";
import { ReactComponent as BorderBottom } from "../../assets/icon/border-bottom.svg";
import { ReactComponent as BorderCenterH } from "../../assets/icon/border-center-h.svg";
import { ReactComponent as BorderCenterV } from "../../assets/icon/border-center-v.svg";
import { ReactComponent as BorderInner } from "../../assets/icon/border-inner.svg";
import { ReactComponent as BorderLeft } from "../../assets/icon/border-left.svg";
import { ReactComponent as BorderOuter } from "../../assets/icon/border-outer.svg";
import { ReactComponent as BorderRight } from "../../assets/icon/border-right.svg";
import { ReactComponent as BorderNone } from "../../assets/icon/border-none.svg";
import { ReactComponent as BorderTop } from "../../assets/icon/border-top.svg";
import { ReactComponent as CaretDown } from "../../assets/icon/caret-down.svg";


function Tools() {

    const [value, setValue] = useState("left");
    const [color, setColor] = useState("black");

    const iconsBorder: any = {
        all: <BorderAll />,
        inner: <BorderInner />,
        centerH: <BorderCenterH />,
        centerV: <BorderCenterV />,
        outer: <BorderOuter />,
        left: <BorderLeft />,
        top: <BorderTop />,
        right: <BorderRight />,
        bottom: <BorderBottom />,
        none: <BorderNone />
    }

    const iconsAlign: any = {
        left: <SvgAlignLeft />,
        center: <SvgAlignCenter />,
        right: <SvgAlignRight />
    }

    const renderContent = (key: any, obj: any) => {
        return obj[key];
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
            <Dropdown
                className={"tools__dropdown"}
                type={"_color-picker"}
                items={
                    <ColorSelector
                        value={color}
                        setValue={setColor}
                    />}
                value={null}
                setValue={null}
                renderContent={null}
                isArrow={false}
            >
                <SvgUnderline />
            </Dropdown>
            <div className="tools__separator"></div>
            <Dropdown
                className={"tools__dropdown"}
                type={"_color-picker"}
                items={
                    <ColorSelector
                        value={color}
                        setValue={setColor}
                    />}
                value={null}
                setValue={null}
                renderContent={null}
                isArrow={false}
            >
                <SvgFill />
            </Dropdown>
            <Dropdown
                className={"tools__dropdown"}
                type={"_border"}
                items={Object.keys(iconsBorder)}
                value={null}
                setValue={console.log}
                renderContent={renderContent}
                isArrow={false}
                data={iconsBorder}
            >
                <BorderAll />
            </Dropdown>
            <div className="tools__separator"></div>
            <Dropdown
                className={"tools__dropdown"}
                type={"_align"}
                items={Object.keys(iconsAlign)}
                value={value}
                setValue={setValue}
                renderContent={renderContent}
                isArrow={true}
                data={iconsAlign}
            />
        </div >
    )
}

export default Tools;