// Reaact
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";

// Nuton
import { Header, Button, ProfileEditCategoryComponent } from "../../../../NutonComponents";
import { AREA, COLORS } from "../../../../NutonConstants";
import { Camera } from "../../../../svg";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, clientListState, userState, colorState, fontState } from '../../../../Recoil/atoms';

// Ostrich
import Gradient from "../../../../OstrichComponents/Gradient";
import TabBar from "../../../../OstrichComponents/TabBar";

// Components

export default function TrackVideoProgress(props) {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    ////////////
    // Routes //
    ////////////

        const client = props.route.params?.item;

        const clientWeekly = false // Do the rest when mutations are fleshed out
        const clientAllTime = false // Do the rest when mutations are fleshed out

    ///////////////
    // Constants // 
    ///////////////

        const navigation = useNavigation();
        const COLORS = useRecoilValue(colorState)
        const FONTS = useRecoilValue(fontState)
        const SIZES = useRecoilValue(sizeState)

    /////////////////
    // Local State //
    /////////////////

        const [weeklyOrGeneral, setWeeklyOrGeneral] = useState(0)        

    //////////////////
    // Recoil State //
    //////////////////

        // User
        const [user, setUser] = useRecoilState(userState)

            // User's Children
            const [children, setChildren] = useState(user.children)
            
        // The Child who is selected
        const [selectedChild, setSelectedChild] = useState(children[0])

///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

   // Renders the header bar and back arrow
   function renderHeader() {
        return(
            <View style={{marginTop: 40}}>
                <Header 
                    onPress={() => navigation.goBack()}
                    goBack={true}
                    title={"Video Progression"}
                />
            </View>    
        ) 
    }

    // Renders the weekly or alltime 
    function renderTabBar() {
        return(
            <View style={{justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <TabBar 
                    tabsArray={['All Time', 'This Week']}
                    styleActive={{
                        width: 120,
                        borderBottomColor: COLORS.iconLight,
                        borderBottomWidth: 4,
                        paddingBottom: 2.5
                    }}
                    styleInactive={{
                        width: 120,
                        paddingBottom: 2.5
                    }}
                    tabTextStyleActive={{
                        fontFamily: 'Gilroy-Bold',
                        fontSize: 19,
                        letterSpacing: 0.5,
                        textAlign: 'center',
                        color: COLORS.iconLight
                    }}
                    tabTextStyleInactive={{
                        fontFamily: 'Gilroy-Bold',
                        fontSize: 17,
                        letterSpacing: 0.5,
                        textAlign: 'center',
                        color: "#565"
                    }}
                    onChangeIndex={(index) => setWeeklyOrGeneral(index)}
                />
            </View>
            
        )
    }

    // Renders (Conditionally) The TabBar to select children
    function renderChildSelectionTabBar() {
        if (children){
            if (children.length > 1){
                let tabsContent = children.map(child => child.firstName)
                return(
                    <TabBar 
                        tabsArray={tabsContent}
                        onChangeIndex={(index) => handleChildSelection(index)}
                    />
                )
            }
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
    return(
        <Gradient
            colorOne={COLORS.gradientColor1}
            colorTwo={COLORS.gradientColor2}
        >
            {renderHeader()}
            {renderTabBar()}
        </Gradient>
    )
}