import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TextInput,
} from "react-native";
import React from "react";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Shadow } from "react-native-shadow-2";

import { Header, Button } from "../NutonComponents";
import { AndroidSafeArea } from "../NutonConstants";
import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

export default function LeaveAReview({ navigation }) {
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)
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
                title="Leave a Review"
                onPress={() => navigation.goBack()}
            />
        );
    }

    function renderContent() {
        return (
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    flexGrow: 1,
                    paddingBottom: 25,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={{ uri: "https://via.placeholder.com/903x642" }}
                    style={{
                        width: 301,
                        height: 214,
                        alignSelf: "center",
                        marginTop: 22,
                        marginBottom: 37,
                    }}
                />
                <Text
                    style={{
                        ...FONTS.H2,
                        textAlign: "center",
                        lineHeight: FONTS.H1.fontSize * 1.4,
                        color: COLORS.mainColor,
                        marginBottom: 20,
                        textTransform: "capitalize",
                    }}
                >
                    Please rate the course!
                </Text>
                <View style={{ marginBottom: 25 }}>
                    <AirbnbRating
                        type="star"
                        count={5}
                        defaultRating={5}
                        imageSize={33}
                        readonly={true}
                        startingValue={3}
                        style={{
                            alignItems: "flex-start",
                        }}
                        starContainerStyle={{
                            paddingHorizontal: 10,
                        }}
                        size={33}
                        ratingCount={10}
                        showRating={false}
                    />
                </View>
                <Text
                    style={{
                        ...FONTS.BodyText,
                        textAlign: "center",
                        color: COLORS.bodyTextColor,
                        lineHeight: FONTS.BodyText.fontSize * 1.7,
                        marginBottom: 25,
                    }}
                >
                    Your comments and suggestions help us {"\n"} imprave the
                    service quality better!
                </Text>
                <Shadow
                    viewStyle={{ width: "100%", marginBottom: 25 }}
                    startColor={COLORS.shadowStartColor}
                    finalColor={COLORS.shadowFinalColor}
                    distance={COLORS.shadowDistance}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 100,
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                        }}
                    >
                        <TextInput
                            placeholder="Enter your comment"
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 8,
                                textAlignVertical: "top",
                            }}
                            multiline={true}
                        />
                    </View>
                </Shadow>

                <Button title="Submit" />
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
