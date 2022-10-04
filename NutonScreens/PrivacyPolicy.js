import {
    SafeAreaView,
    Image,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";
import Accordion from "react-native-collapsible/Accordion";

import { Header } from "../NutonComponents";
import { AndroidSafeArea, FAQ, PP } from "../NutonConstants";

import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

export default function PrivacyPolicy() {
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)
    const navigation = useNavigation();

    function renderHeader() {
        return (
            <Header
                title="Privacy Policy"
                onPress={() => navigation.goBack()}
            />
        );
    }

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

    function renderContent() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingTop: 40,
                    paddingBottom: 20,
                }}
                showsVerticalScrollIndicator={false}
            >
                {PP.map((item, index) => {
                    return (
                        <View key={index}>
                            <Text
                                style={{
                                    ...FONTS.Lato_700Bold,
                                    fontSize: 16,
                                    lineHeight: 16 * 1.5,
                                    color: COLORS.mainColor,
                                    marginBottom: 10,
                                    textTransform: "capitalize",
                                }}
                            >
                                {item.title}
                            </Text>
                            <Text
                                style={{
                                    ...FONTS.Lato_400Regular,
                                    fontSize: 14,
                                    lineHeight: 14 * 1.7,
                                    marginBottom: 44,
                                    color: COLORS.bodyTextColor,
                                }}
                            >
                                {item.description}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, ...AndroidSafeArea.AndroidSafeArea }}>
            {renderBackground()}
            {renderHeader()}
            {renderContent()}
        </SafeAreaView>
    );
}
