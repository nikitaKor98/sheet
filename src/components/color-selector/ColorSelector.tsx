import { useEffect, useRef, useState } from "react";

import Button from "components/button/Button";

const hexToRgb = (hex: any) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result && {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    }
}

const setDarkOrLight = (hex: any) => {

    const rgb = hexToRgb(hex);

    if (rgb && Math.sqrt(0.299 * (rgb.r * rgb.r) + 0.587 * (rgb.g * rgb.g) + 0.114 * (rgb.b * rgb.b)) > 127.5) {
        return "#333333";
    } else {
        return "#fff";
    }
}

const restrictValue = (value: number, min: number, max: number) =>
    value <= min ? 0 : value >= max ? max - min : value - min;

const isValidRgbColor = (value: any) => {
    return value >= 0 && value <= 255;
}

const isValidHexColor = (color: any) => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color.length >= 6 && color);
}

const rgbToHex = ({ r, g, b }: any) => {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

const convertPxsToProcents = (value: number, maxValue: number): number => {
    return 100 * value / maxValue;
}

const convertProcentsToPxs = (value: number, maxValue: number): number => {
    return value * maxValue / 100;
}

function rgbToHsv({ r, g, b }: any) {

    const percentRoundFn = (num: any) => num * 100 / 100;

    let max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6 : 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: Number(h) * 360,
        s: percentRoundFn(s * 100),
        v: percentRoundFn(v * 100)
    }
}

const hsvToRgb = ({ h, s, v }: any) => {
    let r, g, b;
    let i;
    let f, p, q, t;

    h = Math.max(0, Math.min(359, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));
    s /= 100;
    v /= 100;

    if (s == 0) {
        r = g = b = v;
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    h /= 60;
    i = Math.floor(h);
    f = h - i;
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;

        case 1:
            r = q;
            g = v;
            b = p;
            break;

        case 2:
            r = p;
            g = v;
            b = t;
            break;

        case 3:
            r = p;
            g = q;
            b = v;
            break;

        case 4:
            r = t;
            g = p;
            b = v;
            break;

        default:
            r = v;
            g = p;
            b = q;
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    }
}

