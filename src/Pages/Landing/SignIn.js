// Async
import AsyncStorage from '@react-native-async-storage/async-storage';

// React
import React, { useState, useEffect } from "react";
import { View,Text, ImageBackground, SafeAreaView, Image, TouchableOpacity, Dimensions} from "react-native";

// Apollo graphQL
import { useMutation, useQuery } from '@apollo/client';
import { USER_LOGIN, GET_USER, GET_VIDEOS, GET_MEETINGS } from "../../../GraphQL/operations";
import client from '../../utils/apolloClient';

// Firebase
import { firebase } from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';

// Recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState, tokenState, clientListState, colorState, fontState, sizeState, videoDataState, avatarState, meetingState, assignState, firstOpen} from "../../../Recoil/atoms";

// Renderings / Nuton 
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Header, InputField, Button } from "../../../NutonComponents";
import { Check, EyeOff, CheckSmall, Facebook, Twitter, Google, Eye } from "../../../svg";
import { DEFAULT_AVATAR } from '../../../NutonConstants';
import { COLORS as colorConstant }  from "../../../NutonConstants"

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";

// Hooks
import getAllChildAssignments from '../../Hooks/value_extractors/childAndGuardianValues/getAllChildAssignments';
import getAllGuardianAssignments from '../../Hooks/value_extractors/childAndGuardianValues/getAllGuardianAssignments';
import getAllTherapistAssignments from '../../Hooks/value_extractors/therapistValues/getAllTherapistAssignments';
import filterMeetings from '../../Hooks/value_extractors/filterMeetings';
import filterAssignments from '../../Hooks/value_extractors/filterAssignments';

// Loading
import LoadingComponent from "./LoadingComponent"


let maxHeight = Dimensions.get('window').height

