import { View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import React from "react";

import { AndroidSafeArea} from "../NutonConstants";
import { Button } from "../NutonComponents";
import { useNavigation } from "@react-navigation/native";

import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

export default function SignUpAccountCreated() {
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)
    const navigation = useNavigation();

    function renderBackground() {
        return (
            <Image
                source={require("../assets/images/background/background-03.png")}
                style={{
                    position: "absolute",
                    width: SIZES.width,
                    height: SIZES.height,
                    resizeMode: "stretch",
                }}
            />
        );
    }

    function renderContent() {
        return (
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 40,
                    flexGrow: 1,
                    paddingTop: SIZES.height * 0.1,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        alignSelf: "center",
                        marginBottom: 10,
                    }}
                    source={require("../assets/images/logo/logo.png")}
                />
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.Spartan_600SemiBold,
                        fontSize: 12,
                        marginBottom: 10,
                    }}
                >
                    Nuton
                </Text>
                <Image
                    style={{
                        width: 220,
                        height: 220,
                        alignSelf: "center",
                        marginBottom: 10,
                    }}
                    source={{ uri: "https://via.placeholder.com/660x660" }}
                />
                <Text
                    style={{
                        ...FONTS.H2,
                        textAlign: "center",
                        marginBottom: 10,
                        lineHeight: FONTS.H2.fontSize * 1.4,
                    }}
                >
                    Account Created!
                </Text>
                <Text
                    style={{
                        marginBottom: 24,
                        textAlign: "center",
                        ...FONTS.BodyText,
                        color: COLORS.bodyTextColor,
                    }}
                >
                    Your account had beed created {"\n"} successfully.
                </Text>
                <Button
                    title="Get started"
                    onPress={() => navigation.navigate("Home")}
                />
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
            {renderBackground()}
            {renderContent()}
        </SafeAreaView>
    );
}
