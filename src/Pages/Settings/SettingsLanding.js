// React
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import BouncyCheckboxGroup, {} from "react-native-bouncy-checkbox-group";


// Nuton
import { Header } from "../../../NutonComponents";
import { Edit } from "../../../svg";
import { COLORS as colorConstant }  from "../../../NutonConstants"

// Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { colorState, fontState, sizeState, userState, tokenState, avatarState } from '../../../Recoil/atoms';

// Mutation
import { useMutation } from "@apollo/client";
import { LOGOUT_USER, EDIT_COLOR_SETTINGS } from "../../../GraphQL/operations";

// Gradient
import Gradient from "../../../OstrichComponents/Gradient";
import SelectionButton from "../../../OstrichComponents/SelectionButton";
import PersonasAvatar from "./AvatarSettings/PersonasAvatar"



//////// Settings //////// Settings //////// Settings //////// Settings //////// Settings //////// Settings //////// Settings //////// Settings //////// Settings ////////

export default function SettingsLanding() {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    ////////////////
    // Constants  //
    ////////////////
        const navigation = useNavigation();
        
        const FONTS = useRecoilValue(fontState)
        const SIZES = useRecoilValue(sizeState)
        const AVATAR = useRecoilValue(avatarState)
        

    ////////////
    // States //
    ////////////

        // User Settings
        const [user, setUser] = useRecoilState(userState)

        // Token Setting (For Logout)
        const [token, setToken] = useRecoilState(tokenState)

        ////////////
        // MODALS //
        ////////////
        
        // Sets Signout Modal
        const [showSignOutModal, setshowSignOutModal] = useState(false);

        // Toggles whether the color modal is shown or not
        const [showColorModal, setShowColorModal] = useState(false);

        ////////////
        // COLORS //
        ////////////

        // Toggles the color state (which gets changed here!!!)
        const [COLORS, setColors] = useRecoilState(colorState)

        const [colorString, setColorString] = useState(false)

        // Tracks the previous colors in case changes aren't saved 
        const [previousColors, setPreviousColors] = useState(colorState)

    /////////////////
    /// Mutations ///
    /////////////////
    
    const [logout, { loading: loadingL, error: errorL, data: dataL }] = useMutation(LOGOUT_USER)

    const [editColorSettings, { loading: loadingC, error: errorC, data: dataC }] = useMutation(EDIT_COLOR_SETTINGS)

///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    // Renders the header bar and back arrow
    function renderHeader() {
        let title="Settings"
        if (user.role === "THERAPIST"){ // role === "ADMIN"
            title="Settings"
        }
        else if (user.role === "ADMIN"){ // role === "THERAPIST"
            title="Settings"
        }
        return(
            <View style={{marginTop: 40}}>
                <Header 
                    title={title}
                    onPress={() => navigation.navigate('/')}
                    goBack={true}
                />
            </View>
            
        ) 
    }

    // Renders Color Swatches for Selection
    function renderColorModal() {
        return (
            <Modal
                isVisible={showColorModal}
                onBackdropPress={setShowColorModal}
                hideModalContentWhileAnimating={true}
                backdropTransitionOutTiming={0}
                style={{ margin: 0 }}
                animationIn="zoomIn"
                animationOut="zoomOut"
            >
                <View
                    style={{
                        width: SIZES.width - 40,
                        backgroundColor: COLORS.buttonColorLight,
                        marginHorizontal: 20,
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        paddingTop: 40,
                        paddingBottom: 30,
                    }}
                >
                    
                    <BouncyCheckboxGroup
                        data={
                            [
                            {
                                id: 0,
                                string: "Orange",
                                ...colorConstant.scheme0                                
                            },
                            {
                                string: "Fuscia",
                                id: 1,
                                ...colorConstant.scheme1
                            },
                            {
                                string: "Blue",
                                id: 2,
                                ...colorConstant.scheme2
                            },
                            {
                                string: "Yellow",
                                id: 3,
                                ...colorConstant.scheme3
                            },
                            {
                                string: "Aura",
                                id: 4,
                                ...colorConstant.scheme4
                            },
                            {
                                string: "Rust",
                                id: 5,
                                ...colorConstant.scheme5
                            },
                            ]}
                        onChange={(selectedItem) => {
                            setPreviousColors({...COLORS})
                            setColors({...selectedItem})
                            setColorString(selectedItem.string)
                        }}
                    />
                    
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 130,
                                height: 48,
                                backgroundColor: COLORS.buttonColorLight,
                                borderRadius: 10, justifyContent: "center", alignItems: "center",  marginTop: 10, marginHorizontal: 7.5, borderColor: COLORS.buttonColorDark, borderWidth: 1,
                            }}
                            onPress={() => {   
                                selectOrCancelColors("confirm")
                            }}
                        >
                            <Text style={{ color: COLORS.buttonColorDark, ...FONTS.Lato_700Bold, fontSize: 18, textTransform: "capitalize",}}>
                                Save
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                width: 130,
                                height: 48,
                                backgroundColor: COLORS.buttonColorDark,
                                borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: 7.5,
                                marginTop: 10,
                            }}
                            onPress={() => selectOrCancelColors("cancel")}
                        >
                            <Text
                                style={{
                                    color: COLORS.buttonColorLight,
                                    ...FONTS.Lato_700Bold,
                                    fontSize: 18,
                                    textTransform: "capitalize",
                                }}
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    // Sign Out Modal
    function renderSignOutModal() {
        return (
            <Modal
                isVisible={showSignOutModal}
                onBackdropPress={setshowSignOutModal}
                hideModalContentWhileAnimating={true}
                backdropTransitionOutTiming={0}
                style={{ margin: 0 }}
                animationIn="zoomIn"
                animationOut="zoomOut"
            >
                <View
                    style={{
                        width: SIZES.width - 40,
                        backgroundColor: COLORS.white,
                        marginHorizontal: 20,
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        paddingTop: 40,
                        paddingBottom: 30,
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.Title,
                            lineHeight: 20 * 1.5,
                            marginBottom: 30,
                        }}
                    >
                        Are you sure you {"\n"} want to Sign Out ?
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 130,
                                height: 48,
                                backgroundColor: COLORS.white,
                                borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: 7.5,
                                borderColor: COLORS.black,
                                borderWidth: 1,
                            }}
                            onPress={() => {
                                setshowSignOutModal(false);
                                handleSignOut()
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.black,
                                    ...FONTS.ModalButton,
                                }}
                            >
                                Sure
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 130,
                                height: 48,
                                backgroundColor: COLORS.black,
                                borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: 7.5,
                            }}
                            onPress={() => setshowSignOutModal(false)}
                        >
                            <Text
                                style={{
                                    color: COLORS.white,
                                    ...FONTS.ModalButton,
                                }}
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    // Renders profile picture and name at top
    function renderImageAndName(){
        return (
            <View>

                {/* Image */}
                <PersonasAvatar 
                    style={{
                            width: 150,
                            height: 150,
                            alignSelf: "center",
                            marginTop: 20,
                            marginBottom: 20,
                        }}
                    characterSettings={{...AVATAR}}
                    imageStyle={{ borderRadius: 60 }}>
                        <TouchableOpacity
                            style={{
                                width: 40,
                                height: 40,
                                backgroundColor: COLORS.white,
                                borderRadius: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                                right: 0,
                                bottom: 0,
                            }}
                            onPress={() => navigation.navigate('ProfileEdit')}
                        >
                            <Edit fillColor={COLORS.iconDark} strokeColor={COLORS.iconDark}/>
                        </TouchableOpacity>
                </PersonasAvatar>
                        
                {/*  Name  */}
                <View>
                    <Text style={{...FONTS.Title, fontSize: 34, textAlign: 'center', color: COLORS.headerTitle, marginBottom: 15}}>
                        {user.firstName} {user.lastName}
                    </Text>
                </View>
                
            </View>
        )
    }

    // Main Render Boi
    function MainRender() {
        return(
            <ScrollView>
                {renderHeader()}
                {renderImageAndName()}
                {renderButtons()}
                {renderSignOutModal()}
            </ScrollView>
        )
    }

    // Determines whether user has access to organization settings
    function renderOrganizationSettings() {
        if (user.ownedOrganization && user.role !== "GUARDIAN" && user.role !== "CHILD"){
            if (user.ownedOrganization.id){
                return(
                    <>
                        <SelectionButton
                            title={"Organization Settings"}
                            plainCenter={true}
                            onSelect={() => navigation.navigate("orgSettings")}
                        />
                    </>
                )
            }
        }
    }

    // Renders Request Meeting for Parents only
    function renderRequestMeeting(){
        if (user.role !== "CHILD"){
            return(
                <SelectionButton 
                    title={"Request a Meeting"}
                    onSelect={() => navigation.navigate("ScheduleMeeting")}
                    plainCenter={true}
                />
            )
        }
    }

    // Renders the inputs that are appropriate for user access
    function renderButtons(){
        if (user.role === "GUARDIAN" || (user.role === "CHILD" && user.accessSettings)){  //role === "GUARDIAN"
            return(
                <View style={{marginLeft: -4}}>
                    <SelectionButton 
                        title={"Edit Profile"}
                        onSelect={() => navigation.navigate("ProfileEdit")}
                        plainCenter={true}
                    />
                    <SelectionButton 
                        title={"Settings"}
                        plainCenter={true}
                        onSelect={() => navigation.navigate("GeneralSettings")}
                    />
                    <SelectionButton 
                        title={"Screen Color"}
                        plainCenter={true}
                        onSelect={()=> setShowColorModal(true)}
                    />
                    {renderRequestMeeting()}
                    <SelectionButton 
                        title={"Sign Out"}
                        plainCenter={true}
                        onSelect={() => setshowSignOutModal(true)}
                    />
                </View>
                
            )
        }
        else if (user.role === "CHILD"){
            return(
                <View>
                    <SelectionButton 
                        title={"Screen Color"}
                        plainCenter={true}
                        onSelect={()=> setShowColorModal(true)}
                    />
                    <SelectionButton 
                        title={"Sign Out"}
                        plainCenter={true}
                        onSelect={() => setshowSignOutModal(true)}
                    />
                </View>
            )
        }
        else if (user.role === "THERAPIST" || user.role === "ADMIN"){ //role === "THERAPIST"
            return(
                <>
                    <SelectionButton 
                        title={"Screen Color"}
                        plainCenter={true}
                        onSelect={()=> setShowColorModal(true)}
                        
                    />
                    <SelectionButton
                        title={"Account Settings"}
                        plainCenter={true}
                        onSelect={() => navigation.navigate("GeneralSettings")}
                    />
                    <SelectionButton 
                        title={"Edit Profile"}
                        onSelect={() => navigation.navigate("ProfileEdit")}
                        plainCenter={true}
                    />
                    {renderOrganizationSettings()}
                    <SelectionButton 
                        title={"Sign Out"}
                        plainCenter={true}
                        onSelect={() => setshowSignOutModal(true)}
                    />
                </>
                
            )
        }
        else{
            // Error
        }
    }

