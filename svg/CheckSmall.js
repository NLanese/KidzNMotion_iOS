import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CheckSmall = ( props) => {
    const { strokeColor = "#333" } = props
    
    return (
    <Svg
        width={10}
        height={8}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M8.633 1.7 3.5 6.833 1.167 4.5"
            stroke={strokeColor}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);}

export default CheckSmall;
