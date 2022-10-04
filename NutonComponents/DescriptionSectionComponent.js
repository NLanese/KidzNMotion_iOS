import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { FONTS, COLORS, SIZES } from "../NutonConstants";
import Button from "./Button";
import { TopRatedCheck, Video, Download, Certificate } from "../svg";


import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

const topRated = [
    {
        id: "1",
        description: "Develop Immersive VR Experiences.",
    },
    {
        id: "2",
        description: "Create Distance Grab Mechanics.",
    },
    {
        id: "3",
        description:
        "Build Once, and deploy to both Steam VR, as well as Oculus, 6 DOF devices.",
    },
    {
        id: "4",
        description:
        "Build an entire VR Framework, from scratch, with Zero coding.",
    },
    {
        id: "5",
        description:
        "Create advanced Spatial UI, that you can interact with physically, using your hands, as well as using a pointer.",
    },
    {
        id: "6",
        description:
        "Learn to Outline Objects, using a Shader material, when an object is touched.",
    },
    {
        id: "7",
        description:
        "Create 2D UI, that you can interact with using a pointer.",
    },
    {
        id: "8",
        description:
        "Create Spatial Tooltips that can follow any object about.",
    },
];

export default function DescriptionSectionComponent({ item }) {
    const navigation = useNavigation();
    
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)
    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    flexGrow: 1,
                    paddingTop: 20,
                    paddingBottom: 100,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Text
                    style={{
                        ...FONTS.H5,
                        textTransform: "capitalize",
                        color: COLORS.mainColor,
                        marginBottom: 10,
                        lineHeight: 16 * 1.5,
                    }}
                >
                    About course
                </Text>
                <Text
                    style={{
                        ...FONTS.BodyText,
                        color: COLORS.bodyTextColor,
                        marginBottom: 30,
                    }}
                >
                    Welcome to Udemy's first, No Coding Required, VR development
                    course, using VRTK 4. Build once and deploy to both Oculus
                    and Steam VR devices. {"\n"} {"\n"}This course, teaches you
                    everything you need to know to build your very own VR apps
                    and games using the world class Unity Engine.
                </Text>
                <Text
                    style={{
                        ...FONTS.H5,
                        textTransform: "capitalize",
                        color: COLORS.mainColor,
                        marginBottom: 10,
                        lineHeight: 16 * 1.5,
                    }}
                >
                    Top rated
                </Text>
                <View style={{ marginBottom: 30 }}>
                    {topRated.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                }}
                            >
                                <View style={{ bottom: -7 }}>
                                    <TopRatedCheck fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                                </View>
                                <Text
                                    style={{
                                        ...FONTS.BodyText,
                                        marginLeft: 10,
                                        color: COLORS.bodyTextColor,
                                    }}
                                >
                                    {item.description}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                <Text
                    style={{
                        ...FONTS.H5,
                        textTransform: "capitalize",
                        color: COLORS.mainColor,
                        marginBottom: 10,
                        lineHeight: 16 * 1.5,
                    }}
                >
                    This course includes
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 6,
                    }}
                >
                    <Video fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                    <Text
                        style={{
                            marginLeft: 10,
                            ...FONTS.BodyText,
                            color: COLORS.bodyTextColor,
                        }}
                    >
                        14 hours on-demand video
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 6,
                    }}
                >
                    <Download fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                    <Text
                        style={{
                            marginLeft: 10,
                            ...FONTS.BodyText,
                            color: COLORS.bodyTextColor,
                        }}
                    >
                        16 downloadable resources
                    </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Certificate fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                    <Text
                        style={{
                            marginLeft: 10,
                            ...FONTS.BodyText,
                            color: COLORS.bodyTextColor,
                        }}
                    >
                        Certificate of completion
                    </Text>
                </View>
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
