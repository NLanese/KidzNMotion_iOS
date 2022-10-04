import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const QuestionClose = (  props) => {
    const { strokeColor = "#111", fillColor = "#fff" } = props
    return (
    <Svg
        width={11}
        height={6}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                d="m.857.857 4.286 4.286L9.429.857"
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
                    transform="matrix(0 -1 -1 0 10.143 5.857)"
                    d="M0 0h5.714v10H0z"
                />
            </ClipPath>
        </Defs>
    </Svg>
);}

export default QuestionClose;
