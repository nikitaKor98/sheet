import { useEffect, useRef } from "react";

import Menu from "components/menu/Menu";
import Tools from "components/tools/Tools";

function Header(props: any) {

    const {setHeaderHeight} = props;

    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.getBoundingClientRect().height);
        }
    }, [headerRef]);

    return (
        <div
            ref={headerRef}
            className="header">
            <Menu />
            <Tools />
        </div>
    )
}

export default Header;