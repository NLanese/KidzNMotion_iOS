import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const PlayBtn = (props) => {

    const { strokeColor = "#111", fillColor = "#111" } = props
    return (
    <Svg
        width={16}
        height={16}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={8} cy={8} r={7.5} stroke={strokeColor} />
        <Path
            d="M10.5 7.134a1 1 0 0 1 0 1.732l-3 1.732A1 1 0 0 1 6 9.732V6.268a1 1 0 0 1 1.5-.866l3 1.732Z"
            fill={fillColor}
        />
    </Svg>
);}

export default PlayBtn;
