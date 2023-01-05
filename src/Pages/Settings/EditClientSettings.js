// React
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity, Dimensions, Switch} from "react-native";
import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

// Nuton
import { Header, Button, ProfileEditCategoryComponent } from "../../../NutonComponents";

// Loading
import LoadingComponent from "../../Global/LoadingComponent"

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, clientListState, userState, colorState, fontState, selectedClientState } from '../../../Recoil/atoms';

// Mutations 
import { useMutation } from "@apollo/client";
import { REQUEST_RESET_PASSWORD, CHANGE_USER_NOTIFICATIONS, GET_USER } from "../../../GraphQL/operations";
import apollo_client from "../../utils/apolloClient";

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import SelectionButton from "../../../OstrichComponents/SelectionButton";

// Hooks
import getAllTherapistClients from "../../Hooks/value_extractors/therapistValues/getAllTherapistClients"


let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height


export default function EditClientSettings(props) {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    //////////////////
    // Recoil State //
    //////////////////

        // User (Active)
        const [user, setUser] = useRecoilState(userState)

        const [clients, setClients] = useRecoilState(clientListState)

        const [selectedClient, setSelectedClient] = useRecoilState(selectedClientState)

    ///////////////
    // Constants // 
    ///////////////

        const navigation = useNavigation();
        const COLORS = useRecoilValue(colorState)
        const FONTS = useRecoilValue(fontState)
        const SIZES = useRecoilValue(sizeState)

    /////////////////
    // Local State //
    /////////////////

        // Loading
        const [loading, setLoading] = useState(false)

        // Modal For Reset Password
        const [showResetModal, setShowResetModal] = useState(false)

        // Modal for Change Notifications
        const [showChangeNotifications, setShowChangeNotifications] = useState(false)

        // Modal for Drop Client
        const [showDropClient, setShowDropClient] = useState(false)

        // Message Notifications
        let msgOg = false
        if (client.user.role === "GUARDIAN"){
            msgOg = client.user.messagesMuted
        }
        const [messageNotisMuted, setMessageNotisMuted] = useState(!msgOg)

        // Assignment Notifications
        const [assNotisMuted, setassNotisMuted] = useState(client.user.assignMuted)

    //////////////////
    //   Mutation   //
    //////////////////

        const [requestResetPassword, { loading: loadingType, error: errorType, data: typeData }] = useMutation(REQUEST_RESET_PASSWORD);

        const [changeUserNotifications, { loading: loadingN, error: errorN, data: typeN }] = useMutation(CHANGE_USER_NOTIFICATIONS);

    ////////////////
    // UseEffects //
    ////////////////

        useEffect(() => {
            setLoading(false)
        }, [user])

//////////////////////
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
                    title="Edit Client Settings"
                />
            </View>
            
        ) 
    }

    // Renders the Selectables
    function renderOptions() {
        return(
            <View style={{marginTop: maxHeight * .20, marginLeft: -4}}>
                <SelectionButton
                    title={"Change Notifications"}
                    subtitle={"Enable or Disable Push Notifications for this Client"}
                    onSelect={() => setShowChangeNotifications(true)}  
                    leftAlign={true}
                />
                {/* {renderResetButton()} */}
                <SelectionButton
                    title={"Drop Client"}
                    subtitle={"Remove this client from your list. \nTHIS CANNOT BE UNDONE"}
                    onSelect={() => setShowDropClient(true)}  
                    leftAlign={true}
                />
            </View>
        )
    }

    // Renders the Reset Password button (Guardians Only)
    function renderResetButton() {
        if (client.user.role === "CHILD"){
            return null
        }
        else{
            return(
                <SelectionButton
                    title={"Reset Password"}
                    subtitle={"Send an email to this client to have them reset their password"}
                    onSelect={() => setShowResetModal(true)}  
                    leftAlign={true}
                />
            )
        }
    }

    // Renders the Reset Password Modal
    function renderResetModal() {
        return (
            <Modal
                isVisible={showResetModal}
                onBackdropPress={() => setShowResetModal(false)}
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
                            ...FONTS.H2,
                            lineHeight: 20 * 1.5,
                            marginBottom: 30,
                            textTransform: "capitalize",
                        }}
                    >
                        Send a Reset Password Email To {client.email}?
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
                                borderColor: COLORS.goldenTransparent_05,
                                borderWidth: 1,
                            }}
                            onPress={() => {
                                setShowResetModal(false);
                                handleResetMutation()
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.confirm,
                                    ...FONTS.Lato_700Bold,
                                    fontSize: 18,
                                    textTransform: "capitalize",
                                }}
                            >
                                Sure
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 130,
                                height: 48,
                                backgroundColor: COLORS.btnColor,
                                borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: 7.5,
                            }}
                            onPress={() => setShowResetModal(false)}
                        >
                            <Text
                                style={{
                                    color: COLORS.white,
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

    // Renders the Drop Client Modal
    function renderDropModal() {
        return (
            <Modal
                isVisible={showDropClient}
                onBackdropPress={() => setShowDropClient(false)}
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
                            fontFamily: "Gilroy-Bold",
                            marginBottom: 30,
                        }}
                    >
                        {`Do you really want to remove ${client.user.firstName} ${client.user.lastName} from your network?`}
                    </Text>
                    <Text style={{ textAlign: "center", fontFamily: "Gilroy-SemiBold", marginBottom: 30, marginTop: -20}}>
                        Warning: This cannot be undone
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
                                borderColor: COLORS.buttonBorder,
                                borderWidth: 1,
                                borderColor: 'black',
                                borderWidth: 1,
                            }}
                            onPress={() => {
                                setShowDropClient(false);
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.confirm,
                                    ...FONTS.Lato_700Bold,
                                    fontSize: 18,
                                    textTransform: "capitalize",
                                }}
                            >
                                Sure
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 130,
                                height: 48,
                                backgroundColor: COLORS.btnColor,
                                borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: 7.5,
                            }}
                            onPress={() => setShowDropClient(false)}
                        >
                            <Text
                                style={{
                                    color: COLORS.white,
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

    // Renders one switch and text row
    function renderSwitchRow(type) {
        let caption = ""
        let valueFunction = ""
        let existingValue = ""
        if (type === "message"){
            caption = "Message Notifications"
            existingValue = messageNotisMuted
            valueFunction = () => { 
                setmessageNotisMuted(!assNotisMuted)
                setSelectedClient(selectedClient => ({...selectedClient, user: {...selectedClient.user, messagesMuted: !assNotisMuted}}))
            } 
            if (client.user.role === "CHILD"){
                return null
            }
        }
        else if (type === "ass"){
            caption = "Assignments Muted"
            valueFunction = () => { 
                setassNotisMuted(!assNotisMuted)
                setSelectedClient(selectedClient => ({...selectedClient, user: {...selectedClient.user, assignMuted: !assNotisMuted}}))
            } 
            existingValue = assNotisMuted

        }
        return(
            <View style={{flexDirection: 'row', width: '90%', marginLeft: '3%', marginBottom: 15 }}>
                <Switch 
                    style={{flex: 1}}
                    onChange={() => valueFunction(!existingValue)}
                    value={existingValue}
                />
                <Text style={{flex: 2, textAlign: 'right', fontFamily: 'Gilroy-SemiBold', marginTop: 8, fontSize: 16}}>
                    {caption}
                </Text>
            </View>
        )
    }

    // Handles the Notifications Modal
    function renderNotificationModal() {
        return (
            <Modal
                isVisible={showChangeNotifications}
                onBackdropPress={() => setShowChangeNotifications(false)}
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
                    {/* Announcement */}
                    <Text style={{ textAlign: "center", fontFamily: 'Gilroy-Bold', fontSize: 17, letterSpacing: 0.5, lineHeight: 20 * 1.5, marginBottom: 30,  textTransform: "capitalize", }}>
                        Set your notifications for this user
                    </Text>

                    {/* Switch Box */}
                    <View>
                        {renderSwitchRow("message")}
                        {renderSwitchRow("ass")}
                    </View>

                    {/* Button Box */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >


                        {/* Submit Button */}
                        <TouchableOpacity
                            style={{
                                width: 130,
                                height: 48,
                                backgroundColor: COLORS.white,
                                borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: 7.5,
                                borderColor: COLORS.iconDark,
                                borderWidth: 1,
                            }}
                            onPress={() => {
                                handleNotificationMutation()
                                setShowChangeNotifications(false);
                            }}
                        >
                            <Text
                                style={{
                                color: COLORS.confirm,
                                fontFamily: "Gilroy-SemiBold",
                                fontSize: 18,
                                textTransform: "capitalize",
                                }}
                            >
                                Submit
                            </Text>
                        </TouchableOpacity>

                        {/* Cancel Button */}
                        <TouchableOpacity
                            style={{
                                width: 130,
                                height: 48,
                                backgroundColor: COLORS.btnColor,
                                borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: 7.5,
                            }}
                            onPress={() => setShowChangeNotifications(false)}
                        >
                            <Text
                                style={{
                                    color: COLORS.white,
                                    fontFamily: "Gilroy-SemiBold",
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

    function MAIN(){
        if (loading){
            return(
                <Gradient
                colorOne={COLORS.gradientColor1}
                colorTwo={COLORS.gradientColor2}
                >
                    <LoadingComponent loading={loading} />
                </Gradient>
            )
        }
        return(
            <Gradient
            colorOne={COLORS.gradientColor1}
            colorTwo={COLORS.gradientColor2}
            >
                {renderHeader()}
                <ScrollView contentContainerStyle={{height: "100%"}}>
                    {renderOptions()}
                </ScrollView>
                {renderResetModal()}
                {renderDropModal()}
                {renderNotificationModal()}
            </Gradient>
        )
    }

///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////

    // Reset Password Mutation (not whole function)
    const handleResetMutation = async () => {
        return await requestResetPassword({
            variables: {
                email: client.email
            }  
        })
    }

    // Handles the Confirmed Reset
    const resetPasswordFunction = () => {
        handleResetMutation().then( resolved => {
            if (resolved){
                console.log(resolved)
            }
            else{
                console.log("ERROR")
            }
        })
    }

    // Handles the Change Notifications Mutation
    function handleNotificationMutation(){
        console.log("Messages Muted? :", messageNotisMuted)
        console.log("Assignment Muted? :", assNotisMuted)
        setLoading(true)
        changeUserNotifications({
            variables: {
                userID: client.user.id,
                messagesMuted: messageNotisMuted,
                assignMuted: assNotisMuted,
            }
        })
        .then(resolved => {
            console.log("RESOLVED: ", resolved)
            getAndSetUser()
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    // Gets the new user object with the revised client
    async function getAndSetUser(){
        await apollo_client.query({
            query: GET_USER,
            fetchPolicy: 'network-only'  
        })
        .then(async (resolved) => {
            await setUser(resolved.data.getUser)
            await setClients(resolved.data.getUser)
        })
        .catch((error) => {
            console.log(error)
        })
    }



///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////

    return MAIN()
}