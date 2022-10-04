import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Star = (props) => {
    const { strokeColor = "#111", fillColor = "#FFC700" } = props
    return (
    <Svg width={10} height={9} fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
            d="m5 .833 1.287 2.609 2.88.42-2.084 2.03.492 2.866L5 7.404 2.425 8.758l.492-2.866-2.084-2.03 2.88-.42L5 .833Z"
            fill={fillColor}
        />
    </Svg>
);}

export default Star;
