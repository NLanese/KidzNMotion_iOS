
import * as React from "react"
import Svg, { Path } from "react-native-svg"

const UpCarrot = (props) => {
    const {strokeColor = "#FFF", fillColor = "#FFF"} = props
    return(
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill={fillColor}
    className="bi bi-chevron-up"
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
    />
  </Svg>
)}

export default UpCarrot