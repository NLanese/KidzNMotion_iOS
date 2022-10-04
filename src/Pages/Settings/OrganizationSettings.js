// Reaact
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";

// Nuton
import { Header, Button, ProfileEditCategoryComponent } from "../../../NutonComponents";
import { AREA, COLORS, FONTS } from "../../../NutonConstants";
import { Camera } from "../../../svg";

// Apollo / GraphQL
import { useMutation } from "@apollo/client";
import { EDIT_ORGANIZATION_SETTINGS } from "../../../GraphQL/operations";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, clientListState, userState, colorState, fontState, organizationState } from '../../../Recoil/atoms';

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import SelectionButton from "../../../OstrichComponents/SelectionButton";

export default function OrganizationSettings() {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    ///////////////
    // Constants // 
    ///////////////

        const COLORS = useRecoilValue(colorState)
        const SIZES = useRecoilValue(sizeState)
        const navigation = useNavigation();

    /////////////////
    // Local State //
    /////////////////

        const [newName, setNewName] = useState("")        

    //////////////////
    // Recoil State //
    //////////////////

        // User Settings
        const [user, setUser] = useRecoilState(userState)

        // Organization Settings
        const [org, setOrg] = useRecoilState(organizationState)

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
                    title={"Organization Settings"}
                />
            </View>    
        ) 
    }

    // Renders any text fields for the org
    function renderOrganizationTextFields() {
        return(
            <View style={{width: '80%', marginLeft: '10%'}}>
                <ProfileEditCategoryComponent
                    title="Organization Name"
                    placeholder={user.ownedOrganization.name}
                    onChangeText={(e) => onChangeText(e,'phoneNumer')}
                />
            </View>
        )
    }

    function renderDissolveOrganization() {
        return(
            <View style={{marginLeft: -5}}>
                <SelectionButton
                    title={"Delete Organization"}
                    subtitle={"This will delete your account, as well as any connected to this organization"}
                    leftAlign={true}
                />
            </View>
        )
    }

///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////


///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////
    return(
        <Gradient
            colorOne={COLORS.gradientColor1}
            colorTwo={COLORS.gradientColor2}
            style={{height: '100%'}}
        >
            {renderHeader()}
            <View style={{marginLeft: '10%', marginRight: '10%', marginTop: 25, flexDirection: 'row'}}>
                <Text style={{...FONTS.Title, color: COLORS.iconLight}}>
                    Name: 
                </Text>
                <Text style={{...FONTS.Title, fontSize: 22, color: COLORS.iconDark}}>
                    {user.ownedOrganization.name}
                </Text>
            </View>
            {renderOrganizationTextFields()}

            <View style={{marginLeft: '10%', marginRight: '10%', marginTop: 25, marginBottom: 40}}>
                <Text style={{...FONTS.Title, color: COLORS.iconLight}}>
                    Organization Code: {user.ownedOrganization.name}
                </Text>
                <Text style={{...FONTS.Title, fontSize: 22, color: COLORS.iconDark}}>
                    kjfhgoaeijrggoa
                </Text>
            </View>    
            <View style={{marginTop: '70%'}}>
                {renderDissolveOrganization()}
            </View>
        </Gradient>
    )
}