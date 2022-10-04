import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import React, { useState } from "react";

import { Header, MyCoursesComponent } from "../NutonComponents";
import { AREA, courses } from "../NutonConstants";
import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

export default function MyCourses() {
    const [category, setCategory] = useState("Ongoing");
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)

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
        return <Header title="My Courses" goBack={false} />;
    }

    function renderCategories() {
        return (
            <View
                style={{
                    paddingHorizontal: 20,
                    flexDirection: "row",
                    marginTop: 8,
                }}
            >
                <TouchableOpacity
                    style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomWidth: 1,
                        borderBottomColor:
                            category === "Ongoing"
                                ? COLORS.mainColor
                                : "#E7E6E7",
                    }}
                    onPress={() => setCategory("Ongoing")}
                >
                    <Text
                        style={{
                            ...FONTS.Lato_700Bold,
                            fontSize: 14,
                            lineHeight: 14 * 1.7,
                            paddingBottom: 8,
                            color:
                                category === "Ongoing"
                                    ? COLORS.black
                                    : COLORS.secondaryTextColor,
                        }}
                    >
                        Ongoing
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomWidth: 1,
                        borderBottomColor:
                            category === "Completed"
                                ? COLORS.mainColor
                                : "#E7E6E7",
                    }}
                    onPress={() => setCategory("Completed")}
                >
                    <Text
                        style={{
                            ...FONTS.Lato_700Bold,
                            fontSize: 14,
                            lineHeight: 14 * 1.7,
                            paddingBottom: 8,
                            color:
                                category === "Completed"
                                    ? COLORS.black
                                    : COLORS.secondaryTextColor,
                        }}
                    >
                        Completed
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    function renderContent() {
        return (
            <FlatList
                data={courses}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingHorizontal: 20,
                }}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                }}
                renderItem={({ item, index }) => {
                    return (
                        <MyCoursesComponent
                            item={item}
                            ongoingCourse={
                                category === "Ongoing" ? true : false
                            }
                        />
                    );
                }}
            />
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, ...AREA.AndroidSafeArea }}>
            {renderBackground()}
            {renderHeader()}
            {renderCategories()}
            {renderContent()}
        </SafeAreaView>
    );
}
