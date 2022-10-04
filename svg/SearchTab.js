import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SearchTab = ( props) => {
    const { strokeColor = "#111", fillColor = "#111" } = props
    
    return (
    <Svg width={28} height={28} fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.833 4.375a8.458 8.458 0 1 0 0 16.917 8.458 8.458 0 0 0 0-16.917ZM2.625 12.833c0-5.638 4.57-10.208 10.208-10.208s10.209 4.57 10.209 10.208-4.57 10.209-10.209 10.209c-5.638 0-10.208-4.57-10.208-10.209Z"
            fill={fillColor}
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.342 19.342a1.167 1.167 0 0 1 1.65 0l5.075 5.075a1.167 1.167 0 0 1-1.65 1.65l-5.075-5.075a1.167 1.167 0 0 1 0-1.65Z"
            fill={fillColor}
        />
    </Svg>
);}

export default SearchTab;
