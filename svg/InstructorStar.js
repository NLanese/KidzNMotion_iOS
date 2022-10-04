import * as React from "react";
import Svg, { Path } from "react-native-svg";

const InstructorStar = (  props) => {
    const { strokeColor = "#111", fillColor = "#111" } = props
    return (
    <Svg
        width={10}
        height={10}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="m5 0 1.545 3.291L10 3.822l-2.5 2.56L8.09 10 5 8.291 1.91 10l.59-3.617L0 3.823l3.455-.532L5 0Z"
            fill={fillColor}
        />
    </Svg>
);}

export default InstructorStar;
