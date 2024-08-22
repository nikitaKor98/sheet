import Button from "components/button/Button";
import Dropdown from "components/dropdown/Dropdown";

import logo from "../../assets/img/logo.png";

function Menu() {

    const btnUpData: any = ["Fail", "Edit"];

    const failData: any = {
        create: "Cteate",
        open: "Open",
        import: "Import",
        createCopy: "Create copy",
        rename: "Rename"
    }

    const editData: any = {
        cancel: "Cancel",
        repeat: "Repeat",
        scissors: "Cut out",
        copy: "Copy",
        insert: "Insert",
        delete: "Delete"
    }

    const allData: any = {
        fail: failData,
        edit: editData
    }

    const renderContent = (key: any, data: any) => {
        return data && data[key];
    }

    return (
        <div className="menu">
            <a href="#" className="logo menu__logo">
                <img src={logo} alt="logo" className="logo__img" />
            </a>
            <input type="text" defaultValue="New table" className="menu__input" />
            <div className="menu__btn">
                {btnUpData.map((item: any) => {
                    return <Dropdown
                        className={"menu__dropdown"}
                        type={"_up"}
                        items={Object.keys(allData[item.toLowerCase()])}
                        data={allData[item.toLowerCase()]}
                        value={null}
                        setValue={() => console.log("Click")}
                        renderContent={renderContent}
                        isArrow={false}
                    >{item}</Dropdown>
                })}
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