import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Clock = (props) => {
    const { strokeColor= "#000" } = props
    return (
    <Svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <Path
            d="M7 12.833A5.833 5.833 0 1 0 7 1.167a5.833 5.833 0 0 0 0 11.666Z"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M7 3.5V7l2.333 1.167"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);}

export default Clock;
