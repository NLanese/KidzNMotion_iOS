import {
    View,
    Text,
    ImageBackground,
    TextInput,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { InputSearch, Filter, EllipseSvg } from "../svg";
import { AREA, courses, FONTS, tags, SIZES } from "../NutonConstants";
import {
    CategoryComponent,
    NewCourseComponent,
    CardComponent,
} from "../NutonComponents";

export default function Search() {
    const navigation = useNavigation();

    const topRated = courses.filter(function (course) {
        return course.topRated;
    });

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

    function renderSearch() {
        return (
            <View
                style={{
                    paddingHorizontal: 20,
                    marginTop: 10,
                    marginBottom: 30,
                }}
            >
                <ImageBackground
                    style={{
                        width: "100%",
                        height: 42,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                    source={require("../assets/images/background-02.png")}
                    imageStyle={{ borderRadius: 5 }}
                >
                    <View style={{ marginLeft: 16 }}>
                        <InputSearch fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                    </View>
                    <TextInput
                        placeholder="Search"
                        style={{
                            flex: 1,
                            marginLeft: 8,
                        }}
                    />
                    <TouchableOpacity
                        style={{ paddingHorizontal: 16 }}
                        onPress={() => navigation.navigate("Filter")}
                    >
                        <Filter fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }

    function renderNewCourses() {
        return (
            <View style={{ marginBottom: 30 }}>
                <CategoryComponent
                    title={"New courses"}
                    onPress={() => navigation.navigate("CategoryList")}
                />
                <FlatList
                    data={courses}
                    horizontal={true}
                    renderItem={({ item, index }) => {
                        return (
                            <NewCourseComponent
                                item={item}
                                onPress={() =>
                                    navigation.navigate("CourseDetails")
                                }
                            />
                        );
                    }}
                    contentContainerStyle={{ paddingLeft: 20 }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    }

    function renderTopRated() {
        return (
            <View style={{ marginBottom: 30 }}>
                <CategoryComponent
                    title={"Top rated"}
                    onPress={() => navigation.navigate("CategoryList")}
                />

                {topRated.map((item, index, array) => {
                    const lastIndex = array.length - 1;
                    return (
                        <View
                            key={index}
                            style={{
                                marginHorizontal: 20,
                            }}
                        >
                            <CardComponent
                                item={item}
                                onPress={() =>
                                    navigation.navigate("CourseDetailsTwo")
                                }
                                lastComponent={
                                    index == lastIndex ? true : false
                                }
                            />
                        </View>
                    );
                })}
            </View>
        );
    }

    function SpeciallyForYou() {
        return (
            <View style={{ marginBottom: 30 }}>
                <CategoryComponent
                    title="Specially for you"
                    onPress={() => navigation.navigate("CategoryList")}
                />
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 20 }}
                >
                    {courses.map((item, index) => {
                        return (
                            item.speciallyForYou === true && (
                                <TouchableOpacity key={index}>
                                    <ImageBackground
                                        style={{
                                            width: 230,
                                            height: 100,
                                            backgroundColor:
                                                item.backgroundColor,
                                            marginRight: 16,
                                            borderRadius: 10,
                                            padding: 16,
                                        }}
                                    >
                                        <View
                                            style={{
                                                position: "absolute",
                                                right: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <EllipseSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                                        </View>
                                        <Image
                                            style={{
                                                width: 70,
                                                height: 70,
                                                position: "absolute",
                                                right: 0,
                                                bottom: 0,
                                            }}
                                            source={item.backgroundIcon}
                                        />
                                        <Text
                                            numberOfLines={2}
                                            style={{
                                                ...FONTS.H6,
                                                lineHeight: 14 * 1.5,
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            )
                        );
                    })}
                </ScrollView>
            </View>
        );
    }

    function renderOftenSearched() {
        return (
            <View style={{ marginBottom: 20 }}>
                <CategoryComponent title="Often searched" BtnViewAll={false} />
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        paddingHorizontal: 20,
                    }}
                >
                    {tags.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    backgroundColor: "#ECE3FF",
                                    marginRight: 10,
                                    marginBottom: 10,
                                    borderRadius: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        paddingHorizontal: 16,
                                        paddingVertical: 10,
                                        color: "#7C6F97",
                                    }}
                                >
                                    {item.tag}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {renderBackground()}
                {renderSearch()}
                {renderNewCourses()}
                {renderTopRated()}
                {SpeciallyForYou()}
                {renderOftenSearched()}
            </ScrollView>
        </SafeAreaView>
    );
}
