// { name: JSX.Element}
function Button(props?: any) {

    const { onClick, children, className } = props;

    return (
        <div
            className={`btn${className ? " " + className : ""}`}
            onClick={onClick}
        >
            {/* {props.name} */}
            {children}
        </div>
    )
}

export default Button;