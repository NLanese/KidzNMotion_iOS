import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const CheckoutArrowSvg = ( props) => {
    const  { strokeColor = "#333", fillColor = "#fff" } = props
    return (
    <Svg
        width={6}
        height={10}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                d="M.75 9.286 5.25 5 .75.714"
                stroke={strokeColor}
                strokeWidth={1.2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path
                    fill={fillColor}
                    transform="matrix(-1 0 0 1 6 0)"
                    d="M0 0h6v10H0z"
                />
            </ClipPath>
        </Defs>
    </Svg>
);}

export default CheckoutArrowSvg;
