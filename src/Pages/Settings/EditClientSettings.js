// Reaact
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity, Dimensions, Switch} from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

// Nuton
import { Header, Button, ProfileEditCategoryComponent } from "../../../NutonComponents";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, clientListState, userState, colorState, fontState } from '../../../Recoil/atoms';

// Mutations 
import { useMutation } from "@apollo/client";
import { REQUEST_RESET_PASSWORD } from "../../../GraphQL/operations";

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import SelectionButton from "../../../OstrichComponents/SelectionButton";

let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height


export default function EditClientSettings(props) {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

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

        // Modal For Reset Password
        const [showResetModal, setShowResetModal] = useState(false)

        // Modal for Change Notifications
        const [showChangeNotifications, setShowChangeNotifications] = useState(false)

        // Modal for Drop Client
        const [showDropClient, setShowDropClient] = useState(false)

        // Message Notifications
        const [messageNotis, setMessageNotis] = useState(false)

        // Assignment Notifications
        const [assNotis, setAssNotis] = useState(false)


    //////////////////
    // Recoil State //
    //////////////////

        // User (Active)
        const [user, setUser] = useRecoilState(userState)

        // The Account Whose Settings You Are On
        const client = props.route.params?.item

    
    //////////////////
    //   Mutation   //
    //////////////////

        const [resetPassword, { loading: loadingType, error: errorType, data: typeData }] = useMutation(REQUEST_RESET_PASSWORD);

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

    function renderOptions() {
        return(
            <View style={{marginTop: maxHeight * .20, marginLeft: -4}}>
                <SelectionButton
                    title={"Reset Password"}
                    subtitle={"Send an email to this client to have them reset their password"}
                    onSelect={() => setShowResetModal(true)}  
                    leftAlign={true}
                />
                <SelectionButton
                    title={"Change Notifications"}
                    subtitle={"Enable or Disable Push Notifications for this Client"}
                    onSelect={() => setShowChangeNotifications(true)}  
                    leftAlign={true}
                />
                <SelectionButton
                    title={"Drop Client"}
                    subtitle={"Remove this client from your list. \nTHIS CANNOT BE UNDONE"}
                    onSelect={() => setShowDropClient(true)}  
                    leftAlign={true}
                />
            </View>
        )
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
                            ...FONTS.H2,
                            lineHeight: 20 * 1.5,
                            marginBottom: 30,
                            textTransform: "capitalize",
                        }}
                    >
                        {`Do you really want to remove ${client.firstName} ${client.lastName} from your network? \n Warning: This cannot be undone`}
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
                            }}
                            onPress={() => {
                                setShowDropClient(false);
                                // navigation.navigate("SignIn");
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
            valueFunction = setMessageNotis 
            existingValue = messageNotis
        }
        else if (type === "ass"){
            caption = "Assignment Notifications"
            valueFunction = setAssNotis 
            existingValue = assNotis
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
                    <Text
                        style={{
                            textAlign: "center",
                            fontFamily: 'Gilroy-Bold',
                            fontSize: 17,
                            letterSpacing: 0.5,
                            lineHeight: 20 * 1.5,
                            marginBottom: 30,
                            textTransform: "capitalize",
                        }}
                    >
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
                                setShowChangeNotifications(false);
                                // navigation.navigate("SignIn");
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

///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////

    // Reset Password Mutation (not whole function)
    const handleResetMutation = async () => {
        return await resetPassword({
            variables: {
                email: client.email
            }  
        })
    }

    // Handles the Confirmed Reset
    const resetPasswordFunction = () => {
        handleResetMutation().then( resolved => {
            if (resolved){
            }
            else{
            }
        })
    }

    



///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////

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