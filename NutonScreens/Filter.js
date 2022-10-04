import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";

import { Header, Button } from "../NutonComponents";
import { AndroidSafeArea} from "../NutonConstants";
import { SelectSvg } from "../svg";

import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

const price = [
    {
        id: "1",
        type: "Paid (142)",
    },
    {
        id: "2",
        type: "Free (18)",
    },
];

const level = [
    {
        id: "1",
        type: "All Levels (1,167)",
    },
    {
        id: "2",
        type: "Beginner (956)",
    },
    {
        id: "3",
        type: "Intermediate (187)",
    },
    {
        id: "4",
        type: "Expert (20)",
    },
];

const features = [
    {
        id: "1",
        type: "Subtitles (1,460)",
    },
    {
        id: "2",
        type: "Practice Tests (72)",
    },
];

const ratings = [
    {
        id: "1",
        type: "4.5 & up (698)",
    },
    {
        id: "2",
        type: "4.0 & up (1,537)",
    },
    {
        id: "3",
        type: "3.5 & up (1,906)",
    },
    {
        id: "4",
        type: "3.0 & up (2,012)",
    },
];

const videoDuration = [
    {
        id: "1",
        type: "0-1 Hour (428)",
    },
    {
        id: "2",
        type: "1-3 Hours (1,046)",
    },
    {
        id: "3",
        type: "3-6 Hours (512)",
    },
    {
        id: "4",
        type: "6-17 Hours (260)",
    },
    {
        id: "5",
        type: "17+ Hours (82)",
    },
];

