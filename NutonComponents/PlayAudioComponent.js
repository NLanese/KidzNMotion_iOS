import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";

import { Play, Heart, Star } from "../svg";
import RatingComponent from "../NutonComponents/RatingComponent";

import { useRecoilValue } from "recoil";
import { colorState, fontState } from '../Recoil/atoms';

export default function PlayAudioComponent({ item, onPress }) {
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    return (
        <TouchableOpacity
            style={{ marginRight: 16, width: 230 }}
            onPress={onPress}
        >
            <ImageBackground
                style={{ width: "100%", height: 120 }}
                source={item.image}
                imageStyle={{ borderRadius: 10 }}
            >
                <RatingComponent
                    item={item}
                    containerStyle={{
                        borderBottomLeftRadius: 10,
                        borderTopRightRadius: 10,
                        bottom: 2,
                        left: 2,
                    }}
                />
                <View style={{ position: "absolute", right: 11.29, top: 12.5 }}>
                    <Heart
                        fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} 
                    />
                </View>
            </ImageBackground>
            <TouchableOpacity
                style={{
                    padding: 10,
                    paddingLeft: 0,
                    flexDirection: "row",
                    flex: 1,
                }}
            >
                <Play fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                <View style={{ marginLeft: 8, flex: 1 }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            ...FONTS.H6,
                            textTransform: "capitalize",
                            color: COLORS.black,
                            lineHeight: 14 * 1.5,
                        }}
                    >
                        {item.name}
                    </Text>
                    <Text
                        style={{
                            ...FONTS.Lato_400Regular,
                            fontSize: 14,
                            lineHeight: 14 * 1.7,
                            color: COLORS.lightGray,
                        }}
                    >
                        {item.location}
                    </Text>
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}
