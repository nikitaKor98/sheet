import { useRef, useState } from "react";

import Button from "components/button/Button";

const spectrumRanges = [
    { from: [255, 0, 0], to: [255, 255, 0] },
    { from: [255, 255, 0], to: [0, 255, 0] },
    { from: [0, 255, 0], to: [0, 255, 255] },
    { from: [0, 255, 255], to: [0, 0, 255] },
    { from: [0, 0, 255], to: [255, 0, 255] },
    { from: [255, 0, 255], to: [255, 0, 0] }
];

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

const isValidRgbColor = (value: any) => {
    return value >= 0 && value <= 255;
}

const isValidHexColor = (color: any) => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

const rgbToHex = ({ r, g, b }: any) => {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

const convertPxsToProcents = (value: number, maxValue: number): number => {
    return Math.floor(100 * value / maxValue);
}

const convertProcentsToPxs = (value: number, maxValue: number): number => {
    return Math.floor(value * maxValue / 100);
}

const findColor = (from: any, to: any, leftDistRatio: any) => {
    return Math.round(from + (to - from) * leftDistRatio);
}

const findRgbFromMouse = (event: any, ref: any, spectrum: any) => {
    const { left, width } = ref.current.getBoundingClientRect();
    const leftDistance = Math.min(Math.max(event.pageX - left, 0), width - 1);
    const rangeWidth = width / spectrum.length;
    const includedRange = Math.floor(leftDistance / rangeWidth);
    const leftDistRatio = ((leftDistance % rangeWidth) / rangeWidth).toFixed(2);
    const { from, to } = spectrum[includedRange];
    return {
        r: findColor(from[0], to[0], leftDistRatio),
        g: findColor(from[1], to[1], leftDistRatio),
        b: findColor(from[2], to[2], leftDistRatio)
    }
}

const darken = (color: any, ratio: any) => Math.round((1 - ratio) * color);
const whiten = (color: any, ratio: any) => Math.round(color + (255 - color) * ratio);
const adjustSaturation = ({ r, g, b }: any) => (ratio: any, adjustmentFn: any) => {
    return {
        r: adjustmentFn(r, ratio),
        g: adjustmentFn(g, ratio),
        b: adjustmentFn(b, ratio)
    }
}

const saturate = (rgb: any, e: any, ref: any) => {
    console.log(rgb)
    const { top, height, left, width } = ref.current.getBoundingClientRect();
    const topDistance = Math.min(Math.max(e.pageY - top, 0), height);
    const leftDistance = Math.min(Math.max(e.pageX - left, 0), width);
    const topDistRatio: number = Number((topDistance / height).toFixed(2));
    const leftDistRatio: number = Number((leftDistance / width).toFixed(2));
    if (topDistRatio > 0) {
        const darknessRatio = topDistRatio;
        return adjustSaturation(rgb)(darknessRatio, darken);
    }
    if (leftDistRatio < .5) {
        const whitenessRatio = (.5 - leftDistRatio) / .5;
        return adjustSaturation(rgb)(whitenessRatio, whiten);
    }
    return rgb;
}

function rgbToHsv({ r, g, b }: any) {
    let rabs = r / 255;
    let gabs = g / 255;
    let babs = b / 255;
    let v = Math.max(rabs, gabs, babs);
    let diff = v - Math.min(rabs, gabs, babs);
    let diffc = (c: any) => (v - c) / 6 / diff + 1 / 2;
    let percentRoundFn = (num: any) => Math.round(num * 100 / 100);

    let h, s;

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        let rr = diffc(rabs);
        let gg = diffc(gabs);
        let bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }

        if (Number(h) < 0) {
            h = Number(h) + 1;
        } else if (Number(h) > 1) {
            h = Number(h) - 1;
        }
    }

    return {
        h: Math.round(Number(h) * 360),
        s: percentRoundFn(s * 100),
        v: percentRoundFn(v * 100)
    };
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
    const [backgroundColor, setBackgroundColor] = useState({ r: 255, g: 0, b: 0 });
    const [activColor, setActivColor] = useState({ r: 255, g: 0, b: 0 });
    const [inputHex, setInputHex] = useState("#ff0000");
    const [spectrum, setSpectrum] = useState([
        { from: [255, 255, 255], to: [255, 0, 0] }
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const [swatchPointer, setSwatchPointer] = useState(0);
    const [boxPointerLeft, setBoxPointerLeft] = useState(0);
    const [boxPointerTop, setBoxPointerTop] = useState(0);

    const { r, g, b } = backgroundColor;

    const boxRef = useRef<HTMLDivElement>(null);
    const swatchSliderRef = useRef<HTMLDivElement>(null);
    const boxPointerRef = useRef<HTMLDivElement>(null);
    const swatchPointerRef = useRef<HTMLDivElement>(null);

    const checkBox = { "--checkBox-color": colorСheckBox } as React.CSSProperties;

    const onClose = () => {
        setIsOpen(!isOpen)
    }

    const handelMouseDown = (event: any) => {

        const { id } = event.target;

        if (id === "swatchPointer" || id === "slider") {
            const { x, y } = boxRef.current?.getBoundingClientRect() || { x: 0, y: 0 };
            const rgb = findRgbFromMouse(event, swatchSliderRef, spectrumRanges);
            setSwatchPointer(
                convertPxsToProcents(
                    event.pageX - (swatchSliderRef.current?.getBoundingClientRect().left || 0),
                    swatchSliderRef.current?.clientWidth || 0
                )
            );
            setBackgroundColor(rgb);
            setSpectrum([{ from: [...spectrum[0].from], to: [rgb.r, rgb.g, rgb.b] }]);

            const rgb2 = findRgbFromMouse({
                pageX: convertProcentsToPxs(boxPointerLeft, boxRef.current?.clientWidth || 0) + x,
                pageY: convertProcentsToPxs(boxPointerTop, boxRef.current?.clientHeight || 0) + y
            }, boxRef, [{ from: [...spectrum[0].from], to: [rgb.r, rgb.g, rgb.b] }]);

            setActivColor(saturate(rgb2, {
                pageX: convertProcentsToPxs(boxPointerLeft, boxRef.current?.clientWidth || 0) + x,
                pageY: convertProcentsToPxs(boxPointerTop, boxRef.current?.clientHeight || 0) + y
            }, boxRef));
            setInputHex(rgbToHex(saturate(rgb2, {
                pageX: convertProcentsToPxs(boxPointerLeft, boxRef.current?.clientWidth || 0) + x,
                pageY: convertProcentsToPxs(boxPointerTop, boxRef.current?.clientHeight || 0) + y
            }, boxRef)));
        }

        if (id === "boxPointer" || id === "box") {
            const rgb = findRgbFromMouse(event, boxRef, spectrum);
            setBoxPointerLeft(
                convertPxsToProcents(
                    event.pageX - (boxRef.current?.getBoundingClientRect().left || 0),
                    boxRef.current?.clientWidth || 0
                )
            );
            setBoxPointerTop(
                convertPxsToProcents(
                    event.pageY - (boxRef.current?.getBoundingClientRect().top || 0),
                    boxRef.current?.clientHeight || 0
                )
            );
            setActivColor(saturate(rgb, event, boxRef));
            setInputHex(rgbToHex(saturate(rgb, event, boxRef)));
        }

        const handelMouseMove = (event: any) => {
            if (id === "swatchPointer" || id === "slider") {
                const rgb = findRgbFromMouse(event, swatchSliderRef, spectrumRanges);
                const { x, y } = boxRef.current?.getBoundingClientRect() || { x: 0, y: 0 };
                const {
                    left: rangeLeft,
                    right: rangeRight
                } = swatchSliderRef.current?.getBoundingClientRect() || { left: 0, right: 0 };
                const pageX = event.pageX <= rangeLeft
                    ? 0
                    : event.pageX >= rangeRight
                        ? rangeRight - rangeLeft
                        : event.pageX - rangeLeft;

                setSwatchPointer(
                    convertPxsToProcents(pageX, swatchSliderRef.current?.clientWidth || 0)
                );
                setBackgroundColor(rgb);
                setSpectrum([{ from: [...spectrum[0].from], to: [rgb.r, rgb.g, rgb.b] }]);

                const rgb2 = findRgbFromMouse({
                    pageX: convertProcentsToPxs(boxPointerLeft, boxRef.current?.clientWidth || 0) + x,
                    pageY: convertProcentsToPxs(boxPointerTop, boxRef.current?.clientHeight || 0) + y
                }, boxRef, [{ from: [...spectrum[0].from], to: [rgb.r, rgb.g, rgb.b] }]);

                setActivColor(saturate(rgb2, {
                    pageX: convertProcentsToPxs(boxPointerLeft, boxRef.current?.clientWidth || 0) + x,
                    pageY: convertProcentsToPxs(boxPointerTop, boxRef.current?.clientHeight || 0) + y
                }, boxRef));
                setInputHex(rgbToHex(saturate(rgb2, {
                    pageX: convertProcentsToPxs(boxPointerLeft, boxRef.current?.clientWidth || 0) + x,
                    pageY: convertProcentsToPxs(boxPointerTop, boxRef.current?.clientHeight || 0) + y
                }, boxRef)));
            }

            if (id === "boxPointer" || id === "box") {
                const rgb = findRgbFromMouse(event, boxRef, spectrum);
                const {
                    left: boxLeftSide,
                    right: boxRightSide
                } = boxRef.current?.getBoundingClientRect() || { left: 0, right: 0 };
                const pageX = event.pageX <= boxLeftSide
                    ? 0
                    : event.pageX >= boxRightSide
                        ? boxRightSide - boxLeftSide
                        : event.pageX - boxLeftSide;

                const {
                    top: boxTopSide,
                    bottom: boxBottomSide
                } = boxRef.current?.getBoundingClientRect() || { top: 0, bottom: 0 };
                const pageY = event.pageY <= boxTopSide
                    ? 0
                    : event.pageY >= boxBottomSide
                        ? boxBottomSide - boxTopSide
                        : event.pageY - boxTopSide;

                setBoxPointerLeft(
                    convertPxsToProcents(pageX, boxRef.current?.clientWidth || 0)
                );
                setBoxPointerTop(
                    convertPxsToProcents(pageY, boxRef.current?.clientHeight || 0)
                );
                setActivColor(saturate(rgb, event, boxRef));
                setInputHex(rgbToHex(saturate(rgb, event, boxRef)));
            }
        };

        const handelMouseUp = () => {
            window.removeEventListener("mousemove", handelMouseMove);
            window.removeEventListener("mouseup", handelMouseUp);
        };

        window.addEventListener("mousemove", handelMouseMove);
        window.addEventListener("mouseup", handelMouseUp);
    }

    const handleInputColor = (event: any) => {
        const { id, value } = event.target;
        let color = null;

        id === "hex" && setInputHex(value);

        if (id === "hex" && isValidHexColor(value)) {
            color = hexToRgb(value) || { r: 0, g: 0, b: 0 };
        }
        if (id === "r" && isValidRgbColor(value)) {
            color = { ...activColor, r: Number(value) };
        }
        if (id === "g" && isValidRgbColor(value)) {
            color = { ...activColor, g: Number(value) };
        }
        if (id === "b" && isValidRgbColor(value)) {
            color = { ...activColor, b: Number(value) };
        }

        if (color) {
            const { h, s, v } = rgbToHsv(color);
            const x = convertPxsToProcents(h, 360);
            const pageX = convertProcentsToPxs(x, swatchSliderRef.current?.clientWidth || 0);
            const refX = swatchSliderRef.current?.getBoundingClientRect().x || 0;
            const rgb = findRgbFromMouse({ pageX: pageX + refX }, swatchSliderRef, spectrumRanges);

            setActivColor(color);
            (id === "r" || id === "g" || id === "b") && setInputHex(rgbToHex(color));
            setSwatchPointer(x);
            setBoxPointerLeft(s);
            setBoxPointerTop(100 - v);
            setBackgroundColor(rgb);
            setSpectrum([{ from: [...spectrum[0].from], to: [rgb.r, rgb.g, rgb.b] }]);
        }
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
                    onMouseDown={handelMouseDown}
                    style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
                    className="color-selector__color-custom_box">
                    <div
                        ref={boxPointerRef}
                        id="boxPointer"
                        style={{ left: `${boxPointerLeft}% `, top: `${boxPointerTop}% `, backgroundColor: `rgb(${activColor.r}, ${activColor.g}, ${activColor.b})` }}
                        onMouseDown={handelMouseDown}
                        className="color-selector__color-custom_box_pointer"></div>
                </div>
                <div className="color-selector__color-custom_slider">
                    <div
                        style={{ backgroundColor: `rgb(${activColor.r}, ${activColor.g}, ${activColor.b})` }}
                        className="color-selector__color-custom_slider_swatch"></div>
                    <div
                        ref={swatchSliderRef}
                        id="slider"
                        onMouseDown={handelMouseDown}
                        className="color-selector__color-custom_slider_swatch-slider">
                        <div
                            ref={swatchPointerRef}
                            id="swatchPointer"
                            style={{ left: `${swatchPointer}% `, backgroundColor: `rgb(${r}, ${g}, ${b})` }}
                            onMouseDown={handelMouseDown}
                            className="color-selector__color-custom_slider_swatch-slider_pointer"></div>
                    </div>
                </div>
                <div className="color-selector__color-custom-information">
                    <div className="color-selector__color-custom-information-hex">
                        <input
                            className="hex-input"
                            id="hex"
                            value={inputHex}
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