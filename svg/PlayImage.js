import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const PlayImage = (props) =>{ 
    const { strokeColor = "#fff", fillColor = "#fff" } = props
    return (
    <Svg
        width={50}
        height={50}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={25} cy={25} r={24} stroke={strokeColor} strokeWidth={2} />
        <Path
            d="M33.5 24.134a1 1 0 0 1 0 1.732l-12 6.928a1 1 0 0 1-1.5-.866V18.072a1 1 0 0 1 1.5-.866l12 6.928Z"
            fill={fillColor}
        />
    </Svg>
);}

export default PlayImage;