function ColorSelector(props: any) {

    const { value, setValue } = props;

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

    const [colorСheckBox, setColorСheckBox] = useState("#fff");
    const [isOpen, setIsOpen] = useState(false);

    const boxRef = useRef<HTMLDivElement>(null);
    const swatchSliderRef = useRef<HTMLDivElement>(null);
    const boxPointerRef = useRef<HTMLDivElement>(null);
    const swatchPointerRef = useRef<HTMLDivElement>(null);

    const checkBox = { "--checkBox-color": colorСheckBox } as React.CSSProperties;

    const onClose = () => {
        setIsOpen(!isOpen)
    }

    const [sliderPosition, setSliderPosition] = useState<number>(0);
    const [boxPosition, setBoxPosition] = useState<any>({ s: 0, v: 100 });
    const [hexInput, setHexInput] = useState<any>(rgbToHex(hsvToRgb({ h: sliderPosition, ...boxPosition })));

    useEffect(() => {
        isValidHexColor(hexInput) && setHexInput(rgbToHex(activColor));
    }, [sliderPosition, boxPosition]);

    const backgroundColor = hsvToRgb({
        h: convertProcentsToPxs(sliderPosition, 360),
        s: 100,
        v: 100
    });

    const activColor = hsvToRgb({
        h: convertProcentsToPxs(sliderPosition, 360),
        s: boxPosition.s,
        v: 100 - boxPosition.v
    });

    const {
        left: sliderLeft,
        right: sliderRight,
        width: sliderWidth,
    } = swatchSliderRef?.current?.getBoundingClientRect() || {
        left: 0,
        width: 0,
        right: 0,
    };

    const {
        left: boxLeft,
        right: boxRight,
        width: boxWidth,
        top: boxTop,
        bottom: boxBottom,
        height: boxHeight
    } = boxRef.current?.getBoundingClientRect() || {
        left: 0, right: 0, width: 0,
        top: 0,
        bottom: 0,
        height: 0
    };

    const handleSliderMouseDown = ({ pageX }: any) => {
        setSliderPosition(
            convertPxsToProcents(
                restrictValue(pageX, sliderLeft, sliderRight),
                sliderWidth
            )
        );

        const handelMouseMove = ({ pageX }: any) => {
            setSliderPosition(
                convertPxsToProcents(
                    restrictValue(pageX, sliderLeft, sliderRight),
                    sliderWidth
                )
            );
        };

        const handelMouseUp = () => {
            window.removeEventListener("mousemove", handelMouseMove);
            window.removeEventListener("mouseup", handelMouseUp);
        };

        window.addEventListener("mousemove", handelMouseMove);
        window.addEventListener("mouseup", handelMouseUp);
    };

    const handleBoxMouseDown = ({ pageX, pageY }: any) => {
        setBoxPosition({
            s: convertPxsToProcents(
                restrictValue(pageX, boxLeft, boxRight),
                boxWidth
            ),
            v: convertPxsToProcents(
                restrictValue(pageY, boxTop, boxBottom),
                boxHeight
            )
        }
        );

        const handelMouseMove = ({ pageX, pageY }: any) => {
            setBoxPosition({
                s: convertPxsToProcents(
                    restrictValue(pageX, boxLeft, boxRight),
                    boxWidth
                ),
                v: convertPxsToProcents(
                    restrictValue(pageY, boxTop, boxBottom),
                    boxHeight
                )
            }
            );
        };

        const handelMouseUp = () => {
            window.removeEventListener("mousemove", handelMouseMove);
            window.removeEventListener("mouseup", handelMouseUp);
        };

        window.addEventListener("mousemove", handelMouseMove);
        window.addEventListener("mouseup", handelMouseUp);
    };

    const handleInputColor = (event: any) => {
        const { id, value } = event.target;

        let color = { ...activColor, [id]: Number(isValidRgbColor(value) ? value : 255) };

        if (id === "hex") {
            setHexInput(value);
            color = hexToRgb(isValidHexColor(value) && value) || { r: 0, g: 0, b: 0 };
        }

        const { h, s, v } = rgbToHsv(color);

        setSliderPosition(convertPxsToProcents(h, 360));
        setBoxPosition({
            s,
            v: 100 - v
        });
    }

    return (
        <div className="color-selector">
            <Button><p>Reset parameters</p></Button>
            <ul className="color-selector__color-palette">
                {Object.keys(colorData).map((color: any) => {
                    return <li
                        key={color}
                        onClick={() => {
                            setValue(color);
                            setColorСheckBox(setDarkOrLight(colorData[color]));
                        }}
                        className={`color-selector__color-palette_item${value === color ? " color-selector__color-palette_item_active" : ""} `}
                        style={{ backgroundColor: `${colorData[color]} `, ...checkBox }}
                    ></li>
                })}
            </ul>
            <Button
                onClick={onClose}
            ><p>Custom color</p></Button>
            {isOpen && <div className="color-selector__color-custom">
                <div
                    ref={boxRef}
                    id="box"
                    onMouseDown={handleBoxMouseDown}
                    style={{ backgroundColor: `rgb(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b})` }}
                    className="color-selector__color-custom_box">
                    <div
                        ref={boxPointerRef}
                        id="boxPointer"
                        style={{ left: `${boxPosition.s}% `, top: `${boxPosition.v}% `, backgroundColor: `rgb(${activColor.r}, ${activColor.g}, ${activColor.b})` }}
                        onMouseDown={handleBoxMouseDown}
                        className="color-selector__color-custom_box_pointer"></div>
                </div>
                <div className="color-selector__color-custom_slider">
                    <div
                        style={{ backgroundColor: `rgb(${activColor.r}, ${activColor.g}, ${activColor.b})` }}
                        className="color-selector__color-custom_slider_swatch"></div>
                    <div
                        ref={swatchSliderRef}
                        id="slider"
                        onMouseDown={handleSliderMouseDown}
                        className="color-selector__color-custom_slider_swatch-slider">
                        <div
                            ref={swatchPointerRef}
                            id="swatchPointer"
                            style={{ left: `${sliderPosition}% `, backgroundColor: `rgb(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b})` }}
                            onMouseDown={handleSliderMouseDown}
                            className="color-selector__color-custom_slider_swatch-slider_pointer"></div>
                    </div>
                </div>
                <div className="color-selector__color-custom-information">
                    <div className="color-selector__color-custom-information-hex">
                        <input
                            className="hex-input"
                            id="hex"
                            value={hexInput}
                            onChange={handleInputColor}
                        />
                        <label>hex</label>
                    </div>
                    <div className="color-selector__color-custom-information-fields">
                        <div className="color-selector__color-custom-information-fields_item-r">
                            <input
                                className="color-fields-input"
                                id="r"
                                value={`${activColor.r}`}
                                onChange={handleInputColor}
                            />
                            <label>r</label>
                        </div>
                        <div className="color-selector__color-custom-information-fields_item-g">
                            <input
                                className="color-fields-input"
                                id="g"
                                value={`${activColor.g}`}
                                onChange={handleInputColor}
                            />
                            <label>g</label>
                        </div>
                        <div className="color-selector__color-custom-information-fields_item-b">
                            <input
                                className="color-fields-input"
                                id="b"
                                value={`${activColor.b}`}
                                onChange={handleInputColor}
                            />
                            <label>b</label>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default ColorSelector;