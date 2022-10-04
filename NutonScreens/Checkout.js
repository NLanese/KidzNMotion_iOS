import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";

import { Header, InputField, Button } from "../NutonComponents";
import { AndroidSafeArea} from "../NutonConstants";
import { CheckoutArrowSvg, ApplyACouponSvg } from "../svg";

import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

export default function Checkout() {
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)
    const navigation = useNavigation();

    const route = useRoute();
    const { item } = route.params;

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
        return <Header title="Checkout" onPress={() => navigation.goBack()} />;
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
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <View style={{ flexDirection: "row", marginBottom: 30 }}>
                        <Image
                            source={item.preview_240x240}
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: SIZES.borderRadius,
                                marginRight: 12,
                            }}
                        />
                        <View
                            style={{
                                paddingVertical: 6,
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                numberOfLines={2}
                                style={{
                                    ...FONTS.Lato_700Bold,
                                    fontSize: 14,
                                    lineHeight: 14 * 1.5,
                                    color: COLORS.mainColor,
                                }}
                            >
                                {item.name}
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.Lato_400Regular,
                                        fontSize: 12,
                                        textDecorationLine: "line-through",
                                        marginRight: 6,
                                        color: COLORS.secondaryTextColor,
                                    }}
                                >
                                    ${item.oldPrice}
                                </Text>
                                <Text
                                    style={{
                                        ...FONTS.Lato_400Regular,
                                        fontSize: 16,
                                        color: COLORS.mainColor,
                                    }}
                                >
                                    ${item.price}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Shadow
                        viewStyle={{ width: "100%", marginBottom: 20 }}
                        startColor={COLORS.shadowStartColor}
                        finalColor={COLORS.shadowFinalColor}
                        distance={COLORS.shadowDistance}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                height: 64,
                                width: "100%",
                                paddingHorizontal: 20,
                                justifyContent: "space-between",
                                borderRadius: SIZES.borderRadius,
                            }}
                            onPress={() =>
                                navigation.navigate("ChoosePaymentMethod")
                            }
                        >
                            <Text
                                style={{
                                    ...FONTS.BodyText,
                                    color: COLORS.bodyTextColor,
                                }}
                            >
                                Payment method
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.Lato_400Regular,
                                        fontSize: 14,
                                        color: COLORS.bodyTextColor,
                                        marginRight: 6,
                                    }}
                                >
                                    Payment method
                                </Text>
                                <CheckoutArrowSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                            </View>
                        </TouchableOpacity>
                    </Shadow>
                    <TouchableOpacity style={{ marginBottom: 50 }}>
                        <ApplyACouponSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                    </TouchableOpacity>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 7,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Lato_400Regular,
                                color: COLORS.mainColor,
                                lineHeight: 14 * 1.7,
                                fontSize: 14,
                            }}
                        >
                            Subtotal
                        </Text>
                        <Text
                            style={{
                                ...FONTS.H6,
                                color: COLORS.secondaryTextColor,
                                lineHeight: FONTS.H6.fontSize * 1.5,
                            }}
                        >
                            $120
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 17,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Lato_400Regular,
                                color: COLORS.mainColor,
                                lineHeight: 14 * 1.7,
                                fontSize: 14,
                            }}
                        >
                            Discount
                        </Text>
                        <Text
                            style={{
                                ...FONTS.H6,
                                color: COLORS.secondaryTextColor,
                                lineHeight: FONTS.H6.fontSize * 1.5,
                            }}
                        >
                            -$20
                        </Text>
                    </View>
                    <View
                        style={{
                            width: "100%",
                            height: 1,
                            backgroundColor: "#D8CBE3",
                        }}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 20,
                            marginTop: 10,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.H4,
                                color: COLORS.mainColor,
                                lineHeight: FONTS.H4.fontSize * 1.5,
                            }}
                        >
                            Total
                        </Text>
                        <Text
                            style={{
                                ...FONTS.H4,
                                color: COLORS.mainColor,
                                lineHeight: FONTS.H4.fontSize * 1.5,
                            }}
                        >
                            $100
                        </Text>
                    </View>
                    <Button
                        title="Pay Now"
                        onPress={() => navigation.navigate("PaymentSuccess")}
                    />
                </View>
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
