import * as React from "react";
import Svg, { Path } from "react-native-svg";

const BookOpenTab = (props) => {
    const { strokeColor = "#000" } = props;
    return (
    <Svg width={28} height={28} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <Path
            d="M2.333 3.5h7A4.666 4.666 0 0 1 14 8.167V24.5a3.5 3.5 0 0 0-3.5-3.5H2.333V3.5Z"
            stroke={strokeColor}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M25.667 3.5h-7A4.667 4.667 0 0 0 14 8.167V24.5a3.5 3.5 0 0 1 3.5-3.5h8.167V3.5Z"
            stroke={strokeColor}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);}

export default BookOpenTab;
