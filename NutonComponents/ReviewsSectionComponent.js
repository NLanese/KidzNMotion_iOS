import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { Rating, AirbnbRating } from "react-native-ratings";

import { reviews } from "../NutonConstants";

import { useRecoilValue } from "recoil";
import { colorState, fontState } from '../Recoil/atoms';

export default function ReviewsSectionComponent({ item }) {
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: 20,
                paddingVertical: 20,
            }}
            showsVerticalScrollIndicator={false}
        >
            {reviews.map((item, index) => {
                return (
                    <View
                        key={index}
                        style={{
                            flexDirection: "row",
                            marginBottom: 20,
                            paddingBottom: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: "#EBD7EC",
                        }}
                    >
                        <Image
                            source={item.photo}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 5,
                                marginRight: 10,
                            }}
                        />
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    ...FONTS.Lato_Regular,
                                    fontSize: 10,
                                    color: COLORS.secondaryTextColor,
                                    lineHeight: 10 * 1.7,
                                }}
                            >
                                {item.date}
                            </Text>
                            <Text
                                style={{
                                    ...FONTS.H5,
                                    textTransform: "capitalize",
                                    color: COLORS.mainColor,
                                    lineHeight: 16 * 1.5,
                                    marginBottom: 6,
                                }}
                            >
                                {item.name}
                            </Text>
                            <Text
                                style={{
                                    ...FONTS.Lato_400Regular,
                                    fontSize: 14,
                                    lineHeight: 14 * 1.7,
                                    color: COLORS.bodyTextColor,
                                }}
                            >
                                {item.comment}
                            </Text>
                        </View>
                        <View>
                            <AirbnbRating
                                type="star"
                                count={5}
                                defaultRating={item.rating}
                                imageSize={8}
                                readonly={true}
                                startingValue={item.rating}
                                style={{
                                    alignItems: "flex-start",
                                    // paddingHorizontal: 10,
                                    // marginHorizontal: 4,
                                    // backgroundColor: "red",
                                }}
                                starContainerStyle={{
                                    paddingHorizontal: 10,
                                    // ratingBackgroundColor: "red",
                                    // backgroundColor: "red",
                                }}
                                size={9}
                                ratingCount={10}
                                showRating={false}
                            />
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
}
