import * as React from "react"
import Svg, { Defs, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const MedalSilver = ( props) =>{ 
  const  { strokeColor = "#111", fillColor = "#AEAEAE" } = props
  return (
  <Svg width={58} height={58} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Defs></Defs>
    <G
      filter="url(#a)"
      transform="translate(9 9)"
      fill={fillColor}
      fillRule="evenodd"
    >
      <Path d="M22.185 16.591 20.499 13l-1.685 3.591c-.203.43-.593.73-1.045.798L14 17.965l2.727 2.797c.326.334.476.817.4 1.29L16.482 26l3.372-1.864a1.335 1.335 0 0 1 1.29 0L24.517 26l-.644-3.947a1.509 1.509 0 0 1 .398-1.291L27 17.965l-3.77-.576a1.394 1.394 0 0 1-1.045-.798" />
      <Path d="M20 37.143c-9.453 0-17.143-7.69-17.143-17.143S10.547 2.857 20 2.857 37.143 10.547 37.143 20 29.453 37.143 20 37.143M20 0C8.999 0 0 8.949 0 20c0 11.029 8.971 20 20 20s20-8.971 20-20C40 8.94 30.993 0 20 0" />
      <Path d="m26.289 22.304 1.005 5.86a1.402 1.402 0 0 1-2.031 1.476L20 26.874l-5.263 2.766a1.401 1.401 0 0 1-2.031-1.476l1.005-5.86-4.257-4.15a1.4 1.4 0 0 1 .777-2.388l5.883-.854 2.63-5.33c.472-.957 2.04-.957 2.512 0l2.63 5.33 5.883.854a1.4 1.4 0 0 1 .777 2.388l-4.257 4.15ZM20 6C12.28 6 6 12.28 6 20c0 7.721 6.28 14 14 14s14-6.279 14-14c0-7.72-6.28-14-14-14Z" />
    </G>
  </Svg>
)}

export default MedalSilver

