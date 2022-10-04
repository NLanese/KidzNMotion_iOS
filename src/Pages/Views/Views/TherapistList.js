import { View, Text, SafeAreaView, ScrollView, Image, TextInput, ImageBackground, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, CardComponent } from "../../../../NutonComponents";
import { AndroidSafeArea, clients,therapists } from "../../../../NutonConstants";


import { useRecoilValue } from "recoil";
import { colorState, sizeState, fontState } from '../../../../Recoil/atoms';
import Gradient from "../../../../OstrichComponents/Gradient";

import { InputSearch, BookOpenTab, PlusSvg, Edit} from "../../../../svg";

export default function TherapistList() {
    const navigation = useNavigation();
    const COLORS = useRecoilValue(colorState)
    const SIZES = useRecoilValue(sizeState)
    const FONTS = useRecoilValue(fontState)

 
    const [searchUser, setSearchUser] = useState('')

    const filterClients = (allClients) => {
        let filteredList = []
        if (searchUser === ''){
            return allClients
        }
        let filterString = searchUser.toUpperCase()
        allClients.forEach( (client) => {
            if (client.firstName.includes(filterString) || client.lastName.includes(filterString)){
                filteredList.push(client)
            }
        })
        return filteredList
    }

    function renderHeader() {
        return (
            <Header
                
                goBack={true}
                profile={true}
                onPress={() => navigation.goBack()}
                filterOnPress={() => navigation.navigate("SettingsLanding")}
            />
        );
    }
    function renderLogo(){
        return(
            <View style={{...styles.logo}}>
                <BookOpenTab fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} style={{
                    
                    margin: "auto",
                    alignSelf: "center",
                    transform: [{ scale: 5 }],
                    margin: 50
                    
                }}/>
            
                <Text style={{fontFamily: FONTS.Title.fontFamily ,fontSize: FONTS.Title.fontSize, color: COLORS.headerTitle, height: 30}}>Therapist Directory</Text>
                
                
            </View>

        )
    }
    
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

    function renderContent() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingTop: 10,
                    paddingBottom: 25,
                }}
                showsVerticalScrollIndicator={false}
            >
                {filterClients(therapists).map((item, index, array) => {
                    const lastIndex = array.length - 1;
                    return (
                        <View
                            key={index}
                            style={{
                                marginHorizontal: 20,
                            }}
                        >
                            <CardComponent
                                item={item}
                                Icon={Edit}
                                lastComponent={
                                    index == lastIndex ? true : false
                                }
                                onPress={() =>
                                    navigation.navigate("Profile", {
                                        item: item,
                                    })
                                }
                            />
                        </View>
                    );
                })}
                <TouchableOpacity 
                    onPress={() => navigation.navigate('AddTherapist')}
                    style={{
                        backgroundColor: "rgba(1,1,1,0)",
                        alignSelf: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        height: 100,
                        width: 100,
                        // position: "absolute",
                        bottom: 0,
                        borderRadius: SIZES.borderRadius,
                        borderStyle: "solid",
                        borderWidth: 0.5,
                        borderColor: COLORS.buttonBorder


                    }}>
                        <View
                        style={{
                            alignContent: "center",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <PlusSvg
                            fillColor= {COLORS.iconLight}
                            style={{
                                transform: [{ scale: 4 }],
                                marginBottom: 20
                            }}/>
                            <Text style={{color: COLORS.buttonColorLight}}> Add Therapist </Text>
                        </View>
                    </TouchableOpacity>
            </ScrollView>
        );
    }
  

    return (
        <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
            <Gradient
                colorOne={COLORS.gradientColor1}
                colorTwo={COLORS.gradientColor2}
            >
                {renderHeader()}
                {renderLogo()}
                {renderSearch()}
                {renderContent()}
            </Gradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 40,
    marginBottom: 100,
    marginTop: 75,
    
  },

});