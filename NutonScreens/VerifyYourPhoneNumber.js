import { View, Text, Image, SafeAreaView } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhoneInput from "react-native-phone-input";
import { useNavigation } from "@react-navigation/native";

import { SIZES, AndroidSafeArea, FONTS, COLORS } from "../NutonConstants";
import { Header, Button } from "../NutonComponents";

export default function VerifyYourPhoneNumber() {
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
                }}
            />
        );
    }

    function renderHeader() {
        return (
            <Header
                title="Verify your phone number"
                onPress={() => navigation.goBack()}
            />
        );
    }

    function renderContent() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    paddingTop: 30,
                    paddingHorizontal: 20,
                    flexGrow: 1,
                    paddingBottom: 25,
                }}
            >
                <Text
                    style={{
                        ...FONTS.BodyText,
                        color: COLORS.bodyTextColor,
                        marginBottom: 20,
                    }}
                >
                    We have sent you an SMS with a code to number +17
                    0123456789.
                </Text>
                <View
                    style={{
                        marginBottom: 20,
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        paddingVertical: 8,
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.Spartan_400Regular,
                            fontSize: 12,
                            textTransform: "capitalize",
                            lineHeight: 12 * 1.7,
                            marginBottom: 3,
                            color: COLORS.secondaryTextColor,
                        }}
                    >
                        phone number
                    </Text>
                    <PhoneInput
                        style={{
                            fontSize: 14,
                            fontFamily: FONTS.Spartan_400Regular,
                            paddingBottom: 4,
                        }}
                        placeholderTextColor={COLORS.bodyTextColor}
                        initialCountry={"us"}
                    />
                </View>
                <Button
                    title="confirm"
                    onPress={() => navigation.navigate("ConfirmationCode")}
                />
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
