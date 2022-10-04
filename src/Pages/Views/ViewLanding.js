// React
import {  View, Text, ImageBackground, Image, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator,Dimensions} from "react-native";
import Gradient from "../../../OstrichComponents/Gradient";

// Nuton
import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState, userState } from '../../../Recoil/atoms';

// Other Views


const ViewLanding = () => {
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

    // Header Bar
    function renderHeader() {
        return (
            <> 
                 <Header
                    title=""
                    goBack={true}
                    profile={true}
                    onPress={() => navigation.goBack()}
                    filterOnPress={() => navigation.navigate("SettingsLanding")}
                />
            </>
        );
    }

    function MainRender() {
        if (true){

        }
    }

    return(
        <Gradient
            colorOne={COLORS.gradientColor1}
            colorTwo={COLORS.gradientColor2}
        >
            {renderHeader()}

        </Gradient>
    )
}

export default ViewLanding