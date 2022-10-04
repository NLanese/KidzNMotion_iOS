import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ShoppingCart = ( props) => {
    const { strokeColor = "#fff", fillColor = "#111" } = props
    return (
    <Svg
        width={50}
        height={50}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M.822 8.969c.551-4.315 3.904-7.272 8.214-7.864A118.651 118.651 0 0 1 25 0c6.32 0 11.91.547 15.964 1.105 4.31.592 7.663 3.549 8.214 7.864C49.624 12.464 50 17.603 50 25c0 7.397-.376 12.536-.822 16.032-.551 4.314-3.904 7.27-8.214 7.863A118.638 118.638 0 0 1 25 50c-6.32 0-11.91-.547-15.964-1.105-4.31-.592-7.663-3.549-8.214-7.864C.376 37.537 0 32.398 0 25c0-7.397.376-12.536.822-16.031Z"
            fill={fillColor}
        />
        <Path
            d="M22 35a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM33 35a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM14 14h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L36 19H19"
            stroke={strokeColor}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);}

export default ShoppingCart;