export default function Filter() {
    const navigation = useNavigation();
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)
    
    const [selectedPrice, setSelectedPrice] = useState(price[0].id);
    const [selectedLevel, setSelectedLevel] = useState(level[0].id);
    const [selectedFeatures, setSelectedFeatures] = useState(features[0].id);
    const [selectedRatings, setSelectedRatings] = useState(ratings[0].id);
    const [selectedVideoDuration, setSelectedVideoDuration] = useState(
        videoDuration[0].id
    );

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: "Most Popular", value: "apple" },
        { label: "Category 2", value: "Category 2" },
        { label: "Category 3", value: "Category 3" },
        { label: "Category 4", value: "Category 4" },
    ]);

    function renderBackground() {
        return (
            <Image
                source={require("../assets/images/background/background-01.png")}
                style={{
                    position: "absolute",
                    width: SIZES.width,
                    height: SIZES.height,
                    resizeMode: "stretch",
                }}
            />
        );
    }

    function renderHeader() {
        return (
            <Header
                title="Filter"
                onPress={() => navigation.goBack()}
                clear={true}
            />
        );
    }

    function renderSortBy() {
        return (
            <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                <Text
                    style={{
                        ...FONTS.H3,
                        textTransform: "capitalize",
                        lineHeight: FONTS.H3.fontSize * 1.7,
                        marginBottom: 10,
                    }}
                >
                    Sort by
                </Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        borderColor: COLORS.buttonBorder,
                        paddingHorizontal: 20,
                    }}
                    textStyle={{
                        ...FONTS.H6,
                        color: COLORS.mainColor,
                        textTransform: "capitalize",
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: COLORS.buttonColorLight,
                        borderColor: COLORS.buttonBorder,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                    }}
                />
            </View>
        );
    }

    function renderContent() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    paddingBottom: 25,
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ marginBottom: 30 }}>
                    <Text
                        style={{
                            ...FONTS.H3,
                            lineHeight: FONTS.H3.fontSize * 1.7,
                            marginBottom: 10,
                            color: COLORS.mainColor,
                        }}
                    >
                        Price
                    </Text>
                    {price.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 10,
                                }}
                                onPress={() => setSelectedPrice(item.id)}
                            >
                                <View
                                    style={{
                                        width: 16,
                                        height: 16,
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        borderColor:
                                            selectedPrice === item.id
                                                ? COLORS.black
                                                : COLORS.secondaryTextColor,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: 10,
                                    }}
                                >
                                    {selectedPrice === item.id && (
                                        <View style={{ top: -2, right: -1 }}>
                                            <SelectSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                                        </View>
                                    )}
                                </View>
                                <Text
                                    style={{
                                        ...FONTS.Lato_400Regular,
                                        fontSize: 14,
                                        color: COLORS.bodyTextColor,
                                        lineHeight: 14 * 1.7,
                                    }}
                                >
                                    {item.type}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View style={{ marginBottom: 30 }}>
                    <Text
                        style={{
                            ...FONTS.H3,
                            lineHeight: FONTS.H3.fontSize * 1.7,
                            marginBottom: 10,
                            color: COLORS.mainColor,
                        }}
                    >
                        Level
                    </Text>
                    {level.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 10,
                                }}
                                onPress={() => setSelectedLevel(item.id)}
                            >
                                <View
                                    style={{
                                        width: 16,
                                        height: 16,
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        borderColor:
                                            selectedLevel === item.id
                                                ? COLORS.black
                                                : COLORS.secondaryTextColor,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: 10,
                                    }}
                                >
                                    {selectedLevel === item.id && (
                                        <View style={{ top: -2, right: -1 }}>
                                            <SelectSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                                        </View>
                                    )}
                                </View>
                                <Text
                                    style={{
                                        ...FONTS.Lato_400Regular,
                                        fontSize: 14,
                                        color: COLORS.bodyTextColor,
                                        lineHeight: 14 * 1.7,
                                    }}
                                >
                                    {item.type}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View style={{ marginBottom: 30 }}>
                    <Text
                        style={{
                            ...FONTS.H3,
                            lineHeight: FONTS.H3.fontSize * 1.7,
                            marginBottom: 10,
                            color: COLORS.mainColor,
                        }}
                    >
                        Features
                    </Text>
                    {features.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 10,
                                }}
                                onPress={() => setSelectedFeatures(item.id)}
                            >
                                <View
                                    style={{
                                        width: 16,
                                        height: 16,
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        borderColor:
                                            selectedFeatures === item.id
                                                ? COLORS.black
                                                : COLORS.secondaryTextColor,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: 10,
                                    }}
                                >
                                    {selectedFeatures === item.id && (
                                        <View style={{ top: -2, right: -1 }}>
                                            <SelectSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                                        </View>
                                    )}
                                </View>
                                <Text
                                    style={{
                                        ...FONTS.Lato_400Regular,
                                        fontSize: 14,
                                        color: COLORS.bodyTextColor,
                                        lineHeight: 14 * 1.7,
                                    }}
                                >
                                    {item.type}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View style={{ marginBottom: 30 }}>
                    <Text
                        style={{
                            ...FONTS.H3,
                            lineHeight: FONTS.H3.fontSize * 1.7,
                            marginBottom: 10,
                            color: COLORS.mainColor,
                        }}
                    >
                        Ratings
                    </Text>
                    {ratings.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 10,
                                }}
                                onPress={() => setSelectedRatings(item.id)}
                            >
                                <View
                                    style={{
                                        width: 16,
                                        height: 16,
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        borderColor:
                                            selectedRatings === item.id
                                                ? COLORS.black
                                                : COLORS.secondaryTextColor,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: 10,
                                    }}
                                >
                                    {selectedRatings === item.id && (
                                        <View style={{ top: -2, right: -1 }}>
                                            <SelectSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                                        </View>
                                    )}
                                </View>
                                <Text
                                    style={{
                                        ...FONTS.Lato_400Regular,
                                        fontSize: 14,
                                        color: COLORS.bodyTextColor,
                                        lineHeight: 14 * 1.7,
                                    }}
                                >
                                    {item.type}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View style={{ marginBottom: 5 }}>
                    <Text
                        style={{
                            ...FONTS.H3,
                            lineHeight: FONTS.H3.fontSize * 1.7,
                            marginBottom: 10,
                            color: COLORS.mainColor,
                        }}
                    >
                        Video duration
                    </Text>
                    {videoDuration.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 10,
                                }}
                                onPress={() =>
                                    setSelectedVideoDuration(item.id)
                                }
                            >
                                <View
                                    style={{
                                        width: 16,
                                        height: 16,
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        borderColor:
                                            selectedVideoDuration === item.id
                                                ? COLORS.black
                                                : COLORS.secondaryTextColor,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: 10,
                                    }}
                                >
                                    {selectedVideoDuration === item.id && (
                                        <View style={{ top: -2, right: -1 }}>
                                            <SelectSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}  />
                                        </View>
                                    )}
                                </View>
                                <Text
                                    style={{
                                        ...FONTS.Lato_400Regular,
                                        fontSize: 14,
                                        color: COLORS.bodyTextColor,
                                        lineHeight: 14 * 1.7,
                                    }}
                                >
                                    {item.type}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <Button title="Apply" onPress={() => navigation.goBack()} />
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
            {renderBackground()}
            {renderHeader()}
            {renderSortBy()}
            {renderContent()}
        </SafeAreaView>
    );
}
