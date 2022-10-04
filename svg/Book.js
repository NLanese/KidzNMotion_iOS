import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const Book = ( props) => {
    const { fillColor = "#fff" } = props
    return (
    <Svg
        width={12}
        height={13}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G opacity={0.8} clipPath="url(#a)">
            <Path
                d="M10.775 12.125c.1.15-.025.375-.2.375H2.7c-.9 0-1.525-.75-1.525-1.525V2.25c0-.975.775-1.75 1.75-1.75h6.9c.55 0 1 .45 1 1v8.2c0 .15-.825 1.075-.05 2.425Zm-9.1-2.275c.275-.25.625-.4 1.025-.4h.825V1h-.6c-.7 0-1.25.55-1.25 1.25v7.6Zm2.575 1.125c0-.15.1-.25.25-.25h5.475c.025-.25.1-.525.2-.775H2.7c-.575 0-1.025.45-1.025 1.025S2.125 12 2.7 12h7.45c-.1-.25-.175-.525-.2-.775H4.5a.25.25 0 0 1-.25-.25ZM10.325 1.5c0-.275-.225-.5-.5-.5h-5.8v8.45h6.3V1.5Z"
                fill={fillColor}
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

export default Book;
