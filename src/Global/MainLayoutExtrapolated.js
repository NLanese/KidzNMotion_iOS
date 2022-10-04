import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";


import { MyMedals, MyCalendar } from "../Pages";

import Home from "../Pages/Home/Home";

import { UserTab, BookOpenTab, SearchTab, HomeTab, HomeTabTwo, CalendarTab, MedalTab } from "../../svg";

import { useRecoilValue } from "recoil";
import { colorState, fontState } from '../../Recoil/atoms';


export default function MainLayoutE(props) {
    const {route} = props;
    const navigation = useNavigation();
    // const route = useRoute();
    
    let item = route.params?.item || 'Home'
    let client = route.params?.client || false
    
    
    const [selectedTab, setSelectedTab] = useState(route.params?.item || 'Home');
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    
    // const { item = 'Home' } = route.params;
    
    useEffect(() => {
        if(route.params?.item){
            setSelectedTab(route.params?.item)}
            client = route.params?.client

    },[route.params?.item, route.params?.client] );
   

    const tabs = [
        {
            id: "2",
            screen: "Calendar",
            icon: (
                <CalendarTab
                    fillColor={
                        selectedTab == "Calendar"
                            ? COLORS.iconDark
                            : COLORS.iconLight
                    }
                />
            ),
        },
        {
            id: "1",
            screen: "Home",
            icon: (
                <HomeTabTwo
                    fillColor={
                        selectedTab == "Home"
                            ? COLORS.iconDark
                            : COLORS.iconLight
                    }
                />
            ),
        },
        {
            id: "3",
            screen: "Medals",
            icon: (
                <MedalTab
                    fillColor={
                        selectedTab == "Medals"
                            ? COLORS.iconDark
                            : COLORS.iconLight
                    }
                />
            ),
        },
        // {
        //     id: "4",
        //     screen: "My Profile",
        //     icon: (
        //         <UserTab
        //             strokeColor={
        //                 selectedTab == "My Profile"
        //                     ? COLORS.black
        //                     : COLORS.secondaryTextColor
        //             }
        //         />
        //     ),
        // },
    ];

    return (

        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 16,
                backgroundColor: COLORS.gradientColor2,
                borderTopColor: "#EEEEEE",
                borderTopWidth: 1,
                paddingHorizontal: 37,
            }}
        >
            {tabs.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        style={{ alignItems: "center" }}
                        onPress={() => {
                            setSelectedTab(item.screen)
                            navigation.navigate(item.screen)
                        }}
                    >
                        <View style={{ marginBottom: 6 }}>{item.icon}</View>
                        <Text
                            style={{
                                fontSize: 14,
                                fontFamily: 'Gilroy-Bold',
                                textAlign: "center",
                                color:
                                    selectedTab == item.screen
                                        ? COLORS.iconDark
                                        : COLORS.iconLight,
                                lineHeight: 14 * 1.2,
                            }}
                        >
                            {item.screen}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>

    );
}
