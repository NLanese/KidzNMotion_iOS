import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";


import { PlusSvg } from "../svg";

import { useRecoilValue } from "recoil";
import { colorState, sizeState } from '../Recoil/atoms';

export default function PayComponent({ leftContent, rightContent, onPress }) {
    const COLORS = useRecoilValue(colorState)
    const SIZES = useRecoilValue(sizeState)
    return (
        <Shadow
            viewStyle={{ width: "100%", marginBottom: 10 }}
            startColor={COLORS.shadowStartColor}
            finalColor={COLORS.shadowFinalColor}
            distance={COLORS.shadowDistance}
        >
            <TouchableOpacity
                style={{
                    width: "100%",
                    height: 60,
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    borderRadius: SIZES.borderRadius,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                }}
                onPress={onPress}
            >
                {leftContent && <Text>{leftContent}</Text>}
                {rightContent && <Text>${rightContent}</Text>}
                {!rightContent && <PlusSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}  />}
            </TouchableOpacity>
        </Shadow>
    );
}
