import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, CardComponent } from "../NutonComponents";
import { AndroidSafeArea, courses } from "../NutonConstants";

export default function CategoryList() {
    const navigation = useNavigation();

    function renderHeader() {
        return (
            <Header
                title="Digital Marketing"
                goBack={true}
                filter={true}
                onPress={() => navigation.goBack()}
                filterOnPress={() => navigation.navigate("Filter")}
            />
        );
    }

    function renderContent() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingTop: 10,
                    paddingBottom: 25,
                }}
                showsVerticalScrollIndicator={false}
            >
                {courses.map((item, index, array) => {
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
                                lastComponent={
                                    index == lastIndex ? true : false
                                }
                                onPress={() =>
                                    navigation.navigate("CourseDetailsTwo", {
                                        item: item,
                                    })
                                }
                            />
                        </View>
                    );
                })}
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
            {renderHeader()}
            {renderContent()}
        </SafeAreaView>
    );
}
