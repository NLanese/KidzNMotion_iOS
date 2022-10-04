import { View, Text } from "react-native";
import React from "react";

import { useRecoilValue } from "recoil";
import { colorState, fontState } from '../Recoil/atoms';
import { Star } from "../svg";

export default function ratingComponent({ item, containerStyle }) {
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    return (
        <View
            style={{
                backgroundColor: COLORS.white,
                position: "absolute",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 7,
                paddingVertical: 1,
                ...containerStyle,
            }}
        >
            <Star fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}  />
            <Text
                style={{
                    ...FONTS.Lato_700Bold,
                    fontSize: 10,
                    lineHeight: 10 * 1.7,
                    marginLeft: 3,
                }}
            >
                {item?.rating}
            </Text>
        </View>
    );
}
