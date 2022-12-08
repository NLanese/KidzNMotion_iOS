// React
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import React, {useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

// Nuton
import { Header, WishListComponent } from "../../../NutonComponents";
import { AndroidSafeArea, courses, FONTS, myCoupons } from "../../../NutonConstants";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { colorState, sizeState, userState, tokenState, medalsDataState, medalsTypeState } from '../../../Recoil/atoms';

// GraphQL
import { GET_CHILD_VIDEO_STATISTICS } from "../../../GraphQL/operations";
import client from "../../utils/apolloClient";

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import SelectionButton from "../../../OstrichComponents/SelectionButton";
import TabBar from "../../../OstrichComponents/TabBar";
import LoadingComponent from "../../Global/LoadingComponent";

import { MedalLarge, MedalTab } from "../../../svg";

export default function MyMedals(props) {

///////////////////////////
///                     ///
///     Preliminary     ///
///                     ///
///////////////////////////

    ///////////////
    // Constants //
    ///////////////
        const navigation = useNavigation();
        const COLORS = useRecoilValue(colorState)
        const SIZES = useRecoilValue(sizeState)
        const token = useRecoilValue(tokenState)

    ///////////
    // State //
    ///////////

        ////////////////
        // Medal Data //
        ////////////////

        // Tracks the current users' earned medals
        const [medals, setMedals] = useRecoilState(medalsDataState)

        // Determines which medal type is displayed in Modal
        const [medalType, setMedalType] = useRecoilState(medalsTypeState)


        // // Tracks what medals they have
        // const [medals, setMedals] = useState({
        //     "step_up": {},
        //     "toe_walking": {},
        //     "toe_touches": {},
        //     "squat": {},
        //     "side_to_side": {},
        //     "rolling": {},
        //     "leg_lifts": {},

        //     "hands_to_knees": {},
        //     "chair_elevation": {},
        //     "floor_to_stand": {},
        //     "beam_balancing": {},
        //     "jump_rope": {},
        //     "jumping_jacks": {},
        //     "jump_forward_and_backward": {},
        //     "hop_scotch": {},
        //     "bear_crawl": {}
        // })

        // // Query Data comparmentalized
        // const [medalData, setMedalData] = useState({
        //     step_up: {},
        //     toe_walking: {},
        //     toe_touches: {},
        //     squat: {},
        //     side_to_side: {},
        //     rolling: {},
        //     leg_lifts: {},

        //     hands_to_knees: {},
        //     chair_elevation: {},
        //     floor_to_stand: {},
        //     beam_balancing: {},
        //     jump_rope: {},
        //     jumping_jacks: {},
        //     jump_forward_and_backward: {},
        //     hop_scotch: {},
        //     bear_crawl: {}
        // })


        ///////////////////////
        // User and Children //
        ///////////////////////

            // Tracks user data
            const [user, setUser] = useRecoilState(userState)

                // Tracks the Children
                const [children, setChildren] = useState(user.children)

            let XSelected = false
            if (user.role === "GUARDIAN"){
                XSelected = children[0]
            }
            else if (user.role === "CHILD"){
                XSelected = user
            }
            else if (user.role === "THERAPIST"){
                XSelected = props.route.params.item.user
            }    

            // The Child who is selected
            const [selectedChild, setSelectedChild] = useState(XSelected)

        // Loading
        const [loading, setLoading] = useState(true)

        // Data Recieved from Query?
        const [noContent, setNoContent] = useState(true)

        const [tryAgain, setTryAgain] = useState(false)

///////////////////////////
///                     ///
///      UseEffects     ///
///                     ///
///////////////////////////

    // Populates earned medals on render
    useEffect(() => {
        getChildsMedals()
    }, [])

    // Once Medals are generated, turns off loading
    useEffect(() => {
        setLoading(false)
    }, [medals])

    // DO NOT DELETE //  // DO NOT DELETE //   // DO NOT DELETE //   // DO NOT DELETE //   // DO NOT DELETE // 
    useEffect(() => {
    }, [medals])
     // DO NOT DELETE //   // DO NOT DELETE //   // DO NOT DELETE //   // DO NOT DELETE //   // DO NOT DELETE //   


///////////////////////////
///                     ///
///      Rendering      ///
///                     ///
///////////////////////////

    // Renders the Header of the Page
    function renderHeader() {
        return (
            <Header 
                onPress={() => navigation.goBack()}
                title="My Medals" 
                goBack={true}
                profile={true}
                filterOnPress={() => navigation.navigate("SettingsLanding")}
            />
        );
    }

    // Renders the Child Selection TabBar
    function renderTabBar(){
        if (children){
            if (children.length > 1){
                let tabsContent = children.map(child => child.firstName)
                return(
                    <TabBar
                        tabsArray={tabsContent}
                        onChangeIndex={(index) => selectChild(index)}
                        styleActive={{borderBottomColor: COLORS.iconLight, borderBottomWidth: 3, padding: 2, marginRight: 5, marginLeft: 5, width: 90}}
                        styleInactive={{borderBottomColor: "grey", borderBottomWidth: 0, padding: 2, marginRight: 5, marginLeft: 5, width: 90}}
                        tabTextStyleActive={{fontFamily: "Gilroy-Bold", textAlign: 'center', fontSize: 16, color: COLORS.iconLight, marginBottom: 3}}
                        tabTextStyleInactive={{fontFamily: "Gilroy-Bold", textAlign: 'center', fontSize: 16, color: COLORS.iconLight, marginBottom: 3}}
                    />
                )
            }
        }
    }

    // Generates a medal Button
    function generateMedalButton(type) {
        let subtitle = false
        let medalFill = '#000'
        if (type === "Bronze"){
            subtitle = "Check out your bronze medals! See what you can improve!"
            medalFill = 'brown'

        }
        else if (type === "Silver"){
            subtitle = "Check out all of your silver medals! See what you're close to mastering!"
            medalFill = "silver"
        }
        else if (type === "Gold"){
            subtitle = "Check out all of your gold medals! See what videos you perfected!"
            medalFill = "gold"
        }
        return(
            <View style={{marginLeft: 9}}>
                <SelectionButton
                    title={`${type} Medals`}
                    titleColor={COLORS.gradientColor2}
                    subtitle={subtitle}
                    subtitleColor={'black'}
                    icon={<MedalTab fillColor={medalFill} strokeColor={COLORS.iconDark}/>}
                    opaque={true}
                    onSelect={() => {
                        handleButtonClick(type)
                    }}
                />
            </View>
        )
    }

    // Renders the Main 
    function renderContent() {
        if (loading){
            return <LoadingComponent loading={true} label={"LOADING..."} />
        }
        return (
            <View
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    flexGrow: 1,
                }}
                style={{marginLeft: 10}}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.medal}>
                    <MedalLarge fillColor={COLORS.iconLight} strokeColor={COLORS.iconDark} style={{
                        margin: "auto",
                        marginBottom: 50,
                        alignSelf: "center",
                    }}/>
                    <Text style={{...FONTS.Title, marginTop: -15}}>Medals</Text>
                </View>
                <View style={{alignItems: 'center', marginTop: -20, marginLeft: -20 }}>
                    {renderTabBar()}
                </View>
                <View style={{marginLeft: -20}}>
                    {generateMedalButton("Bronze")}
                    {generateMedalButton("Silver")}
                    {generateMedalButton("Gold")}
                </View>
            </View>
        );
    }

