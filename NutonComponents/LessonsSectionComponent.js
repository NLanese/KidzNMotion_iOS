import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Accordion from "react-native-collapsible/Accordion";
import * as Progress from "react-native-progress";
import { Shadow } from "react-native-shadow-2";
import { useNavigation } from "@react-navigation/native";

import { Point, PlayBtn, Unlock, Lock } from "../svg";
import Button from "../NutonComponents/Button";


import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

export default function LessonsSectionComponent({ item }) {
    const navigation = useNavigation();
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)
    const [activeSections, setActiveSections] = useState([]);
    const setSections = (sections) => {
        setActiveSections(sections.includes(undefined) ? [] : sections);
    };

    const renderHeader = (section, _, isActive) => {
        return (
            <Shadow
                offset={[0, 0]}
                distance={COLORS.shadowDistance}
                startColor={COLORS.shadowStartColor}
                finalColor={COLORS.shadowFinalColor}
                viewStyle={{ width: "100%" }}
            >
                <View
                    duration={400}
                    style={{
                        height: 50,
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: COLORS.buttonBorder,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 10,
                    }}
                >
                    <Progress.Circle
                        size={30}
                        animated={false}
                        indeterminate={false}
                        progress={section.progress}
                        color="#8774FE"
                        endAngle={5}
                        thickness={2}
                        showsText={true}
                        textStyle={{ fontSize: 8, color: "#8774FE" }}
                        unfilledColor={"#B6AAFF"}
                        borderWidth={0}
                    />
                    <Text
                        style={{
                            ...FONTS.H5,
                            marginLeft: 10,
                            color: COLORS.mainColor,
                            flex: 1,
                        }}
                    >
                        {section.title}
                    </Text>
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Text
                            style={{
                                ...FONTS.Lato_400Regular,
                                fontSize: 10,
                                color: COLORS.secondaryTextColor,
                            }}
                        >
                            {section.lectures} lectures
                        </Text>
                        <View style={{ marginHorizontal: 4 }}>
                            <Point fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                        </View>
                        <Text
                            style={{
                                ...FONTS.Lato_400Regular,
                                fontSize: 10,
                                color: COLORS.secondaryTextColor,
                            }}
                        >
                            {section.duration}
                        </Text>
                    </View>
                </View>
            </Shadow>
        );
    };

    const renderContent = (section, _, isActive) => {
        return (
            <View
                transition="backgroundColor"
                style={{ paddingTop: 10, paddingLeft: 17, paddingRight: 10 }}
            >
                {section.tutorials.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={{ flexDirection: "row", marginBottom: 6 }}
                        >
                            <View style={{ bottom: -4.5 }}>
                                <PlayBtn fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}  />
                            </View>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text
                                    style={{
                                        ...FONTS.Lato_400Regular,
                                        fontSize: 14,
                                        color: COLORS.bodyTextColor,
                                        lineHeight: 14 * 1.7,
                                    }}
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    style={{
                                        ...FONTS.Lato_400Regular,
                                        fontSize: 10,
                                        color: COLORS.secondaryTextColor,
                                        lineHeight: 10 * 1.7,
                                    }}
                                >
                                    {item.duration}
                                </Text>
                            </View>
                            <View style={{ bottom: -4.5 }}>
                                {item.isUnlocked ? <Unlock fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}  /> : <Lock fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const lessons = item.lessons;

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    paddingBottom: 80,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Accordion
                    activeSections={activeSections}
                    sections={lessons}
                    touchableComponent={TouchableOpacity}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    duration={400}
                    onChange={setSections}
                    sectionContainerStyle={{
                        backgroundColor: "transparent",
                        marginBottom: 10,
                    }}
                />
            </ScrollView>
            <Button
                title="Buy course"
                containerStyle={{
                    position: "absolute",
                    bottom: 0,
                    marginHorizontal: 20,
                    marginBottom: 20,
                    width: SIZES.width - 40,
                }}
                onPress={() => navigation.navigate("Checkout", { item: item })}
            />
        </View>
    );
}
