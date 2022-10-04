import * as React from "react"
import Svg, { Defs, Path, Mask, Use, G } from "react-native-svg"

const GreenPlay = (  props) => {
  const { strokeColor = "#48AC11", fillColor = "#fff" } = props
  return (
  <Svg
    width={50}
    height={50}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Defs>
      <Path
        d="M25 50c13.807 0 25-11.193 25-25 0-3.42-.687-6.678-1.93-9.647C44.297 6.335 35.389 0 25 0 11.193 0 0 11.193 0 25s11.193 25 25 25Z"
        id="a"
      />
      <Mask
        id="b"
        maskContentUnits="userSpaceOnUse"
        maskUnits="objectBoundingBox"
        x={0}
        y={0}
        width={50}
        height={50}
        fill={fillColor}
      >
        <Use xlinkHref="#a" />
      </Mask>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Use
        stroke={strokeColor}
        mask="url(#b)"
        strokeWidth={4}
        strokeDasharray="0,0"
        xlinkHref="#a"
      />
      <Path
        d="m35.211 25.894-16.764 8.382A1 1 0 0 1 17 33.382V16.618a1 1 0 0 1 1.447-.894l16.764 8.382a1 1 0 0 1 0 1.788Z"
        fill={strokeColor}
      />
    </G>
  </Svg>
)}

export default GreenPlay
