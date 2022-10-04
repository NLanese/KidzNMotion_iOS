import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";



import { useRecoilValue } from "recoil";
import { colorState, fontState } from '../Recoil/atoms';

import {
    InstructorStar,
    InstructorChat,
    InstructorUser,
    InstructorPlay,
    ShowMore,
} from "../svg";

export default function InstructorSectionComponent({ item }) {
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
            showsVerticalScrollIndicator={false}
        >
            <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
                <Text
                    style={{
                        ...FONTS.H5,
                        marginBottom: 2,
                        lineHeight: 16 * 1.5,
                        textTransform: "capitalize",
                    }}
                >
                    {item.instructor}
                </Text>
                <Text
                    style={{
                        ...FONTS.Lato_400Regular,
                        fontSize: 10,
                        color: COLORS.secondaryTextColor,
                        lineHeight: 10 * 1.7,
                        marginBottom: 10,
                    }}
                >
                    {item.position}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                        source={item.instructorPhoto}
                        style={{
                            width: 91,
                            height: 91,
                            borderRadius: 5,
                            marginRight: 10,
                        }}
                    />
                    <View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 6,
                            }}
                        >
                            <InstructorStar />
                            <Text
                                style={{
                                    marginLeft: 10,
                                    ...FONTS.Lato_400Regular,
                                    fontSize: 10,
                                    color: COLORS.bodyTextColor,
                                    lineHeight: 10 * 1.7,
                                }}
                            >
                                {item.instructorRating} Instructor Rating
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 6,
                            }}
                        >
                            <InstructorChat fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                            <Text
                                style={{
                                    marginLeft: 10,
                                    ...FONTS.Lato_400Regular,
                                    fontSize: 10,
                                    color: COLORS.bodyTextColor,
                                    lineHeight: 10 * 1.7,
                                }}
                            >
                                {item.instructorReviews} Reviews
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 6,
                            }}
                        >
                            <InstructorUser fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                            <Text
                                style={{
                                    marginLeft: 10,
                                    ...FONTS.Lato_400Regular,
                                    fontSize: 10,
                                    color: COLORS.bodyTextColor,
                                    lineHeight: 10 * 1.7,
                                }}
                            >
                                {item.instructorStudents} Students
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <InstructorPlay fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                            <Text
                                style={{
                                    marginLeft: 10,
                                    ...FONTS.Lato_400Regular,
                                    fontSize: 10,
                                    color: COLORS.bodyTextColor,
                                    lineHeight: 10 * 1.7,
                                }}
                            >
                                {item.instructorCourses} Courses
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
                <Text
                    style={{
                        ...FONTS.H5,
                        marginBottom: 2,
                        lineHeight: 16 * 1.5,
                        textTransform: "capitalize",
                    }}
                >
                    About teacher
                </Text>
                <Text
                    style={{
                        ...FONTS.BodyText,
                        color: COLORS.bodyTextColor,
                        marginBottom: 10,
                    }}
                >
                    {item.aboutTeacher}
                </Text>
                <TouchableOpacity>
                    <ShowMore fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
                <Text
                    style={{
                        ...FONTS.H5,
                        marginBottom: 2,
                        lineHeight: 16 * 1.5,
                        textTransform: "capitalize",
                    }}
                >
                    Student feedback
                </Text>
            </View>
        </ScrollView>
    );
}
