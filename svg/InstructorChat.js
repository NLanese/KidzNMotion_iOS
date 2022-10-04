import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const InstructorChat = (  props) => {
    const { strokeColor = "#111", fillColor = "#fff" } = props
    return (
    <Svg
        width={10}
        height={10}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                d="M0 1.25A1.25 1.25 0 0 1 1.25 0h7.5A1.25 1.25 0 0 1 10 1.25v5A1.25 1.25 0 0 1 8.75 7.5H2.759a.625.625 0 0 0-.442.183L.534 9.466A.312.312 0 0 1 0 9.246V1.25Zm2.188.625a.312.312 0 1 0 0 .625h5.624a.312.312 0 1 0 0-.625H2.188Zm0 1.563a.312.312 0 1 0 0 .624h5.624a.312.312 0 1 0 0-.625H2.188Zm0 1.562a.312.312 0 1 0 0 .625h3.124a.312.312 0 1 0 0-.625H2.188Z"
                fill="#111"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill={fillColor} d="M0 0h10v10H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);}

export default InstructorChat;
