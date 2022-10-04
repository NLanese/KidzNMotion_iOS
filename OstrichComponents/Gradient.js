import React from "react";
import { View, Text } from "react-native";
import LinearGradient from 'react-native-linear-gradient';


const Gradient = ({
    threeColors = false,
    colorOne = false,
    colorTwo = false,
    colorThree = false,
    style = false,

    hollow = false,
    hollowColor = false, 
    hollowBorderSize = "medium",
    hollowStyles = false,

    children
}) => {

// --------------------------------------------------- //
//                                                     //
//                 NULL VALUE GUARDS                   //
//                                                     //
//v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v// 

    if (!colorOne || !colorTwo){
        throw new Error("Error: <Gradient> Components need to have color values for both colorOne and colorTwo props!")
    }

    if (hollow){
        if (hollowBorderSize != "small" && hollowBorderSize != "medium" && hollowBorderSize != "large" && hollowBorderSize != "xLarge"){
            throw new Error("Error: <Gradient> Components, when hollow is true, need to have a hollowBorderSize of either 'small', 'medium', 'large', or 'xLarge'. No value defaults to 'medium'")
        }
        if (!hollowColor){
            throw new Error("Error: <Gradient> Components, when hollow is true, need to have a color value in string format for the hollowColor prop")
        }
        if (hollowBorderSize == 'small'){

        }
    }




// --------------------------------------------------- //
//                                                     //
//           Colors and Hollow Configuration           //
//                                                     //
//v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v// 

    // sets color array
    let colorsArray = [colorOne, colorTwo]

    // accounts for third color
    if (threeColors){
        colorsArray = [...colorsArray, colorThree]
    }

    // Creates container style if none inputted
    if (!style){
        style = {
            padding: 2,
            height: 'auto',
            width: 'auto',
        }
    }

    // Sets a null hollow style
    let hollowStyle = {
        ...style,
    }

    // Sets Ratio values for Styling
        let smallRatio = {
            height: style.height * 0.96,
            width: style.width * 0.96
        }

        let mediumRatio = {
            height: style.height * 0.91,
            width: style.width * 0.91
        }

        let largeRatio = {
            height: style.height * 0.90,
            width: style.width * 0.90
        }

        let xLargeRatio = {
            height: style.height * 0.75,
            width: style.width * 0.75
        }


    if (hollow){
        hollowStyle = {
            ...style,
            backgroundColor: hollowColor,
        }
        if (hollowStyles){
            hollowStyle = {
                ...hollowStyles,
                ...hollowStyle
            }
        }
        style = {
            ...style,
            justifyContent: 'center',
            alignItems: 'center'
        }
        if (hollowBorderSize == "small"){
            hollowStyle = {
                ...hollowStyle, 
                height: smallRatio.height,
                width: smallRatio.width
            }
        }
        if (hollowBorderSize == 'medium'){
            hollowStyle = {
                ...hollowStyle, 
                height: mediumRatio.height,
                width: mediumRatio.width
            }
        }
        if (hollowBorderSize == 'large'){
            hollowStyle = {
                ...hollowStyle, 
                height: largeRatio.height,
                width: largeRatio.width
            }
        }
        if (hollowBorderSize == 'xLarge'){
            hollowStyle = {
                ...hollowStyle, 
                height: xLargeRatio.height,
                width: xLargeRatio.width
            }
        }
    }
    return(
        <View >
            <LinearGradient
                colors={colorsArray}
                style={{...style }}
            >
                <View style={hollowStyle}>
                    {children}
                </View>
        </LinearGradient>
        </View>
    ) 

}
export default Gradient