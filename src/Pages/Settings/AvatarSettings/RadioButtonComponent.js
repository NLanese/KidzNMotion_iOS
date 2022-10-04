import React, { useState } from "react";
import BouncyCheckboxGroup, {
} from "react-native-bouncy-checkbox-group";

export default function RadioButtonComponent({data, setState, stateKey }){

    const newData = Object.keys(data).map( (key, idx) => {
        return {
            id: idx,
            key: key,
            fillColor:"#FDC800",
            unfillColor: data[key],
            iconStyle: { borderColor: data[key] },
            bounceEffect: 1,
            bounceFriction: 2,
            size: 20,
            isChecked: true,
            disabled: false
        }
    })

    return(
        <BouncyCheckboxGroup
            style={{justifyContent: "flex-start", width: 120, flexWrap: "wrap", margin:5}}
            data={
                [
                    ...newData
                ]}
            onChange={(selectedItem) => {
                setState(prevState => ({...prevState, [stateKey]: selectedItem.key}))
               
            }}
        />
    )
}




