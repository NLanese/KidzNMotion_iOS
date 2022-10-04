import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, SafeAreaView, ScrollView, Image, TextInput, ImageBackground, FlatList, StyleSheet, Dimensions, Alert} from "react-native";
import Svg from 'react-native-svg';
import { Arrow} from "../../../../svg";

import { Body, Eyes, Mouth, Hair, FacialHair, Nose } from "./components";
import { hairColors, skinColors, facialHairColors, bodyColors } from "./constants/avatarColors";

export default function SelectableComponent({data, state, setState, stateKey, colorKey }){

    const [keyIndex, setKeyIndex] = useState(data.indexOf(state[stateKey]))

    function Icon(){
        switch (stateKey) {
            case "body":
                return <Body value={state[stateKey]} color={bodyColors[state[colorKey]]}/>
            case "eyes":
                return <Eyes value={state[stateKey]} />
            case "facialHair":
                return <FacialHair value={state[stateKey]} color={facialHairColors[state[colorKey]]}/>
            case "hair":
                return <Hair value={state[stateKey]} color={hairColors[state[colorKey]]}/>    
            case "mouth":
                return <Mouth value={state[stateKey]}/>    
            case "nose":
                return <Nose value={state[stateKey]} color={skinColors[state[colorKey]]} />
            default:
                break;
        }

    }

    function handleForward(){
        let newIndex = (keyIndex + 1) % data.length
        setState(prevState => ({...prevState, [stateKey]: data[newIndex] }))
        setKeyIndex(newIndex)
    }
    function handleBack(){
         let newIndex = (keyIndex - 1)
         if (newIndex < 0){
             newIndex = data.length -1
         }

        setState(prevState => ({...prevState, [stateKey]: data[newIndex] }))
        setKeyIndex(newIndex)
    }


    function capitalize(string){
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    return(

        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", margin: 5}}>
            <TouchableOpacity
                onPress={handleBack}
            >
                <Arrow/>
            </TouchableOpacity>
            
            <View
                style={{
                    width: 75,
                    height: 75,
                    borderRadius: 50,
                    overflow: 'hidden',
                    backgroundColor: "white"
                }}
            >
                <Svg width="100%" height="100%" viewBox="0 0 64 64">
                    <Icon />
                </Svg>

            </View>
            
            
            <TouchableOpacity
                onPress={handleForward}
            >
                <Arrow  style={{ transform: [{ rotateY: '180deg' }] }}/>
            </TouchableOpacity>
        </View>

    )
}




