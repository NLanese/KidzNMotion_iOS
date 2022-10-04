import * as React from "react"
import Svg, { Circle } from "react-native-svg"

import Check from "./Check"

const CircleSvg = (props) => {
  const {strokeColor = "#FFF", children} = props
  return(
  <Svg width={29} height={29} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Circle
      cx={331.5}
      cy={378.5}
      r={14}
      fill="none"
      transform="translate(-317 -364)"
      stroke={strokeColor}
      fillRule="evenodd"
      fillOpacity={0}
    />
    {/* {props.selected &&  <Check strokeColor={strokeColor}  style={{transform: [{ scale: 2 }, {translateX: 13.5}]}} />} */}
    {props.selected && children}
  </Svg>
)}

export default CircleSvg
