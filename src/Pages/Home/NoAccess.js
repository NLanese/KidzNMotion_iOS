// Reaact
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, clientListState, userState, colorState, fontState } from '../../../Recoil/atoms';

// Ostrich

export default function NoAccess({expiredStatus}) {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    ///////////////
    // Constants // 
    ///////////////

    const [COLORS, setColors] = useRecoilState(colorState)
    const FONTS = useRecoilValue(fontState)

    /////////////////
    // Local State //
    /////////////////

        

    //////////////////
    // Recoil State //
    //////////////////

        const [user, setUser] = useRecoilState(userState)

///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    function MAIN(){
        return(
            <View style={{justifyContent: 'center', alignItems: 'center', marginRight: 20, marginLeft: 20}}>
                <Text style={{color: COLORS.iconLight, ...FONTS.Title}}>
                    Your Trial has expired!
                </Text>
                {renderPrompt()}
            </View>
        )
    }

    function renderPrompt(){
        if (expiredStatus === "expiredOwner"){
            return(
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                    <Text style={{...FONTS.SubTitle, color: COLORS.iconLight, fontSize: 22, textAlign: 'center'}}>
                        Your organization's trial period has ended!
                    </Text>
                    <Text style={{fontFamily: 'Gilroy-Medium', color: COLORS.iconLight, marginTop: 20, fontSize: 18, textAlign: 'center'}}>
                        Please navigate to the Online Web Portal and add payment information to continue with your Kidz-N-Motion experience!
                    </Text>
                    <Text style={{justifyContent: 'center', alignItems: 'center', fontFamily: 'Gilroy-Medium', color: COLORS.iconLight, marginTop: 20, fontSize: 18, width: 300, textAlign: 'center'}}>
                        If you are the Administrator of this account, please go to 
                    </Text>
                    <Text style={{marginTop: 10, fontFamily: 'Gilroy-Bold', fontSize: 20}}>
                        https://kids-in-motion.vercel.app
                    </Text>
                    <Text style={{justifyContent: 'center', alignItems: 'center', fontFamily: 'Gilroy-Medium', color: COLORS.iconLight, marginTop: 20, fontSize: 18, width: 300, textAlign: 'center'}}>
                        And enter in your payment information to continue
                    </Text>
                </View>
            )
        }
        else if (expiredStatus === "expiredUser"){
            return(
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                    <Text style={{...FONTS.SubTitle, color: COLORS.iconLight, fontSize: 22, textAlign: 'center'}}>
                        Your trial period has ended!
                    </Text>
                    <Text style={{fontFamily: 'Gilroy-Medium', color: COLORS.iconLight, marginTop: 20, fontSize: 18, textAlign: 'center'}}>
                        Please navigate to the Online Web Portal and add payment information to continue with your Kidz-N-Motion experience!
                    </Text>
                    <Text style={{justifyContent: 'center', alignItems: 'center', fontFamily: 'Gilroy-Medium', color: COLORS.iconLight, marginTop: 20, fontSize: 18, width: 300, textAlign: 'center'}}>
                        Please go to 
                    </Text>
                    <Text style={{marginTop: 10, fontFamily: 'Gilroy-Bold', fontSize: 20}}>
                        https://kids-in-motion.vercel.app
                    </Text>
                    <Text style={{justifyContent: 'center', alignItems: 'center', fontFamily: 'Gilroy-Medium', color: COLORS.iconLight, marginTop: 20, fontSize: 18, width: 300, textAlign: 'center'}}>
                        And enter in your payment information to continue
                    </Text>
                </View>
            )
        }
    }


///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////


///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////
    return MAIN()
}