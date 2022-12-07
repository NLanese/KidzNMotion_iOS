
// Async
import AsyncStorage from '@react-native-async-storage/async-storage';

// React
import {  View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

// Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { colorState, fontState, sizeState, userState, avatarState, tokenState, videoDataState, assignState, meetingState, activeChatroom, messageNotifications, scheduleNotifications, organizationState, accessibleVideos } from '../../../Recoil/atoms';

// Nuton
import { Header, ProfileCategoryComponent, Button } from "../../../NutonComponents";
import { Heart, Logo, CalendarTab, Bell, Play, MedalTab, UserTab, SettingsLarge, Message } from "../../../svg";
import { COLORS as colorConstant }  from "../../../NutonConstants"
import { DEFAULT_AVATAR } from '../../../NutonConstants';

// Firebase
import messaging from '@react-native-firebase/messaging';

// GraphQL Apollo
import { useMutation } from "@apollo/client";
import { GET_USER, SWAP_TO_CHILD_ACCOUNT, USER_LOGIN, GET_NOTIFICATIONS, GET_CHILD_VIDEO_STATISTICS, UPDATE_PHONE_TOKEN } from "../../../GraphQL/operations";
import client from '../../utils/apolloClient';

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import SelectionButton from "../../../OstrichComponents/SelectionButton";
import OptionsButtons from "../../../OstrichComponents/OptionsButtons"

// Hooks
import getAllChildAssignments from "../../Hooks/value_extractors/childAndGuardianValues/getAllChildAssignments"
import getAllGuardianAssignments from "../../Hooks/value_extractors/childAndGuardianValues/getAllGuardianAssignments"
import getAllTherapistAssignments from "../../Hooks/value_extractors/therapistValues/getAllTherapistAssignments"
import getUserChatroom from "../../Hooks/value_extractors/getChatroom"
import filterAssignments from "../../Hooks/value_extractors/filterAssignments"
import findAllAssignedVideos from "../../Hooks/value_extractors/childAndGuardianValues/findAllAssignedVideos"
import checkToken from "../../utils/firebase/checkToken"

// Dimensions
let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height

export default function Home() {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    ///////////////
    // Mutations //
    ///////////////

    // Switch to Child Account
    const [swapToChildAccount, { loading: loadingAdd, error: errorAdd, data: typeAdd }] =useMutation(SWAP_TO_CHILD_ACCOUNT);

    // User Type Determination
    const [userLogin, { loading: loadingType, error: errorType, data: typeData }] = useMutation(USER_LOGIN);

    // Updates Firebase Token
    const [updatePhoneToken, { loading: loadingToken, error: errorToken, data: dataToken }] = useMutation(UPDATE_PHONE_TOKEN);


    ///////////////
    // Constants //
    ///////////////

        const COLORS = useRecoilValue(colorState)
        const FONTS = useRecoilValue(fontState)
        const SIZES = useRecoilValue(sizeState)
        const AVATAR = useRecoilValue(avatarState)
        const navigation = useNavigation();

    ////////////
    //  State //
    ////////////

        // Loading
        const [loading, setLoading] = useState(true)

        //////////
        // User //
        //////////

            // Duh
            const [user, setUser] = useRecoilState(userState)

            // Sets Selected Child if relevant
            let XSelected
            if (user.role === "GUARDIAN"){
                XSelected = user.children[0]
            }
            else{
                XSelected = false
            }
            const [selectedChild, setSelectedChild] = useState(XSelected)

        ////////////
        // Videos //
        ////////////

            // Videos for Display and 
            const [videos, setVideos] = useRecoilState(videoDataState)

            // Determines the Video to be displayed in Video Button
            const rand = Math.floor(Math.random() * videos.length);
            
            // Determines which video will be shown as a preview
            const [videoForPicture, setVideoForPicture] = useState(videos[rand])

        ///////////////
        // Chatrooms //
        ///////////////

            // Tracks the Chatroom(s) that are active. Parents will have one by default, children will be false, therapists will have an array
            const [activeChat, setActiveChat] = useRecoilState(activeChatroom)

            // Uses a hook to fill in active chat value upon reaching home
            useEffect(() => {
                setActiveChat(getUserChatroom(user))
            }, [user])


        /////////////////////
        // Switcing States //
        /////////////////////

            const [showSwitch, setShowSwitch] = useState(false)

            const [password, setPassword] = useState(false)

            const [switching, setSwitching] = useState(false)

        ////////////////////////////////////////////////
        // For Switching Account and Resetting Values //
        ////////////////////////////////////////////////

            const [token, setToken] = useRecoilState(tokenState)

            const [avatar, setAvatar] = useRecoilState(avatarState)

            const [colors, setColors] = useRecoilState(colorState)

            const [assign, setAssign] = useRecoilState(assignState)

            const [meetings, setMeetings] = useRecoilState(meetingState)

            const [org, setOrg] = useRecoilState(organizationState)

            const [validVids, setValidVids] = useRecoilState(accessibleVideos)


            // Fires wehen switching accounts
            useEffect(() => {
                handleColorInput(user.colorSettings)
                setAvatar(user.profilePic)
                if (user.role === "CHILD"){
                    let assign = filterAssignments(getAllChildAssignments(user))
                    setAssign(assign)
                }
                else if (user.role === "GUARDIAN"){
                    let assign = filterAssignments(getAllGuardianAssignments(user)[0])
                    setAssign(assign)
                }
                else if (user.role === "THERAPIST"){
                    let assign = filterAssignments(getAllTherapistAssignments(user))
                    setAssign(assign)
                }
                setOrg(user.organizations[0].organization)
            }, [user])

        ///////////////////
        // NOTIFICATIONS //
        ///////////////////

            const [msgNotis, setMsgNotis] = useRecoilState(messageNotifications)

            const [schedNotis, setSchedNotis] = useRecoilState(scheduleNotifications)

            const [msgNotiLen, setMsgNotiLen] = useState(msgNotis.length)

            const [schedNotisLen, setSchedNotisLen] = useState(schedNotis.length)

            const clearNotiData = async () => {
                let clear = []
                setMsgNotis( msgNotis => ([...clear]))
                setSchedNotis( schedNotis => ([...clear]))
            } 

            // Fires every reload in order to retain notifications
            useEffect(() => {
                getAndSetNotifications()
                let acceptable = findAllAssignedVideos(user)
                setValidVids(validVids => ([...acceptable]))
            }, [user])

            // Firess whenever there is a change to notifications so to properly measure the lengths for the counter
            useEffect(() => {
                setMsgNotiLen(msgNotis.length)
                setSchedNotisLen(schedNotis.length)
            }, [msgNotis, schedNotis])



        /////////////
        // Testing //
        /////////////

///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    // MAIN RENDER -- Determines which user page to generate
    function MainRender(){
        if (switching){
            return(
                <View>
                    <Text style={{...FONTS.Title, textAlign: 'center', fontSize: 30, margin: 20, color: COLORS.iconLight}}>
                        Please wait while we switch accounts
                    </Text>
                </View>
            )
        }

        if (loading){
            return(
                <View />
            )
        }

        if (user.role === "GUARDIAN" || user.role === "CHILD"){
            return renderUserContent()
        }
        else if (user.role === "ADMIN" || user.role === "THERAPIST"){
            return renderAdminContent()
        }
        else if(user.role === "THERAPIST"){
            return 
        }
        else{
            // Error
        }
    }

    // Renders the large box with a snippet of the last watched video
    function renderVideoBox() {
        return (
            <TouchableOpacity style={{borderColor: COLORS.buttonBorder, borderWidth: 2, borderRadius: 10, height: 190, marginBottom: 20, marginLeft: 10, marginRight: 10}}
                onPress={() => navigation.navigate('VideoLibrary')}
            >
                <View style={{marginTop: 15}}>
                    <Text style={{...FONTS.Title, textAlign: 'center', letterSpacing: 1, color: 'white'}}>Videos</Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image 
                        source={{uri: videoForPicture.previewPictureURL}}
                        style={{
                            width: 270,
                            height: 130,
                            zIndex: -1,
                            marginLeft: 10,
                            // marginTop: -30,
                            
                        }}
                    />
                </View>
            </TouchableOpacity>
        );
    }

    // Renders the Top Half of the Screen (WORKS FOR ALL ROLES)
    function renderHeader() {
        return (
            <View style={{ marginBottom: 30 }}>

                {/* Logo */}
                <View style={{ marginTop: 70 }} >
                    <Image 
                        source={require("../../../assets/wIcon.png")}
                        style={{
                            // position: "absolute",
                            position: 'absolute',
                            height: 70,
                            width: 70,
                            left: maxWidth * 0.5 - 35,
                            borderRadius: 10
                        }}
                    />
                   
                </View>
                
                {/* Header Bar */}
                <View style={{height: maxHeight * 0.1}}>
                    <Header
                        goBack={false}
                        profile={true}
                        // Sends to Settings
                        filterOnPress={() => navigation.navigate("SettingsLanding")}
                    />
                </View>
                    
                {/* Greeting */}
                <Text style={{
                        ...FONTS.Title,
                        textAlign: 'center', 
                        fontSize: 32, 
                        color: COLORS.headerTitle}}>
                    Hello {user.firstName}
                </Text>
            </View>
        );
    }

    // Main Render for P/C User
    function renderUserContent(){
        return(
            <>
                {/* Renders the Video Box */}
                {renderVideoBox()}
                <View style={{ marginBottom: 30, marginLeft: -4}}>
                    {renderLinks()}
                    {renderSwitchAccountsModal()}
                    {renderChildParentMode()}
                </View>
            </>
        )
    }

    // Main Render for Admin / Therapist
    function renderAdminContent(){
        return(
            <>
                <View style={{ marginBottom: 30, marginLeft: -4}}>
                    {renderLinks()}
                </View>
            </>
        )
    }

    // Renders Child Mode / Parent Mode
    function renderChildParentMode(){
        if (user.role === "CHILD"){
            return (
                <SelectionButton
                    title={"Switch to GUARDIAN"}
                    subtitle={"Sign back into your parent / guardian account"}
                    image={"calandar"}       
                    icon={<CalendarTab fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />}
                    onSelect={() => setShowSwitch(true)}
                />
            )
        }
        else if (user.role === "GUARDIAN"){
            return (
                <SelectionButton
                    title={"Switch to CHILD Mode"}
                    subtitle={"Sign back into your child's limited access account"}
                    image={"calandar"}
                    icon={<CalendarTab fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />}
                    onSelect={() => setShowSwitch(true)}
                />
            )
        }
        else{
            return null
        }
    }

    // Renders Messaging Button if user is part of an organization
    function conditionallyRenderMessages(){
        if (!user.solo && user.role !== "CHILD"){
            return(
                <SelectionButton
                    title={"Messaging"}
                    subtitle={"Communicate with your Therapist"}
                    image={"notification"}
                    onSelect={() => navigation.navigate("MessageThread")}
                    icon={<Bell fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} style={{transform: [{ scale: 2 }, {translateX: 3.5}]}}/>}
                    notificationCount={msgNotiLen}
                />
            )
        }
        else if (user.role === "THERAPIST"){
            return(
                <SelectionButton
                    title={"Messaging"}
                    subtitle={"Communicate with your Client Guardians"}
                    image={"notification"}
                    onSelect={() => navigation.navigate("Conversations")}
                    icon={<Bell fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} style={{transform: [{ scale: 2 }, {translateX: 3.5}]}}/>}
                    notificationCount={msgNotiLen}
                />
            )
        }
    }

    // Renders all of the Menu Buttons
    function renderLinks() {
        if (loading){
            return null
        }
        if (user.role === "GUARDIAN" || user.role === "CHILD"){  // role === "GUARDIAN"
            return(
                <>
                    <SelectionButton
                        title={"Calendar"}
                        subtitle={"View weekly or monthly Calandar"}
                        image={"calandar"}
                        onSelect={() => { navigation.navigate("Calendar")} }
                        icon={<CalendarTab fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />}
                        notificationCount={schedNotisLen}
                    />
                    <SelectionButton
                        title={"Medals"}
                        subtitle={"View award collection"}
                        image={"medal"}
                        onSelect={() => {
                            navigation.navigate("Medals")
                        }}
                        icon={<MedalTab fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>}
                    />
                    {conditionallyRenderMessages()}
                </>
            )
        }
        else if(user.role === "ADMIN"){      // role === "ADMIN"
            return(
                <>
                    <SelectionButton
                        title={"Therapists"}
                        subtitle={"View Therapists"}
                        image={"therapist"}
                        onSelect={() => navigation.navigate("TherapistList")}
                        icon={<UserTab fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>}
                    />
                    <SelectionButton
                        title={"Clients"}
                        subtitle={"View or Add Clients"}
                        image={"client"}
                        onSelect={() => navigation.navigate("ClientList")}
                        icon={<UserTab fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>}
                    />
                    <SelectionButton
                        title={"Messaging"}
                        subtitle={"Communicate with your Clients and Therapists"}
                        image={"notification"}
                        onSelect={() => navigation.navigate("/")}
                        icon={<Bell fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} style={{transform: [{ scale: 2 }, {translateX: 3.5}]}}/>}
                        notificationCount={msgNotisLen}
                    />
                    
                </>
            )
        }
        else if (user.role === "THERAPIST"){ // role === "THERAPIST"
            return(
                <>
                    <SelectionButton
                        title={"Clients"}
                        subtitle={"View or Add Clients"}
                        image={"client"}
                        onSelect={() => navigation.navigate("ClientList")}
                        icon={<UserTab fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>}
                    />
                    <SelectionButton
                        title={"Scheduling"}
                        subtitle={"Plan Assignments for Clients and Meetings with Guardians"}
                        image={"notification"}
                        onSelect={() => navigation.navigate("SchedulingLanding")}
                        icon={<SettingsLarge fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} style={{transform: [{ scale: .4 }, {translateX: -70}]}}/>}
                    />
                    <SelectionButton
                        title={"Calendar"}
                        subtitle={"View weekly or monthly Calandar"}
                        image={"calandar"}
                        onSelect={() => {
                             navigation.navigate("Calendar")
                            }}
                        icon={<CalendarTab fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />}
                    />
                    <SelectionButton
                        title={"Messaging"}
                        subtitle={"Communicate with your Clients"}
                        image={"notification"}
                        onSelect={() => navigation.navigate("MessagesLanding")}
                        icon={<Message fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} style={{transform: [{ scale: .9 }, {translateX: -4}]}}/>}
                    />
                    <SelectionButton
                        title={"Videos"}
                        subtitle={"Assign, Watch, and Analyze Videos"}
                        image={"video"}
                        onSelect={() => navigation.navigate("VideoLibrary", )}
                        icon={<Play fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>}
                    />
                </>
            )
        }
    }

    // Renders the modal for switching accounts
    function renderSwitchAccountsModal(){
        return(
            <Modal
                isVisible={showSwitch}
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
                }}>
                    {renderSwitchContent()}
                </View>
            </Modal>
        )
    }

    // Renders the content for the Switch Modal
    function renderSwitchContent(){
        if (user.role === "CHILD"){
            return(
                <>
                    <Text style={{...FONTS.SubTitle, textAlign: 'center', marginBottom: 20, margin: 5, fontSize: 18}}>
                        To switch to guaardian mode, we will need the GUARDIAN password.
                    </Text>
                    <TextInput 
                        style={{borderColor: 'black', borderWidth: 1, borderRadius: 10, height: 50, paddingLeft: 10}}
                        onChangeText={(content) => setPassword(content)}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <View style={{flex: 3, margin: 15}}>
                            <Button
                                title="Submit"
                                onPress={() => handleParentSwitch()}
                            />
                        </View>
                        
                        <View style={{flex: 3, margin: 15}}>
                            <Button
                                title="Cancel"
                                onPress={() => setShowSwitch(false)}
                            />
                        </View>
                    </View>
                    
                </>
            )
        }
        else if (user.role === "GUARDIAN"){
            if (user.children.length > 1){

            }
            else{
                return(
                    <>
                        <Text style={{...FONTS.SubTitle, textAlign: 'center', marginBottom: 20, margin: 5, fontSize: 18}}>
                            Are you sure you want to switch to {user.children[0].firstName}'s account?
                        </Text>
                        <OptionsButtons
                            buttonsArray={["Yes", "No"]}
                            onClickButtonOne={() => handleSwitchToChild()}
                            onClickButtonTwo={() => setShowSwitch(false)}
                            selectedStyle={{
                                backgroundColor: COLORS.gradientColor1,
                                height: 60,
                                width: 100,
                                borderRadius: 10,
                                justifyContent: 'center',
                                marginLeft: 7.5
                            }}
                            inactiveStyle={{
                                backgroundColor: 'white',
                                borderColor: 'black', borderWidth: 1, borderRadius: 10,
                                height: 45, width: 70,
                                marginTop: 7.5, marginLeft: 7.5,
                                justifyContent: 'center'
                            }}
                            textStyle={{...FONTS.Title, textAlign: 'center', fontSize: 15}}
                            activeTextStyle={{...FONTS.Title, textAlign: 'center', fontSize: 15}}
                        />
                    </>
                )   
            }
        }
    }


