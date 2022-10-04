import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Reload = ( props) => {
    const { strokeColor = "#111", fillColor = "#fff" } = props
    return (
    <Svg
        width={12}
        height={13}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M11.075 6.137c-.2 0-.363.163-.363.363A4.718 4.718 0 0 1 6 11.213 4.718 4.718 0 0 1 1.287 6.5 4.718 4.718 0 0 1 6 1.787c1.482 0 2.874.705 3.758 1.87l-1.849-.505a.362.362 0 1 0-.191.7l2.851.78a.361.361 0 0 0 .457-.38l-.228-2.856a.363.363 0 0 0-.723.058l.128 1.601A5.456 5.456 0 0 0 6 1.062 5.444 5.444 0 0 0 .562 6.5 5.444 5.444 0 0 0 6 11.938 5.444 5.444 0 0 0 11.438 6.5c0-.2-.163-.363-.363-.363Z"
            fill={fillColor}
            opacity={0.8}
        />
    </Svg>
);}

export default Reload;