///////////////////////////
///                     ///
///       Handler       ///
///                     ///
///////////////////////////

    // Sets the Selected Child based off of the Tab selected
    function selectChild(index) {
        setSelectedChild(children[index])
    }

    // Fires when Medal Button is Clicked
    function handleButtonClick(color){
        navigation.navigate("MedalDisplay", 
            {
                type: color, 
                user: selectedChild, 
            }
        )
    }

    // Grabs Medals
    async function getChildsMedals(){
        // QUERY
        return await client.query({
            query: GET_CHILD_VIDEO_STATISTICS,
            fetchPolicy: 'network-only',
            variables: {
                childID: selectedChild.id
            }
        }).then( (resolved) => {
            let newValue = resolved.data.getChildVideoStatistics.allTimeStats.individualVideoDetailedStats
            setMedals(medals => ({...newValue}))
            return
        }).catch(err => console.log("BINGO WINGO"))
    }


///////////////////////////
///                     ///
///     Main Return     ///
///                     ///
///////////////////////////

    return (
        <Gradient
            colorOne={COLORS.gradientColor1}
            colorTwo={COLORS.gradientColor2}
            style={{height: '105%'}}
        > 
            <View style={{marginTop: 45}} />
            {renderHeader()}
            <ScrollView>
                {renderContent()}
            </ScrollView>
        </Gradient>
    );
}

const styles = StyleSheet.create({
  medal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 40
    
  },
  medalContainer: {
      backgroundColor: "rgba(255,255,255,0.50)",
     
      borderStyle: "solid",
      borderWidth: 1,
      opacity: 0.7,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,
      elevation: 14,
  }
});






