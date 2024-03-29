import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

const ClientLogo = (props) => {
    const { strokeColor= "#000", fillColor = "#FFF" } = props
    
    return (
  <Svg width={76} height={76} xmlns="http://www.w3.org/2000/svg" {...props}>
    <G fill={fillColor} fillRule="evenodd" transform="scale(0.3)" offset="100, 100">
      <Path d="m62.483 19.957-6.47-6.474 4.313-4.317 6.47 6.475-4.313 4.316ZM25.546 43.973l25.077-25.095 6.469 6.474-25.077 25.095-8.823 2.354 2.354-8.828Zm49.337-31.03L63.022 1.073c-1.43-1.43-3.962-1.43-5.39 0L19.43 39.304c-.054.053-.09.115-.14.17-.09.103-.178.205-.258.317a3.597 3.597 0 0 0-.198.314c-.06.106-.119.21-.17.323a3.687 3.687 0 0 0-.147.39c-.022.069-.057.13-.076.2l-4.313 16.186A3.817 3.817 0 0 0 17.812 62c.328 0 .658-.042.983-.129l16.173-4.316c.07-.02.132-.053.2-.076a3.81 3.81 0 0 0 .39-.147 3.99 3.99 0 0 0 .324-.17c.106-.062.21-.124.312-.196.114-.083.22-.172.323-.266.054-.047.113-.083.164-.133l38.202-38.229a3.816 3.816 0 0 0 0-5.395Z" />
      <Path d="M62.821 76H3.462C1.36 76 0 73.955 0 71.853v-59.36C0 10.393 1.36 9 3.462 9h25.114c2.101 0 3.804 1.727 3.804 3.829 0 2.101-1.703 3.828-3.805 3.828H7.658v51.686h51.686V46.739c0-2.102 1.727-3.804 3.828-3.804S67 44.637 67 46.739v25.114C67 73.955 64.923 76 62.821 76" />
    </G>
  </Svg>
)}

export default ClientLogo
