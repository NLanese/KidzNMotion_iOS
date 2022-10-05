import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

const MedalLarge = (props) => {
  const {fillColor, width=97, height=97} = props
  return (
  <Svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" {...props}>
    
    <G fill={fillColor} fillRule="evenodd">
      <Path d="M53.406 42.564 48.998 34l-4.408 8.564c-.53 1.026-1.55 1.74-2.732 1.903L32 45.84l7.133 6.668a3.399 3.399 0 0 1 1.045 3.078L38.491 65l8.82-4.445a3.761 3.761 0 0 1 1.687-.397c.58 0 1.161.132 1.687.397L59.505 65l-1.683-9.413a3.396 3.396 0 0 1 1.041-3.078L66 45.84l-9.861-1.374c-1.183-.164-2.203-.877-2.733-1.903" />
      <Path d="M48.5 90.071c-22.923 0-41.571-18.648-41.571-41.571S25.577 6.929 48.5 6.929 90.071 25.577 90.071 48.5 71.423 90.071 48.5 90.071M48.5 0C21.822 0 0 21.7 0 48.5 0 75.244 21.756 97 48.5 97S97 75.244 97 48.5C97 21.68 75.158 0 48.5 0" />
      <Path d="m65.273 55.596 2.441 14.233a3.41 3.41 0 0 1-1.353 3.325 3.405 3.405 0 0 1-3.58.258L50 66.694l-12.78 6.718a3.406 3.406 0 0 1-3.58-.258 3.403 3.403 0 0 1-1.354-3.325l2.441-14.233-10.34-10.077a3.401 3.401 0 0 1 1.888-5.8l14.287-2.075 6.388-12.947c1.146-2.322 4.954-2.322 6.1 0l6.388 12.947 14.287 2.074a3.398 3.398 0 0 1 2.744 2.316 3.4 3.4 0 0 1-.857 3.485l-10.34 10.077ZM50 16c-18.748 0-34 15.252-34 34 0 18.751 15.252 34 34 34 18.748 0 34-15.249 34-34 0-18.748-15.252-34-34-34Z" />
    </G>
  </Svg>
)}

export default MedalLarge