///////////////////////
///                 ///
///     Handler     ///
///                 ///
///////////////////////

    // Handles the signout
    function handleSignOut() {
        signOutMutation().then( resolved => {
            setToken(false)
            navigation.navigate("SignIn")
        }).catch(err => {
            console.log(err)
        })
    }

    // Runs the actual signoput mutation
    async function signOutMutation(){
        return await logout()
    }

    // Runs mutation to save colors
    const selectOrCancelColors = async (input) => {
        // if CANCEL
        if (input === "cancel"){
            await setColors(previousColors)
            setShowColorModal(false)
        }

        // if CONFIRM
        else if (input === "confirm"){
            setShowColorModal(false)
            colorMutation()
            .then((resolved) => {
            })
        }
    }

    // Runs the color saving Mutation
    async function colorMutation() {
        return await editColorSettings({
            variables: {
                colorSettings: colorString
            }
        }).catch(err => console.log(err))
    }

    return (
        // <SafeAreaView style={{ flex: 1, ...AREA.AndroidSafeArea }}>
             <Gradient
                colorOne={COLORS.gradientColor1}
                colorTwo={COLORS.gradientColor2}
                style={{height: '100%'}}
            >
                <View style={{marginLeft: 3}}>
                    {MainRender()}
                    {renderColorModal()}
                </View>
            </Gradient>
        // </SafeAreaView>
    );
}