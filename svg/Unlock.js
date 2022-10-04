import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const Unlock = ( props) => {
    const { strokeColor = "#8774FE", fillColor = "#fff" } = props
    return (
    <Svg
        width={16}
        height={16}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.523.01A4.69 4.69 0 0 0 5.597.7c-.285.187-.37.256-.693.568-.768.74-1.238 1.799-1.247 2.813-.004.406.02.472.231.626.132.097.456.097.588 0 .19-.14.226-.221.256-.596.051-.645.21-1.122.538-1.606a3.264 3.264 0 0 1 2.577-1.437c1.55-.077 2.903.905 3.332 2.419.067.236.074.354.086 1.58l.013 1.327H7.31c-4.333 0-4.182-.007-4.526.19-.222.128-.464.36-.58.559-.212.363-.205.224-.205 4.054 0 3.849-.008 3.702.215 4.064.126.206.352.423.57.548.347.2.126.19 5.215.19 5.083 0 4.85.01 5.222-.19.192-.1.454-.36.582-.576.201-.336.196-.228.196-4.036 0-3.808.005-3.7-.196-4.036-.129-.216-.39-.475-.582-.577a1.789 1.789 0 0 0-.71-.19h-.143l-.015-1.376c-.014-1.243-.022-1.404-.085-1.66C11.848 1.654 10.576.43 8.852.071c-.249-.052-1.09-.09-1.33-.06Zm5.171 7.516c.228.136.215-.089.215 3.67 0 3.76.013 3.535-.215 3.671-.107.064-.206.065-4.694.065-4.488 0-4.588-.001-4.694-.065-.228-.136-.215.09-.215-3.67s-.013-3.535.215-3.67c.106-.064.206-.066 4.694-.066 4.488 0 4.588.002 4.694.065Z"
                fill={strokeColor}
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill={fillColor} d="M0 0h16v16H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);}

export default Unlock;
