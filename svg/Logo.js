import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Logo = (  props ) => {
  const { strokeColor = "#111", fillColor = "#111" } = props
  return(
  <Svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M.326 6.9C.663 3.337 3.384.881 6.94.47A70.846 70.846 0 0 1 15 0c3.055 0 5.826.213 8.06.47 3.556.411 6.277 2.867 6.614 6.43.188 1.99.326 4.631.326 8.1 0 3.469-.138 6.11-.326 8.1-.337 3.563-3.058 6.019-6.614 6.429-2.234.258-5.005.47-8.06.47a70.86 70.86 0 0 1-8.06-.47c-3.556-.41-6.277-2.866-6.614-6.43C.138 21.11 0 18.47 0 15 0 11.532.138 8.89.326 6.9Z"
      fill={fillColor}
      fillRule="nonzero"
    />
  </Svg>
)}

export default Logo
