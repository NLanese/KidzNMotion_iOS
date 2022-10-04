import {
    SafeAreaView,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
} from "react-native";

import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";
import Modal from "react-native-modal";

import Gradient from "../OstrichComponents/Gradient";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";

import { Header, WishListComponent } from "../NutonComponents";
import { AndroidSafeArea, courses, myCoupons } from "../NutonConstants";

import { useRecoilValue, useRecoilState } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

import { SettingsLarge, Color, Bank, Bell, Edit } from "../svg";

import { COLORS as colorConstant }  from "../NutonConstants";


export default function MySettings() {
    
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)
    const navigation = useNavigation();

    const [COLORS, setColors] = useRecoilState(colorState)
    const [showColorModal, setShowColorModal] = useState(false);

    //runs mutation to save colors
    const handleSaveColors = () => {
        
    }
    function renderHeader() {
        return (
            <Header 
                title="Account Settings" 
                goBack={true}
                profile={true}
                onPress={() => navigation.goBack()}
                filterOnPress={() => navigation.navigate("SettingsLanding")}
            />
        );
    }

    function renderBackground() {
        return null
        return (
            <Image
                source={require("../assets/images/background/background-01.png")}
                style={{
                    position: "absolute",
                    width: SIZES.width,
                    height: SIZES.height,
                    resizeMode: "stretch",
                }}
            />
        );
    }

    function renderModal() {        
        return (
            <Modal
                isVisible={showColorModal}
                onBackdropPress={setShowColorModal}
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
                    
                    <BouncyCheckboxGroup
                        data={
                            [
                            {
                                id: 0,
                                ...colorConstant.scheme1                                
                            },
                            {
                                id: 1,
                                ...colorConstant.scheme2
                            },
                            {
                                id: 2,
                                ...colorConstant.scheme3
                            },
                            {
                                id: 3,
                                ...colorConstant.scheme4
                            },
                            {
                                id: 4,
                                ...colorConstant.scheme5
                            },
                            ]}
                        onChange={(selectedItem) => {
                            setColors({...selectedItem})
                            handleSaveColors()
                        }}
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
                                marginTop: 10,
                                marginHorizontal: 7.5,
                                borderColor: COLORS.buttonBorder,
                                borderWidth: 1,
                            }}
                            onPress={() => {
                                
                                setShowColorModal(false);
                               
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
                            onPress={() => setShowColorModal(false)}
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

    function renderContent() {
        return (
            <>
                <View style={{...styles.medal}}>
                    <SettingsLarge style={{
                        
                        margin: "auto",
                        alignSelf: "center",
                        
                    }}/>
                </View>
                
                <Shadow
                    key={1}
                    offset={[0, 0]}
                    distance={5}
                    startColor={"rgba(6, 38, 100, 0.03)"}
                    finalColor={"rgba(6, 38, 100, 0.0)"}
                    viewStyle={{ width: "100%", marginBottom: 10 }}
                >
                    <TouchableOpacity style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start"
                    }}
                        onPress={() => setShowColorModal(true)}>
                        <View style={{
                                flex: 1,
                                justifyContent: "center",
                                width: "100%",
                                height: 85,
                                borderRadius: 10
                                

                            }}>
                            <Color fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} /> 
                        </View>
                        <Text style={{
                                flex: 4,
                                alignSelf: "center"
                            }}>
                            Screen Color
                        </Text>
                    </TouchableOpacity>
                </Shadow>
                <Shadow
                    key={2}
                    offset={[0, 0]}
                    distance={5}
                    startColor={"rgba(6, 38, 100, 0.03)"}
                    finalColor={"rgba(6, 38, 100, 0.0)"}
                    viewStyle={{ width: "100%", marginBottom: 10 }}
                >
                    <TouchableOpacity style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start"
                    }}>
                        <View style={{
                                flex: 1,
                                justifyContent: "center",
                                width: "100%",
                                height: 85,
                                borderRadius: 10
                                

                            }}>
                            <Bank fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                        </View>
                        <Text style={{
                                flex: 4,
                                alignSelf: "center"
                            }}>
                            View Subscription
                        </Text>
                    </TouchableOpacity>
                </Shadow>
                <Shadow
                    key={3}
                    offset={[0, 0]}
                    distance={5}
                    startColor={"rgba(6, 38, 100, 0.03)"}
                    finalColor={"rgba(6, 38, 100, 0.0)"}
                    viewStyle={{ width: "100%", marginBottom: 10 }}
                >
                    <TouchableOpacity style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start"
                    }}>
                        <View style={{
                                flex: 1,
                                justifyContent: "center",
                                width: "100%",
                                height: 85,
                                borderRadius: 10
                                

                            }}>
                            <Bell fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                        </View>
                        <Text style={{
                                flex: 4,
                                alignSelf: "center"
                            }}>
                            Notifications
                        </Text>
                    </TouchableOpacity>
                </Shadow>
                <Shadow
                    key={4}
                    offset={[0, 0]}
                    distance={5}
                    startColor={"rgba(6, 38, 100, 0.03)"}
                    finalColor={"rgba(6, 38, 100, 0.0)"}
                    viewStyle={{ width: "100%", marginBottom: 10 }}
                >
                    <TouchableOpacity 
                        onPress={() => navigation.navigate("ProfileEdit")}
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "flex-start"
                        }}>
                        <View style={{
                                flex: 1,
                                justifyContent: "center",
                                width: "100%",
                                height: 85,
                                borderRadius: 10
                                

                            }}>
                            <Edit fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                        </View>
                        <Text style={{
                                flex: 4,
                                alignSelf: "center"
                            }}>
                            Edit Profile
                        </Text>
                    </TouchableOpacity>
                </Shadow>
                
            </>
        );
    }
    function renderAdminContent(){
    }
    function renderTherapistContent(){
    }
    function renderUserContent(){
    }

    return (
        <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
             <Gradient
                colorOne={COLORS.gradientColor1}
                colorTwo={COLORS.gradientColor2}
            >
                {renderBackground()}
                {renderHeader()}
                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        flexGrow: 1,
                    }}
                    showsVerticalScrollIndicator={false}
                    >
                    
                    {renderContent()}
                    {renderAdminContent()}
                    {renderTherapistContent()}
                    {renderUserContent()}
                    {renderModal()}
                </ScrollView>
            </Gradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  medal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25
    
  },
  medalContainer: {
      backgroundColor: "rgba(255,255,255,0.50)",
      borderColor: "#FFFFFF",
      borderStyle: "solid",
      borderWidth: 1,
      opacity: 0.7,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,

      elevation: 14,

      

  }
});






