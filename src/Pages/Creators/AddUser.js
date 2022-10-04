// React Native
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";


// Nuton
import { Header, Button, ProfileEditCategoryComponent } from "../../../NutonComponents";
import { AREA, FONTS} from "../../../NutonConstants";
import { Camera } from "../../../svg";

// Apollo graphQL
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CHILD, GET_USER } from "../../../GraphQL/operations";
import client from "../../utils/apolloClient";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { colorState, sizeState, userState, tokenState } from '../../../Recoil/atoms';

import Gradient from "../../../OstrichComponents/Gradient";


export default function AddUser() {

    
///////////////////////////
///                     ///
///     Preliminary     ///
///                     ///
///////////////////////////

    //Recoil states
    const COLORS = useRecoilValue(colorState)
    const SIZES = useRecoilValue(sizeState)
    const navigation = useNavigation();
    
    // User
    const [user, setUser] = useRecoilState(userState)

    // Payment Modal
    const [show, setShow] = useState(false)

    // Tracks all of the inputted information
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        childDateOfBirth: "",
        username: "",
        phoneNumber: ""
    })

    // Tracks all of the potential Errors
    const [fromErrors, setFormErrors] = useState({
        firstName: false,
        lastName: false,
        childDateOfBirth: false,
        username: false,
        phoneNumber: false
    })

///////////////////////////
///                     ///
///      Mutations      ///
///                     ///
///////////////////////////

    const [addChild, { loading: loadingAdd, error: errorAdd, data: typeAdd }] = useMutation(ADD_CHILD);

///////////////////////////
///                     ///
///       Handler       ///
///                     ///
///////////////////////////

    // Submits the form
    const handleSubmit = async () => {

        ////////////////////////
        // If unfilled fields //
        if (formData.firstName === "" || formData.lastName === "" || formData.username === "" || formData.childDateOfBirth === ""){
            Object.keys(formData).forEach( (field) => {
                if (formData.field === ""){
                    setFormErrors({...fromErrors, [field]: "Please Fill Out"})
                }
                else{
                    setFormErrors({...fromErrors, [field]: false})
                }
            })
        }

        /////////////////////////////
        // If properly filled form //
        else {
            handleMutation().then( async () => {
                await client.query({
                    query: GET_USER,
                    fetchPolicy: 'network-only'  
                })
                .then(async (resolved) => {
                   await setUser(resolved.data.getUser)
                })
                .catch((error) => {
                    console.log(error)
                });
            })
            .then( () => {
                navigation.goBack()
            })
        }
    }

    // Handles the AddUser Mutation
    async function handleMutation(){ 
        return await addChild({
            variables: {
                childFirstName: formData.firstName,
                childLastName: formData.lastName,
                childUsername: formData.username, 
                childDateOfBirth: formData.childDateOfBirth,
            }
        })
    }

    // Handles all inputs from User
    function onChangeText(e, field){
        setFormData(prevState => ({...prevState, [field]: e}))
    }


///////////////////////////
///                     ///
///      Rendering      ///
///                     ///
///////////////////////////

    // Renders the page
    function renderContent() {
        return (
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
                showsVerticalScrollIndicator={false}
            >
                <TouchableOpacity style={{ marginBottom: 45, marginTop: 20 }}>
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
                            <Camera fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <ProfileEditCategoryComponent
                    title="First Name"
                    placeholder={`${user.firstName} ${user.lastName}`}
                    onChangeText={(e) => onChangeText(e,'firstName')}
                />
                <ProfileEditCategoryComponent
                    title="Last Name"
                    placeholder={`${user.firstName} ${user.lastName}`}
                    onChangeText={(e) => onChangeText(e,'lastName')}
                />
                <ProfileEditCategoryComponent
                    title="Username"
                    placeholder="username123"
                    secureTextEntry={false}
                    onChangeText={(e) => onChangeText(e,'username')}
                    containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                />
                <ProfileEditCategoryComponent
                    title="Date of Birth"
                    placeholder="xx/xx/xxxx"
                    secureTextEntry={false}
                    onChangeText={(e) => onChangeText(e,'childDateOfBirth')}
                    containerStyle={{ marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                />
                
                <Button
                    title="Save changes"
                    containerStyle={{ marginTop: 10 }}
                    onPress={() => {
                        setShow(true) 
                    }}
                />
            </ScrollView>
        );
    }

    // Renders the Header of the Page
    function renderHeader() {
        return (
            <Header
                title="Add Child"
                goBack={true}
                onPress={() => navigation.goBack()}
            />
        );
    }

    // Renders the Modal for increasing subscription
    function renderIncreasePaymentModal(){
        return(
            <Modal
                isVisible={show}
                onBackdropPress={() => setShow(!show)}
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
                    <Text style={{...FONTS.Title, textAlign: 'center'}}>
                        Adding another child to your network will increase yoour subscription rate
                    </Text>
                    <Text style={{...FONTS.SubTitle, textAlign: 'center', marginTop: 15}}>
                        Would you like to continue anyway?
                    </Text>
                    {renderYesNoRow()}
                </View>
            </Modal>
        )
    }

    // Renders the yes or no buttons for the modal
    function renderYesNoRow(){
        return(
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 30}}>

                {/* Save Changes */}
                <TouchableOpacity
                    style={{ width: 130, height: 48,
                        backgroundColor: COLORS.black,
                        borderRadius: 10, marginHorizontal: 7.5,
                        justifyContent: "center", alignItems: "center",
                    }}
                    onPress={() => handleSubmit()}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.ModalButton, textAlign: 'center'}}>
                        Proceed
                    </Text>
                </TouchableOpacity>

                {/* Leave */}
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
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

///////////////////////////
///                     ///
///     Main Return     ///
///                     ///
///////////////////////////

    return (
        <SafeAreaView style={{ flex: 1, ...AREA.AndroidSafeArea }}>
             <Gradient
                colorOne={COLORS.gradientColor1}
                colorTwo={COLORS.gradientColor2}

            >
                {renderHeader()}
                {renderIncreasePaymentModal()}
                {renderContent()}
            </Gradient>
        </SafeAreaView>
    );
}
