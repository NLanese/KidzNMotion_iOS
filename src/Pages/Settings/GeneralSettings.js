// React
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity, Switch, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

// Nuton
import { Header, Button, ProfileEditCategoryComponent, InputField } from "../../../NutonComponents";
import { AREA, FONTS } from "../../../NutonConstants";

// Apollo / GraphQL
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_USER_NOTIFICATION_SETTINGS, EDIT_CHILD_SETTINGS, GET_USER, CHANGE_CHILD_PASSWORD, CONFIRM_PASSWORD} from "../../../GraphQL/operations";
import client from "../../utils/apolloClient";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { colorState, sizeState, userState, tokenState } from '../../../Recoil/atoms';

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import SelectionButton from "../../../OstrichComponents/SelectionButton";
import TabBar from "../../../OstrichComponents/TabBar";
import { render } from "react-dom";

// Dimensions
let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height

export default function GeneralSettings() {
///////////////////////////
///                     ///
///     Preliminary     ///
///                     ///
///////////////////////////

    ///////////////
    // Constants //
    ///////////////

        const COLORS = useRecoilValue(colorState)
        const SIZES = useRecoilValue(sizeState)
        const navigation = useNavigation();

    ////////////
    // States //
    ////////////

    /////////////
    // GENERAL //
    /////////////

        // User
        const [user, setUser] = useRecoilState(userState)

            // User's Children
            const [children, setChildren] = useState(user.children)

        // Token
        const [token, setToken] = useRecoilState(tokenState)

        // Notification Settings
        const [msgNotis, setMsgNotis] = useState(user.muteAllMessages)

        // Tracks whether assignment notifications are tracked
        const [vidNotis, setVidNotis] = useState(user.muteAllAssignments)

        // Tracks the Notification Settings in an object for Mutation
        const [userSettingsBundle, setUserSettingsBundle] = useState({
            muteMessages: msgNotis,
            muteAssignments: vidNotis
        })

        // Determines your loading 
        const [loading, setLoading] = useState(false)

    ////////////
    // MODALS //
    ////////////

        // Leave Page Modal
        const [showLeaveModal, setShowLeaveModal] = useState(false)

        // Child Password Modal
        const [childPassVisible, setChildPassVisible] = useState(false)

        // Reset Password Sent Modal
        const [showPassSent, setShowPassSent] = useState(false)

    ///////////////////  
    // CHILD RELATED //
    ///////////////////

        let childSelectedForThis
        
        if (user.children && user.role !== "CHILD"){
            childSelectedForThis = children[0]
        }
        else if (user.role === "CHILD"){
            childSelectedForThis = user
        }
        else {
            childSelectedForThis = false
        }
        // Which Child of yours is selected
        const [childForSettings, setChildForSettings] = useState(childSelectedForThis)

        // Child Settings -- Settings
        const [childSettings, setChildSettings] = useState(childForSettings? childForSettings.accessSettings: undefined)

        // Child Settings -- Messages
        const [childMessages, setChildMessages] = useState(childForSettings?childForSettings.accessMessages : undefined)

        // Child Settings -- Leave App
        const [childLeave, setChildLeave] = useState(childForSettings ? childForSettings.leaveApp: undefined)

        // Child Settings Mutation Object
        const [childSettingsBundle, setChildSettingsBundle] = useState({
            leaveApp: childLeave,
            accessMessages: childMessages,
            accessSettings: childSettings
        })

        // Tracks new Child Password
        const [childNewPassword, setChildNewPassword] = useState(false)

        // Tracks passsword confirm
        const [confirmPass, setConfirmPass] = useState(false)

        // Tracks whether or not changes have been made to specific settings
        const [changesMadeTo, setChangesMadeTo] = useState({
            childSettings: false,
            notifications: false
        })

        // Tracks whether or not the parent password has been entered
        const [parentPassAdded, setParentPassAdded] = useState(false)

        // Tracks whether enter password modal is shown
        const [showParentPass, setShowParentPass] = useState(false)

        // Parent Password
        const [parentPass, setParentPass] = useState("")

        // Password Successfully Changed Modal
        const [showPassChanged, setShowPassChanged] = useState(false)


///////////////////////////
///                     ///
///      Mutations      ///
///                     ///
///////////////////////////

    const [editChildSettings, { loading: loadingC, error: errorC, data: dataC }] = useMutation(EDIT_CHILD_SETTINGS)

    const [editNotificationSettings, { loading: loadingN, error: errorN, data: dataN }] = useMutation(EDIT_USER_NOTIFICATION_SETTINGS)

    const [changeChildPassword, { loading: loadingP, error: errorP, data: dataP }] = useMutation(CHANGE_CHILD_PASSWORD)

    const [confirmPassword, { loading: loadingCP, error: errorCP, data: dataCP }] = useMutation(CONFIRM_PASSWORD)


///////////////////////////
///                     ///
///      useEffect      ///
///                     ///
///////////////////////////

    // Changes the local state to match the selected child
    useEffect(() => {
        if (!childForSettings){
            return
        }
        setChildSettings(childForSettings.accessSettings)
        setChildMessages(childForSettings.accessMessages)
        setChildLeave(childForSettings.leaveApp)
    }, [childForSettings])

    // Sets Child Settings Mutation Object
    useEffect(() => {
        setChildSettingsBundle({
            leaveApp: childLeave,
            accessMessages: childMessages,
            accessSettings: childSettings
        })
    }, [childLeave, childMessages, childSettings])

    // Sets User Mutation Object
    useEffect(() => {
        setUserSettingsBundle({
            muteMessages: msgNotis,
            muteAssignments: vidNotis
        })
    }, [msgNotis, vidNotis])


///////////////////////////
///                     ///
///      Rendering      ///
///                     ///
///////////////////////////

    ////////////////////////
    // GUARDIAN AND CHILD //
    ////////////////////////

        // Renders all of the Parent / Child Options
        function renderOptionsGuardianChild() {
            return(
                <View style={{marginLeft: -4}}>
                    {renderChildPasswordModal()}
                    {renderChildPasswordSetModal()}
                    <Text style={{...FONTS.Title, textAlign: 'center', marginTop: 30, marginBottom: 30}}>
                        General Settings
                    </Text>
                    <SelectionButton 
                        title={"Reset Password"}
                        subtitle={"Recieve an Email with a link to change your password"}
                        leftAlign={true}
                    />
                    {renderAddChildButton()}
                    <View style={{marginLeft: 11, marginRight: 10}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between',  borderColor: COLORS.borderColor, borderWidth: 1, padding: 4, paddingLeft: 8, paddingRight: 8, borderRadius: 10, marginBottom: 15}}>
                            <Text style={{...FONTS.SubTitle, height: '100%', marginTop: 7}}>
                                Message Notifications
                            </Text>
                            <Switch
                                onChange={() => makeToggle('msgNotis')}
                                value={msgNotis}
                            />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between',  borderColor: COLORS.borderColor, borderWidth: 1, padding: 4, paddingLeft: 8, paddingRight: 8, borderRadius: 10, marginBottom: 15}}>
                            <Text style={{...FONTS.SubTitle, height: '100%', marginTop: 7}}>
                                Missed Assignment Notifications
                            </Text>
                            <Switch
                                onChange={() => makeToggle('vidNotis')}
                                value={vidNotis}
                            />
                        </View>
                    </View>
                    {renderGuardiansChildSettings()}
                </View>
            )
        }

        // Renders the child specific settings, for Guardians only
        function renderGuardiansChildSettings(){
            if (user.role === "GUARDIAN"){
                return(
                    <>
                        <Text style={{...FONTS.Title, textAlign: 'center', marginTop: 30, marginBottom: 20}}>
                            Child Settings
                        </Text>
    
                        {renderChildSelectionTabBar()}
    
                        <View style={{marginLeft: 10, marginRight: 10}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between',  borderColor: COLORS.borderColor, borderWidth: 1, padding: 4, paddingLeft: 8, paddingRight: 8, borderRadius: 10, marginBottom: 15}}>
                                <Text style={{...FONTS.SubTitle, height: '100%', marginTop: 7}}>
                                    Child can change settings
                                </Text>
                                <Switch
                                    onChange={() => makeToggle('settings')}
                                    value={childSettings}
                                />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between',  borderColor: COLORS.borderColor, borderWidth: 1, padding: 4, paddingLeft: 8, paddingRight: 8, borderRadius: 10, marginBottom: 15}}>
                                <Text style={{...FONTS.SubTitle, height: '100%', marginTop: 7}}>
                                    Child can leave the app
                                </Text>
                                <Switch
                                    onChange={() => makeToggle('leave')}
                                    value={childLeave}
                                />
                            </View>
                            <View style={{marginLeft: -11, marginTop: 20, marginBottom: 20}}>
                                {renderSetChildPasswords()}
                            </View>
                        </View>
                    </>
                )
            }
            else if (user.role === "CHILD"){
                return(
                    <View style={{marginTop: 300}}/>
                )
            }
        }

        // Conditionally Renders Add Child Button
        function renderAddChildButton(){
            if (user.solo){
                return(
                    <SelectionButton
                        title={"Add Child"}
                        subtitle={"Add another Child's account to be linked to yours"}
                        leftAlign={true}
                        onSelect={() => navigation.navigate("AddUser", {item: "Add Child"})}
                    />
                )
            }
        }

        // Renders the Button(s) to set Child Passwords
        function renderSetChildPasswords() {
            if (user.children){

                // Handles the initial spin up
                if (!childForSettings){
                    setChildForSettings(user.children[0])
                }

                // Return
                return(
                    <SelectionButton
                        title={`Set ${childForSettings.firstName}'s Password`}
                        subtitle={"Create a password that will let your child login on his/her phone in Child Mode"}
                        onSelect={() => handleChildPass()}
                        leftAlign={true}
                    />
                )
            }
        }

        // Renders the Modal for Child Password setting
        function renderChildPasswordModal() {
            return(
                <Modal
                    isVisible={childPassVisible}
                    onBackdropPress={() => setChildPassVisible(!childPassVisible)}
                    hideModalContentWhileAnimating={true}
                    backdropTransitionOutTiming={0}
                    style={{ margin: 0 }}
                    animationIn="zoomIn"
                    animationOut="zoomOut"
                > 
                    {renderChildPasswordModalContent()}
                </Modal>
            )
        }

        // Renders the Contents of the Modal Above
        function renderChildPasswordModalContent() {
            return(
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
                    <Text style={{...FONTS.Title, textAlign: 'center', marginTop: -10, fontSize: 22}}>Set {childForSettings.firstName}'s Password!</Text>
                    <InputField
                        title="Password"
                        onChangeText={(content) => setChildNewPassword(content)}
                    />
                    <InputField
                        title="Confirm Password"
                        onChangeText={(content) => setConfirmPass(content)}
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
                                    backgroundColor: COLORS.white,
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginHorizontal: 7.5,
                                    borderColor: COLORS.black,
                                    borderWidth: 1,
                                }}
                                onPress={() => { setSelectedChildPassword(false) }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.black,
                                        ...FONTS.ModalButton,
                                    }}
                                >
                                    Confirm
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
                                onPress={() => setChildPassVisible(false)}
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
            )
        }

        // Renders (Conditionally) The TabBar to select children
        function renderChildSelectionTabBar() {
            if (children){
                if (children.length > 1){
                    let tabsContent = children.map(child => child.firstName)
                    return(
                        <View style={{alignItems: 'center'}}>
                            <TabBar 
                                tabsArray={tabsContent}
                                onChangeIndex={(index) => selectChild(index)}
                                styleActive={{borderBottomColor: COLORS.iconLight, borderBottomWidth: 3, padding: 2, marginRight: 5, marginLeft: 5, width: 90}}
                                styleInactive={{borderBottomColor: "grey", borderBottomWidth: 3, padding: 2, marginRight: 5, marginLeft: 5, width: 90}}
                                tabTextStyleActive={{fontFamily: "Gilroy-Bold", textAlign: 'center', fontSize: 16, color: COLORS.iconLight, marginBottom: 3}}
                                tabTextStyleInactive={{fontFamily: "Gilroy-Bold", textAlign: 'center', fontSize: 16, color: "grey", marginBottom: 3}}
                            />
                        </View>
                    )
                }
            }
        }

        // Renders the Parent Password Modal
        function renderParentPasswordModal(){
            if (!showParentPass){
                return null
            }
            console.log("should render password modal...")
            return(
                <Modal
                    isVisible={showParentPass}
                    onBackdropPress={() => setShowParentPass(!showParentPass)}
                    hideModalContentWhileAnimating={true}
                    backdropTransitionOutTiming={0}
                    style={{ margin: 0 }}
                    animationIn="zoomIn"
                    animationOut="zoomOut"
                > 
                    {renderEnterParentPass()}
                </Modal>
            )
        }

        // Renders the content for the above Modal
        function renderEnterParentPass(){
            return(
                <View 
                    style={{ width: SIZES.width - 40, backgroundColor: COLORS.white, marginHorizontal: 20,  borderRadius: 10, paddingHorizontal: 20, paddingTop: 40, paddingBottom: 30 }}
                >
                    <Text style={{...FONTS.Title, textAlign: 'center', marginTop: -10, fontSize: 22}}>
                        Confirm your Identity to Continue
                    </Text>
                    <InputField
                        title="Password"
                        onChangeText={(content) => setParentPass(content)}
                        style={{borderWidth: 1, borderColor: 'black', marginTop: 10, marginBottom: 10}}
                    />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center"}}>

                        {/*  Confirm Button  */}
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
                            onPress={() => submitParentPass()}
                        >
                            <Text style={{ color: COLORS.black, ...FONTS.ModalButton }}>
                                Confirm
                            </Text>
                        </TouchableOpacity>


                        {/*  Cancel  */}
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
                            onPress={() => setShowParentPass(false)}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.ModalButton,}} >
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        // Renders the Modal for succesfully changing child password
        function renderChildPasswordSetModal(){
            return(
                <Modal
                    isVisible={showPassChanged}
                    onBackdropPress={() => setShowPassChanged(!showPassChanged)}
                    hideModalContentWhileAnimating={true}
                    backdropTransitionOutTiming={0}
                    style={{ margin: 0 }}
                    animationIn="zoomIn"
                    animationOut="zoomOut"
                > 
                    {renderChildPasswordSetContent()}
                </Modal>
            )
        }

        // Renders the content of the above Modal
        function renderChildPasswordSetContent(){ 
            return(
                <View 
                    style={{ width: SIZES.width - 40, backgroundColor: COLORS.white, marginHorizontal: 20,  borderRadius: 10, paddingHorizontal: 20, paddingTop: 40, paddingBottom: 30 }}
                >
                    <Text style={{...FONTS.Title, textAlign: 'center', marginTop: -10, fontSize: 22}}>
                        Password has been set!
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center"}}>

                        {/*  Confirm Button  */}
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
                            onPress={() => setShowPassChanged(false)}
                        >
                            <Text style={{ color: COLORS.black, ...FONTS.ModalButton }}>
                                Okay
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            )
        }

    /////////////////////////
    // THERAPIST AND ADMIN //
    /////////////////////////

        // Settings Button for Organization Settings, IF ORG OWNER
        function renderOrgButton(){
            if (user.ownedOrganization){
                return(
                    <SelectionButton 
                        title={"Organization Settings"}
                        // plainCenter={true}
                    />
                )
            }
        }

        // Renders the therapist Options
        function renderTherapistOptions(){
            return(
                <View>
                    <Text style={{...FONTS.Title, textAlign: 'center', marginTop: 30, marginBottom: 30}}>
                        Notification Settings
                    </Text>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between',  borderColor: COLORS.iconDark, borderWidth: 1, padding: 4, paddingLeft: 8, paddingRight: 8, borderRadius: 10, marginBottom: 15}}>
                        <Text style={{...FONTS.SubTitle, height: '100%', marginTop: 7}}>
                            Mute all Message Notifications
                        </Text>
                        <Switch
                            onChange={() => makeToggle('muteMessage')}
                            value={userSettingsBundle.muteMessages}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between',  borderColor: COLORS.iconDark, borderWidth: 1, padding: 4, paddingLeft: 8, paddingRight: 8, borderRadius: 10, marginBottom: 15}}>
                        <Text style={{...FONTS.SubTitle, height: '100%', marginTop: 7}}>
                            Mute all Assignment Notifications
                        </Text>
                        <Switch
                            onChange={() => makeToggle('muteAssign')}
                            value={userSettingsBundle.muteAssignments}
                        />
                    </View>
                </View>
            )
        }

    /////////////
    // GENERAL //
    /////////////

        // Renders the Buttons and Choices for Settings
        function renderOptions() {
            if (user.role === "GUARDIAN" || user.role === "CHILD"){
                return renderOptionsGuardianChild()
            }
            else if (user.role === "THERAPIST"){
                return renderTherapistOptions()
            }
        }

        // Renders the header bar and back arrow
        function renderHeader() {
            let title="Settings"
            return(
                <View style={{marginTop: 40}}>
                    <Header 
                        title={title}
                        onPress={() => leaveSettingsPage()}
                        goBack={true}
                    />
                </View>
                
            ) 
        }

        // Renders the Submission Button
        function renderSubmit() {
            return(
                <Button
                    style={{marginTop: 10}}
                    title={"Submit"}
                    onPress={() => handleSubmit()}
                />
            )
        }

        // Renders the Leave Page Modal
        function renderLeavePageModal() {
            return(
                <Modal
                    isVisible={showLeaveModal}
                    onBackdropPress={() => setShowLeaveModal(!showLeaveModal)}
                    hideModalContentWhileAnimating={true}
                    backdropTransitionOutTiming={0}
                    style={{ margin: 0 }}
                    animationIn="zoomIn"
                    animationOut="zoomOut"
                > 
                    {renderLeavePageModalContent()}
                </Modal>
            )
        }

        // Renders the Contents of the Modal Above
        function renderLeavePageModalContent() {
            return(
                <View style={{ width: SIZES.width - 40, backgroundColor: COLORS.white, marginHorizontal: 20, borderRadius: 10, paddingHorizontal: 20, paddingTop: 40, paddingBottom: 30,}}>
                    <Text style={{...FONTS.Title, textAlign: 'center', marginTop: -10, fontSize: 22}}>
                        Are you sure you want to leave? You have unsaved changes.
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 30}}>

                        {/* Leave Anyway */}
                        <TouchableOpacity
                            style={{ width: 130, height: 48,
                                backgroundColor: COLORS.white, borderColor: COLORS.black, 
                                borderRadius: 10, borderWidth: 1,
                                justifyContent: "center", alignItems: "center",
                                marginHorizontal: 7.5,   
                            }}
                            onPress={() => { navigation.goBack() }}
                        >
                            <Text style={{ color: COLORS.black, ...FONTS.ModalButton, textAlign: 'center'}}>
                                Leave Anyway
                            </Text>
                        </TouchableOpacity>

                        {/* Save Changes */}
                        <TouchableOpacity
                            style={{ width: 130, height: 48,
                                backgroundColor: COLORS.black,
                                borderRadius: 10, marginHorizontal: 7.5,
                                justifyContent: "center", alignItems: "center",
                            }}
                            onPress={() => {
                                setShowLeaveModal(false)
                                // setShowParentPass(true)
                                handleSubmit()
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.ModalButton, textAlign: 'center'}}>
                                Save Changes
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            )
        }

