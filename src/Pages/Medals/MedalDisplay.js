// Reaact
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";

// Nuton
import { Header } from "../../../NutonComponents";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, userState, colorState, videoDataState, medalsDataState } from '../../../Recoil/atoms';

// SVG
import { MedalTab } from "../../../svg";

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";

export default function MedalDisplay(props) {

///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////


    //////////////////
    // Recoil State //
    //////////////////

        const type = props.route.params.type

        const medals = useRecoilValue(medalsDataState)

        const [videos, setVideos] = useRecoilState(videoDataState)

        const [user, setUser] = useRecoilState(userState)

    ///////////////
    // Constants // 
    ///////////////

        const navigation = useNavigation();
        const COLORS = useRecoilValue(colorState)
        const SIZES = useRecoilValue(sizeState)

    /////////////////
    // Local State //
    /////////////////


///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

            // Renders the header bar and back arrow
            function renderHeader() {
                return(
                    <View style={{marginTop: 45}}>
                        <Header 
                            onPress={() => navigation.goBack()}
                            goBack={true}
                            profile={true}
                            filterOnPress={() => navigation.navigate("SettingsLanding")}
                            title={`${type} Medals`}
                        />
                    </View>    
                ) 
            }

        // Medal Rendering //

            // Renders all of the Medals
            function renderAllMedals(){
                let filteredVideos = videos.filter(vid => {
                    console.log(vid.title)
                    if (vid.title !== "Great Job"){
                        return vid
                    }                 
                })
                let len = filteredVideos.length
                let i = 0
                let rArray = []
                while (i < len){
                    // if (i + 3 < len){
                    //     rArray = ([...rArray, [videos[i], videos[i + 1], videos[i + 2], videos[i + 3]]])
                    //     i = i + 4
                    // }
                    if (i + 2 < len){
                        rArray = ([...rArray, [filteredVideos[i], filteredVideos[i + 1], filteredVideos[i + 2]]])
                        i = i + 3
                    }
                    else if (i + 1 < len){
                        rArray = ([...rArray, [filteredVideos[i], filteredVideos[i + 1]]])
                        i = i + 2
                    }
                    else{
                        rArray = ([...rArray, [filteredVideos[i]]])
                        i = i + 1
                    }
                }
                
                return rArray.map( (videoRow) => {
                    return renderMedalRow(videoRow)
                })
            }

            // Renders a single row of Medals
            function renderMedalRow(rArray) {
                let rComp = () => rArray.map( (video, index)  => {
                    return renderMedal(video, index)
                })
                return(
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15}}>
                        {rComp()}
                    </View>
                )
            }

            // Renders a single medal
            function renderMedal(video, i){

                /////////////////////
                // Prepping Styles //
                let color = type.toLowerCase()
                if (color === "bronze"){
                    color = "brown"
                }
                console.log(video)
                let title = convertSlugToName(video.id)

                ///////////////
                // Rendering //
                if (hasMedal(video.id)){
                    return (
                        <View style={{
                            alignItems: 'center', width: 120, height: 90, 
                            backgroundColor: 'rgba(255, 255, 255, 0.25)',
                            borderRadius: 15, padding: 6, paddingTop: 10
                        }} key={i}>
                            <MedalTab fillColor={color} strokeColor={COLORS.iconDark}/>
                            <Text style={{textAlign: 'center', marginTop :10, fontFamily: 'Gilroy-Regular', color: COLORS.iconLight, fontSize: 16}}>
                                {title}
                            </Text>
                        </View>
                    )
                }
                else{
                    return (
                        <View style={{
                            alignItems: 'center', width: 120, height: 90, 
                            backgroundColor: 'rgba(255, 255, 255, 0.25)',
                            borderRadius: 15, padding: 6, paddingTop: 10
                        }} key={i}>
                            <MedalTab fillColor={'rgba(0, 0, 0, 0.5)'} strokeColor={COLORS.iconDark}/>
                            <Text style={{textAlign: 'center', marginTop: 10, fontFamily: 'Gilroy-Regular', color: COLORS.iconLight, fontSize: 16}}>
                                {title}
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

    function hasMedal(videoId){
        if (!medals){
            return null
        }
        if (medals[videoId]){
            if (medals[videoId][type.toLowerCase()]){
                return true
            }
            else return false
        }
        else return false
    }

    function convertSlugToName(slug){
        let rString = slug.replaceAll("_", " ")
        return rString = rString.slice(0, 1).toUpperCase() + rString.slice(1)
    }

///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////
    return(
       <Gradient
            colorOne={COLORS.gradientColor1}
            colorTwo={COLORS.gradientColor2}
            style={{height: '100%'}}
       >
            {renderHeader()}

            <View style={{marginTop: 40}}>
                {renderAllMedals()}
            </View>

        </Gradient>

    )
}