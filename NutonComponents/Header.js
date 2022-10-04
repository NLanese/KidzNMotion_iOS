import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { Arrow, FilterSvg, ProfileSvg } from "../svg";


import { useRecoilValue } from "recoil";
import { colorState, fontState, avatarState } from '../Recoil/atoms';
import { PersonasAvatar } from "../src/Pages/Settings/AvatarSettings";

export default function Header({
    title,
    onPress,
    titleStyle,
    goBack = true,
    clear,
    clearOnPress,
    filter,
    filterOnPress,
    profile,
    thisFontSize
}) {
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const AVATAR = useRecoilValue(avatarState)
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 42,
            }}
        >
            {goBack && (
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        left: 0,
                        paddingHorizontal: 20,
                    }}
                    onPress={onPress}
                >
                    <Arrow fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                </TouchableOpacity>
            )}
            {title && (
                <Text
                    style={{
                        fontSize: ((thisFontSize) ? thisFontSize : 24),
                        ...FONTS.Title,
                        color: COLORS.headerTitle,
                        ...titleStyle,
                    }}
                >
                    {title}
                </Text>
            )}
            {clear && (
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        right: 0,
                        paddingHorizontal: 20,
                    }}
                    onPress={clearOnPress}
                >
                    <Text
                        style={{
                            ...FONTS.Lato_700Bold,
                            fontSize: 14,
                            lineHeight: 14 * 1.7,
                        }}
                    >
                        Clear
                    </Text>
                </TouchableOpacity>
            )}
            {filter && (
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        right: 0,
                        paddingHorizontal: 20,
                    }}
                    onPress={filterOnPress}
                >
                    <FilterSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                </TouchableOpacity>
            )}
            {profile && (
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        right: 0,
                        paddingHorizontal: 20,
                        
                    }}
                    onPress={filterOnPress}
                >
                    <View 
                        style={{
                            borderRadius: 50,
                            overflow: "hidden"
                        }}>
                        {/* <ProfileSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} /> */}
                        <PersonasAvatar 
                            style={{
                                    width: 50,
                                    height: 50,
                                    alignSelf: "center",
                                    // marginTop: 20,
                                    // marginBottom: 20,
                                }}
                            characterSettings={{...AVATAR}}
                            // imageStyle={{ borderRadius: 60 }}
                        />

                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}


