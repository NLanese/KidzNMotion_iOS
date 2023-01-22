// React
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity, Switch } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

// Nuton
import { Header, ProfileCategoryComponent } from "../../../../NutonComponents";
import { AREA } from "../../../../NutonConstants";
import { Heart, Gift, CreditCard, HelpCircle, FileText, LogOut, Edit, Message, Video, CourseUserSvg, Bell } from "../../../../svg";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { colorState, fontState, sizeState, user, userState } from '../../../../Recoil/atoms';

// Gradient
import Gradient from "../../../../OstrichComponents/Gradient";
import SelectionButton from "../../../../OstrichComponents/SelectionButton";


//////// Settings //////// Settings //////// Settings //////// Settings //////// Settings //////// Settings //////// Settings //////// Settings //////// Settings ////////

export default function ProfileVideoSettings(props) {
    const client = props.route.params?.item;
    const {firstName, lastName, location, email} = props.route.params?.item
   
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

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

    // Renders the Header
    function renderHeader() {
        return (
            <Header
                title="User Video Settings"
                goBack={true}
                profile={true}
                onPress={() => navigation.goBack()}
                filterOnPress={() => navigation.navigate("SettingsLanding")}
            />
        );
    }

    // Renders the Profile Picture and Name of the User
    function renderImageAndName(){
        return(
            <View>
                <ImageBackground
                    source={{ uri: "https://via.placeholder.com/360x360" }}
                    style={{
                        width: 120,
                        height: 120,
                        alignSelf: "center",
                        marginTop: 20,
                        marginBottom: 20,
                    }}
                    imageStyle={{ borderRadius: 60 }}
                >
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            backgroundColor: COLORS.white,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            right: 0,
                            bottom: -10,
                        }}
                    >
                        <Edit fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                    </View>
                </ImageBackground>
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.H3,
                        color: COLORS.black,
                        lineHeight: 20 * 1.4,
                    }}
                >
                    {firstName} {lastName}
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
                    {email}
                </Text>
            </View>
        )
    }

    // Main Render Boi
    function MainRender() {
       return(
        <View>
            {renderHeader()}
            {renderImageAndName()}
            {renderButtons()}
        </View>
       )
    }

    // 
    function renderLevel(){
        
    }

    // Renders the Page Options
    function renderButtons() {
        if (user.role === "GUARDIAN" || user.role === "CHILD"){  //role === "GUARDIAN"

        }
        else if (user.role === "THERAPIST" || user.role === "ADMIN"){
            return(
                <View>
                    <SelectionButton
                        title={"Assign Videos"}
                        centerTitle={true}
                        
                        onSelect={() => navigation.navigate("SchedulingLanding")}
                    />
                    <SelectionButton
                        title={"Block Videos"}
                        centerTitle={true}
                        
                        onSelect={() => navigation.navigate("VideoLibrary", {client: client})}   
                    />
                    <SelectionButton
                        title={"Track Progress"}
                        centerTitle={true}
                        onSelect={() => navigation.navigate("TrackProgress", {client: client})}
                    />
                </View>
            )
        }
        else if (user.role === "ADMIN"){

        }
    }



///////////////////////
///                 ///
///   Main Render   ///
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
