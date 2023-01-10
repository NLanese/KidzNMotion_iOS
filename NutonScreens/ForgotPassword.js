import { View, Text, SafeAreaView, Image } from "react-native";
import React , {useEffect, useState}from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

import { Header, InputField, Button } from "../NutonComponents";
import { AREA} from "../NutonConstants";

import { REQUEST_RESET_PASSWORD } from "../GraphQL/operations";
import { useMutation } from "@apollo/client";

import { useRecoilValue } from "recoil";
import { colorState, fontState, sizeState } from '../Recoil/atoms';

export default function ForgotPassword() {
    const navigation = useNavigation();
    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)
    const SIZES = useRecoilValue(sizeState)

    // Mutation
    const [requestReset, { loading: loadingR, error: errorR, data: dataR }] =useMutation(REQUEST_RESET_PASSWORD);


    // Entered in Input
    const [email, setEmail] = useState(false)

    // Boolean Modal Status
    const [modal, setModal] = useState(false)

    ////////////////
    // RENDERINGS //
    ////////////////

    function renderHeader() {
        return (
            <Header
                title="Forgot password"
                onPress={() => navigation.goBack()}
            />
        );
    }

    function renderContent() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    paddingTop: 30,
                    paddingHorizontal: 20,
                    flexGrow: 1,
                }}
            >
                <Text
                    style={{
                        marginBottom: 20,
                        ...FONTS.BodyText,
                        color: COLORS.lightBlack,
                    }}
                >
                    Please enter your email address. You will receive a link to
                    create a new password via email.
                </Text>
                <InputField
                    title="Email"
                    placeholder="kristinwatson@mail.com"
                    containerStyle={{ marginBottom: 20 }}
                    onChangeText={(content) => setEmail(content)}
                />
                <Button
                    title="Send"
                    onPress={() => handleRequestReset()}
                />
            </KeyboardAwareScrollView>
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

    function renderModal(){
        return(
            <Modal
            isVisible={modal}
            onBackdropPress={() => setModal(!modal)}
            hideModalContentWhileAnimating={true}
            backdropTransitionOutTiming={0}
            style={{ margin: 0 }}
            animationIn="zoomIn"
            animationOut="zoomOut"
            >
                <View
                style={{
                    width: SIZES.width - 40,
                    backgroundColor: COLORS.white,
                    marginHorizontal: 20,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    paddingTop: 40,
                    paddingBottom: 30,
                }}
                >
                    <Text style={{...FONTS.Title, textAlign: 'center'}}>
                        The email has been sent!
                    </Text>
                </View>
            </Modal>
        )
    }

    //////////////
    // HANDLERS //
    //////////////

    async function handleRequestReset(){
        return await requestReset({
            variables: {
                email: email
            }
        }).then(() => {
            setModal(true)
        })
    }

    //////////
    // MAIN //
    //////////
    return (
        <SafeAreaView style={{ ...AREA.AndroidSafeArea }}>
            {renderBackground()}
            {renderHeader()}
            {renderModal()}
            {renderContent()}
        </SafeAreaView>
    );
}
