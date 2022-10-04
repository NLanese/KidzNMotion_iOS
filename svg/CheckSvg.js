import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

const CheckSvg = (props) => {
    const {fillColor = "#111" } = props
    return (
    <Svg
        width={16}
        height={16}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Rect x={3} y={3} width={10} height={10} rx={2} fill={fillColor} />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4Zm0 1h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
            fill="#111"
        />
    </Svg>
);}

export default CheckSvg;
