import { Text, View, Dimensions, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {SIZES} from "../NutonConstants/theme"
import { useRecoilValue } from "recoil";
import { colorState, fontState } from '../Recoil/atoms';

import {DEFAULT_AVATAR} from '../NutonConstants'
import PersonasAvatar from './PersonasAvatar'

let maxWidth = SIZES.width
let maxHeight = SIZES.height

const SelectionButton = ({ image, 
                           title, 
                           titleColor=false,
                           subtitle,
                           subtitle2,
                           subtitle3, 
                           subtitleColor=false,
                           plainCenter=false, 
                           leftAlign=false,
                           onSelect=function(){console.log('Alert! onSelect function not passed as prop!')}, 
                           icon, 
                           hasProfilePic=false,
                           profilePic=false,
                           centerTitle=false, 
                           opaque=false}) => {

    ///////////////////////////////////////////
    ///                                     ///
    ///            Preliminary              ///
    ///                                     ///
    ///////////////////////////////////////////

    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)

    let transparency = 0.0
    let titColor = COLORS.title
    if (titleColor){
        titColor = titleColor
    }
    let subColor = COLORS.subtitle
    if (subtitleColor){
        subColor = subtitleColor
    }
    if (opaque){
        transparency = .70
    }

    ///////////////////////////////////////////
    ///                                     ///
    ///             Renderings              ///
    ///                                     ///
    ///////////////////////////////////////////


    // Renders either the Icon or the Image
    const renderIconOrImage = () => {

        ///////////////////////////
        // Has a profile Picture //
        if (hasProfilePic){

            ///////////////////////////////
            // If there is a non default //
            if (profilePic === null){
                return(
                    <View style={{...Style.imageInRow, marginRight: 30}}>
                        <PersonasAvatar 
                            characterSettings={{...DEFAULT_AVATAR}} 
                            imageStyle={{ borderRadius: 60 }}
                            style={{height: 50, width: 50, marginRight: 30}}
                        />
                    </View>
                )
            }

            /////////////////////////
            // Default profile pic //
            else {
                return(
                    <View style={{...Style.imageInRow, marginRight: 30}}>
                        <PersonasAvatar 
                            characterSettings={{...profilePic}} 
                            imageStyle={{ borderRadius: 60 }}
                            style={{height: 50, width: 50, marginRight: 30}}
                        />
                    </View>
                )
            }
        }
        else{
            return(
                <View style={Style.imageInRow}>
                    {icon}
                </View>
            )
        }
    }

    // Renders the stuff inside the button
    const renderContent = () => {
        if (leftAlign){
            return(
                <View style={{...Style.rowOfTwo, marginTop: 2}}>
                    <View style={{flex: 2}}>
                        <Text style={{...FONTS.Title, color: titColor }}>{title}</Text>
                        <Text style={{...FONTS.SubTitle, color: subColor }}>{subtitle}</Text>
                    </View>
                </View>
            )
        }
        else{
            return(
                <View style={Style.rowOfTwo}>
                    {renderIconOrImage()}
                    <View style={{...Style.textInRow}  }>
                        <Text style={{...FONTS.Title, color: titColor }}>{title}</Text>
                        {!!subtitle && <Text style={{...FONTS.SubTitle, color: subColor }}>{subtitle}</Text>}
                        {!!subtitle2 && <Text style={{...FONTS.SubTitle, color: subColor }}>{subtitle2}</Text>}
                        {!!subtitle3 && <Text style={{...FONTS.SubTitle, color: subColor }}>{subtitle3}</Text>}
                    </View>
                </View>
            )
        }
    }

    // Main Render
    const mainRender = () => {
        if (plainCenter || centerTitle){
            return(
                <View style={{...Style.main, borderColor: COLORS.buttonBorder, backgroundColor: `rgba(52, 52, 52, ${transparency})`, justifyContent: centerTitle ? "center" : ''}}>
                    <TouchableOpacity 
                        onPress={() => handleOnPress()}
                    >
                        <View style={{ height: '100%', justifyContent: 'center'}}>
                            <Text style={{...FONTS.Title, color: titColor, textAlign: 'center', alignContent: 'center', alignItems: 'center'}}>{title}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return(
                <View style={{...Style.main, borderColor: COLORS.buttonBorder, backgroundColor: `rgba(250, 250, 250, ${transparency})`}}>
                    <TouchableOpacity 
                        onPress={() => handleOnPress()}
                        // style={{borderWidth: 0.55, borderColor: COLORS.buttonBorder , borderRadius: SIZES.borderRadius}}
                    >
                        {renderContent()}
                    </TouchableOpacity>
                </View>
            )
        }
    }

    ///////////////////////////////////////////
    ///                                     ///
    ///              Handlers               ///
    ///                                     ///
    ///////////////////////////////////////////

    const handleOnPress = () => {
        onSelect()
    }




    return(
        mainRender()
    )
}

export default SelectionButton

////////////
// Styles //
////////////
const Style = StyleSheet.create({
    main: {
        marginLeft: "3%",
        width: "94%",
        marginBottom: 15,
        height: 85,

        borderRadius: 10,

        borderWidth: 1,
    },
    rowOfTwo: {
        flexDirection: 'row',
        padding: maxWidth * 0.03,
    },
    imageInRow: {
        flex: 1,
        height: 60,
        marginRight: maxWidth * 0.03,
        justifyContent: 'center',
        alignSelf: "center"
    },
    textInRow: {
        flex: 8,
        justifyContent: 'center'
    },
    title: {
        
    },
    subtitle: {
     
    }
})