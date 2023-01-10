// Reaact
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";


// Nuton
import { Header, Button, ProfileEditCategoryComponent } from "../../../NutonComponents";
import { Camera } from "../../../svg";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, clientListState, userState, colorState, fontState } from '../../../Recoil/atoms';

// GraphQL
import { useMutation } from "@apollo/client";
import { INVITE_ORGANIZATION_USER } from "../../../GraphQL/operations";
import Gradient from "../../../OstrichComponents/Gradient";


export default function AddClient(props) {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    const context = props.route.params?.item

    ///////////////
    // Constants // 
    ///////////////

        const navigation = useNavigation();
        const SIZES= useRecoilValue(sizeState)
        const COLORS = useRecoilValue(colorState)
        const FONTS = useRecoilValue(fontState)

    /////////////////
    // Local State //
    /////////////////

        const [formData, setFormData] = useState({
            // firstName: "",
            // lastName: "",
            // childFirstName: "",
            // childLastName: "",
            email: "",
            role: "GUARDIAN"
            // phoneNumber: "",
            // childDOB: "",
            // level: ""
        })

        const [level, setLevel] = useState(1)

        // Errors
        const [errors, setError] = useState({
            firstName: false,
            lastName: false,
            childFirstName: false,
            childLastName: false,
            email: false,
            phoneNumber: false,
            childDOB: false,
            level: false,
        })

        // email Sent modal
        const [show, setShow] = useState(false)

    //////////////////
    // Recoil State //
    //////////////////

        const [clientList, setClientList] = useRecoilState(clientListState)

        const [user, setUser] = useRecoilState(userState)

    //////////////
    // Mutation //
    //////////////

        const [inviteOrganizationUser, { loading: loadingAdd, error: errorAdd, data: typeAdd }] =useMutation(INVITE_ORGANIZATION_USER);

///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    // Renders the Headerbar
    function renderHeader() {
        return (
            <Header
                title="Add Client"
                goBack={true}
                onPress={() => navigation.goBack()}
            />
        );
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

    // Renders a First and Last name field in the same row
    function renderFullNameFields(type){
        let title="First Name"
        let fieldOne = "firstName"
        let fieldTwo = "lastName"
        if (type === "Parent" || type  === "Child"){
            title = `${type}`
            if (type === "Child"){
                fieldOne = "childFirstName"
                fieldTwo = "childLastName"
            }
        }
        
        return(
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 17}}>
                    <View>
                        <ProfileEditCategoryComponent
                            title={title}
                            placeholder="Firstname"
                            onChangeText={(content) => handleInput(content, fieldOne, type) }
                            value={formData}
                        />
                        {renderErrorMessage(formData.fieldOne)}
                    </View>
                </View>

                <View style={{flex: 1}}/>

                <View style={{flex: 17}}>
                    <View>
                        <ProfileEditCategoryComponent
                            title={title}
                            placeholder="Lastname"
                            onChangeText={(content) => handleInput(content, fieldTwo) }
                            value={formData}
                        />
                        {renderErrorMessage(formData.fieldTwo)}
                    </View>
                </View>
            </View>
        )
    }

    // Renders just email for invite
    function renderFields(){
        return(
            <>
                <ProfileEditCategoryComponent
                    title="Email"
                    placeholder="exampleEmail@email.com"
                    onChangeText={(e) => onChangeText(e,'email')}
                    value={formData.email}
                />
                <Text style={{...FONTS.Title}}>What level of coordination and functionality is this client at</Text>
                {renderLevelButtons()}
            </>
            

        )
    }

    // Renders a single YES or NO button
    function renderButton(one_or_two){
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

        if (one_or_two === "One" && level === 1){
            currentStyle = selectedStyle
        }
        else if (one_or_two === "One" && level === 2){
            currentStyle = inactiveStyle
        }
        if (one_or_two === "Two" && level === 1){
            currentStyle = inactiveStyle
        }
        else if (one_or_two === "Two" && level === 2){
            currentStyle = selectedStyle
        }

        return(
            <TouchableOpacity
                onPress={() => handleLevelClick(one_or_two)}
                style={{...currentStyle, borderRadius: 10,  alignItems: 'center'}}

            >
                <View style={{ height: '50%', marginTop: '20%'}}>
                    <Text style={{...FONTS.Title, fontSize: 20, height: '100%', textAlignVertical: 'center' }}>
                        {one_or_two}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    
    // Renders YES / NO buttons for ARE YOU CREATING AN ORGANIZATION
    function renderLevelButtons(){
        return(
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginTop: 10}}>
                {renderButton("One")}
                {renderButton("Two")}
            </View>
        )
    }

    // Header and Subheader for Email Invite
    function renderEmailInviteHeader(){
        return(
            <View style={{marginTop: 20}}>
                <Text style={{...FONTS.Title, textAlign: 'center', marginBottom: 10}}>Send an email invite to potential clients.</Text>
                <Text style={{...FONTS.SubTitle, textAlign: 'center', marginBottom: 10}}>For them to properly join your network, they will need to accept this invite</Text>
            </View>
        )
    }

    // Renders the Add Client Button
    function renderAddClientButton() {
        return(
            <Button
            title="ADD CLIENT"
            containerStyle={{ marginTop: 10 }}
            onPress={() => handleAddClient()}
        />
        )
    }

    // Renders modal upon email sent
    function renderEmailSentModal(){
        return(
        <Modal
            isVisible={show}
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
                <Text style={{...FONTS.Title, textAlign: 'center', marginBottom: 20}}>Email Sent!</Text>
                <Button 
                    onPress={() =>{ 
                        setShow(false)
                        navigation.goBack()
                    }}
                    title={"Okay"}
                />
            </View>
        </Modal>
        )
    }

    // Button that brings you to all available and unassigned clients
    function renderClientsPoolButton(){
        if (user.role !== "THERAPIST"){
            return null
        }
        return(
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                style={{borderWidth: 2.5, borderRadius: 15, borderColor: COLORS.iconLight, width: 130, height: 130, padding: 5, alignItems: 'center', justifyContent: 'center'}}
                onPress={() => navigation.navigate("ClientPool")}
                >
                    <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 16, textAlign: 'center', color: COLORS.iconLight}}>
                        Search From Your Available Clients
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    // Main Render
    function renderContent() {
        return (
            // <ScrollView
            //     contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
            //     showsVerticalScrollIndicator={false}
            // >
            <View style={{marginBottom: 20}}>
                {renderEmailInviteHeader()}
                {renderFields()}
                {renderAddClientButton()}
            </View>
            // </ScrollView>
        );
    }

