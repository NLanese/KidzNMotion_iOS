import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FilterSvg = ( props) => {

    const { strokeColor = "#3B5999", fillColor = "#666" } = props
    
    return(
    <Svg
        width={14}
        height={14}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M.875 10.938h.062a1.742 1.742 0 0 1 3.376 0h8.812a.438.438 0 0 1 0 .874H4.313a1.742 1.742 0 0 1-3.376 0H.875a.437.437 0 1 1 0-.874Zm1.75 1.312a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75Zm10.5-4.813h-.062a1.742 1.742 0 0 1-3.376 0H.875a.437.437 0 1 1 0-.875h8.812a1.742 1.742 0 0 1 3.376 0h.062a.438.438 0 0 1 0 .875Zm-1.75-1.312a.875.875 0 1 0 0 1.75.875.875 0 0 0 0-1.75Zm1.75-3.063H8.688a1.742 1.742 0 0 1-3.376 0H.875a.437.437 0 1 1 0-.875h4.437a1.742 1.742 0 0 1 3.376 0h4.437a.438.438 0 0 1 0 .875ZM7 1.75A.875.875 0 1 0 7 3.5a.875.875 0 0 0 0-1.75Z"
            fill={fillColor}
        />
    </Svg>
);}

export default FilterSvg;
