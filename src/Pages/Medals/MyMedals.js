// React
import {ScrollView, StyleSheet, Text, View } from "react-native";
import React, {useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

// Nuton
import { Header } from "../../../NutonComponents";
import { FONTS } from "../../../NutonConstants";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { colorState, sizeState, userState, tokenState, medalState } from '../../../Recoil/atoms';

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

    ///////////
    // State //
    ///////////

        // Tracks what medals they have
        const [medals, setMedals] = useState({
            "step_up": {},
            "toe_walking": {},
            "toe_touches": {},
            "squat": {},
            "side_to_side": {},
            "rolling": {},
            "leg_lifts": {},

            "hands_to_knees": {},
            "chair_elevation": {},
            "floor_to_stand": {},
            "beam_balancing": {},
            "jump_rope": {},
            "jumping_jacks": {},
            "jump_forward_and_backward": {},
            "hop_scotch": {},
            "bear_crawl": {}
        })

        // Query Data comparmentalized
        const [medalData, setMedalData] = useState({
            step_up: {},
            toe_walking: {},
            toe_touches: {},
            squat: {},
            side_to_side: {},
            rolling: {},
            leg_lifts: {},

            hands_to_knees: {},
            chair_elevation: {},
            floor_to_stand: {},
            beam_balancing: {},
            jump_rope: {},
            jumping_jacks: {},
            jump_forward_and_backward: {},
            hop_scotch: {},
            bear_crawl: {}
        })

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
            XSelected = props.route.params.item
        }    

        // The Child who is selected
        const [selectedChild, setSelectedChild] = useState(XSelected)

        // Determines whether medal modal be showing
        const [showMedalModal, setShowMedalModal] = useState(false)

        // Determines which medal type is displayed in Modal
        const [medalType, setMedalType] = useState(false)

        const [bronzeCount, setBronzeCount] = useState(0)

        const [silverCount, setSilverCount] = useState(0)

        const [goldCount, setGoldCount] = useState(0)

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

    // Populates earned medals
    useEffect(() => {
        // sets just medals (Object of objects)
        getChildsMedals()
    }, [selectedChild])

    // Attempts rerender is somehow resolved is undefined
    useEffect(() => {
        getChildsMedals()
    }, [tryAgain])

    // Sets medal count state (object of ints)
    useEffect(() => {
        asyncSetMedals()
        .then(() => {
            setLoading(false)
        })
    }, [medalData])

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
        if (loading || noContent){
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
                // medals: medalData
                // medals: {"beam_balancing": {"bronze": 1, "gold": 0, "silver": 0}, "chair_elevation": {"bronze": 1, "gold": 1, "silver": 1}, "hand_to_knees": {"bronze": 1, "gold": 0, "silver": 1}, "leg_lifts": {"bronze": 3, "gold": 0, "silver": 2}}
            }
        )
    }


    // Clears all of the medals and saved data
    function clearCurrentData(){
        setMedals({
            "step_up": {},
            "toe_walking": {},
            "toe_touches": {},
            "squat": {},
            "side_to_side": {},
            "rolling": {},
            "leg_lifts": {},

            "hands_to_knees": {},
            "chair_elevation": {},
            "floor_to_stand": {},
            "beam_balancing": {},
            "jump_rope": {},
            "jumping_jacks": {},
            "jump_forward_and_backward": {},
            "hop_scotch": {},
            "bear_crawl": {}
        })

        setMedalData({
            step_up: {},
            toe_walking: {},
            toe_touches: {},
            squat: {},
            side_to_side: {},
            rolling: {},
            leg_lifts: {},

            hands_to_knees: {},
            chair_elevation: {},
            floor_to_stand: {},
            beam_balancing: {},
            jump_rope: {},
            jumping_jacks: {},
            jump_forward_and_backward: {},
            hop_scotch: {},
            bear_crawl: {}
        })
    }

    // Sets the medals state with the medal count ({bronze: 1, silver: 2, gold: 3})
    async function asyncSetMedals(){
        let unlocked = (Object.keys(medalData))
        unlocked.forEach( async (vidMedals) => {
            await setMedals({...medals, [vidMedals]: {...medalData[vidMedals]}})
        })        
        setNoContent(false)
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
            setMedalData(resolved.data.getChildVideoStatistics.allTimeStats.individualVideoDetailedStats)
            return resolved
        }).catch(err => console.log(err))
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






