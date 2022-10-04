import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SelectSvg = ( props) => {
    const { strokeColor = "#111", fillColor = "#111" } = props
    return (
    <Svg
        width={13}
        height={13}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M5.246 11.836c.022.018.035.042.058.058.033.022.07.027.105.042.041.02.082.039.125.05.043.011.084.017.128.02a.728.728 0 0 0 .183-.002.76.76 0 0 0 .288-.107c.012-.008.021-.017.033-.024.045-.031.093-.054.131-.096.027-.03.04-.068.061-.1l.004-.004 6.495-10.474A.77.77 0 0 0 12.36.024a.759.759 0 0 0-.78.335l-6 9.673-3.318-3.247a.762.762 0 0 0-1.28.593.771.771 0 0 0 .244.533l3.992 3.908c.008.007.019.01.028.017Z"
            fill={fillColor}
        />
    </Svg>
);}

export default SelectSvg;
