import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Heart = ( props) => {
    const { strokeColor = "#000", fillColor = "none" } = props
    return (
    <Svg width={20} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <Path
            d="M17.367 2.842a4.584 4.584 0 0 0-6.484 0L10 3.725l-.883-.883a4.584 4.584 0 1 0-6.484 6.483l.884.883L10 16.692l6.483-6.484.884-.883a4.584 4.584 0 0 0 0-6.483v0Z"
            fill={fillColor}
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);}

export default Heart;
