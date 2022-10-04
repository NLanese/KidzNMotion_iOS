import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

import RatingComponent from "./RatingComponent";
import { Heart, Clock } from "../svg";

import { useRecoilValue } from "recoil";
import { colorState, fontState } from '../Recoil/atoms';

export default function NewCourseComponent({ item, onPress }) {
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    return (
        <TouchableOpacity
            style={{
                width: 230,
                height: 300,
                backgroundColor: item.backgroundColor,
                marginRight: 16,
                borderRadius: 10,
                padding: 10,
            }}
            onPress={onPress}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image source={item.iconLight} style={{ width: 160, height: 160 }} />
            </View>

            <RatingComponent
                item={item}
                containerStyle={{
                    top: 2,
                    left: 2,
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: 10,
                }}
            />
            <TouchableOpacity
                style={{ position: "absolute", right: 11.29, top: 12.5 }}
            >
                <Heart fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
            </TouchableOpacity>
            <View
                style={{
                    height: 82,
                    width: "100%",
                }}
            >
                <Text
                    style={{
                        flex: 1,
                        ...FONTS.LatoMedium,
                        fontSize: 14,
                        textTransform: "capitalize",
                        color: COLORS.white,
                        lineHeight: 14 * 1.5,
                    }}
                    numberOfLines={2}
                >
                    {item.name}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    {<Clock strokeColor={"rgba(255, 255, 255, 0.6)"} />}
                    <Text
                        style={{
                            ...FONTS.Lato_400Regular,
                            fontSize: 14,
                            color: "rgba(255, 255, 255, 0.6)",
                            flex: 1,
                            marginLeft: 6,
                        }}
                    >
                        {item.duration}
                    </Text>
                    <Text
                        style={{
                            ...FONTS.Lato_700Bold,
                            fontSize: 16,
                            color: COLORS.white,
                            lineHeight: 16 * 1.5,
                        }}
                    >
                        ${item.price}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
