// React
import React from "react";
import { View,Text, Dimensions} from "react-native";

import FastImage from "react-native-fast-image";
import Modal from "react-native-modal";

import gif1 from "./XOsX.gif"


let maxHeight = Dimensions.get('window').height


export default function LoadingComponent({loading, label}) {

    if (!loading){
        return null
    }
    let source
    switch(Math.ceil(Math.random()*2)){
        // case 1:
        //     source = gif2
        //     break
        default:
            source = gif1
    }
    return(
         <Modal
                isVisible={loading}
                onBackdropPress={null}
                hideModalContentWhileAnimating={false}
                backdropTransitionOutTiming={0}
                style={{ margin: 0 }}
                animationIn="zoomIn"
                animationOut="zoomOut"
            >
            <View style={{postion: "absolute", top: 0, start: 0, left: 0, zIndex: 999, height: maxHeight, width: "100%", justifyContent: "center"}}>
                    
                    <FastImage
                        style={{ width: 500, height: maxHeight*.5, alignSelf: "center", postion: "absolute" }}
                        source={source}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={{alignSelf:"center"}}>{label}</Text>
                </View>
        </Modal>
    )
}