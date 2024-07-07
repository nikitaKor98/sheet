import { useRef, useEffect, useState } from "react";

import Button from "components/button/Button";

import { ReactComponent as SvgCaretDown } from "../../assets/icon/caret-down.svg";

function Dropdown(props: any) {

    const { className, type, items, value, renderContent, isArrow, setValue } = props;

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

        document.addEventListener("click", handleClick, true);

        return () => {
            document.removeEventListener("click", handleClick, true);
        };
        
    }, [dropdownRef, onClose]);

    return (
        <div ref={dropdownRef} className={`${className}`}>
            <input
                type="checkbox"
                className={`${className}_checked`}
                checked={isOpen}
                onChange={e => setIsOpen(e.target.checked)}
            />
            <Button onClick={onClose}>
                {renderContent(value)}
                {isArrow && <SvgCaretDown width={20} height={20} />}
            </Button>
            <ul className={className + type}>
                {isOpen && items.map((item: any) =>
                    <li
                        className={item === value ? "active" : ""}
                        onClick={() => {
                            setValue(item);
                            setIsOpen(!isOpen);
                        }}
                        key={item}>{renderContent(item)}
                    </li>
                )
                }
            </ul>
        </div >
    )
}

export default Dropdown;