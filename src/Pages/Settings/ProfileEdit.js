// React
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


import { Header, Button, ProfileEditCategoryComponent } from "../../../NutonComponents";
import { AREA, DEFAULT_AVATAR, FONTS,
    backgroundColors, facialHairColors, facialHairs, hairColors, hairs, bodyColors, bodies, skinColors, mouths, noses, eyeses  } from "../../../NutonConstants";

// Apollo / GraphQL
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_USER, GET_USER, CHANGE_PROFILE_PICTURE } from "../../../GraphQL/operations";
import client from "../../utils/apolloClient";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { colorState, sizeState, userState, tokenState, avatarState } from '../../../Recoil/atoms';

import Gradient from "../../../OstrichComponents/Gradient";
import Modal from "react-native-modal";
import PersonasAvatar from "../../../OstrichComponents/PersonasAvatar";

import RadioButtonComponent from "./AvatarSettings/RadioButtonComponent";
import SelectableComponent from "./AvatarSettings/SelectableComponent";
import { Shuffle,  Skin} from "../../../svg";
import Svg from 'react-native-svg';

let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height


export default function ProfileEdit() {

    
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
    const [avatarSettingsState, setAvatarSettingsState] = useRecoilState(avatarState)
    const navigation = useNavigation();
    
    ////////////
    // States //
    ////////////

        // User
        const [user, setUser] = useRecoilState(userState)

        // Token
        const [token, setToken] = useRecoilState(tokenState)

        // Avatar
        const [avatar, setAvatar] = useRecoilState(avatarState)

        // Tracks all inputs
        const [formData, setFormData] = useState({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            username: "",
            title: ""
        })

        // Shows Avatar Modal
        const [showAvatarModal, setShowAvatarModal] = useState(false)

        // Tracks Avatar settings
        const [avatarSettings, setAvatarSettings] = useState({...avatar})

        // Whether Deletion Modal is open
        const [deleteModal, setDeleteModal] = useState(false)


///////////////////////////
///                     ///
///      Mutations      ///
///                     ///
///////////////////////////

    const [editUser, { loading: loadingType, error: errorType, data: typeData }] = useMutation(EDIT_USER);

    const [changeProfilePicture, { loading: loadingA, error: errorA, data: typeA }] = useMutation(CHANGE_PROFILE_PICTURE);

///////////////////////////
///                     ///
///     Renderings      ///
///                     ///
///////////////////////////
    

    // Renders the Header guy
    function renderHeader() {
        return (
            <Header
                title="Profile Edit"
                goBack={true}
                onPress={() => navigation.goBack()}
            />
        );
    }

    // Renders the Avatar and a Button to Change it
    function renderProfileAndChange(){
        return(
            <View>
                {/* <ImageBackground
                    source={{ uri: "https://via.placeholder.com/360x360" }}
                    style={{
                        width: 120,
                        height: 120,
                        alignSelf: "center",
                        marginTop: 20,
                        marginBottom: 20,
                    }}

                    imageStyle={{ borderRadius: 60 }}
                /> */}
                <PersonasAvatar 
                    style={{
                            width: 120,
                            height: 120,
                            alignSelf: "center",
                            marginTop: 20,
                            marginBottom: 20,
                        }}
                    characterSettings={{...avatarSettingsState}}
                    imageStyle={{ borderRadius: 60 }}
                />
                <TouchableOpacity 
                    style={{alignSelf: 'center', marginTop: -25, marginBottom: 15, backgroundColor: 'black', borderRadius: 10, padding: 5}}
                    onPress={() => setShowAvatarModal(true)}
                >
                    <Text style={{...FONTS.Title, fontSize: 20, color: 'white'}}>Change Avatar</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // Inputs that literally everyone (BUT CHILDREN) have
    function renderStaticInputs() {
        return (
            <View style={{height: maxHeight * 0.45}}>
                <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20}}
                showsVerticalScrollIndicator={false}
                >
                    {renderDynamicInputs()}
                    <ProfileEditCategoryComponent
                        title="First Name"
                        placeholder={`${user.firstName}`}
                        onChangeText={(e) => onChangeText(e,'firstName')}
                    />
                    <ProfileEditCategoryComponent
                        title="Last Name"
                        placeholder={`${user.lastName}`}
                        onChangeText={(e) => onChangeText(e,'lastName')}
                    />
                    <ProfileEditCategoryComponent
                        title="Phone Number"
                        placeholder={user.phoneNumber}
                        onChangeText={(e) => onChangeText(e,'phoneNumber')}
                    />
                </ScrollView>
            </View>
            
        );
    }

    // Renders the Image of the Avatar
    function renderAvatarImage(){
        return(
            <View style={{flexDirection: 'row'}}>
                <PersonasAvatar
                    style={{
                        width: 150,
                        height: 150
                    }}
                    characterSettings={{
                        ...avatarSettings
                    }}
                />
                <TouchableOpacity
                    onPress={randomAvatar}
                    style={{alignItems: "center", justifyContent: "center", alignSelf: "center", margin: 20 }}
                >
                    <Shuffle />
                </TouchableOpacity>
            </View>
        )
    }

    // Renders the background coilor and the choices
    function renderBackgroundColors(){
        return(
            <View style={{flexDirection: "row"}}>
                <View
                style={{
                    width: 75,
                    height: 75,
                    borderRadius: 50,
                    overflow: 'hidden',
                    backgroundColor: backgroundColors[avatarSettings["backgroundColor"]]
                }}/>

                    <RadioButtonComponent  
                    data={backgroundColors}
                    setState={setAvatarSettings}
                    stateKey="backgroundColor"     
                />
            </View>
        )
    }

    // Renders the melanin selection ratios (AM I POLICITALLY CORRECT YET????)
    function renderMelaninLevels(){
        return(
            <View style={{flexDirection: "row"}}>
                <View
                    style={{
                        width: 75,
                        height: 75,
                        borderRadius: 50,
                        overflow: 'hidden',
                        backgroundColor: "white"
                    }}>

                    <Svg width="100%" height="100%" viewBox="0 0 64 64">
                        <Skin color={skinColors[avatarSettings["skinColor"]] }/>
                    </Svg>
                </View>
                    <RadioButtonComponent  
                        data={skinColors}
                        setState={setAvatarSettings}
                        stateKey="skinColor"     
                    />
            </View>
        )
    }

    // Renders Hair Styles and Selections
    function renderHairStyles(){
        return(
            <View style={{flexDirection: "row"}}>
                <SelectableComponent 
                    data={Object.keys(hairs)}
                    state={avatarSettings}
                    setState={setAvatarSettings}
                    stateKey="hair"
                    colorKey="hairColor"
                    />
                <RadioButtonComponent  
                    data={hairColors}
                    setState={setAvatarSettings}
                    stateKey="hairColor"     
                />
            </View>
        )
    }

    // bodies. 
    function renderBodyStyles() {
        return(
            <View style={{flexDirection: "row"}}>
                <SelectableComponent
                    data={Object.keys(bodies)}
                    state={avatarSettings}
                    setState={setAvatarSettings}
                    stateKey="body"
                    colorKey="bodyColor"
                    />
                <RadioButtonComponent  
                    data={bodyColors}
                    setState={setAvatarSettings}
                    stateKey="bodyColor"     
                />
            </View>
        )
    }

    // Facial hair?
    function renderFacialHair(){
        return(
            <View style={{flexDirection: "row"}}>
                <SelectableComponent 
                    data={Object.keys(facialHairs)}
                    state={avatarSettings}
                    setState={setAvatarSettings}
                    stateKey="facialHair"  
                    colorKey="facialHairColor"      
                    />
                <RadioButtonComponent  
                    data={facialHairColors}
                    setState={setAvatarSettings}
                    stateKey="facialHairColor"     
                />
            </View>
        )
    }

    // Renders the Facial Feature Selections
    function renderFacialFeatures(){
        return(
            <View  style={{flexDirection: "row"}}>
                <SelectableComponent 
                    data={Object.keys(noses)}
                    state={avatarSettings}
                    setState={setAvatarSettings}
                    stateKey="nose"
                    colorKey="skinColor"
                    />
                <SelectableComponent 
                    data={Object.keys(eyeses)}
                    state={avatarSettings}
                    setState={setAvatarSettings}
                    stateKey="eyes"
                    colorKey={undefined}
                    />
                    <SelectableComponent 
                    data={Object.keys(mouths)}
                    state={avatarSettings}
                    setState={setAvatarSettings}
                    stateKey="mouth"        
                    />
            </View>
        )
    }

    // Renders the Save and Cancel Button for the avatar Modal
    function renderSaveCancel(){
        return(
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >

                {/*  Save  */}
                <TouchableOpacity
                    style={{
                        width: 130,
                        height: 48,
                        backgroundColor: COLORS.buttonColorLight,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                        marginHorizontal: 7.5,
                        borderColor: 'black',
                        borderWidth: 1,
                    }}
                    onPress={() => {
                        handleSubmitAvatar();    
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
                        Save
                    </Text>
                </TouchableOpacity>

                {/*  Cancel  */}
                <TouchableOpacity
                    style={{
                        width: 130,
                        height: 48,
                        backgroundColor: COLORS.btnColor,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 7.5,
                        marginTop: 10,
                    }}
                    onPress={() => setShowAvatarModal(false)}
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
        )
    }

    // Renders the current Avatar but bigger
    function renderAvatarModal() {
        return (
            <Modal
            isVisible={showAvatarModal}
                onBackdropPress={setShowAvatarModal}
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
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignContent: "space-around",
                    alignItems: "center"

                }}
                >
                    {renderAvatarImage()}
                    {renderBackgroundColors()}
                    {renderMelaninLevels()}
                    {renderHairStyles()}
                    {renderBodyStyles()}
                    {renderFacialHair()}
                    {renderFacialFeatures()}
                    {renderSaveCancel()}
                </View>
            </Modal>
        );
    }

    // Renders user-type-specific inputs
    function renderDynamicInputs() {
        if (user.role === "CHILD"){
            return(
                <>
                    <ProfileEditCategoryComponent
                        title="Username"
                        placeholder={user.username}
                        onChangeText={(e) => onChangeText(e,'username')}
                    />
                </>
            )
        }
        else if (user.role === "GUARDIAN"){
            return(
                <>
                    <ProfileEditCategoryComponent
                        title="Username"
                        placeholder={user.username}
                        onChangeText={(e) => onChangeText(e,'username')}
                    />
                    <ProfileEditCategoryComponent
                        title="Email"
                        placeholder={user.email}
                        onChangeText={(e) => onChangeText(e,'email')}
                    />
                </>

            )
        }
        else if (user.role === "THERAPIST"){
            return(
                <>
                    <ProfileEditCategoryComponent
                        title="Professional Title"
                        placeholder={user.title}
                        onChangeText={(e) => onChangeText(e,'title')}
                    />
                    <ProfileEditCategoryComponent
                        title="Email"
                        placeholder={user.email}
                        onChangeText={(e) => onChangeText(e,'email')}
                    />
                </>
            )
        }

    }

    // Renders Save and Delete Buttons
    function renderButtons(){
        return(
            <View style={{width: '80%', marginLeft: '10%'}}>
                <Button
                    title="Save changes"
                    onPress={() => {
                        handleEditMutation()
                    }}
                />
                <TouchableOpacity 
                onPress={() => setDeleteModal(true)}
                style={{backgroundColor: 'red', marginTop: 20, height: maxHeight * 0.07, borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Gilroy-ExtraBold', fontSize: 18}}>DELETE PROFILE</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // Renders the confirmation to delete
    function renderDeletionModal(){
        console.log(deleteModal)
        if (deleteModal){
            return(
                <Modal
                isVisible={deleteModal}
                onBackdropPress={() => setDeleteModal(false)}
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
                        {renderDeletionModalContent()}
                    </View>
                </Modal>
            )
        }
    }

    // Renders the Content of the Delete Modal
    function renderDeletionModalContent(){
        return(
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontFamily: "Gilroy-Bold", fontSize: 24, textAlign: 'center'}}>
                    Do you really want to delete this account?
                </Text>
                <Text style={{marginTop: 10, fontSize: 16, fontFamily: 'Gilroy-SemiBold', letterSpacing: 0.5, color: 'slate'}}>
                    This cannot be undone by anyone
                </Text>
                <View>
                    {renderYesNoRow()}
                </View>
            </View>
        )
    }

    // Renders the Yes or No for Deletion
    function renderYesNoRow(){
        return(
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 30}}>

                {/* Save Changes */}
                <TouchableOpacity
                    style={{ width: 160, height: 48,
                        backgroundColor: COLORS.black,
                        borderRadius: 10, marginHorizontal: 7.5,
                        justifyContent: "center", alignItems: "center",
                    }}
                    onPress={() => { console.log("moo()") }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.ModalButton, textAlign: 'center'}}>
                       Yes, I want to delete
                    </Text>
                </TouchableOpacity>

                {/* Leave */}
                <TouchableOpacity
                    style={{ width: 80, height: 48,
                        backgroundColor: COLORS.white, borderColor: COLORS.black, 
                        borderRadius: 10, borderWidth: 1,
                        justifyContent: "center", alignItems: "center",
                        marginHorizontal: 7.5,   
                    }}
                    onPress={() => { console.log("moo()") }}
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
///       Handler       ///
///                     ///
///////////////////////////

    // Determines which login Mutation to use 
    const handleEditMutation = async () => {
        return await editUser({
            variables: {
                email:                      formData.email || user.email,
                firstName:              formData.firstName || user.firstName,
                lastName:                formData.lastName || user.lastName,
                phoneNumber:          formData.phoneNumber || user.phoneNumber,
                title:                      formData.title || user.title,
                username:               formData.username  || user.username, 
            }
        }).then( async () => {
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
        }).catch(e => {
            console.log(e)
        })
        .then( () => {
            navigation.goBack()
        })
    }

    // Tracks input changes
    function onChangeText(e, field){
        setFormData({...formData, [field]: e})
    }
    
    // Randomizes the Avatar
    function randomAvatar(){
        let bodyKeys = Object.keys(bodies)
        let eyesKeys = Object.keys(eyeses)
        let facialHairKeys = Object.keys(facialHairs)
        let hairKeys = Object.keys(hairs)
        let mouthKeys = Object.keys(mouths)
        let noseKeys = Object.keys(noses)
        let backgroundColorKeys = Object.keys(backgroundColors)
        let skinColorKeys = Object.keys(skinColors)
        let hairColorKeys = Object.keys(hairColors)
        let facialHairColorKeys = Object.keys(facialHairColors)
        let bodyColorKeys = Object.keys(bodyColors)

        function randomNumber(length){
            return Math.floor(Math.random() * length)
        }
        
        setAvatarSettings(
            {
                body: bodyKeys[randomNumber(bodyKeys.length)],
                eyes: eyesKeys[randomNumber(eyesKeys.length)],
                facialHair: facialHairKeys[randomNumber(facialHairKeys.length)],
                hair: hairKeys[randomNumber(hairKeys.length)],
                mouth: mouthKeys[randomNumber(bodyKeys.length)],
                nose: noseKeys[randomNumber(noseKeys.length)],
                backgroundColor: backgroundColorKeys[randomNumber(backgroundColorKeys.length)],
                skinColor: skinColorKeys[randomNumber(skinColorKeys.length)],
                hairColor: hairColorKeys[randomNumber(hairColorKeys.length)],
                facialHairColor: facialHairColorKeys[randomNumber(facialHairColorKeys.length)],
                bodyColor: bodyColorKeys[randomNumber(bodyColorKeys.length)] 
            }
        )
    }

    // Handle Avatar Selection
    function handleSubmitAvatar(){
        setAvatar(avatarSettings)
        handleChangeAvatarMutation()
    }

    // Profile Pciture Mutation
    async function handleChangeAvatarMutation(){
        return await changeProfilePicture({
            variables: {
                profilePic: avatarSettings
            }
        }).catch(err => console.log(err))
    }


///////////////////////////
///                     ///
///     Main Render     ///
///                     ///
///////////////////////////

    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={{paddingBottom: 0}}
        >
             <Gradient
                colorOne={COLORS.gradientColor1}
                colorTwo={COLORS.gradientColor2}
                style={{height: maxHeight}}
            >
                <View style={{marginTop: 45}} />
                {renderHeader()}
                {renderProfileAndChange()}
                {renderStaticInputs()}
                {renderAvatarModal()}
                {renderDeletionModal()}
                {renderButtons()}
            </Gradient>
        </KeyboardAwareScrollView>
    );
}
