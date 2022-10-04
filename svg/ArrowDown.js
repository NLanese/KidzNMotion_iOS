import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ArrowDown = (props) => {
    const { strokeColor = "#000", fillColor = "#111" } = props
    return(
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill={fillColor}
            className="bi bi-chevron-down"
            {...props}
        >
            <Path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
        </Svg>
    )}

export default ArrowDown
