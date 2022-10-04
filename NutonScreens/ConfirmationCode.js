import {
    View,
    Text,
    SafeAreaView,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { AndroidSafeArea } from "../NutonConstants";
import { Header, Button } from "../NutonComponents";

import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

export default function ConfirmationCode() {
    const navigation = useNavigation();
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)

    const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "" });

    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const fiveInput = useRef();

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
                        marginBottom: 27,
                    }}
                >
                    Enter your OTP code here.
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 20,
                    }}
                >
                    <View
                        style={{
                            borderRadius: 8,
                            backgroundColor: "#F3F7FF",
                        }}
                    >
                        <TextInput
                            style={{
                                textAlign: "center",
                                paddingHorizontal: 22,
                                paddingVertical: 14.5,
                                textAlign: "center",
                                fontSize: 24,
                                fontFamily: "Lato_400Regular",
                                color: COLORS.golden,
                                width: 60,
                            }}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={firstInput}
                            onChangeText={(text) => {
                                setOtp({ ...otp, 1: text });
                                text && secondInput.current.focus();
                            }}
                        />
                    </View>
                    <View
                        style={{
                            borderRadius: 8,
                            backgroundColor: "#F3F7FF",
                        }}
                    >
                        <TextInput
                            style={{
                                textAlign: "center",
                                paddingHorizontal: 22,
                                paddingVertical: 14.5,
                                textAlign: "center",
                                fontSize: 24,
                                fontFamily: "Lato_400Regular",
                                color: COLORS.golden,
                                width: 59,
                            }}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={secondInput}
                            onChangeText={(text) => {
                                setOtp({ ...otp, 2: text });
                                text
                                    ? thirdInput.current.focus()
                                    : firstInput.current.focus();
                            }}
                        />
                    </View>
                    <View
                        style={{
                            borderRadius: 8,
                            backgroundColor: "#F3F7FF",
                        }}
                    >
                        <TextInput
                            style={{
                                textAlign: "center",
                                paddingHorizontal: 22,
                                paddingVertical: 14.5,
                                textAlign: "center",
                                fontSize: 24,
                                fontFamily: "Lato_400Regular",
                                color: COLORS.golden,
                                width: 59,
                            }}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={thirdInput}
                            onChangeText={(text) => {
                                setOtp({ ...otp, 3: text });
                                text
                                    ? fourthInput.current.focus()
                                    : secondInput.current.focus();
                            }}
                        />
                    </View>
                    <View
                        style={{
                            borderRadius: 8,
                            backgroundColor: "#F3F7FF",
                        }}
                    >
                        <TextInput
                            style={{
                                textAlign: "center",
                                paddingHorizontal: 22,
                                paddingVertical: 14.5,
                                textAlign: "center",
                                fontSize: 24,
                                fontFamily: "Lato_400Regular",
                                color: COLORS.golden,
                                width: 59,
                            }}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={fourthInput}
                            onChangeText={(text) => {
                                setOtp({ ...otp, 4: text });
                                text
                                    ? fiveInput.current.focus()
                                    : thirdInput.current.focus();
                            }}
                        />
                    </View>
                    <View
                        style={{
                            borderRadius: 8,
                            backgroundColor: "#F3F7FF",
                        }}
                    >
                        <TextInput
                            style={{
                                textAlign: "center",
                                paddingHorizontal: 22,
                                paddingVertical: 14.5,
                                textAlign: "center",
                                fontSize: 24,
                                fontFamily: "Lato_400Regular",
                                color: COLORS.golden,
                                width: 59,
                            }}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={fiveInput}
                            onChangeText={(text) => {
                                setOtp({ ...otp, 5: text });
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        marginBottom: 30,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.Lato_400Regular,
                            fontSize: 16,
                            color: COLORS.bodyTextColor,
                            lineHeight: 16 * 1.7,
                        }}
                    >
                        Didn’t receive the OTP?{" "}
                    </Text>
                    <TouchableOpacity>
                        <Text
                            style={{
                                ...FONTS.Lato_700Bold,
                                fontSize: 16,
                                color: COLORS.mainColor,
                            }}
                        >
                            Resend.
                        </Text>
                    </TouchableOpacity>
                </View>
                <Button
                    title="verify"
                    onPress={() => navigation.navigate("SignUpAccountCreated")}
                />
            </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
            {renderHeader()}
            {renderBackground()}
            {renderContent()}
        </SafeAreaView>
    );
}
