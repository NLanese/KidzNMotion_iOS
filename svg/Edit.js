import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Edit = ( props) => {
    const { strokeColor = "#333", fillColor = "#8774FE" } = props
    return (
    <Svg
        width={16}
        height={16}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M8 13.333h6M11 2.333a1.414 1.414 0 1 1 2 2l-8.333 8.334L2 13.333l.667-2.666L11 2.333Z"
            stroke={strokeColor}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);}

export default Edit;
