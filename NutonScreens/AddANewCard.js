import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Header, InputField, Button } from "../NutonComponents";
import { AndroidSafeArea, SIZES } from "../NutonConstants";
import { Camera } from "../svg";

export default function AddANewCard() {
    const navigation = useNavigation();

    function renderBackground() {
        return (
            <Image
                source={require("../assets/images/background/background-01.png")}
                style={{
                    position: "absolute",
                    width: SIZES.width,
                    height: SIZES.height,
                    resizeMode: "stretch",
                    zIndex: -1,
                }}
            />
        );
    }

    function renderHeader() {
        return (
            <Header
                title="Add a new card"
                onPress={() => navigation.goBack()}
            />
        );
    }

    function renderContent() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    paddingBottom: 25,
                }}
            >
                <Image
                    source={require("../assets/images/cards/02.png")}
                    style={{
                        width: "100%",
                        height: 190,
                        borderRadius: SIZES.borderRadius,
                        alignSelf: "center",
                        marginBottom: 30,
                    }}
                    resizeMode="contain"
                />
                <InputField
                    placeholder="Kristin Watson"
                    title="Name"
                    containerStyle={{ marginBottom: 10 }}
                />
                <InputField
                    placeholder="7741 6588 2123 6644"
                    title="Сard number"
                    containerStyle={{ marginBottom: 10 }}
                    icon={
                        <TouchableOpacity style={{ paddingHorizontal: 20 }}>
                            {<Camera fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}  />}
                        </TouchableOpacity>
                    }
                />
                <View
                    style={{
                        flexDirection: "row",
                        marginBottom: 20,
                        width: "100%",
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{ width: "48%" }}>
                        <InputField placeholder="12/22" title="mm/yy" />
                    </View>
                    <View style={{ width: "48%" }}>
                        <InputField placeholder="•••" title="cvv" />
                    </View>
                </View>
                <Button title="Save card" />
            </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
            {renderBackground()}
            {renderHeader()}
            {renderContent()}
        </SafeAreaView>
    );
}
