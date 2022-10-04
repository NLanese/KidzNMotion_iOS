import * as React from "react"
import Svg, { Defs, Path, G, Mask, Use } from "react-native-svg"

const Message = (  props) => {
  const { strokeColor = "#111", fillColor = "#FFF", style } = props
  return (
  <Svg
    width={40}
    height={39}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={style}
    {...props}
  >
    <Defs>
      <Path id="a" d="M0 0h40v38H0z" />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <G transform="translate(0 .333)">
        <Mask id="b" fill="#FFF">
          <Use xlinkHref="#a" />
        </Mask>
        <Path
          d="M5.218 4.578a.676.676 0 0 0-.672.678v18.79c0 .373.301.677.672.677h14.795c1.322 0 2.585.5 3.554 1.407l4.615 4.325v-.476c0-2.898 2.341-5.256 5.218-5.256h1.382a.676.676 0 0 0 .672-.678V5.256a.676.676 0 0 0-.672-.678H5.218ZM30.455 38a2.26 2.26 0 0 1-1.548-.614l-8.435-7.903a.67.67 0 0 0-.459-.182H5.218C2.341 29.301 0 26.943 0 24.045V5.256C0 2.358 2.341 0 5.218 0h29.564C37.659 0 40 2.358 40 5.256v18.79c0 2.897-2.341 5.255-5.218 5.255H33.4a.676.676 0 0 0-.672.678v5.732a2.29 2.29 0 0 1-1.366 2.099c-.292.127-.6.19-.907.19Z"
          fill={fillColor}
          mask="url(#b)"
        />
      </G>
      <Path
        d="M12.5 18.333a2.503 2.503 0 0 1-2.5-2.5c0-1.378 1.122-2.5 2.5-2.5s2.5 1.122 2.5 2.5c0 1.379-1.122 2.5-2.5 2.5ZM20.5 18.333a2.503 2.503 0 0 1-2.5-2.5c0-1.378 1.122-2.5 2.5-2.5s2.5 1.122 2.5 2.5c0 1.379-1.122 2.5-2.5 2.5ZM28.5 18.333a2.503 2.503 0 0 1-2.5-2.5c0-1.378 1.122-2.5 2.5-2.5s2.5 1.122 2.5 2.5c0 1.379-1.122 2.5-2.5 2.5Z"
        fill={fillColor}
      />
    </G>
  </Svg>
)}

export default Message
