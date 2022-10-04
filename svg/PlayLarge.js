import * as React from "react"
import Svg, { Defs, Path, G, Mask, Use } from "react-native-svg"

const PlayLarge = (props) => {
  const { strokeColor = "#fff", fillColor = "#fff" } = props
  return (
  <Svg
    width={60}
    height={63}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Defs>
      <Path id="a" d="M0 0h60v63H0z" />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="b" fill="#FFF">
        <Use xlinkHref="#a" />
      </Mask>
      <Path
        d="M9.614 12.732v37.536l35.379-18.769L9.614 12.732ZM4.808 63a4.836 4.836 0 0 1-2.472-.68A4.763 4.763 0 0 1 0 58.229V4.772C0 3.094.886 1.541 2.336.678A4.842 4.842 0 0 1 7.073.563L57.458 27.29A4.766 4.766 0 0 1 60 31.5c0 1.762-.977 3.38-2.542 4.21L7.073 62.437A4.833 4.833 0 0 1 4.808 63Z"
        fill={fillColor}
        mask="url(#b)"
      />
    </G>
  </Svg>
)}

export default PlayLarge
