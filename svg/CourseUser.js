import * as React from "react";
import Svg, { G, Mask, Path, Defs, ClipPath } from "react-native-svg";

const CourseUser = ( props) => {
    const { strokeColor = "#fff", fillColor = "#fff" } = props
    return (
    <Svg
        width={12}
        height={13}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G opacity={0.8} clipPath="url(#a)">
            <Mask id="b" fill={fillColor}>
                <Path d="M11 12.5v-1.333a2.76 2.76 0 0 0-.732-1.886A2.424 2.424 0 0 0 8.5 8.5h-5c-.663 0-1.299.281-1.768.781A2.76 2.76 0 0 0 1 11.167V12.5" />
            </Mask>
            <Path
                d="M10.4 12.5a.6.6 0 1 0 1.2 0h-1.2Zm-1.9-4v-.6.6Zm-5 0v-.6.6ZM1 11.167H.4 1ZM.4 12.5a.6.6 0 1 0 1.2 0H.4Zm11.2 0v-1.333h-1.2V12.5h1.2Zm0-1.333a3.36 3.36 0 0 0-.894-2.296l-.876.82c.361.385.57.915.57 1.476h1.2Zm-.894-2.296A3.023 3.023 0 0 0 8.5 7.9v1.2c.491 0 .97.208 1.33.591l.876-.82ZM8.5 7.9h-5v1.2h5V7.9Zm-5 0c-.835 0-1.628.354-2.205.97l.875.821c.36-.383.839-.591 1.33-.591V7.9Zm-2.205.97A3.36 3.36 0 0 0 .4 11.168h1.2c0-.56.209-1.09.57-1.476l-.875-.82ZM.4 11.168V12.5h1.2v-1.333H.4Z"
                fill={fillColor}
                mask="url(#b)"
            />
            <Path
                d="M8.7 4a2.7 2.7 0 1 1-5.4 0 2.7 2.7 0 0 1 5.4 0Z"
                stroke={strokeColor}
                strokeWidth={0.6}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path
                    fill={fillColor}
                    transform="translate(0 .5)"
                    d="M0 0h12v12H0z"
                />
            </ClipPath>
        </Defs>
    </Svg>
);}

export default CourseUser;
