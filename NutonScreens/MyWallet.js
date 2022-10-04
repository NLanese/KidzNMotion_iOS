import {
    View,
    SafeAreaView,
    Image,
    ScrollView,
    FlatList,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";

import { AndroidSafeArea} from "../NutonConstants";
import { PayComponent, Header } from "../NutonComponents";
import { PlusSvg } from "../svg";
import { useRecoilValue } from "recoil";
import { colorState, sizeState } from '../Recoil/atoms';

const cards = [
    {
        id: "1",
        card: require("../assets/images/cards/01.png"),
    },
    {
        id: "2",
        card: require("../assets/images/cards/01.png"),
    },
    {
        id: "3",
        card: require("../assets/images/cards/01.png"),
    },
];

export default function MyWallet() {
    const COLORS = useRecoilValue(colorState)
    const SIZES = useRecoilValue(sizeState)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const navigation = useNavigation();

    function updateCurrentSlideIndex(e) {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / SIZES.width);
        setCurrentSlideIndex(currentIndex);
    }

    function renderDots() {
        return (
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    marginBottom: 30,
                }}
            >
                {cards.map((_, index) => {
                    return (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentSlideIndex == index && {
                                    width: 25,
                                    backgroundColor: COLORS.black,
                                    borderRadius: 6,
                                },
                                {backgroundColor: COLORS.gray}
                            ]}
                        />
                    );
                })}
            </View>
        );
    }

    function renderHeader() {
        return <Header title="My Wallet" onPress={() => navigation.goBack()} />;
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
                    zIndex: -1,
                }}
            />
        );
    }

    function renderContent() {
        return (
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingTop: 20 }}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <FlatList
                        horizontal={true}
                        index={2}
                        data={cards}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={updateCurrentSlideIndex}
                        contentContainerStyle={{ marginBottom: 16 }}
                        renderItem={({ item }) => (
                            <ImageBackground
                                source={item.card}
                                style={{
                                    width: SIZES.width - 40,
                                    height: 220,
                                    marginHorizontal: 20,
                                }}
                                imageStyle={{ borderRadius: 10 }}
                            ></ImageBackground>
                        )}
                    />
                    {renderDots()}
                </View>
                <View
                    style={{
                        paddingHorizontal: 20,
                        marginBottom: SIZES.height * 0.1,
                    }}
                >
                    <PayComponent
                        leftContent="Apple Pay"
                        rightContent="346.84"
                    />
                    <PayComponent leftContent="Pay Pal" rightContent="91.84" />
                    <PayComponent leftContent="Payoneer" />
                </View>
                <TouchableOpacity
                    style={{ alignSelf: "center" }}
                    onPress={() => navigation.navigate("AddANewCard")}
                >
                    <Shadow
                        viewStyle={{ marginBottom: 10 }}
                        startColor={COLORS.shadowStartColor}
                        finalColor={COLORS.shadowFinalColor}
                        distance={COLORS.shadowDistance}
                    >
                        <View
                            style={{
                                width: 70,
                                height: 70,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: COLORS.white,
                                alignSelf: "center",
                                borderRadius: 70,
                            }}
                        >
                            <PlusSvg fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                        </View>
                    </Shadow>
                </TouchableOpacity>
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
            {renderHeader()}
            {renderBackground()}
            {renderContent()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    dot: {
        width: 10,
        height: 2,
        marginHorizontal: 5,
        borderRadius: 6,
       
    },
});
