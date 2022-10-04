import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";
import * as Progress from "react-native-progress";

import { useRecoilValue } from "recoil";
import { colorState, fontState } from '../Recoil/atoms';
import { Star, PlayImage } from "../svg";

export default function MyCoursesComponent({ item, ongoingCourse = false }) {
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    return (
        <View style={{ width: "48%", height: 194, marginBottom: 15 }}>
            <Shadow
                offset={[0, 0]}
                distance={5}
                startColor={"rgba(6, 38, 100, 0.03)"}
                finalColor={"rgba(6, 38, 100, 0.0)"}
                viewStyle={{ width: "100%" }}
            >
                <TouchableOpacity
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#F1F7FF",
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: COLORS.buttonBorder,
                    }}
                >
                    <TouchableOpacity>
                        <ImageBackground
                            style={{
                                width: "100%",
                                height: 96,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            source={item.preview_480x288}
                            imageStyle={{
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                            }}
                        >
                            <PlayImage fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                        </ImageBackground>
                    </TouchableOpacity>

                    <View
                        style={{
                            paddingHorizontal: 14,
                            paddingTop: 11,
                            paddingBottom: 12,
                            justifyContent: "space-between",
                            flexDirection: "column",
                            flex: 1,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Lato_400Regular,
                                fontSize: 14,
                                lineHeight: 14 * 1.5,
                            }}
                            numberOfLines={2}
                        >
                            {item.name}
                        </Text>
                        {ongoingCourse === true ? (
                            <View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...FONTS.Lato_400Regular,
                                            fontSize: 12,
                                            color: COLORS.secondaryTextColor,
                                            lineHeight: 12 * 1.7,
                                        }}
                                    >
                                        56%
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Star fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                                        <Text
                                            style={{
                                                ...FONTS.Lato_700Bold,
                                                fontSize: 10,
                                                marginLeft: 3,
                                                color: COLORS.mainColor,
                                            }}
                                        >
                                            {item.rating}
                                        </Text>
                                    </View>
                                </View>
                                <Progress.Bar
                                    progress={0.56}
                                    width={null}
                                    height={3}
                                    borderRadius={3}
                                    color={"#55ACEE"}
                                    backgroundColor={"#C3D9FD"}
                                    borderWidth={0}
                                />
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={{
                                    width: "100%",
                                    height: 27,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: COLORS.buttonBorder,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.Lato_400Regular,
                                        fontSize: 10,
                                        textTransform: "capitalize",
                                    }}
                                >
                                    View certificate
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </TouchableOpacity>
            </Shadow>
        </View>
    );
}
