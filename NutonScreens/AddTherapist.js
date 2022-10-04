import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, Button, ProfileEditCategoryComponent } from "../NutonComponents";
import { AREA} from "../NutonConstants";
import { Camera } from "../svg";


import { useRecoilValue } from "recoil";
import { colorState, sizeState } from '../Recoil/atoms';

export default function AddTherapist() {
    const navigation = useNavigation();
    const COLORS = useRecoilValue(colorState)
    const SIZES = useRecoilValue(sizeState)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        childDOB: "",
        diagnosis: "",
        level: ""
    })

    function onChangeText(e, field){
        setFormData(prevState => ({...prevState, [field]: e}))
    }

    function renderHeader() {
        return (
            <Header
                title="Add Therapist"
                goBack={true}
                onPress={() => navigation.goBack()}
            />
        );
    }

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
                            <Camera fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <ProfileEditCategoryComponent
                    title="Name"
                    placeholder="Kristin Watson"
                    onChangeText={(e) => onChangeText(e,'name')}
                />
                <ProfileEditCategoryComponent
                    title="Email"
                    placeholder="kristinwatson@mail.com"
                    onChangeText={(e) => onChangeText(e,'email')}
                />
                <ProfileEditCategoryComponent
                    title="Phone number"
                    placeholder="+17 123456789"
                    onChangeText={(e) => onChangeText(e,'phoneNumber')}
                />
                <ProfileEditCategoryComponent
                    title="Location"
                    placeholder="Chicago, USA"
                    onChangeText={(e) => onChangeText(e,'location')}
                />
                <Button
                    title="ADD THERAPIST"
                    containerStyle={{ marginTop: 10 }}
                    onPress={() => navigation.navigate("/")}
                />
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, ...AREA.AndroidSafeArea }}>
            <Image
                source={require("../assets/images/background/background-01.png")}
                style={{
                    position: "absolute",
                    width: SIZES.width,
                    height: SIZES.height,
                    resizeMode: "stretch",
                }}
            />
            {renderHeader()}
            {renderContent()}
        </SafeAreaView>
    );
}
