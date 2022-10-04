import {
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React from "react";

import { Header, Button } from "../NutonComponents";
import { AndroidSafeArea} from "../NutonConstants";
import { MedalBronze, MedalGold, MedalLarge, MedalSilver, MedalTab, LargeBronzeMedal } from "../svg";

import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

export default function CourseCompletedTwo({ navigation }) {
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)
    function renderHeader() {
        return <Header leftIcon="back" onPress={() => navigation.goBack()} />;
    }

    function renderBackground() {
        return (
            <Image
                source={require("../assets/images/background/background-03.png")}
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
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    paddingTop: SIZES.height * 0.1,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* <Image
                    source={{ uri: "https://via.placeholder.com/600x600" }}
                    style={{
                        width: 200,
                        height: 200,
                        marginBottom: 15,
                        alignSelf: "center",
                    }}
                /> */}
                <View style={styles.medal}>
                    <LargeBronzeMedal color1="gold" color2="brown" style={{
                        
                        margin: "auto",
                        marginBottom: 15,
                        alignSelf: "center",
                    }}/>
                </View>
                <Text
                    style={{
                        ...FONTS.H2,
                        textAlign: "center",
                        lineHeight: FONTS.H2.fontSize * 1.4,
                        marginBottom: 10,
                        color: COLORS.mainColor,
                    }}
                >
                    Congratulations!
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.BodyText,
                        color: COLORS.bodyTextColor,
                        marginBottom: 24,
                    }}
                >
                    You have received a course completion {"\n"} certificate.
                </Text>
                <Button
                    title="See All Medals"
                    containerStyle={{ marginBottom: 20 }}
                />
                {/* <TouchableOpacity>
                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.Spartan_500Medium,
                            fontSize: 14,
                            textTransform: "capitalize",
                            lineHeight: 14 * 1.7,
                        }}
                    >
                        leave a feedback
                    </Text>
                </TouchableOpacity> */}
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


const styles = StyleSheet.create({
  medal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
  }
});