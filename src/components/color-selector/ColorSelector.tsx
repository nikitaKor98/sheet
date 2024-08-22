import Button from "components/button/Button";

function ColorSelector() {

    const colorData: any = {
        black: "#000000",
        darkGreyFour: "#434343",
        darkGreyThree: "#666666",
        darkGreyTwo: "#999999",
        darkGreyOne: "#b7b7b7",
        gray: "#cccccc",
        lightGreyOne: "#d9d9d9",
        lightGreyTwo: "#efefef",
        lightGreyThree: "#f3f3f3",
        white: "#ffffff",
        redBerry: "#980000",
        red: "#ff0000",
        orange: "#ff9900",
        yellow: "#ffff00",
        green: "#00ff00",
        cyan: "#00ffff",
        cornflowerBlue: "#4a86e8",
        blue: "#0000ff",
        purple: "#9900ff",
        magenta: "#ff00ff",
        lightRedBerryThree: "#e6b8af",
        lightRedThree: "#f4cccc",
        lightOrangeThree: "#fce5cd",
        lightYellowThree: "#fff2cc",
        lightGreenThree: "#d9ead3",
        lightCyanThree: "#d0e0e3",
        lightCornflowerBlueThree: "#c9daf8",
        lightBlueThree: "#cfe2f3",
        lightPurpleThree: "#d9d2e9",
        lightMagentaThree: "#ead1dc",
        lightRedBerryTwo: "#dd7e6b",
        lightRedTwo: "#ea9999",
        lightOrangeTwo: "#f9cb9c",
        lightYellowTwo: "#ffe599",
        lightGreenTwo: "#b6d7a8",
        lightCyanTwo: "#a2c4c9",
        lightCornflowerBlueTwo: "#a4c2f4",
        lightBlueTwo: "#9fc5e8",
        lightPurpleTwo: "#b4a7d6",
        lightMagentaTwo: "#d5a6bd",
        lightRedBerryOne: "#cc4125",
        lightRedOne: "#e06666",
        lightOrangeOne: "#f6b26b",
        lightYellowOne: "#ffd966",
        lightGreenOne: "#93c47d",
        lightCyanOne: "#76a5af",
        lightCornflowerBlueOne: "#6d9eeb",
        lightBlueOne: "#6fa8dc",
        lightPurpleOne: "#8e7cc3",
        lightMagentaOne: "#c27ba0",
        darkRedBerryOne: "#a61c00",
        darkRedOne: "#cc0000",
        darkOrangeOne: "#e69138",
        darkYellowOne: "#f1c232",
        darkGreenOne: "#6aa84f",
        darkCyanOne: "#45818e",
        darkCornflowerBlueOne: "#3c78d8",
        darkBlueOne: "#3d85c6",
        darkPurpleOne: "#674ea7",
        darkMagentaOne: "#a64d79",
        darkRedBerryTwo: "#85200c",
        darkRedTwo: "#990000",
        darkOrangeTwo: "#b45f06",
        darkYellowTwo: "#bf9000",
        darkGreenTwo: "#38761d",
        darkCyanTwo: "#134f5c",
        darkCornflowerBlueTwo: "#1155cc",
        darkBlueTwo: "#0b5394",
        darkPurpleTwo: "#351c75",
        darkMagentaTwo: "#741b47",
        darkRedBerryThree: "#5b0f00",
        darkRedThree: "#660000",
        darkOrangeThree: "#783f04",
        darkYellowThree: "#7f6000",
        darkGreenThree: "#274e13",
        darkCyanThree: "#0c343d",
        darkCornflowerBlueThree: "#1c4587",
        darkBlueThree: "#073763",
        darkPurpleThree: "#20124d",
        darkMagentaThree: "#4c1130"
    }

    return (
        <div className="color-selector">
            <Button><p>Reset parameters</p></Button>
            <ul className="color-selector__color-palette">
                {Object.keys(colorData).map((color: any) => {
                    return <li
                        className="color-selector__color-palette_item"
                        style={{ backgroundColor: `${colorData[color]}` }}></li>
                })}
            </ul>
        </div>
    )
}

export default ColorSelector;