import { SafeAreaView, Image, FlatList } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, WishListComponent } from "../NutonComponents";
import { AndroidSafeArea, SIZES, courses } from "../NutonConstants";

export default function MyWishlist() {
    const navigation = useNavigation();

    function renderHeader() {
        return (
            <Header title="My Wishlist" onPress={() => navigation.goBack()} />
        );
    }

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

    function renderContent() {
        return (
            <FlatList
                data={courses}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                }}
                renderItem={({ item, index }) => {
                    return <WishListComponent item={item} />;
                }}
            />
        );
    }

    return (
        <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
            {renderBackground()}
            {renderHeader()}
            {renderContent()}
        </SafeAreaView>
    );
}
