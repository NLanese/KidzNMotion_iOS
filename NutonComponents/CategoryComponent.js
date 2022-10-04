import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { ViewAll } from "../svg";

import { useRecoilValue } from "recoil";
import { colorState, fontState } from '../Recoil/atoms';

export default function CategoryComponent({
    title,
    BtnViewAll = true,
    onPress,
}) {
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginBottom: 10,
            }}
        >
            <Text
                style={{
                    ...FONTS.Spartan_600SemiBold,
                    fontSize: 16,
                    textTransform: "capitalize",
                    lineHeight: 16 * 1.5,
                    color: COLORS.black,
                }}
            >
                {title}
            </Text>
            {BtnViewAll == true && (
                <TouchableOpacity onPress={onPress}>
                    <ViewAll fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                </TouchableOpacity>
            )}
        </View>
    );
}
