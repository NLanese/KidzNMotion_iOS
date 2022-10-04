import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";

export default function MenuComponent() {
    return (
        <TouchableOpacity style={{ width: 160, height: 140 }}>
            <ImageBackground
                style={{
                    width: 160,
                    height: 140,
                    backgroundColor: "red",
                    flex: 1,
                    resizeMode: "stretch",
                    width: "100%",
                    height: "100%",
                }}
                source={require("../assets/images/background/background-04.png")}
                resizeMode="stretch"
            >
                <Text>MenuComponent</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}
