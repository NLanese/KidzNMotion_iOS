import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { useRecoilValue } from "recoil";
import { colorState, fontState } from '../Recoil/atoms';

export default function Button({ title, containerStyle, onPress }) {
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    return (
        <TouchableOpacity
            style={{
                height: 60,
                backgroundColor: COLORS.buttonColorDark,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                ...containerStyle,
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: COLORS.buttonColorLight,
                    ...FONTS.Title,
                    letterSpacing: 1.0,
                    fontSize: 20,
                    textTransform: "capitalize",
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}