///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////


    /////////////////////
    // Switch to Child //
    /////////////////////

        // Handles the Yes Click on Switch to Child Mode
        function handleSwitchToChild(){
            setSwitching(true)
            swapToChildAccountMutation()
            .then( async (resolved) => {
                await setTokenFunc(resolved.data.swapToChildAccount.token)
                await getUserQuery()
            })
            .then(() => {

                /////////////////
                // Sets Avatar //
                if (user.profilePic){
                    setAvatar(user.profilePic)
                }
                else{
                    setAvatar({...DEFAULT_AVATAR})
                }
                if (user.colorSettings){
                    handleColorInput(user.colorSettings)
                }
                
                setShowSwitch(false)
                setSwitching(false)
            })
        }

        // Handles the Mutation of switching to a child account
        async function swapToChildAccountMutation(){
            return await swapToChildAccount({
                variables: {
                    childUserID: selectedChild.id
                }
            })
            .catch(err => {console.log(err)})
        }

    ////////////////////////
    // Switch to Guardian //
    ////////////////////////

        // Fires on Password submission
        function handleParentSwitch(){
            let email = user.guardian.email
            setSwitching(true)
            handleParentLogin(email)
            .then(() => {
                setShowSwitch(false)
                setSwitching(false)
            })
        }

        // Process that occurs upon Sign-In attempt
        const handleParentLogin = async (email) => {
            handleLoginMutation(email).then( async (resolved) => {

            //////////////////////
            // Successful Login //
            if (resolved){
                
                await AsyncStorage.setItem('@token', resolved.data.loginUser.token)

                ////////////////////
                // Sets the token //
                await setToken(resolved.data.loginUser.token)

                //////////////
                // Get User //
                await client.query({
                    query: GET_USER,
                    fetchPolicy: 'network-only'  
                })
                .then(async (resolved) => {
                    await setUser(resolved.data.getUser)

                    /////////////////
                    // Sets Avatar //
                    if (user.profilePic){
                        await setAvatar(user.profilePic)
                    }
                    else{
                        await setAvatar({...DEFAULT_AVATAR})
                    }

                    /////////////////
                    // Sets Colors //
                    await handleColorInput(user.colorSettings)
                })
                .catch((error) => {
                    console.log(error)
                })


                ////////////////
                // Get Videos //
                await client.query({
                    query: GET_VIDEOS,
                    fetchPolicy: 'network-only'
                })
                .then(async (resolved) => {
                    await setVideos(resolved.data.getAllVideoFiles)
                })
                
                ////////////////
                // Sets Token //
                await setToken(user.token)
                // If Therapist User
                if (user.role === "THERAPIST"){     
                    setClientList(user.patientCarePlans)     // Sets Client List
                }
                return true
            }
            else {
                return false
            }

        ////////////////////////
        // Sends to Home Page //
        }).then( (resolved) => {
                if (!resolved){
                    return
                }
                navigation.navigate("Home")

        ////////////////////////
        // Unsuccessful Login //
        }).catch(error => {
            if (error.toString().includes("Error: Email/Password are incorrect.")){
                setErrors({
                    email: "Email and Password do not match any users",
                    password: "Email and Password do not match any users"
                })
            }
            else{
            }
        })
        }

        // Determines which login Mutation to use 
        const handleLoginMutation = async (email) => {
            return await userLogin({
                variables: {
                    username: email,
                    password: password,
                }
            }).catch(err => {console.log(err)})
        }
    
    /////////////////////////////
    // General Query Functions //
    /////////////////////////////

        // Gets and Sets the entire User Object
        async function getUserQuery(){
            await client.query({
                query: GET_USER,
                fetchPolicy: 'network-only'  
            })
            .then(async (resolved) => {
                setUser(resolved.data.getUser)
            })
            .catch((error) => {
                console.log(error)
            })
        }

        // Gets and Sets Notifications, sets categorical notis too
        async function getAndSetNotifications(){
            await clearNotiData()
            await client.query({
                query: GET_NOTIFICATIONS,
                fetchPolicy: 'network-only'
            })
            .catch(err => console.log(err))
            .then((resolved) => {
                let msgN = resolved.data.getNotifications.filter((noti, index) => {
                    if (noti.title.includes("New Message")){
                        return noti
                    }
                })
                let schedN = resolved.data.getNotifications.filter((noti, index) => {
                    if (noti.title.includes("New Meeting") || noti.title.includes("New Assignment")){
                        return noti
                    }
                    else{
                    }
                })
                setMsgNotis( msgNotis => ([...msgN]))
                setSchedNotis( schedNotis => ([...schedN]))
                setLoading(false)
            })
        }

        // In Charge of changing the async token when changing accounts
        async function setTokenFunc(token){
            await AsyncStorage.setItem('@token', token)
            await setToken(token)
        }

        // Determines color based on input
        function handleColorInput(color){
            if (color === "Orange"){
                setColors({...colorConstant.scheme0})
            }
            else if (color === "Fuscia"){
                setColors({...colorConstant.scheme1})
            }
            else if (color === "Blue"){
                setColors({...colorConstant.scheme2})
            }
            else if (color === "Yellow"){
                setColors({...colorConstant.scheme3})
            }
            else if (color === "Aura"){
                setColors({...colorConstant.scheme4})
            }
            
        }

    //////////////////////
    // FCM Token Update //
    //////////////////////

        async function handleUpdatePhoneToken(){
            const fcmToken = await messaging().getToken();
            return await updatePhoneToken({
                variables: {
                    token: fcmToken
                }
            })
            .then((resolved) => {
                console.log(resolved)
            })
            .catch(err => console.log(err))
        }



///////////////////////
///                 ///
///       Main      ///
///                 ///
///////////////////////




////// TESTING //////// 
    return (
        <Gradient
            colorOne={COLORS.gradientColor1}
            colorTwo={COLORS.gradientColor2}
            style={{height: '110%', paddingTop: 5}}
        >
            {renderHeader()}
            <ScrollView contentContainerStyle={{height: '120%', paddingBottom: '10%'}}>
                {MainRender()}
            </ScrollView>
        </Gradient>
    );
}
