import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";

import { AndroidSafeArea } from "../NutonConstants";
import { Header, Button } from "../NutonComponents";
import { UnCheckSvg, CheckSvg } from "../svg";

import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

const cards = [
    {
        id: "1",
        number: "4141 •••• •••• 3827",
    },
    {
        id: "2",
        number: "7741 •••• •••• 6644",
    },
];

export default function ChoosePaymentMethod() {
    const navigation = useNavigation();
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)
    
    const [selectedCard, setSelectedCard] = useState(cards[0].id);
    const [applePay, setApplePay] = useState(false);
    const [payPal, setPayPal] = useState(false);

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
                title="Choose payment method"
                onPress={() => navigation.goBack()}
            />
        );
    }

    function renderContent() {
        return (
            <ScrollView
                style={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    paddingBottom: 25,
                }}
            >
                <Shadow
                    viewStyle={{ width: "100%", marginBottom: 10 }}
                    startColor={COLORS.shadowStartColor}
                    finalColor={COLORS.shadowFinalColor}
                    distance={COLORS.shadowDistance}
                >
                    <View
                        style={{
                            width: "100%",
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            borderRadius: SIZES.borderRadius,
                            borderWidth: 1,
                            borderColor: COLORS.buttonBorder,
                            paddingVertical: 20,
                            paddingHorizontal: 20,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.BodyText,
                                color: COLORS.bodyTextColor,
                                marginBottom: 8,
                            }}
                        >
                            Cards
                        </Text>
                        {cards.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginBottom: 10,
                                    }}
                                    onPress={() => setSelectedCard(item.id)}
                                >
                                    <Text
                                        style={{
                                            ...FONTS.Lato_400Regular,
                                            fontSize: 14,
                                            color: COLORS.bodyTextColor,
                                            lineHeight: 14 * 1.7,
                                        }}
                                    >
                                        {item.number}
                                    </Text>
                                    {selectedCard === item.id ? (
                                        <CheckSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                                    ) : (
                                        <UnCheckSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}  />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </Shadow>

                <Shadow
                    viewStyle={{ width: "100%", marginBottom: 10 }}
                    startColor={COLORS.shadowStartColor}
                    finalColor={COLORS.shadowFinalColor}
                    distance={COLORS.shadowDistance}
                >
                    <TouchableOpacity
                        style={{
                            width: "100%",
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            borderRadius: SIZES.borderRadius,
                            borderWidth: 1,
                            borderColor: COLORS.buttonBorder,
                            paddingVertical: 20,
                            paddingHorizontal: 20,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                        onPress={() => setApplePay(!applePay)}
                    >
                        <Text
                            style={{
                                ...FONTS.BodyText,
                                color: COLORS.bodyTextColor,
                            }}
                        >
                            Apple Pay
                        </Text>
                        {applePay ? <CheckSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} /> : <UnCheckSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />}
                    </TouchableOpacity>
                </Shadow>

                <Shadow
                    viewStyle={{ width: "100%", marginBottom: 50 }}
                    startColor={COLORS.shadowStartColor}
                    finalColor={COLORS.shadowFinalColor}
                    distance={COLORS.shadowDistance}
                >
                    <TouchableOpacity
                        style={{
                            width: "100%",
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            borderRadius: SIZES.borderRadius,
                            borderWidth: 1,
                            borderColor: COLORS.buttonBorder,
                            paddingVertical: 20,
                            paddingHorizontal: 20,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                        onPress={() => setPayPal(!payPal)}
                    >
                        <Text
                            style={{
                                ...FONTS.BodyText,
                                color: COLORS.bodyTextColor,
                            }}
                        >
                            Pay Pal
                        </Text>
                        {payPal ? <CheckSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} /> : <UnCheckSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />}
                    </TouchableOpacity>
                </Shadow>

                <Button title="Save" onPress={() => navigation.goBack()} />
            </ScrollView>
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
