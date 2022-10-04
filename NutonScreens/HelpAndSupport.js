import {
    SafeAreaView,
    Image,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";
import Accordion from "react-native-collapsible/Accordion";

import { Header, MenuComponent } from "../NutonComponents";
import { AndroidSafeArea, FAQ} from "../NutonConstants";
import { QuestionClose, QuestionOpen, GettingStartedSvg } from "../svg";

import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

const menu = [
    {
        id: "1",
        icon: <GettingStartedSvg />,
        title: "Getting started",
        background: require("../assets/images/background/background-04.png"),
    },
    {
        id: "2",
        icon: <GettingStartedSvg />,
        title: "profile",
        background: require("../assets/images/background/background-04.png"),
    },
    {
        id: "3",
        icon: <GettingStartedSvg />,
        title: "Purchase",
        background: require("../assets/images/background/background-04.png"),
    },
    {
        id: "4",
        icon: <GettingStartedSvg />,
        title: "Course Taking",
        background: require("../assets/images/background/background-04.png"),
    },
];

export default function HelpAndSupport() {
    const navigation = useNavigation();
    const [activeSections, setActiveSections] = useState([]);
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)
    
    const setSections = (sections) => {
        setActiveSections(sections.includes(undefined) ? [] : sections);
    };

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

    const renderHeader = (section, _, isActive) => {
        return (
            <View
                duration={400}
                style={{
                    paddingVertical: 17,
                    marginHorizontal: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        ...FONTS.H6,
                        color: COLORS.mainColor,
                        lineHeight: 14 * 1.5,
                        textTransform: "capitalize",
                    }}
                >
                    {section.question}
                </Text>
                {isActive ? <QuestionOpen fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}  /> : <QuestionClose fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />}
            </View>
        );
    };

    const renderContent = (section, _, isActive) => {
        return (
            <View
                style={{
                    marginHorizontal: 20,
                    paddingBottom: 20,
                }}
                transition="backgroundColor"
            >
                <Text
                    style={{
                        color: COLORS.bodyTextColor,
                        ...FONTS.Lato_400Regular,
                        fontSize: 14,
                        lineHeight: 15 * 1.5,
                    }}
                >
                    {section.answer}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
            {renderBackground()}
            <Header
                title="Help & Support"
                onPress={() => navigation.goBack()}
            />
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingTop: 10,
                    paddingBottom: 25,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Shadow
                    offset={[0, 0]}
                    distance={COLORS.shadowDistance}
                    startColor={COLORS.shadowStartColor}
                    finalColor={COLORS.shadowFinalColor}
                    viewStyle={{ width: "100%" }}
                >
                    <Accordion
                        activeSections={activeSections}
                        sections={FAQ}
                        touchableComponent={TouchableOpacity}
                        renderHeader={renderHeader}
                        renderContent={renderContent}
                        duration={400}
                        onChange={setSections}
                        underlayColor={COLORS.black}
                        sectionContainerStyle={{
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            marginBottom: 6,
                        }}
                    />
                </Shadow>
                <MenuComponent />
            </ScrollView>
        </SafeAreaView>
    );
}
