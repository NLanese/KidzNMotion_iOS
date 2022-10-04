import * as React from "react"
import Svg, { Defs, Path, G, Mask, Use } from "react-native-svg"

const HomeTabTwo = (  props) => {
  
  const { strokeColor = "#111", fillColor = "#111" } = props
  return (
  <Svg
    width={29}
    height={31}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Defs>
      <Path id="a" d="M0 0h29v31H0z" />
      <Path id="c" d="M0 31h29V0H0z" />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="b" fill="#fff">
        <Use xlinkHref="#a" />
      </Mask>
      <Path
        d="M3.249 27.69H25.75V15.457L14.501 3.995 3.248 15.457V27.69ZM27.375 31H1.625C.726 31 0 30.26 0 29.345V14.772c0-.439.171-.86.476-1.17L13.352.485a1.603 1.603 0 0 1 2.297 0l12.875 13.117c.305.31.476.731.476 1.17v14.573c0 .914-.727 1.655-1.625 1.655Z"
        fill={fillColor}
        mask="url(#b)"
      />
      <Mask id="d" fill="#fff">
        <Use xlinkHref="#c" />
      </Mask>
      <Path
        d="M10.333 27.667h7.334v-7.334h-7.334v7.334Zm9 3.333H8.666C7.746 31 7 30.254 7 29.334V18.667C7 17.747 7.746 17 8.666 17h10.667c.92 0 1.667.746 1.667 1.667v10.667c0 .92-.746 1.666-1.667 1.666Z"
        fill={fillColor}
        mask="url(#d)"
      />
    </G>
  </Svg>
)}

export default HomeTabTwo

