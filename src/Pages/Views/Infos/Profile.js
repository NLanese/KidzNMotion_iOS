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
import { colorState, fontState, sizeState, user, userState } from '../../../../Recoil/atoms';

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

        const client = props.route.params?.item

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

///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    // Renders the Profile Picture and Name of the User
    function renderImageAndName(){
        let pic = DEFAULT_AVATAR
        if (client.user.profilePic){
            pic = client.user.profilePic
        }
        return(
            <View>
                {/* <PersonasAvatar 
                    characterSettings={{pic}}
                    imageStyle={{ borderRadius: 60 }}
                    style={{height: 50, width: 50, marginRight: 30}}
                /> */}
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.Title,
                        color: COLORS.iconLight,
                        lineHeight: 20 * 1.4,
                        fontSize: 22,
                        marginTop: -20
                    }}
                >
                    {client.user.firstName} {client.user.lastName}
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.Lato_400Regular,
                        fontSize: 16,
                        color: COLORS.black,
                        lineHeight: 16 * 1.7,
                        marginBottom: 20,
                    }}
                >
                    {client.user.email}
                </Text>
            </View>
        )
    }

    // Renders the Header
    function renderHeader() {
        return (
            <Header
                title={`${client.user.firstName}'s Profile`}
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
            <ScrollView>
                {renderImageAndName()}
                {renderButtons()}
            </ScrollView>
        </View>
       )
    }

    // Renders View Medals for Children Clients only
    function renderChildOptionsButton(){
        if (client.user.role === "CHILD"){
            return(
                <>
                    <SelectionButton
                        title={"View Medals"}
                        centerTitle={true}
                        onSelect={() => navigation.navigate("MyMedals", {item: client})}   
                    />
                    <SelectionButton
                        title={"Video Settings"}
                        centerTitle={true}
                        onSelect={() => navigation.navigate("ProfileVideoSettings", {item: client})}
                    />
                </>
            )
        }
    }

    // Renders the Appropriate Settings for whichever user is on this page
    function renderButtons() {
        if (user.role === "GUARDIAN" || user.role === "CHILD"){  //role === "GUARDIAN"

        }
        else if (user.role === "THERAPIST"){
            return(
                <View style={{marginLeft: -5}}>
                    <SelectionButton
                        title={"Account Settings"}
                        centerTitle={true}
                        onSelect={() => navigation.navigate("EditClientSettings", {item: client})}  
                    />
                    {renderChildOptionsButton()}
                    <SelectionButton
                        title={"Message"}
                        centerTitle={true}
                        
                        onSelect={() => navigation.navigate("/")}   
                    />
                    <SelectionButton
                        title={"Schedule a Meeting"}
                        centerTitle={true}
                        
                        onSelect={() => navigation.navigate("ScheduleMeeting", {item: client})}   
                    />
                </View>
            )
        }
        else if (user.role === "ADMIN"){

        }
    }


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
