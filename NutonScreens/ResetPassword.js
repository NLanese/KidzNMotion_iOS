import { Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button } from "../NutonComponents";
import { AREA } from "../NutonConstants";
import { EyeOff } from "../svg";
import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

export default function ResetPassword() {
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)
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
                title="Reset password"
                onPress={() => navigation.goBack()}
            />
        );
    }

    function renderContent() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    paddingTop: 34,
                    paddingHorizontal: 20,
                    flexGrow: 1,
                }}
            >
                <Text
                    style={{
                        marginBottom: 20,
                        ...FONTS.BodyText,
                        color: COLORS.lightBlack,
                    }}
                >
                    Enter new password and confirm.
                </Text>
                <InputField
                    title="New Password"
                    placeholder="••••••••"
                    containerStyle={{ marginBottom: 10 }}
                    icon={
                        <TouchableOpacity>
                            <EyeOff fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                        </TouchableOpacity>
                    }
                />
                <InputField
                    title="Confirm Password"
                    placeholder="••••••••"
                    containerStyle={{ marginBottom: 20 }}
                    icon={
                        <TouchableOpacity>
                            <EyeOff fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                        </TouchableOpacity>
                    }
                />
                <Button
                    title="change password"
                    onPress={() =>
                        navigation.navigate("YourPasswordHasBeenReset")
                    }
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