///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////

    // Tracks inputs and changes state
    function onChangeText(e, field){
        setFormData(prevState => ({...prevState, [field]: e}))
    }

    // Redundant... fix this later
    function handleInput(content, field, type){
        onChangeText(content, field)
    }

    // Fires on "Add CLient" Click
    function handleAddClient(){
        if (formData.email === ""){
            console.log("ERROR")
        }
        handleAddMutation()
        .then( (resolved) => { 
            setShow(true)
        })
    }

    // Handles the Send invite Mutation
    async function handleAddMutation() {
        if (user.role === "THERAPIST" && user.ownedOrganization){
            return await inviteOrganizationUser({
                variables: {
                    email: formData.email,
                    role: formData.role,
                    additionalInformation: {
                        childLevel: level,
                        childTherapistID: user.id
                    }
                }
            }).catch(error => console.log(error, "MUTATION"))
            .then(resolved => console.log(resolved))
        }

        else{
        }
    }

    // Handles the one or two click
    function handleLevelClick(one_or_two){
        if (one_or_two === "One"){
            setLevel(1)
        }
        else {
            setLevel(2)
        }
    }


///////////////////////
///                 ///
///   MAIN RETURN   ///
///                 ///
///////////////////////
    return (
        // <SafeAreaView style={{ flex: 1, ...AREA.AndroidSafeArea }}>
        <Gradient
        colorOne={COLORS.gradientColor1}
        colorTwo={COLORS.gradientColor2}
        style={{height: '110%', paddingTop: 30}}
        >
            <ScrollView
                 contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
                 showsVerticalScrollIndicator={false}
            >
                {renderHeader()}
                {renderEmailSentModal()}
                {renderContent()}
                {renderClientsPoolButton()}
            </ScrollView>
        </Gradient>
        // </SafeAreaView>
    );
}
