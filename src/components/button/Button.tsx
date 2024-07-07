// { name: JSX.Element}
function Button(props?: any) {

    const { onClick, children } = props;

    return (
        <div
            className="btn"
            onClick={onClick}
        >
            {/* {props.name} */}
            {children}
        </div>
    )
}

export default Button;