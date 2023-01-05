// React
import { View, Text, SafeAreaView, ScrollView, TextInput, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

// Nuton
import { Header, CardComponent } from "../../../../NutonComponents";
import { AndroidSafeArea } from "../../../../NutonConstants";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { colorState, sizeState, fontState, userState, selectedClientState } from '../../../../Recoil/atoms';

// Ostrich
import Gradient from "../../../../OstrichComponents/Gradient";
import SelectionButton from "../../../../OstrichComponents/SelectionButton"
import TabBar from "../../../../OstrichComponents/TabBar";

// svg
import { InputSearch, BookOpenTab, PlusSvg, Edit, ClientLogo} from "../../../../svg";

let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height

export default function ClientList() {
////////////////////////
///                  ///
///    Preliminary   ///
///                  /// 
////////////////////////


    ///////////////
    // Constants //
    ///////////////

        const navigation = useNavigation();
        const COLORS = useRecoilValue(colorState)
        const SIZES = useRecoilValue(sizeState)
        const FONTS = useRecoilValue(fontState)

    /////////////////
    // Local State //
    /////////////////

        const [searchUser, setSearchUser] = useState('')
    
    ///////////////////
    // Recoil States //
    ///////////////////

        const [user, setUser] = useRecoilState(userState)

        const [clientPlans, setClientPlans] = useState(user.patientCarePlans)

        const [selectedClient, setSelectedClient] = useRecoilState(selectedClientState)
        
        // 0 = Child 1 = Guardian
        const [clientType, setClientType] = useState(0)

        let guardianClients = []
        let guardianClientIds = []

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Goes through each ChildCarePlan to extrapolate child users and their plans, as well as parents //
        const childClients = clientPlans.map(cp => {

            if (!cp.child){
                return 
            }

            if (!(guardianClientIds.includes(cp.child.guardian.id))){
                guardianClientIds.push(cp.child.guardian.id)
                guardianClients.push({user: cp.child.guardian})
            }
            
            return({
                plan: cp,
                user: cp.child
            })
        })




       
///////////////////////
///                 ///
///     Handler     ///
///                 ///
///////////////////////

    // Filters Clients based on what was entered in the search
    const filterClients = (allClients) => {
        let filteredList = []
        if (searchUser === ''){
            return allClients
        }
        let filterString = searchUser.toUpperCase()
        allClients.forEach( (client) => {
            if (client.user.firstName.includes(filterString) || client.lastName.includes(filterString)){
                filteredList.push(client)
            }
        })
        return filteredList
    }

///////////////////////
///                 ///
///     Renders     ///
///                 ///
///////////////////////

    // Renders Headerbar
    function renderHeader() {
        return (
            <View style={{marginTop: 45}}>
                <Header
                    title="Client List"
                    goBack={true}
                    profile={true}
                    onPress={() => navigation.goBack()}
                    filterOnPress={() => navigation.navigate("SettingsLanding")}
                />
            </View>
            
        );
    }

    // Renders the List Image
    function renderLogo(){
        return(
            <View style={{...styles.logo, marginTop: 40}}>
                <ClientLogo fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} style={{
                    margin: "auto",
                    transform: [{ scale: 3 }, {translateX: 28}, {translateY: 20}],
                    margin: 0
                    
                }}/>
                <Text style={{...FONTS.Title, color: COLORS.iconLight, marginBottom: 5}}>Search or Select a Client</Text>
                
            </View>

        )
    }
    
    // Renders the Search Bar
    function renderSearch() {
        return (
            <View
                style={{
                    height: 50,
                    backgroundColor: "rgba(255,255,255,0.5)",
                    borderRadius: 10,
                    padding: 20,
                    marginBottom: 20,
                    marginHorizontal: 20,
                }}
            >
                
                 <View style={{ marginLeft: 5, flexDirection: "row" }}>
                    <InputSearch flex={1} fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                    <TextInput
                        flex={5}
                        placeholder="Search"
                        onChangeText={setSearchUser}
                        style={{
                            flex: 10,
                            marginLeft: 8,
                            flex: 1,
                            marginRight: 16,
                        }}
                    />
                </View>
               
            </View>
        );
    }

    // Renders the Add CLient Button if you are an Organization Owner
    function renderAddButton(){
        if (user.ownedOrganization){
            return(
                <TouchableOpacity 
                    onPress={() => navigation.navigate('AddClient')}
                    style={{
                        backgroundColor: "rgba(1,1,1,0)",
                        alignSelf: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        height: 100,
                        width: 100,
                        bottom: 0,
                        borderRadius: SIZES.borderRadius,
                        borderStyle: "solid",
                        borderWidth: 2,
                        borderColor: COLORS.buttonBorder,
                        marginTop: 10
                    }}>
                        <View
                        style={{
                            alignContent: "center",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <PlusSvg
                            fillColor= {COLORS.white}
                            style={{
                                transform: [{ scale: 4 }],
                                marginBottom: 25,
                                marginTop: 25
                            }}/>
                            <Text style={{...FONTS.SubTitle, color: COLORS.white}}> Add Client </Text>
                        </View>
                </TouchableOpacity>
            )
        }
        else{
            return
        }
    }

    // Renders the Selection Tab for Children or Parents
    function renderParentOrChildTabBar(){
        return(
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TabBar
                    tabsArray={["Children", "Guardians"]}
                    onChangeIndex={(index) => setClientType(index)}
                    styleActive={{borderBottomColor: COLORS.iconLight, borderBottomWidth: 3, padding: 2, marginRight: 15, marginLeft: 15, width: 90}}
                    styleInactive={{borderBottomColor: "grey", borderBottomWidth: 3, padding: 2, marginRight: 15, marginLeft: 15, width: 90}}
                    tabTextStyleActive={{fontFamily: "Gilroy-Bold", textAlign: 'center', fontSize: 16, color: COLORS.iconLight, marginBottom: 3}}
                    tabTextStyleInactive={{fontFamily: "Gilroy-Bold", textAlign: 'center', fontSize: 16, color: "grey", marginBottom: 3}}
                />
            </View>
        )
    }

    // Renders Clients
    function renderClients() {
        let clients
        if (clientType === 0){
            clients = childClients
        }
        else if (clientType === 1){
            clients = guardianClients
        }
        return filterClients(clients).map( (client, index) => {
            if (!client){
                return null
            }
             return(
                <SelectionButton
                    title={`${client.user.firstName} ${client.user.lastName}`}
                    subtitle={`${client.user.role}`}
                    hasProfilePic={true}
                    profilePic={client.user.profilePic}
                    onSelect={() => {
                        setSelectedClient(client)
                        navigation.navigate("Profile")
                    }}
                />
            )
        }) 
    }  

    // Renders the list of clients
    function renderContent() {
        return (
            <View>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingTop: 10,
                        paddingBottom: 25,
                    }}
                    style={{
                        padding: 4,
                        borderColor: COLORS.iconLight,
                        borderWidth: 1,
                        marginLeft: 10,
                        marginRight: 10,
                        borderRadius: 10,
                        height: maxHeight * 0.40
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {renderClients()}
                </ScrollView>
                {renderAddButton()}
            </View>
        );
    }
  

    return (
        // <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
            <Gradient
                colorOne={COLORS.gradientColor1}
                colorTwo={COLORS.gradientColor2}
                style={{height: '105%'}}
            >
                {renderHeader()}
                <View style={{marginTop: -15}}>
                    <ScrollView contentContainerStyle={{height: '120%'}}>
                        {renderLogo()}
                        {renderSearch()}
                        {renderParentOrChildTabBar()}
                        {renderContent()}
                    </ScrollView>
                </View>
            </Gradient>
        // </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  logo: {
    // flex: 1,
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginBottom: 0,
    marginTop: 80,
    
  },

});