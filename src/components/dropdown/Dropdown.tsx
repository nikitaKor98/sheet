import { useRef, useEffect, useState } from "react";

import Button from "components/button/Button";

import { ReactComponent as SvgCaretDown } from "../../assets/icon/caret-down.svg";

function Dropdown(props: any) {

    const { children, className, type, items, value, renderContent, isArrow, setValue, data } = props;

    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const onClose = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("click", handleClick);

        !isOpen && document.removeEventListener("click", handleClick);

    }, [dropdownRef, onClose, isOpen]);

    return (
        <>
            {/* {isOpen && <div className="backdrop"></div>} */}
            <div ref={dropdownRef} className={`${className}`}>
                <input
                    type="checkbox"
                    className={`${className}_checked`}
                    checked={isOpen}
                    onChange={e => setIsOpen(e.target.checked)}
                />
                <Button onClick={onClose}>
                    {renderContent && renderContent(value, data)}
                    {isArrow && <SvgCaretDown />}
                    {children && children}
                </Button>
                {renderContent ?
                    <ul className={className + type}>
                        {isOpen && items.map((item: any) =>
                            <li
                                className={`${className + type}-item ${item === value ? "active" : ""}`}
                                onClick={() => {
                                    setValue(item);
                                    onClose();
                                }}
                                key={item}>{renderContent(item, data)}
                            </li>
                        )}
                    </ul> :
                    <div className={`${className + type}`}
                    >{isOpen && items}</div>}
            </div >
        </>
    )
}

export default Dropdown;