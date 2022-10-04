import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const EllipseSvg = (props) => {
    const { strokeColor = "#333", fillColor = "#FED7C7" } = props
    return (
    <Svg width={80} height={60} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <Circle cx={50} cy={50} r={50} fill={fillColor} />
    </Svg>
);}

export default EllipseSvg;
