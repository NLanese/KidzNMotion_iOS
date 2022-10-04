import * as React from "react";
import Svg, { Mask, Path } from "react-native-svg";

const CourseUserSvg = (  props) => {
    const { strokeColor = "#333", fillColor = "#fff" } = props
    return (
    <Svg
        width={17}
        height={17}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Mask id="a" fill="#FFF">
            <Path d="M15.583 17v-1.889a3.909 3.909 0 0 0-1.037-2.671 3.433 3.433 0 0 0-2.504-1.107H4.958c-.939 0-1.84.398-2.504 1.107a3.91 3.91 0 0 0-1.037 2.671V17" />
        </Mask>
        <Path
            d="M14.483 17a1.1 1.1 0 1 0 2.2 0h-2.2Zm-2.441-5.667v-1.1 1.1Zm-7.084 0v-1.1 1.1Zm-3.541 3.778h-1.1 1.1ZM.317 17a1.1 1.1 0 1 0 2.2 0h-2.2Zm16.366 0v-1.889h-2.2V17h2.2Zm0-1.889a5.01 5.01 0 0 0-1.334-3.424l-1.605 1.505a2.81 2.81 0 0 1 .74 1.92h2.2Zm-1.334-3.424a4.533 4.533 0 0 0-3.307-1.454v2.2c.624 0 1.237.264 1.702.76l1.605-1.505Zm-3.307-1.454H4.958v2.2h7.084v-2.2Zm-7.084 0a4.533 4.533 0 0 0-3.306 1.454l1.605 1.505a2.334 2.334 0 0 1 1.701-.759v-2.2Zm-3.306 1.454a5.01 5.01 0 0 0-1.335 3.424h2.2c0-.732.273-1.421.74-1.919l-1.605-1.505ZM.317 15.111V17h2.2v-1.889h-2.2Z"
            fill={strokeColor}
            mask="url(#a)"
        />
        <Path
            d="M12.2 4.958a3.7 3.7 0 1 1-7.4 0 3.7 3.7 0 0 1 7.4 0Z"
            stroke={strokeColor}
            strokeWidth={1.1}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);}

export default CourseUserSvg;
