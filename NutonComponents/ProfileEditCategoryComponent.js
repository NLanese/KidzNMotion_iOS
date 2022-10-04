import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";

import { useRecoilValue } from "recoil";
import { colorState, fontState } from '../Recoil/atoms';
import { Shadow } from "react-native-shadow-2";

export default function ProfileEditCategoryComponent({ title, placeholder, onChangeText }) {
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    return (
        <Shadow
            offset={[0, 0]}
            distance={7}
            startColor={"rgba(6, 38, 100, 0.04)"}
            finalColor={"rgba(6, 38, 100, 0.0)"}
            viewStyle={{ width: "100%", marginBottom: 10 }}
        >
            <TouchableOpacity
                style={{
                    // width: "100%",
                    width: 350,
                    marginBottom: 15,
                    height: 60,
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    borderRadius: 10,
                    paddingHorizontal: 21,
                    borderWidth: 1,
                    borderColor: COLORS.buttonBorder,
                    justifyContent: "center",
                    paddingTop: 8,
                    paddingBottom: 7,
                }}
            >
                <Text
                    style={{
                        ...FONTS.Spartan_400Regular,
                        fontSize: 12,
                        color: COLORS.secondaryTextColor,
                    }}
                >
                    {title}
                </Text>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.bodyTextColor}
                    onChangeText={onChangeText}
                />
            </TouchableOpacity>
        </Shadow>
    );
}
