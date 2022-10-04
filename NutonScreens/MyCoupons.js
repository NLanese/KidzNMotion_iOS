import {
    SafeAreaView,
    Image,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";

import { Header, WishListComponent } from "../NutonComponents";
import { AndroidSafeArea, SIZES, courses, myCoupons } from "../NutonConstants";

export default function MyCoupons() {
    const navigation = useNavigation();

    function renderHeader() {
        return (
            <Header title="My Coupons" onPress={() => navigation.goBack()} />
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
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    flexGrow: 1,
                }}
                showsVerticalScrollIndicator={false}
            >
                {myCoupons.map((item, index) => {
                    return (
                        <Shadow
                            key={index}
                            offset={[0, 0]}
                            distance={5}
                            startColor={"rgba(6, 38, 100, 0.03)"}
                            finalColor={"rgba(6, 38, 100, 0.0)"}
                            viewStyle={{ width: "100%", marginBottom: 10 }}
                        >
                            <TouchableOpacity>
                                <Image
                                    source={item.image}
                                    style={{
                                        width: "100%",
                                        height: 85,
                                        borderRadius: 10,
                                    }}
                                />
                            </TouchableOpacity>
                        </Shadow>
                    );
                })}
            </ScrollView>
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
