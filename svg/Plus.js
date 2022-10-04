import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Plus = (  props) => {
    const { strokeColor = "#111", fillColor = "#111" } = props
    return (
    <Svg
        width={12}
        height={12}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M6.612 0v5.124h4.884v1.62H6.612v5.16H4.86v-5.16H0v-1.62h4.86V0h1.752Z"
            fill={fillColor}
        />
    </Svg>
);
}
export default Plus;
