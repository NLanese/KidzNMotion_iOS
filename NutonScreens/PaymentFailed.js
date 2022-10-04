import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { AndroidSafeArea } from "../NutonConstants";
import { Button } from "../NutonComponents";

import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

export default function PaymentFailed() {
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
                    flexGrow: 1,
                    paddingHorizontal: 40,
                    paddingTop: SIZES.height * 0.1,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={require("../assets/images/logo/logo.png")}
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
                        ...FONTS.Spartan_600SemiBold,
                        fontSize: 12,
                        color: COLORS.mainColor,
                        marginBottom: 22,
                    }}
                >
                    Nuton
                </Text>
                <Image
                    source={{ uri: "https://via.placeholder.com/552x552" }}
                    style={{
                        width: 184,
                        height: 184,
                        alignSelf: "center",
                        marginBottom: 23,
                    }}
                />
                <Text
                    style={{
                        ...FONTS.H2,
                        color: COLORS.mainColor,
                        textAlign: "center",
                        lineHeight: FONTS.H2.fontSize * 1.4,
                        marginBottom: 10,
                    }}
                >
                    Something went wrong!
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.BodyText,
                        marginBottom: 24,
                        lineHeight: FONTS.BodyText.fontSize * 1.7,
                    }}
                >
                    Please try again to finish {"\n"}
                    your payment!
                </Text>
                <Button
                    title="Try again"
                    containerStyle={{ marginBottom: 20 }}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate("/")}
                >
                    <Text
                        style={{
                            ...FONTS.Spartan_500Medium,
                            fontSize: 14,
                            textAlign: "center",
                            lineHeight: 14 * 1.7,
                        }}
                    >
                        Go to my profile
                    </Text>
                </TouchableOpacity>
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
