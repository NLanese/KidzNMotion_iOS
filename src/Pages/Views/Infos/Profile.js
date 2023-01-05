// React
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

// Nuton
import { Header, ProfileCategoryComponent, PersonasAvatar } from "../../../../NutonComponents";
import { AREA, DEFAULT_AVATAR } from "../../../../NutonConstants";
import { Heart, Gift, CreditCard, HelpCircle, FileText, LogOut, Edit, Message, Video, CourseUserSvg, Bell } from "../../../../svg";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { colorState, fontState, sizeState, userState, selectedClientState } from '../../../../Recoil/atoms';

// Gradient
import Gradient from "../../../../OstrichComponents/Gradient";
import SelectionButton from "../../../../OstrichComponents/SelectionButton";


//////// Settings //////// Settings //////// Settings //////// Settings //////// Settings //////// Settings //////// Settings //////// Settings //////// Settings ////////

export default function Profile(props) {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    //////////////////
    // Route Params //
    //////////////////

    ////////////////
    // Constants  //
    ////////////////

        const navigation = useNavigation();
        const COLORS = useRecoilValue(colorState)
        const FONTS = useRecoilValue(fontState)
        const SIZES = useRecoilValue(sizeState)

    ////////////
    // States //
    ////////////

        // Sets Modal
        const [showModal, setShowModal] = useState(false);

    //////////////////
    // Recoil State //
    //////////////////

        // User
        const [user, setUser] = useRecoilState(userState)

        // Client
        const [selectedClient, setSelectedClient] = useRecoilState(selectedClientState)
        console.log(selectedClient)

///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    // Renders the Header
    function renderHeader() {
        return (
            <Header
                title={`${selectedClient.user.firstName}'s Profile`}
                goBack={true}
                profile={true}
                onPress={() => navigation.goBack()}
                filterOnPress={() => navigation.navigate("SettingsLanding")}
            />
        );
    }

    // Main Render Boi
    function MainRender() {
       return(
        <View>
            {renderHeader()}
            <View style={{marginTop: 170}}>
                {renderButtons()}
            </View>
        </View>
       )
    }

    // Renders View Medals for Children Clients only
    function renderChildOptionsButton(){
        if (selectedClient.user.role === "CHILD"){
            return(
                <>
                    <SelectionButton
                        title={"View Medals"}
                        centerTitle={true}
                        onSelect={() => navigation.navigate("MyMedals", {item: selectedClient})}   
                    />
                </>
            )
        }
    }

    // Renders the Appropriate Settings for whichever user is on this page
    function renderButtons() {
        if (user.role === "THERAPIST"){
            return(
                <View style={{marginLeft: -5}}>
                    <SelectionButton
                        title={"Account Settings"}
                        centerTitle={true}
                        onSelect={() => navigation.navigate("EditClientSettings", {item: selectedClient})}  
                    />
                    {renderChildOptionsButton()}
                    <SelectionButton
                        title={"Schedule a Meeting"}
                        centerTitle={true}
                        onSelect={() => navigation.navigate("SchedulingLanding")}   
                    />
                    <SelectionButton
                        title={"Documentation and Comments"}
                        centerTitle={true}
                        onSelect={() => navigation.navigate("Comments", {
                            item: selectedClient
                        })}
                    />
                </View>
            )
        }
    }

///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////


    return (
        <Gradient
            colorOne={COLORS.gradientColor1}
            colorTwo={COLORS.gradientColor2}
            style={{height: '100%'}}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginTop: 40}}/>
                {MainRender()}
            </ScrollView>
        </Gradient>
    );
}