export default function SignIn() {
    ////////////////////////////
    ///                      ///
    ///    Arbitary Tests    ///
    ///                      ///
    ////////////////////////////


    ///////////////////////////
    ///                     ///
    ///      Mutations      ///
    ///                     ///
    ///////////////////////////
    
    // User Type Determination
    const [userLogin, { loading: loadingType, error: errorType, data: typeData }] = useMutation(USER_LOGIN);

    // Gets user and logs in if token is present

    
    ///////////////////////////
    ///                     ///
    ///     Preliminary     ///
    ///                     ///
    ///////////////////////////
    
    ///////////////
    // Constants //
    ///////////////

        const [COLORS, setColors] = useRecoilState(colorState)
        const FONTS = useRecoilValue(fontState)
        const SIZES = useRecoilValue(sizeState)

    /////////////////
    // Local State //
    /////////////////

        // Show/Hide password Boolean
        const [showPassword, setShowPassword] = useState(false)

        // Triggers RememberMe
        const [rememberMe, setRememberMe] = useState(false);

        // Trakcs Username Input
        const [username_or_email, setUsername] = useState("")

        // Tracks Password Input
        const [password, setPassword] = useState("")

        // Navigation Object
        const navigation = useNavigation();

        const [loading, setLoading] = useState(false)

        // Errors
        const [errors, setErrors] = useState({
            username: false,
            password: false
        })

    //////////////////
    // Recoil State //
    //////////////////

        // User
        const [user, setUser] = useRecoilState(userState)

        // Token
        const [token, setToken] = useRecoilState(tokenState)

        // ClientList         
        const [clientList, setClientList] = useRecoilState(clientListState)

        // Video List
        const [videos, setVideos] = useRecoilState(videoDataState)

        // Avatar State
        const [avatar, setAvatar] = useRecoilState(avatarState)

        // Meetings State
        const [meetings, setMeetings] = useRecoilState(meetingState)

        // Assignments State
        const [assign, setAssign] = useRecoilState(assignState)

        // First Open State
        const [first, setFirst] = useRecoilState(firstOpen)

        // Determmines whether or not we be splashing
        const [splashing, setSplashing] = useState(first)

///////////////////////////
///                     ///
///      UseEffect      ///
///                     ///
///////////////////////////

    // If somehow navigated back, 
    useEffect(() => {
        if (token){
            navigation.navigate("Home")
        }
    }, [])

    // Checks Notification Permissions
    useEffect(() => {
        async function checkFcmPermission(){
            let enabled = await messaging().hasPermission();
            if (enabled){
                return 
            }
            else{
                await messaging().requestPermission();
                enabled = await messaging().hasPermission();
            }
        }
        checkFcmPermission()
    }, [])

    // Handles Async
    useEffect(() => {
        if (rememberMe){
            setUsername(getData().email)
            setPassword(getData().password)
        }
    }, [rememberMe])

///////////////////////////
///                     ///
///       Handler       ///
///                     ///
///////////////////////////

    ////////////////////
    // State Changers //
    ////////////////////

        // Alternates Eye on/off svg and show/hides password
        const togglePassword = () => {
            if (showPassword){
                setShowPassword(false)
                return
            }
            setShowPassword(true)
        }

        // Handles Input Field Inputs
        const handleInput = (input, type) => {
            if (type === "username"){
                setUsername(input)
            }
            else if (type === "password"){
                setPassword(input)
            }
        } 

    ///////////////
    // Mutations //
    ///////////////

        // Clears login errors
        function clearErrors(){
            setErrors({                                     
                username: false,                            // Remove Error Messages
                password: false                             // Remove Error Messages
            })
        }

        // Sets Tokens and Async Data
        async function setTokenAsyncAndRegular(resolved){
            await setToken(resolved.data.loginUser.token)
            return await AsyncStorage.setItem('@token', resolved.data.loginUser.token)
        }

        // Sets the user object and all other statea that are dependent on the user Object
        async function getAndSetUserAndUserProps(){
            return await client.query({
                query: GET_USER,
                fetchPolicy: 'network-only'  
            })
            .catch(err => {console.log(err)})
            .then(async(resolved) => {
                // User //
                await setUser(resolved.data.getUser)

                // Avatar //
                if (resolved.data.getUser.profilePic){
                    await setAvatar(resolved.data.getUser.profilePic)
                }
                else{
                    await setAvatar({...DEFAULT_AVATAR})
                }

                // Assignments //
                await findUserAssignments(resolved.data.getUser)

                // Sets Colors //
                await handleColorInput(resolved.data.getUser.colorSettings)
            })
        }

        // Determines how to grab assignments based on User Role 
        async function findUserAssignments(user){
            if (user.role === "CHILD"){
                let assign = filterAssignments(getAllChildAssignments(user))
                await setAssign(assign)
            }
            else if (user.role === "GUARDIAN"){
                let assign = filterAssignments(getAllGuardianAssignments(user)[0])
                await setAssign(assign)
            }
            else if (user.role === "THERAPIST"){
                let assign = filterAssignments(getAllTherapistAssignments(user))
                await setAssign(assign)
            }
            else{
                console.log("findUserAssignments failed, there was no user.role for some reason")
            }
        }

        // Gets all of the Videos from the API
        async function getVideos(){
            await client.query({
                query: GET_VIDEOS,
                fetchPolicy: 'network-only'
            })
            .then((resolved) => {
                setVideos(resolved.data.getAllVideoFiles)
            })
        }

        // Gets all of a User's Meetings
        async function getUserMeetings(){
            await client.query({
                query: GET_MEETINGS,
                fetchPolicy: 'network-only'
            })
            .catch(err => {
                setLoading(false)
                return null
            })
            .then((resolved) => {
                let meetings = filterMeetings(resolved.data.getMeetings)
                setMeetings(meetings)
            })      
        }

        // Process that occurs upon Sign-In attempt
        const handleSignIn = async () => {
            setLoading(true)

            ///////////////////
            // Async Storage //
            if (rememberMe){
                AsyncStorage.setItem('@email', username_or_email)
                AsyncStorage.setItem('@password', password)
            }

            // MUTATION //
            handleLoginMutation()

            //////////////////////
            // Successful Login //   
            .then( async (resolved) => {

                // Successful Login //
                if (resolved){

                    // Clears Login Errors //
                    await clearErrors()

                    // Async Stuff and Token //
                    await setTokenAsyncAndRegular(resolved)
                    
                    // Get User, Avatar, and Colors //
                    await getAndSetUserAndUserProps()

                    // Gets Videos //
                    await getVideos()

                    // Get Meetings //
                    await getUserMeetings()

                    // Determines Client List //
                    if (user.role === "THERAPIST"){     
                        setClientList(user.patientCarePlans)     // Sets Client List
                    }

                    // Positive Return
                    return true
                }
                
                // FAILED LOGIN //
                else {
                    return false
                }

           ////////////////////////
           // Sends to Home Page //
           }).then( (resolved) => {

                // If failed login, do not reroute
                if (!resolved){
                    return "Error, you done goofed"
                }

                // On Successful Login, reroute
                setLoading(false)
                navigation.navigate("Home")

            })
        }

        // Determines which login Mutation to use 
        const handleLoginMutation = async () => {
            return await userLogin({
                variables: {
                    username: username_or_email,
                    password: password,
                }
            })
            ///////////////////
            // Catches Error //
            .catch(error => {
                if (error.toString().includes("Error: Email/Password are incorrect.")){
                    setErrors({
                        email: "Email and Password do not match any users",
                        password: "Email and Password do not match any users"
                    })
                }
                else{
                }
                setLoading(false)
               })
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

        // Starts the Splash Countdown
        function startSplashCountdown(){
            setTimeout(function(){
                console.log("hit splash stop")
                setSplashing(false)
            }, 3000)
        }

        function toggleRememberMe(){
            if (rememberMe){
                AsyncStorage.setItem('@remember', true)
            }
            else{
                AsyncStorage.setItem('@remember', false)
            }
        }

        // This pulls the Async Data from the Phone's Storage
        const getData = async () => {
            try {
                const email = await AsyncStorage.getItem('@email')
                const password = await AsyncStorage.getItem('@password')
                const remember = await AsyncStorage.getItem('@remember')
                const data = {
                    email: email,
                    password: password,
                    rememberMe: remember
                }
                return data
            } catch (error) {
                throw new Error(error)
            }
        }

///////////////////////////
///                     ///
///      Rendering      ///
///                     ///
///////////////////////////

    // Renders Header Bar
    function renderHeader() {
        return <Header title="Sign In" goBack={false} onPress={() => navigation.goBack()} />;
    }

    // Renders the Content of the SignIn
    function renderContent() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    paddingTop: 36,
                    paddingHorizontal: 20,
                    flexGrow: 1,
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.Title,
                        marginBottom: 14,
                        lineHeight: 32 * 1.2,
                        color: COLORS.headerTitle,
                    }}
                >
                    Welcome Back!
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.SubTitle,
                        fontSize: 18,
                        color: COLORS.headerTitle,
                        lineHeight: 18 * 1.7,
                        marginBottom: 26,
                    }}
                >
                    Sign in to continue
                </Text>
                <InputField
                    title="Username or Email"
                    placeholder="ExmpUser / ExmpEmail@site.com"
                    icon={
                        <View style={{ padding: 20 }}>
                            <Check fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                        </View>
                    }
                    onChangeText={(content) => handleInput(content, 'username') }
                    containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                />
                <InputField
                    title="Password"
                    placeholder="••••••••"
                    secureTextEntry={!showPassword}
                    icon={
                        <TouchableOpacity style={{ padding: 20 }} onPress={togglePassword}>
                            {showPassword ? <Eye fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/> : <EyeOff fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>}
                        </TouchableOpacity>
                    }
                    onChangeText={(content) => handleInput(content, 'password') }
                    containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                />
                {renderErrorMessage('password')}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 30,
                    }}
                >
                    <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() => togglePassword()}
                    >
                        <View
                            style={{
                                width: 16,
                                height: 16,
                                borderWidth: 1,
                                borderRadius: 4,
                                marginRight: 8,
                                borderColor: COLORS.buttonBorder,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {rememberMe && <CheckSmall fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>}
                        </View>
                        <Text style={{...FONTS.SubTitle, color: COLORS.headerTitle}} >Remember me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ForgotPassword")}
                    >
                        <Text style={{...FONTS.SubTitle, color: COLORS.headerTitle}} >
                            Forgot password?
                        </Text>
                    </TouchableOpacity>
                </View>
                <Button
                    title="Sign in"
                    containerStyle={{ marginBottom: 20 }}
                    onPress={() => handleSignIn()}
                />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 38,
                        marginTop: 80,
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.SubTitle,
                            fontSize: 16,
                            color: COLORS.iconDark,
                            lineHeight: 16 * 1.7,
                        }}
                    >
                        Don’t have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text
                            style={{
                                ...FONTS.Title,
                                fontSize: 18,
                                color: COLORS.headerTitle,
                                lineHeight: 16 * 1.7,
                            }}
                        >
                            {" "}
                            Sign up.
                        </Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView>
        );
    }

    // Renders Error Message
    function renderErrorMessage(type){
        if (errors[type]){
            return(
                <View style={{marginTop: -5, marginBottom: 15, backgroundColor: "white", padding: 2, paddingTop: 5, paddingBottom: 5, borderRadius: 10}}>
                    <Text style={{color: "red", fontFamily: 'Gilroy-Bold', textAlign: 'center'}}>
                        {errors[type]}
                    </Text>
                </View>
            )
        }
    }

    // Main
    function MAIN(){
        if (splashing){
            startSplashCountdown()
            return(
                // <View style={{backgroundColor: 'black', flex:1}}>
                <Gradient
                colorOne={COLORS.gradientColor1}
                colorTwo={COLORS.gradientColor2}
                style={{height: '100%'}}
                >
                    <View style={{
                         flex: 1,
                         justifyContent: 'center',
                         alignItems: 'center'
                    }}>
                        <Image 
                        source={require("../../../assets/icon.png")}
                        style={{
                            position: 'absolute',
                            marginTop: '45%',
                            width: '60%'
                        }}
                        resizeMode={'contain'}
                    />
                    </View>
                </Gradient>
            // </View>
            )
        }
        else{
            return(
                <Gradient
                colorOne={COLORS.gradientColor1}
                colorTwo={COLORS.gradientColor2}
                style={{height: '100%'}}
                >
                    <LoadingComponent loading={loading} label = "LOADING..."/>
                    <View style={{marginTop: maxHeight * 0.05}} />
                    {renderHeader()}
                    {renderContent()}
                </Gradient>
            )
        }
    }

///////////////////////////
///                     ///
///     Main Render     ///
///                     ///
///////////////////////////
    
   
    return MAIN()
}
