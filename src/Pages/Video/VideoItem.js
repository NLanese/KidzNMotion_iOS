// Reaact
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";

// Nuton
import { Header, Button, ProfileEditCategoryComponent } from "../../../NutonComponents";
import { AREA, COLORS } from "../../../NutonConstants";
import { Camera, Check, CircleSvg } from "../../../svg";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, clientListState, userState, colorState, fontState, accessibleVideos} from '../../../Recoil/atoms';
import { Translate } from "@material-ui/icons";


export default function VideoItem(props) {
    const {videoObject, handleTherapistSelectVideo, videoState} = props
    
    if (!videoObject){
        return null
    }
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    ///////////////
    // Constants // 
    ///////////////

        const navigation = useNavigation();
        const COLORS = useRecoilValue(colorState)
        const SIZES = useRecoilValue(sizeState)
        const FONTS = useRecoilValue(fontState)
        const user = useRecoilValue(userState)
        const video = videoObject

    /////////////////
    // Local State //
    /////////////////

    //////////////////
    // Recoil State //
    //////////////////

        const [validVids, setValidVids] = useRecoilState(accessibleVideos)

        const isValid = validVids.includes(video.id)   

    

///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    function validRender(){
        return(
        <TouchableOpacity
        onPress={() => handleVideoClick()}
        style={{height: 150, width: 180, padding: 3, borderColor: COLORS.iconLight, borderWidth: 1, borderRadius: 10, overflow: "hidden"}}
        >
            <View style={{flex: 7}}>
                <View >
                    <Image 
                        source={{uri: video.previewPictureURL}}
                        style={{
                            position: "relative",
                            width: 180,
                            height: 140,
                            resizeMode: "cover",
                            zIndex: -1,
                            marginLeft: -5,
                            marginTop: -30,
                            
                        }}
                    />
                </View>
            </View>
            <View style={{  width: "100%", alignItems: "center", paddingTop: 10, flex: 2, flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{textAlign: 'center', color: "white", textShadowColor: COLORS.gradientColor2, textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10, zIndex: 5, fontSize: 14, fontWeight: "700"}}>{video.title}</Text>
                {/* <Text style={{textAlign: 'center'}}>{video.title}</Text> */}
                {/* {user.role === "THERAPIST" && <TouchableOpacity
                    onPress={() => handleTherapistSelectVideo(video.id)}>
                        <CircleSvg style={{alignSelf: "flex-end", margin: 5, }} fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} selected={videoState[video.id]}>
                            <Check  fillColor="red" strokeColor={COLORS.iconLight} style={{ transform: [{ scale: 1.5 }, {translateX: 5}, {translateY: 6}]}}/>
                        </CircleSvg>
                        
                </TouchableOpacity>} */}
            </View>
        </TouchableOpacity>
        )
    }

    function invalidRender(){
        return(
            <View style={{height: 150, width: 180, padding: 3, borderColor: COLORS.iconLight, borderWidth: 1, borderRadius: 10, overflow: "hidden", backgroundColor: 'grey'}}>
                <View style={{flex: 7}}>
                    <View >
                        <Text style={{textAlign: 'center', marginTop: '25%', fontFamily: 'Gilroy-Medium'}}>
                            Have this Video assigned to you before watching
                        </Text>
                    </View>
                </View>
                <View style={{  width: "100%", alignItems: "center", paddingTop: 10, flex: 2, flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{textAlign: 'center', color: "white", zIndex: 5, fontSize: 14, fontWeight: "700"}}>{video.title}</Text>
                    {/* <Text style={{textAlign: 'center'}}>{video.title}</Text> */}
                    {user.role === "THERAPIST" && <TouchableOpacity
                        onPress={() => handleTherapistSelectVideo(video.id)}>
                            <CircleSvg style={{alignSelf: "flex-end", margin: 5, }} fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} selected={videoState[video.id]}>
                                <Check  fillColor="red" strokeColor={COLORS.iconLight} style={{ transform: [{ scale: 1.5 }, {translateX: 5}, {translateY: 6}]}}/>
                            </CircleSvg>
                            
                    </TouchableOpacity>}
                </View>
            </View>
        )
    }

///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////

    function handleVideoClick(){
        if (isValid || user.role === "THERAPIST"){
            navigation.navigate("WatchVideo", {item: video})
        }
        else{
            return null
        }
    }

///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////

    function MAIN(){
        if (isValid || user.role === "THERAPIST"){
            return validRender()
        }
        else{
            return invalidRender()
        }
    }


    return(
        MAIN()
    )
}
