// React
import React, { useState, useEffect } from "react";
import { View,Text, Dimensions, TouchableOpacity} from "react-native";

import FastImage from "react-native-fast-image";
import Modal from "react-native-modal";

import gif1 from "./XOsX.gif"
import bronze from "./medalGifs/bronze-coin.gif"
import silver from "./medalGifs/Silver-Coin.gif"
import gold from "./medalGifs/GoldCoin-Gif.gif"

let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height


export default function LoadingComponent({loading, setLoading=null, label, source=1, dismiss=false}) {

    if (!loading){
        return null
    }
    switch(source){
        case 1:
            source = gif1
            break
        case 2:
            source = bronze
            break
        case 3:
            source = silver
            break
        case 4: 
            source = gold
            break
        default:
            source = gif1
            
    }

    function handleDismiss(){
        if (dismiss){
            setLoading(false)
            loading = false
        }
        else{
            return null
        }
    }

    function MAIN(){
        if (dismiss){
            return(
                <TouchableOpacity style={{postion: "absolute", top: 0, start: 0, left: '0%', zIndex: 999, height: maxHeight * 0.9, width: "100%", justifyContent: "center"}} onPress={() => handleDismiss()}>
                    <FastImage
                        style={{ width: 500, height: maxHeight*.5, alignSelf: "center", postion: "absolute" }}
                        source={source}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={{alignSelf:"center", fontFamily: "Gilroy-Bold", color: 'white', fontSize: 24}}>
                        {label}
                    </Text>
                </TouchableOpacity>
            )
        }
        else{
            return(
                <View style={{postion: "absolute", top: 0, start: 0, left: '25%', zIndex: 999, height: maxHeight * 0.9, width: "50%", justifyContent: "center"}}>
                    
                <FastImage
                    style={{ width: 500, height: maxHeight*.5, alignSelf: "center", postion: "absolute" }}
                    source={source}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={{alignSelf:"center", fontFamily: "Gilroy-Bold", color: 'white', fontSize: 24, width: 300, textAlign: 'center'}}>
                    {label}
                </Text>
            </View>
            )
        }
    }
    
    return(
         <Modal
                isVisible={loading}
                onBackdropPress={() => handleDismiss()}
                hideModalContentWhileAnimating={false}
                backdropTransitionOutTiming={0}
                style={{ margin: 50 }}
                animationIn="zoomIn"
                animationOut="zoomOut"
            >
           {MAIN()}
        </Modal>
    )
    
}

