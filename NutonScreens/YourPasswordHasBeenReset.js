import { Text, ScrollView, SafeAreaView, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import {  AndroidSafeArea } from "../NutonConstants";
import { Button } from "../NutonComponents";
import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

export default function YourPasswordHasBeenReset() {
    const navigation = useNavigation();
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)

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
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingTop: SIZES.height * 0.1,
                    paddingBottom: 25,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={require("../assets/images/other/logo.png")}
                    style={{
                        width: 50,
                        height: 50,
                        alignSelf: "center",
                        marginBottom: 10,
                    }}
                />
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.LeagueSpartan_600SemiBold,
                        fontSize: 12,
                    }}
                    allowFontScaling={true}
                >
                    Nuton
                </Text>
                <Image
                    source={{ uri: "https://via.placeholder.com/618x618" }}
                    style={{
                        width: 206,
                        height: 206,
                        alignSelf: "center",
                        marginVertical: 20,
                    }}
                />
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.H2,
                        color: COLORS.mainColor,
                        textTransform: "capitalize",
                        lineHeight: FONTS.H2.fontSize * 1.5,
                        marginBottom: 10,
                    }}
                >
                    Your password has {"\n"} been reset!
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.BodyText,
                        paddingHorizontal: 20,
                        marginBottom: 24,
                        color: COLORS.bodyTextColor,
                    }}
                >
                    Qui ex aute ipsum duis. Incididunt adipisicing voluptate
                    laborum
                </Text>
                <Button
                    title="Done"
                    containerStyle={{ marginHorizontal: 20 }}
                    onPress={() => navigation.navigate("SignIn")}
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
