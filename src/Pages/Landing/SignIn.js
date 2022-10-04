// Async
import AsyncStorage from '@react-native-async-storage/async-storage';

// React
import React, { useState, useEffect } from "react";
import { View,Text, TouchableOpacity, Dimensions} from "react-native";

// Apollo graphQL
import { useMutation} from '@apollo/client';
import { USER_LOGIN, GET_USER, GET_VIDEOS, GET_MEETINGS } from "../../../GraphQL/operations";
import client from '../../utils/apolloClient';

// Recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState, tokenState, clientListState, colorState, fontState, sizeState, videoDataState, avatarState, meetingState, assignState} from "../../../Recoil/atoms";

// Renderings / Nuton 
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Header, InputField, Button } from "../../../NutonComponents";
import { Check, EyeOff, CheckSmall, Eye } from "../../../svg";
import { DEFAULT_AVATAR } from '../../../NutonConstants';
import { COLORS as colorConstant }  from "../../../NutonConstants"

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";

// Hooks
import getAllChildAssignments from '../../Hooks/value_extractors/getAllChildAssignments';
import getAllGuardianAssignments from '../../Hooks/value_extractors/getAllGuardianAssignments';
import getAllTherapistAssignments from '../../Hooks/value_extractors/getAllTherapistAssignments';

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
        const [rememberMe, setRememberMe] = useState(true);

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

        // Process that occurs upon Sign-In attempt
        const handleSignIn = async () => {
            setLoading(true)
            handleLoginMutation()

            //////////////////////
            // Successful Login //   
            .then( async (resolved) => {

            //////////////////////
            // Successful Login //
            if (resolved){

                /////////////////////////
                // Clears Login Errors //
                setErrors({                                     
                    username: false,                            // Remove Error Messages
                    password: false                             // Remove Error Messages
                })

                /////////////////
                // Async Stuff //
                await AsyncStorage.setItem('@token', resolved.data.loginUser.token)

                ////////////////////
                // Sets the token //
                await setToken(resolved.data.loginUser.token)
                console.log(resolved.data.loginUser.token, "Set the Token, moving on")

                //////////////
                // Get User //
                await client.query({
                    query: GET_USER,
                    fetchPolicy: 'network-only'  
                })
                .then(async (resolved) => {
                    // console.log(resolved)
                    await setUser(resolved.data.getUser)
                    console.log("Set the user object, moving on")

                    /////////////////
                    // Sets Avatar //
                    if (user.profilePic){
                        console.log("Profile pic found and assigned. Moving on")
                        await setAvatar(user.profilePic)
                    }
                    else{
                        console.log("No profile pic, moving on")
                        await setAvatar({...DEFAULT_AVATAR})
                    }

                    /////////////////
                    // Sets Colors //
                    console.log("Setting colors...")
                    await handleColorInput(user.colorSettings)
                })
                .catch((error) => {
                    console.log(error)
                })
                .then(() => {
                    
                    /////////////////////
                    // Get Assignments //
                    console.log("getting Assignments")
                    if (user.role === "CHILD"){
                        console.log(getAllChildAssignments(user), "\nASSIGNMENTS")
                        setAssign(getAllChildAssignments(user))
                    }
                    else if (user.role === "GUARDIAN"){
                        console.log(getAllGuardianAssignments(user)), "\NASSIGNMENTS"
                        setAssign(getAllGuardianAssignments(user))
                    }
                    else if (user.role === "THERAPIST"){
                        console.log(getAllTherapistAssignments(user))
                        setAssign(getAllTherapistAssignments(user))
                    }
                    else{
                        console.log(user.role)
                        console.log("No user?")
                    }
                })


                ////////////////
                // Get Videos //
                await client.query({
                    query: GET_VIDEOS,
                    fetchPolicy: 'network-only'
                })
                .then(async (resolved) => {
                    await setVideos(resolved.data.getAllVideoFiles)
                    await console.log("Setting Videos, moving on")
                })

                //////////////////
                // Get Meetings //
                await client.query({
                    query: GET_MEETINGS,
                    fetchPolicy: 'network-only'
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                    return null
                })
                .then(async (resolved) => {
                    console.log(resolved.data.getMeetings)
                    await setMeetings(resolved.data.getMeetings)
                    await console.log("Setting Meetings, moving on")
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
                    return "Error, you done goofed"
                }
                console.log("Should navigate next...")
                setLoading(false)
                navigation.navigate("Home")

           ////////////////////////
           // Unsuccessful Login //
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
                console.log("hit")
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
            console.log(color)
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
                {/* <Image
                    source={require("../../../assets/images/other/logo.png")}
                    style={{
                        width: 30,
                        height: 30,
                        alignSelf: "center",
                        marginBottom: 20,
                    }}
                /> */}
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
                        onPress={() => setRememberMe(!rememberMe)}
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

///////////////////////////
///                     ///
///     Main Render     ///
///                     ///
///////////////////////////
    
   
    return (
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
    );
}
