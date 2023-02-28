// Async
import AsyncStorage from '@react-native-community/async-storage';

// React shit
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React, {useState, useEffect} from "react";

// Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { colorState, fontState, sizeState, userState, tokenState, clientListState, videoDataState, subscriptionstate } from  "../../../Recoil/atoms";

// Mutations
import { useMutation, useQuery } from '@apollo/client';
import { USER_SIGN_UP, GET_USER, GET_VIDEOS } from "../../../GraphQL/operations";

// Queries
import client from "../../utils/apolloClient";

// Components and Whatnot
import TabBar from "../../../OstrichComponents/TabBar";

// Nuton 
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header, InputField, Button } from "../../../NutonComponents";
import { Check, EyeOff, Eye } from "../../../svg";
import { DEFAULT_AVATAR } from '../../../NutonConstants';

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";

// Hooks
import adminValidator from "../../Hooks/submission_validators/adminValidator"
import therapistValidator from "../../Hooks/submission_validators/therapistValidators"
import parentChildValidator from "../../Hooks/submission_validators/parentChildValidator"

import LoadingComponent from "./LoadingComponent"

let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height

//////// SIGN UP /////////////////// SIGN UP /////////////////// SIGN UP /////////////////// SIGN UP /////////////////// SIGN UP ///////////

