import * as React from "react";
import Svg, { G, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const Facebook = ( props) => {
    const { strokeColor = "#3B5999", fillColor = "#fff" } = props
    return(
    <Svg
        width={80}
        height={80}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G opacity={0.3} filter="url(#a)">
            <Path
                d="M10.846 17.928C11.521 12 16.093 7.933 22.01 7.17A142.2 142.2 0 0 1 40 6a142.2 142.2 0 0 1 17.99 1.17c5.917.763 10.49 4.83 11.164 10.758C69.625 22.074 70 27.913 70 36s-.375 13.926-.846 18.072C68.48 60 63.907 64.067 57.99 64.83A142.204 142.204 0 0 1 40 66c-6.995 0-13.244-.559-17.99-1.17-5.917-.763-10.49-4.83-11.164-10.758C10.375 49.926 10 44.087 10 36s.375-13.926.846-18.072Z"
                fill={fillColor}
            />
        </G>
        <Path
            d="M44.25 26.004 41.655 26c-2.914 0-4.797 1.932-4.797 4.922v2.27h-2.608a.408.408 0 0 0-.407.407v3.289c0 .225.182.407.407.407h2.608v8.297c0 .226.182.408.408.408h3.402a.408.408 0 0 0 .408-.408v-8.297h3.049a.408.408 0 0 0 .408-.407l.001-3.289a.409.409 0 0 0-.408-.408h-3.05v-1.923c0-.925.22-1.394 1.425-1.394l1.747-.001a.408.408 0 0 0 .407-.408v-3.053a.408.408 0 0 0-.407-.408Z"
            fill={strokeColor}
        />
        <Defs></Defs>
    </Svg>
);}

export default Facebook;
