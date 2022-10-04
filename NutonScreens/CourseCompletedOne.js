import {
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React from "react";

import { Header, Button } from "../NutonComponents";
import { AndroidSafeArea} from "../NutonConstants";
import { MedalBronze, MedalGold, MedalLarge, MedalSilver, MedalTab } from "../svg";

import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

export default function CourseCompleted({ navigation }) {
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)
    function renderHeader() {
        return <Header leftIcon="back" onPress={() => navigation.goBack()} />;
    }

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
                    paddingBottom: 20,
                    paddingTop: SIZES.height * 0.02,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={{ uri: "https://via.placeholder.com/1125x1149" }}
                    style={{
                        width: "100%",
                        height: 383,
                        marginBottom: 27,
                    }}
                />
                <Text
                    style={{
                        ...FONTS.H2,
                        textAlign: "center",
                        lineHeight: FONTS.H2.fontSize * 1.4,
                        marginBottom: 10,
                        color: COLORS.mainColor,
                    }}
                >
                    Congratulations!
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.BodyText,
                        color: COLORS.bodyTextColor,
                        marginBottom: 24,
                        paddingHorizontal: 10,
                    }}
                >
                    You have successfully completed the course! We wish you new
                    victories, participation and success in all your endeavors!
                </Text>
                <Button
                    title="View All Medals"
                    containerStyle={{ marginBottom: 20 }}
                />
                {/* <TouchableOpacity>
                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.Spartan_500Medium,
                            fontSize: 14,
                            textTransform: "capitalize",
                            lineHeight: 14 * 1.7,
                        }}
                    >
                        Download certificate
                    </Text>
                </TouchableOpacity> */}
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
            {renderBackground()}
            {renderHeader()}
            {/* <MedalLarge color="red"/> */}
            {renderContent()}
        </SafeAreaView>
    );
}