const SignUp = ({ navigation })  => {
    
    ///////////////////////
    ///                 ///
    ///   Preliminary   ///
    ///                 ///
    ///////////////////////

        //////////////////
        // Recoil State //
        //////////////////

            const COLORS = useRecoilValue(colorState)
            const FONTS = useRecoilValue(fontState)
            const SIZES = useRecoilValue(sizeState)

            // User
            const [user, setUser] = useRecoilState(userState)

            // Token
            const [token, setToken] = useRecoilState(tokenState)

            // Client List
            const [clientList, setClientList] = useRecoilState(clientListState)

            // Video
            const [videos, setVideos] = useRecoilState(videoDataState)

            // Subscription
            const [subState, setSubState] = useRecoilState(subscriptionstate)

        /////////////////
        // Local State //
        /////////////////

            // Determines | 0 = User | 1 = Therapist | 2 = Admin |
            const [userType, setUserType] = useState(0)

            // Determines whether passwords are to be shown
            const [showPassword, setShowPassword] = useState(false)

            // Determines whether password confirms are shown
            const [showConfirmPassword, setShowConfirmPassword] = useState(false)

            // Determines for Therapists and Users if they are joining or creating an organization
            const [joiningOrg, setJoiningOrg] = useState(false)

            // Parent / Child Inputs
            const [childParentInputs, setChildParentInputs] = useState({
                email: "",            // Mandatory
                username: "",         // Mandatory
                password: "",         // Mandatory
                confirmPassword: "",  // Mandatory
                firstName: "",        // Mandatory
                lastName: "",         // Mandatory
                phoneNumber: "",      // Optional
                role: "GUARDIAN",     // DEFAULT
                childFirstName: "",   // Mandatory
                childLastName: "",    // Mandatory
                childDateOfBirth: "", // Mandatory

                organizationInviteKey: "",  // Optional
            })

            // Therapist
            const [therapistInputs, setTherapistInputs] = useState({
                email: "",            // Mandatory
                password: "",         // Mandatory
                confirmPassword: "",  // Mandatory
                firstName: "",        // Mandatory
                lastName: "",         // Mandatory
                title: "",            // Optional
                phoneNumber: "",      // Optional
                role: "THERAPIST",    // DEFAULT

                organizationName: "", // Mandatory / Optional
                organizationInviteKey: "",  // Mandatory / Optional
            })

            // Admin
            const [adminInputs, setAdminInputs] = useState({
                email: "",            // Mandatory
                password: "",         // Mandatory
                confirmPassword: "",  // Mandatory
                firstName: "",        // Mandatory
                lastName: "",         // Mandatory
                phoneNumber: "",      // Optional
                role: "THERAPIST",        // DEFAULT

                organizationName: "", // Mandatory
                organizationType: "", // Mandatory
            })

            // Errors
            const [errors, setError] = useState({
                email: false,
                username: false,
                firstName: false,
                lastName: false,
                phoneNumber: false,
                childFirstName: false,
                childParentInputs: false,
                childDateOfBirth: false,
                password: false,
                confirmPassword: false,

                title: false,

                organizationType: false,
                organizationName: false,
                organizationInviteKey: false,
            })

            // Logged State (To Trigger UseEffect with Query)
            const [logged, setLogged] = useState(false)

    ///////////////
    // Mutations //
    ///////////////

        const [userSignupMutation, { loading: loadingU, error: errorU, data: dataU }] = useMutation(USER_SIGN_UP)

    /////////////
    // Queries //
    /////////////

        const getUser = () => useQuery(GET_USER)


    ///////////////////////
    ///                 ///
    ///    useEffect    ///
    ///                 ///
    ///////////////////////

        // Clears all user input on user type change
        useEffect(() => {
            clearInputs()
            clearErrors()
        }, [userType])

        // Defucnct
        useEffect(() => {
        }, [errors]) 

        useEffect(() => {
            // AsyncStorage.clear()
        }, [])

    ///////////////////////
    ///                 ///
    ///    Renderings   ///
    ///                 ///
    ///////////////////////

        // Renders Page Title and Back Button
        function renderHeader() {
            return(
                <View style={{marginTop: 40}}>
                    <Header title="Sign Up" onPress={() => navigation.goBack()} />
                </View>
            ) 
        }

        // Renders the Page Header and Tabs to switch between User Types
        function renderTopContent() {
            return(
                <>
                {/* Image and Title */}
                    <Image
                        source={require("../../../assets/images/other/logo.png")}
                        style={{
                            width: 30,
                            height: 30,
                            alignSelf: "center",
                            marginBottom: 20,
                        }}
                    />
                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.Title,
                            marginBottom: 30,
                            lineHeight: 32 * 1.2,
                            color: COLORS.iconLight,
                        }}
                    >
                        Sign up
                    </Text>

                    {/* Tab Bar */}
                    <View style={{marginLeft: -10}}>
                        <TabBar 
                            tabsArray={['Parent and Child', 'Physical Therapist', 'Business Admin']}
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
                            onChangeIndex={(index) => setUserType(index)}
                        />
                    </View>
                </>
            )
        }

         // Renders Error Message
        function renderErrorMessage(type, extra=0){
            let subTop = 5 + extra
            if (errors[type]){
                return(
                    <View style={{marginTop: -subTop, marginBottom: 15, backgroundColor: "white", padding: 2, paddingTop: 5, paddingBottom: 5, borderRadius: 10}}>
                        <Text style={{color: "red", fontFamily: 'Gilroy-Bold', textAlign: 'center'}}>
                            {errors[type]}
                        </Text>
                    </View>
                )
            }
        }

        // Renders a row of two inputs, one for firstName one for lastName.
        // Takes an input of... (CAPS MATTER)
        // -> "therapist"
        // -> "admin"
        // -> "Parent"
        // -> "Child"
        function renderFullNameFields(type){
            let title="First Name"
            let title2 = "Last Name"
            let fieldOne = "firstName"
            let fieldTwo = "lastName"
            if (type === "Parent" || type  === "Child"){
                title = `${type}`
                if (type === "Child"){
                    fieldOne = "childFirstName"
                    fieldTwo = "childLastName"
                }
                type = "user"
            }
            
            return(
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex: 17}}>
                        <View>
                            <InputField
                                title={title}
                                placeholder="Firstname"
                                secureTextEntry={false}
                                key="user1"
                                icon={
                                    <View style={{ padding: 20 }}>
                                        <Check fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                                    </View>
                                }
                                onChangeText={(content) => handleInput(content, fieldOne, type) }
                                containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                            />
                            {renderErrorMessage(fieldOne)}
                        </View>
                    </View>

                    <View style={{flex: 1}}/>

                    <View style={{flex: 17}}>
                        <View>
                            <InputField
                                title={title2}
                                placeholder="Lastname"
                                secureTextEntry={false}
                                key="user1"
                                icon={
                                    <View style={{ padding: 20 }}>
                                        <Check fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                                    </View>
                                }
                                onChangeText={(content) => handleInput(content, fieldTwo, type) }
                                containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                            />
                            {renderErrorMessage(fieldTwo)}
                        </View>
                    </View>
                </View>
            )
        }
        
        // Renders the Input Fields depending on what user type is signing up
        function renderInputs() {

            // Parent / Child
            if (userType === 0) {
                return(
                    <>
                        <InputField
                            title="Email"
                            placeholder="email@site.ext"
                            secureTextEntry={false}
                            key="user40"
                            icon={
                                <View style={{ padding: 20 }}>
                                    <Check fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                                </View>
                            }
                            onChangeText={(content) => handleInput(content, 'email', 'user') }
                            containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                        />
                        {renderErrorMessage("email")}
                        <InputField
                            title="Username"
                            placeholder="username123"
                            secureTextEntry={false}
                            key="user4"
                            icon={
                                <View style={{ padding: 20 }}>
                                    <Check fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                                </View>
                            }
                            onChangeText={(content) => handleInput(content, 'username', 'user') }
                            containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                        />
                        {renderErrorMessage("username")}

                        {renderFullNameFields("Parent")}

                        <InputField
                            title="Phone Number"
                            placeholder="123-456-7890"
                            secureTextEntry={false}
                            key="user909"
                            icon={
                                <View style={{ padding: 20 }}>
                                    <Check fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                                </View>
                            }
                            onChangeText={(content) => handleInput(content, 'phoneNumber', 'user') }
                            containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                        />
                        {renderErrorMessage('phoneNumber')}
                        {renderFullNameFields("Child")}
                        <InputField
                            title="Child Date of Birth"
                            placeholder="MM-DD-YYYY"
                            key="user3"
                            icon={
                                <View style={{ padding: 20 }}>
                                    <Check fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                                </View>
                            }
                            onChangeText={(content) => handleInput(content, 'childDateOfBirth', 'user') }
                            containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                        />
                        {renderErrorMessage('childDateOfBirth')}
                        <InputField
                            title="Password"
                            placeholder="••••••••"
                            key="user5"
                            secureTextEntry={!showPassword}
                            icon={
                                <TouchableOpacity style={{ padding: 20 }} onPress={togglePassword}>
                                {showPassword ? <Eye fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/> : <EyeOff fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>}
                                </TouchableOpacity>
                            }
                            onChangeText={(content) => handleInput(content, 'password', 'user') }
                            containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                        />
                        {renderErrorMessage('password')}
                        <InputField
                            title="Confirm Password"
                            placeholder="••••••••"
                            key="user6"
                            secureTextEntry={!showConfirmPassword}
                            icon={
                                <TouchableOpacity style={{ padding: 20 }} onPress={toggleConfirmPassword}>
                                    {showConfirmPassword ? <Eye fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/> : <EyeOff fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>}
                                </TouchableOpacity>
                            }
                            onChangeText={(content) => handleInput(content, 'confirmPassword', 'user') }
                            containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                        />
                        {renderErrorMessage('confirmPassword')}
                        <View>
                            <Text style={{...FONTS.SubTitle, fontSize: 16, marginBottom: 5, marginLeft: 4, marginBottom: 10}}>
                                Are you creating this account to join an existing Therapy Organization with a Kidz-N-Motion Account?
                            </Text>
                        </View>

                        {renderYesOrNoButtons()}

                        {determineOrgKeyOrName("user")}
                    </>
                )
            }

            // Therapist 
            if (userType === 1){
                return(
                    <>
                        <View style={{height: 'auto', width: 'auto', backgroundColor: 'white', borderRadius: 10, padding: 7, marginBottom: 15}}>
                            <Text style={{fontFamily: "Gilroy-Medium", textAlign: 'center', letterSpacing: 0.5, lineHeight: 18, padding: 3}}>
                                If you are a Physical Therapist associated with a organization that has the Kidz-N-Motion account, please contact them prior to making an account, as they will be able to auto-create one for you, or send you the organization key you need to join the existing organization. 
                            </Text>
                        </View>

                        <InputField 
                            title="Email"
                            placeholder="TherapistExample123@email.com"
                            secureTextEntry={false}
                            key="therapist4"
                            icon={
                                <View style={{ padding: 20 }}>
                                    <Check fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                                </View>
                            }
                            onChangeText={(content) => handleInput(content, 'email', 'therapist') }
                            containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                        />
                        {renderErrorMessage("email")}

                        {renderFullNameFields("therapist")}

                        <InputField 
                            title="Professional Title (optional)"
                            placeholder="Example Specialist"
                            secureTextEntry={false}
                            key="therapist2"
                            icon={
                                <View style={{ padding: 20 }}>
                                    <Check fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                                </View>
                            }
                            onChangeText={(content) => handleInput(content, 'title', 'therapist') }
                            containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                        />
                        
                        <InputField 
                            title="Phone Number (optional)"
                            placeholder="123-456-7890"
                            secureTextEntry={false}
                            key="therapist5"
                            icon={
                                <View style={{ padding: 20 }}>
                                    <Check fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                                </View>
                            }
                            onChangeText={(content) => handleInput(content, 'phoneNumber', 'therapist') }
                            containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                        />

                        <InputField
                            title="Password"
                            placeholder="••••••••"
                            secureTextEntry={!showPassword}
                            key="therapist7"
                            icon={
                                <TouchableOpacity style={{ padding: 20 }} onPress={togglePassword}>
                                {showPassword ? <Eye fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/> : <EyeOff fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>}
                                </TouchableOpacity>
                            }
                            onChangeText={(content) => handleInput(content, 'password', 'therapist') }
                            containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                        />
                        {renderErrorMessage("password")}

                        <InputField
                            title="Confirm Password"
                            placeholder="••••••••"
                            secureTextEntry={!showPassword}
                            key="therapist8"
                            icon={
                                <TouchableOpacity style={{ padding: 20 }} onPress={togglePassword}>
                                {showPassword ? <Eye fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/> : <EyeOff fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>}
                                </TouchableOpacity>
                            }
                            onChangeText={(content) => handleInput(content, 'confirmPassword', 'therapist') }
                            containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                        />
                        {renderErrorMessage("confirmPassword", 30)}

                        <View style={{marginTop: 10}}>
                            <Text style={{...FONTS.SubTitle, fontSize: 16, marginBottom: 5, marginLeft: 4, marginBottom: 10}}>
                                Are you currently a part of an Organization with a Kidz-N-Motion Account?
                            </Text>
                        </View>

                        {renderYesOrNoButtons()}

                        {determineOrgKeyOrName("therapist")}
                    </>
                )
            }

            // Business Admin
            if (userType === 2){
                return(
                    <>
                        <InputField 
                            title="Email"
                            placeholder="name@email.ext"
                            secureTextEntry={false}
                            key="business4"
                            icon={
                                <View style={{ padding: 20 }}>
                                    <Check fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                                </View>
                            }
                            onChangeText={(content) => handleInput(content, 'email', 'admin') }
                            containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                        />
                        {renderErrorMessage("email")}

                        {renderFullNameFields("admin")}

                        <InputField 
                            title="Phone Number (optional)"
                            placeholder="123-456-7890"
                            secureTextEntry={false}
                            key="business5"
                            icon={
                                <View style={{ padding: 20 }}>
                                    <Check fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                                </View>
                            }
                            onChangeText={(content) => handleInput(content, 'phoneNumber', 'admin') }
                            containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                        />

                        <InputField 
                            title="Organization Name"
                            placeholder="Organization"
                            secureTextEntry={false}
                            key="business2"
                            icon={
                                <View style={{ padding: 20 }}>
                                    <Check fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                                </View>
                            }
                            onChangeText={(content) => handleInput(content, 'organizationName', 'admin') }
                            containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                        />
                        {renderErrorMessage("organizationName")}

                        <InputField 
                            title="Organization Type"
                            placeholder="School"
                            secureTextEntry={false}
                            key="business20"
                            icon={
                                <View style={{ padding: 20 }}>
                                    <Check fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                                </View>
                            }
                            onChangeText={(content) => handleInput(content, 'organizationType', 'admin') }
                            containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                        />
                        {renderErrorMessage("organizationType")}

                        <InputField
                            title="Password"
                            placeholder="••••••••"
                            key="business6"
                            secureTextEntry={!showPassword}
                            icon={
                                <TouchableOpacity style={{ padding: 20 }} onPress={togglePassword}>
                                {showPassword ? <Eye fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/> : <EyeOff fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>}
                                </TouchableOpacity>
                            }
                            onChangeText={(content) => handleInput(content, 'password', 'admin') }
                            containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                        />
                        {renderErrorMessage("password")}

                        <InputField
                            title="Confirm Password"
                            key="business7"
                            placeholder="••••••••"
                            secureTextEntry={!showConfirmPassword}
                            icon={
                                <TouchableOpacity style={{ padding: 20 }} onPress={toggleConfirmPassword}>
                                    {showConfirmPassword ? <Eye fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/> : <EyeOff fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>}
                                </TouchableOpacity>
                            }
                            onChangeText={(content) => handleInput(content, 'confirmPassword', 'admin') }
                            containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                        />
                        {renderErrorMessage("confirmPassword")}
                    </>
                )
            }
        }

        // For P/C Users and Therapists only, determines orgName or orgCode Field
        function determineOrgKeyOrName(userType) {
            if (!joiningOrg && userType === "therapist"){
                return(
                    <InputField 
                        title="Your New Organization's Name"
                        placeholder="Example Studios"
                        secureTextEntry={false}
                        key="therapist6"
                        icon={
                            <View style={{ padding: 20 }}>
                                <Check fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                            </View>
                        }
                        onChangeText={(content) => handleInput(content, 'organizationName', userType) }
                        containerStyle={{ marginBottom: 20 }}
                    />
                )
            }
            else if (joiningOrg){
                return(
                    <InputField 
                        title="Organization Key"
                        placeholder="123-456-7890"
                        secureTextEntry={false}
                        key="therapist6"
                        icon={
                            <View style={{ padding: 20 }}>
                                <Check fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                            </View>
                        }
                        onChangeText={(content) => handleInput(content, 'organizationKey', userType) }
                        containerStyle={{ marginBottom: 20 }}
                    />
                )
            }
            else{
                return null
            }
        }

        // Renders a single YES or NO button
        function renderButton(yes_or_no){
            let selectedStyle = {
                backgroundColor: 'white',
                height: 60,
                width: 100,
            }

            let inactiveStyle = {
                backgroundColor: 'grey',
                height: 50,
                width: 80,
                marginTop: 5,
            }

            let currentStyle = false

            if (yes_or_no === "YES" && joiningOrg){
                currentStyle = selectedStyle
            }
            else if (yes_or_no === "YES" && !joiningOrg){
                currentStyle = inactiveStyle
            }
            if (yes_or_no === "NO" && joiningOrg){
                currentStyle = inactiveStyle
            }
            else if (yes_or_no === "NO" && !joiningOrg){
                currentStyle = selectedStyle
            }

            return(
                <TouchableOpacity
                    onPress={() => handleYesNoClick(yes_or_no)}
                    style={{...currentStyle, borderRadius: 10,  alignItems: 'center'}}

                >
                    <View style={{ height: '50%', marginTop: '20%'}}>
                        <Text style={{...FONTS.Title, fontSize: 20, height: '100%', textAlignVertical: 'center' }}>
                            {yes_or_no}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }

        // Renders YES / NO buttons for ARE YOU CREATING AN ORGANIZATION
        function renderYesOrNoButtons(){
            return(
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginTop: 10}}>
                    {renderButton("YES")}
                    {renderButton("NO")}
                </View>
            )
        }

        // Main Render Boi
        function renderContent() {
            return (
                <KeyboardAwareScrollView
                    contentContainerStyle={{
                        paddingTop: 36,
                        paddingHorizontal: 20,
                        flexGrow: 1,
                        paddingBottom: maxHeight * 0.3,
                    }}
                >
                    {renderTopContent()}

                    {renderInputs()}
                    
                    <Button
                        title="sign up"
                        containerStyle={{ marginBottom: 20 }}
                        onPress={() => handleSignUp()}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 50,
                            marginTop: 15,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Lato_400Regular,
                                fontSize: 16,
                                color: COLORS.lightBlack,
                                lineHeight: 16 * 1.7,
                            }}
                        >
                            Already have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("SignIn")}
                        >
                            <Text
                                style={{
                                    ...FONTS.Lato_700Bold,
                                    fontSize: 16,
                                    color: COLORS.black,
                                    lineHeight: 16 * 1.7,
                                }}
                            >
                                {" "}
                                Sign In.
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

    ///////////////////////
    ///                 ///
    ///     Handlers    ///
    ///                 ///
    ///////////////////////

        ////////////////////
        // State Changers //
        ////////////////////

            // This will handle all of the inputs from any of the fields
            function handleInput(input, key, userType) {
                if (userType === 'user'){
                    setChildParentInputs({
                        ...childParentInputs,
                        [key]: input
                    })
                }
                else if (userType === 'therapist'){
                    setTherapistInputs({
                        ...therapistInputs,
                        [key]: input
                    })
                }
                else if (userType === 'admin'){
                    setAdminInputs({
                        ...adminInputs,
                        [key]: input
                    })
                }
            }

            // Toggles the password Display
            const togglePassword = () => {
                if (showPassword){
                    setShowPassword(false)
                    return
                }
                setShowPassword(true)
            }

            // Toggles the Confirm Password Display
            const toggleConfirmPassword = () => {
                if (showConfirmPassword){
                    setShowConfirmPassword(false)
                    return
                }
                setShowConfirmPassword(true)
            }

            // When User type is switched, clears all currently entered inputs
            const clearInputs = () => {
                setChildParentInputs({
                    email: "",            // Mandatory
                    username: "",         // Mandatory
                    password: "",         // Mandatory
                    confirmPassword: "",  // Mandatory
                    firstName: "",        // Mandatory
                    lastName: "",         // Mandatory
                    phoneNumber: "",      // Optional
                    role: "GUARDIAN",     // DEFAULT
                    childFirstName: "",   // Mandatory
                    childLastName: "",    // Mandatory
                    childDateOfBirth: "", // Mandatory

                    organizationInviteKey: "",  // Optional
                })
                setAdminInputs({
                    email: "",            // Mandatory
                    password: "",         // Mandatory
                    confirmPassword: "",  // Mandatory
                    firstName: "",        // Mandatory
                    lastName: "",         // Mandatory
                    phoneNumber: "",      // Optional
                    role: "ADMIN",        // DEFAULT

                    organizationName: "", // Mandatory
                    organizationType: "", // Mandatory
                })
                setTherapistInputs({
                    email: "",            // Mandatory
                    password: "",         // Mandatory
                    confirmPassword: "",  // Mandatory
                    firstName: "",        // Mandatory
                    lastName: "",         // Mandatory
                    title: "",            // Optional
                    phoneNumber: "",      // Optional
                    role: "THERAPIST",    // DEFAULT

                    organizationName: "", // Mandatory / Optional
                    organizationInviteKey: "",  // Mandatory / Optional
                })
            }

            // Clears all errors
            const clearErrors = () => {
                const allErrors = Object.keys(errors)
                let newObj = {}
                allErrors.forEach( errorKey => {
                    newObj[errorKey] = false
                })
                setError(newObj)
            }

            // Handles a YES or NO click on ORGANIZATION STATUS
            const handleYesNoClick = (yes_or_no) => {
                if (yes_or_no === "NO"){
                    setJoiningOrg(false)
                }
                else{
                    setJoiningOrg(true)
                }
            } 
        
        ///////////////////////
        // Mutation Handlers //
        ///////////////////////

            // Runs the mutation and handles the navigation afterwards
            const handleSignUp = () => {
                let mutationObj    

                // VALIDATIONS //
                if (userType === 0){
                    mutationObj = childParentInputs
                    if (parentChildValidator(mutationObj).error){
                        assignErrors(parentChildValidator(mutationObj).error, "user")
                        return
                    }
                }
                else if (userType === 1){
                    mutationObj = therapistInputs
                    if (therapistValidator(mutationObj).error){
                        // error handler
                        assignErrors(therapistValidator(mutationObj).error, "therapist")
                        return 
                    }
                }
                else if (userType === 2){
                    mutationObj = adminInputs
                    if (adminValidator(mutationObj).error){
                        // error handler
                        assignErrors(adminValidator(mutationObj).error, "admin")
                        return
                    }
                    mutationObj.role = "THERAPIST"
                    mutationObj.title = "Administrator"
                }

                console.log(mutationObj)

                // MUTATION //
                return handleMutation(mutationObj).then( async (resolved)=>  {
                    if (resolved){
                        clearErrors()
                        await AsyncStorage.setItem('@token', resolved.data.signUpUser.token)
                        setToken(resolved.data.signUpUser.token)

                        //////////////
                        // Get User //
                        await client.query({
                            query: GET_USER,
                            fetchPolicy: 'network-only'  
                        })
                        .then(async (resolved) => {
                            setUser(resolved.data.getUser)
                        })
                        .catch((error) => {
                            console.error("GET_USER failed!")
                            console.error(error)
                        });

                        ////////////////
                        // Get Videos //
                        await client.query({
                            query: GET_VIDEOS,
                            fetchPolicy: 'network-only'
                        })
                        .then(async (resolved) => {
                            await setVideos(resolved.data.getAllVideoFiles)
                        })
                        .catch(err => console.error(err))

                        // If Therapist User
                        if (user.role === "THERAPIST"){     
                            setClientList(user.patientCarePlans)     // Sets Client List
                        }

                        // SubState
                        setSubState("trial")

                        // Navigation
                        navigation.navigate("Home")
                    }
                }).catch(error => {
                    if (error === "Error: Email already exists"){
                        console.error("EMAIL ALREADY EXISTS")
                        setError({...errors, email: "This Email is Taken" })
                    }
                })
            }

            // Determines which mutation to run based on userType
            const handleMutation = async (mutationObj) => {
                return await userSignupMutation({
                    variables: {
                        ...mutationObj
                    }
                }).catch(error => {
                    console.error(error)
                }).then((resolved) => {
                    return resolved
                })
            }

            // Assigns errors based on return values from mutation or messages from validators
            const assignErrors = (error, type) => {

                // Determines which inputs to apply errors to
                let inputs = false
                if (type === "user"){
                    inputs = childParentInputs
                }
                else if (type === "therapist"){
                    inputs = therapistInputs
                }
                else if (type === "admin"){
                    inputs = adminInputs
                }
                if (error === "Please fill out all non-optional fields"){
                    let newObj = {}
                    let possibleFields = Object.keys(inputs)
                    possibleFields.forEach( field => {
                        if (inputs[field] === ""){
                            newObj[field] = "Please fill out all non-optional fields"
                        }
                        else if (inputs[field] !== ""){
                            newObj[field] = false
                        }
                    })
                    setError(newObj)
                }
            }

            

    ///////////////////////
    ///                 ///
    ///       MAIN      ///
    ///                 ///
    ///////////////////////
    return (
        <Gradient
            colorOne={COLORS.gradientColor1}
            colorTwo={COLORS.gradientColor2}
        >
                <LoadingComponent loading={loadingU}/>
                {renderHeader()}
                {renderContent()}
        </Gradient>
    );
}
export default SignUp
