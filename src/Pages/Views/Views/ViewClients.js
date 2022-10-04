// React
import {  View, Text, ImageBackground, Image, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


// Ostrich
import Gradient from "../../../../OstrichComponents/Gradient";

// Nuton
import { categories, promo, courses, popular } from "../../../../NutonConstants";

// Recoil
import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState, userState } from '../../../../Recoil/atoms';

let maxWidth = Dimensions.width
let maxHeight = Dimensions.height

const ViewClients = () => {
///////////////////////////
///                     ///
///     Preliminary     ///
///                     ///
///////////////////////////

    ///////////////
    // Constants //
    ///////////////
        const COLORS = useRecoilValue(colorState)
        const FONTS = useRecoilValue(fontState)
        const SIZES = useRecoilValue(sizeState)
        const navigation = useNavigation();

///////////////////////////
///                     ///
///     Renderings      ///
///                     ///
///////////////////////////

    // The Title / Opener
    function renderTopPrompt(){
        return(
            <View>
                <View>
                    {/* Image */}
                </View>
                <Text style={{...FONTS.Title, textAlign: 'center'}}>
                    Client Directory
                </Text>
            </View>
        )
    }

    // The List
    function renderAllViews(){

    }

    const renderAddClientsButton = () => {
        return(
            <View >
                <Text style={{...FONTS.Title, color: COLORS.title}}>
                    +
                </Text>
            </View>
        )
    }

    function MainRender() {
        if (true){ 
            return(
                <Gradient
                    colorOne={COLORS.gradientColor1}
                    colorTwo={COLORS.gradientColor2}
                >
                    <ScrollView>
                        <Text>List</Text>
                    </ScrollView>
                    {renderAddClientsButton()}
                </Gradient>
            )
        }
    }

///////////////////////////
///                     ///
///       Return        ///
///                     ///
///////////////////////////

    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
        >  
            {MainRender()}
        </KeyboardAwareScrollView>
    )
    
}

export default ViewClients