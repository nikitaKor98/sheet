import Button from "components/button/Button";

import logo from "../../assets/img/logo.png";

function Menu() {

    return (
        <div className="menu">
            <a href="#" className="logo menu__logo">
                <img src={logo} alt="logo" className="logo__img" />
            </a>
            <input type="text" defaultValue="New table" className="menu__input" />
            <div className="menu__btn">
                <Button><p>Fail</p></Button>
                <Button><p>Edit</p></Button>
                <Button><p>View</p></Button>
                <Button><p>Insert</p></Button>
                <Button><p>Format</p></Button>
                <Button><p>Data</p></Button>
                <Button><p>Tools</p></Button>
                <Button><p>Extensions</p></Button>
                <Button><p>Reference</p></Button>
            </div>
        </div>
    )
}

export default Menu;