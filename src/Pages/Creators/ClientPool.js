// Reaact
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";

// Nuton
import { Header, Button, ProfileEditCategoryComponent } from "../../../NutonComponents";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, clientListState, userState, colorState, fontState, avatarState } from '../../../Recoil/atoms';

// Hooks
import getAllUnassignedChildren from "../../Hooks/value_extractors/getAllUnassignedChildren"

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import SelectionButton from "../../../OstrichComponents/SelectionButton";

export default function ClientPool() {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    ///////////////
    // Constants // 
    ///////////////

        const COLORS = useRecoilValue(colorState)
        const FONTS = useRecoilValue(fontState)
        const SIZES = useRecoilValue(sizeState)
        const AVATAR = useRecoilValue(avatarState)
        const navigation = useNavigation();


    //////////////////
    // Recoil State //
    //////////////////

        const [user, setUser] = useRecoilState(userState)

    /////////////////
    // Local State //
    /////////////////

        const [unassigned, setUnassigned] = useState(getAllUnassignedChildren(user))

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
                    profile={true}
                    filterOnPress={() => navigation.navigate("SettingsLanding")}
                    title={"Client Pool"}
                />
            </View>    
        ) 
    }


    // Renders the Heading Information
    function renderTitle(){
        return(
            <View style={{marginTop: 40, marginRight: 20, marginLeft: 20}}>
                <Text style={{...FONTS.Title, textAlign: 'center', color: 'white'}}>
                    All unassigned clients will appear here
                </Text>
            </View>
        )
    }

    // Renders the View around the List of Clients
    function renderClientList(){
        return(
            <ScrollView
            style={{marginTop: 30, borderWidth: 1, maxHeight: 600, borderRadius: 15, marginRight: 10, marginLeft: 10, borderColor: COLORS.iconLight}}
            >
                {renderUnassignedClients()}
            </ScrollView>
        )
    }

    // Renders a Selection Button for Each Client
    function renderUnassignedClients(){
        return unassigned.map(child => {
            <SelectionButton
                    title={`${user.firstName} ${user.lastName}`}
                    hasProfilePic={true}
                    profilePic={user.profilePic}
                    onSelect={() =>
                        navigation.navigate("Profile", {
                            item: client,
                        })
                    }
                />
        })
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
            style={{height: '110%', paddingTop: 5}}
        >
            {renderHeader()}
            {renderTitle()}
            {renderClientList()}
        </Gradient>
    )
}