///////////////////////////
///                     ///
///       Handler       ///
///                     ///
///////////////////////////

    ////////////////////////
    // CHILD AND GUARDIAN //
    ////////////////////////

        // Response for clicking on a Set Child Password Button
        function handleChildPass (child) {
            setChildPassVisible(true)
        }

        // Sets the Selected child based off of Tab Index Selection
        function selectChild(index){
            setChildForSettings(children[index])
        }

        // Sets a child's password
        function setSelectedChildPassword(){
            if (childNewPassword !== confirmPass || !childNewPassword){
            }
            else{
                handleSetPasswordMutation().then(resolved => {
                    setChildPassVisible(false)
                    setShowPassChanged(true)
                })
            }
        }

        // Submission of parent password
        function submitParentPass(){
            handleConfirmPasswordMutation()
            .then(resolved => {
                if (resolved.data.confirmPassword){
                    setParentPassAdded(true)
                    setShowParentPass(false)
                    handleSubmit()
                }
            })
        }


    /////////////////////////
    // THERAPIST AND ADMIN //
    /////////////////////////

        

    /////////////
    // GENERAL //
    /////////////

        // The Handler for all Switches
        function makeToggle(type) {
            if (type === 'settings'){
                setChildSettings(!childSettings)
                setChangesMadeTo({...changesMadeTo, childSettings: true})
            }
            else if (type === "message"){
                setChildMessages(!childMessages)
                setChangesMadeTo({...changesMadeTo, childSettings: true})
            }
            else if (type === "leave"){
                setChildLeave(!childLeave)
                setChangesMadeTo({...changesMadeTo, childSettings: true})
            }
            else if (type === "vidNotis"){
                setVidNotis(!vidNotis)
                setChangesMadeTo({...changesMadeTo, notifications: true})
            }
            else if (type === "msgNotis"){
                setMsgNotis(!msgNotis)
                setChangesMadeTo({...changesMadeTo, notifications: true})
            }
            else if (type === "muteMessage"){
                setUserSettingsBundle(userSettingsBundle => ({...userSettingsBundle, muteMessages: !userSettingsBundle.muteMessages}))
                setChangesMadeTo({...changesMadeTo, notifications: true})
            }
            else if (type === "muteAssign"){
                setUserSettingsBundle(userSettingsBundle => ({...userSettingsBundle, muteAssignments: !userSettingsBundle.muteAssignments}))
                setChangesMadeTo({...changesMadeTo, notifications: true})
            }
        }

        // Handles Submission for all User Types
        function handleSubmit() {
            setShowLeaveModal(false)
            setChildPassVisible(false)

            ///////////////////////
            // GUARDIAN SETTINGS //
            if (user.role === "GUARDIAN"){

                //////////////////////////////////////////
                // In case password hasn't been entered //
                if (!parentPassAdded){
                    console.log("Need to add your password")
                    console.log(showParentPass)
                    setShowParentPass(true)
                    return 
                }

                ////////////////////
                // CHILD SETTINGS //
                handleChildSettingsMutation()
                .catch((err) => {
                    console.log(err, "At Child Settings")
                })

                ///////////////////////////
                // NOTIFICATION SETTINGS //
                .then( async () => {
                    await handleUserSettingsMutation()
                })
                .catch((err) => {
                    console.log(err, "At User Notifications")
                })

                /////////////////////////////////////
                // Refreshes the User and Children //
                .then( async () => {
                    await client.query({
                        query: GET_USER,
                        fetchPolicy: 'network-only'  
                    })
                    .then(async (resolved) => {
                        setUser(resolved.data.getUser)
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                })

                ////////////////
                // NAVIGATION //
                .then(() => {
                    navigation.navigate('SettingsLanding')
                })
            }

            ////////////////////////
            // THERAPIST SETTINGS //
            else if (user.role === "THERAPIST"){
                handleUserSettingsMutation()
            }

            getAndSetUser()
        }

        // Replaces the goBack() function in the back arrow to catch unsaved changes
        function leaveSettingsPage() {
            if (changesMadeTo.childSettings || changesMadeTo.notifications){
                setShowLeaveModal(true)
            }
            else {
                navigation.goBack()
            }
        }

    ///////////////
    // MUTATIONS //
    ///////////////

        // Handles the async part of Child Settings Mutation
        async function handleChildSettingsMutation(){
            return await editChildSettings({
                variables: {
                    childUserID: childForSettings.id,
                    leaveApp: childSettingsBundle.leaveApp,
                    accessMessages: childSettingsBundle.accessMessages,
                    accessSettings: childSettingsBundle.accessSettings,
                }
            })
        }

        // Handles the async part of the Notification Settings 
        async function handleUserSettingsMutation(){
            return await editNotificationSettings({
                variables: {
                    muteMessageNotifications: userSettingsBundle.muteMessages,
                    muteAssignmentNotifications: userSettingsBundle.muteAssignments
                }
            })
        }

        // Handles async part of child password
        async function handleSetPasswordMutation(){
            return await changeChildPassword({
                variables: {
                    childUserID: childForSettings.id,
                    childPassword: childNewPassword
                }
            }).catch(err => console.log(err))
        }

        // Handles async part of confirm password
        async function handleConfirmPasswordMutation(){
            return await confirmPassword({
                variables: {
                    password: parentPass
                }
            }).catch(err => console.log(err.toString()))
        }

        // Gets the new user object with the revised client
        async function getAndSetUser(){
            return await client.query({
                query: GET_USER,
                fetchPolicy: 'network-only'  
            })
            .then((resolved) => {
                setUser(resolved.data.getUser)
                return resolved
            })
            .then((resolved) => {
                setUser(resolved.data.getUser)
                navigation.navigate("Home")
                return true
            })
            .catch((error) => {
                console.log(error)
            })
        }

    

///////////////////////////
///                     ///
///     Main Render     ///
///                     ///
///////////////////////////
return(
    <Gradient
        colorOne={COLORS.gradientColor1}
        colorTwo={COLORS.gradientColor2}
    >
        {renderHeader()}
        <ScrollView
            contentContainerStyle={{height: maxHeight * 1.55, paddingBottom: maxHeight * 0.5}}
            bounces={false}
        >
            {renderLeavePageModal()}
            {renderParentPasswordModal()}
            {renderOptions()}
            <View style={{width: '80%', marginLeft: '10%'}}>
                {renderSubmit()}
            </View>
        </ScrollView>
    </Gradient>
)

}