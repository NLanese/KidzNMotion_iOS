import { Dimensions } from "react-native";
import { Platform, StatusBar } from "react-native";
import { Image } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    confirm: "#000",

    lightBlack: "#333333",
    white: "#FFFFFF",
    gray: "#666666",

    icon: "#000000",

    black: "#000000",
    gray: "#333333",
    lightGray: "#666666",

    mainColor: "white",
    bodyTextColor: "white",
    secondaryTextColor: "#666666",
    btnColor: "#000000",

    pink: "#FF2DAB",

    borderColor: "brown",
    buttonColor: "rgba(255, 255, 255, 0)",
    gradientColor1: "#FFCB05",
    gradientColor2: "#FF4600",    

    shadowStartColor: "rgba(6, 38, 100, 0.03)",
    shadowFinalColor: "rgba(6, 38, 100, 0.0)",
    shadowDistance: 10,

    transparent: "transparent",
    transparentWhite1: "rgba(255, 255, 255, 0.1)",

    // Orange
    scheme0: {
        confirm: "#000",

        lightBlack: "#333333",
        white: "#FFFFFF",
        gray: "#666666",

        icon: "#000000",

        black: "#000000",
        gray: "#333333",
        lightGray: "#666666",

        mainColor: "white",
        bodyTextColor: "white",
        secondaryTextColor: "#666666",
        btnColor: "#000000",

        pink: "#FF2DAB",

        borderColor: "brown",
        buttonColor: "rgba(255, 255, 255, 0)",
        
        shadowStartColor: "rgba(6, 38, 100, 0.03)",
        shadowFinalColor: "rgba(6, 38, 100, 0.0)",
        shadowDistance: 10,
        
        transparent: "transparent",
        transparentWhite1: "rgba(255, 255, 255, 0.1)",
        
        fillColor:"#FDC800",
        unfillColor:"#FFCB05",
        iconStyle: { borderColor: "#FFCB05" },
        bounceEffect: 1,
        bounceFriction: 2,
        size: 38,
        isChecked: true,

        gradientColor1: "#FFCB05",
        gradientColor2: "#FF4600",    
        title: "#FFF",
        subtitle: "#FFF",
        selectionText: "#000",
        buttonColorLight: "#FFF",
        buttonColorDark: "#000",
        pageTitle: "#000",
        iconLight: "#FFF",
        iconDark: "#FFF",
        buttonBorder: "#FFF",
        headerTitle: "#FFF",
        inputTitle: "#000",
        inputPlaceholder: "grey"
       

    },

    // Fuscia
    scheme1: {
        confirm: "#000",
        lightBlack: "#333333",
        white: "#FFFFFF",
        gray: "#666666",
        icon: "#000000",
        black: "#000000",
        gray: "#333333",
        lightGray: "#666666",
        mainColor: "white",
        bodyTextColor: "white",
        secondaryTextColor: "#666666",
        btnColor: "#000000",
        pink: "#FF2DAB",
        borderColor: "#fff",
        buttonColor: "rgba(255, 255, 255, 0)",
        shadowStartColor: "rgba(6, 38, 100, 0.03)",
        shadowFinalColor: "rgba(6, 38, 100, 0.0)",
        shadowDistance: 10,
        transparent: "transparent",
        transparentWhite1: "rgba(255, 255, 255, 0.1)",

        fillColor:"#782637",
        unfillColor:"#B05E6F",
        iconStyle: { borderColor: "#B05E6F" },
        bounceEffect: 1,
        bounceFriction: 2,
        size: 38,
        isChecked: true,

        title: "#FFF",
        subtitle: "#FFF",
        selectionText: "#FFF",
        buttonColorLight: "#FFF",
        buttonColorDark: "#000",
        pageTitle: "#FFF",
        iconLight: "#FFF",
        iconDark: "#FFF",
        buttonBorder: "#FFF",
        gradientColor1: "#E892F8",
        gradientColor2: "#ED1286",
        headerTitle: "#FFF",
        inputTitle: "#000",
        inputPlaceholder: "grey"

    },

    // Royal Blue
    scheme2: {
        confirm: "#000",
        lightBlack: "#333333",
        white: "#FFFFFF",
        gray: "#666666",
        icon: "#000000",
        black: "#000000",
        gray: "#333333",
        lightGray: "#666666",
        mainColor: "white",
        bodyTextColor: "white",
        secondaryTextColor: "#666666",
        btnColor: "#000000",
        pink: "#FF2DAB",
        borderColor: "#fff",
        buttonColor: "rgba(255, 255, 255, 0)",
        shadowStartColor: "rgba(6, 38, 100, 0.03)",
        shadowFinalColor: "rgba(6, 38, 100, 0.0)",
        shadowDistance: 10,
        transparent: "transparent",
        transparentWhite1: "rgba(255, 255, 255, 0.1)",

        fillColor:"#256789",
        unfillColor: "#5799BB",
        iconStyle: { borderColor: "#5799BB" },
        bounceEffect: 1,
        bounceFriction: 2,
        size: 38,
        isChecked: false,


        gradientColor1: "#42DFFF",
        gradientColor2: "#0031F6",

        title: "#fff",
        subtitle: "#C9F3F4",
        selectionText: "#000",
        buttonColorLight: "#FFF",
        buttonColorDark: "#000",
        pageTitle: "#000",
        iconLight: "#fff",
        iconDark: "#000",
        buttonBorder: "#fff",
        headerTitle: "#FFF",
        inputTitle: "#000",
        inputPlaceholder: "grey"

    },

    // Yella' Belly
    scheme3: {
        confirm: "#000",
        lightBlack: "#333333",
        white: "#FFFFFF",
        gray: "#666666",
        icon: "#000000",
        black: "#000000",
        gray: "#333333",
        lightGray: "#666666",
        mainColor: "white",
        bodyTextColor: "white",
        secondaryTextColor: "#666666",
        btnColor: "#000000",
        pink: "#FF2DAB",
        borderColor: "#fff",
        buttonColor: "rgba(255, 255, 255, 0)",
        shadowStartColor: "rgba(6, 38, 100, 0.03)",
        shadowFinalColor: "rgba(6, 38, 100, 0.0)",
        shadowDistance: 10,
        transparent: "transparent",
        transparentWhite1: "rgba(255, 255, 255, 0.1)",

        fillColor:"#A75836",
        unfillColor: "#CB7C5A",
        iconStyle: { borderColor: "#CB7C5A" },
        bounceEffect: 1,
        bounceFriction: 2,
        size: 38,


        gradientColor1: "#E9FF00",
        gradientColor2: "#F9FF94",

        title: "#000",
        subtitle: "#000",
        selectionText: "#000",
        buttonColorLight: "#FFF",
        buttonColorDark: "#000",
        pageTitle: "#000",
        iconLight: "#000",
        iconDark: "#000",
        buttonBorder: "#000",
        headerTitle: "#000",
        inputTitle: "#000",
        inputPlaceholder: "grey"

    },

    // Yellow
    scheme4: {
        confirm: "#000",
        lightBlack: "#333333",
        white: "#FFFFFF",
        gray: "#666666",
        icon: "#000000",
        black: "#000000",
        gray: "#333333",
        lightGray: "#666666",
        mainColor: "white",
        bodyTextColor: "white",
        secondaryTextColor: "#666666",
        btnColor: "#000000",
        pink: "#FF2DAB",
        borderColor: "#fff",
        buttonColor: "rgba(255, 255, 255, 0)",
        shadowStartColor: "rgba(6, 38, 100, 0.03)",
        shadowFinalColor: "rgba(6, 38, 100, 0.0)",
        shadowDistance: 10,
        transparent: "transparent",
        transparentWhite1: "rgba(255, 255, 255, 0.1)",

        fillColor:"#64D6B5",
        unfillColor: "#86F8D7",
        iconStyle: { borderColor: "#86F8D7" },
        bounceEffect: 1,
        bounceFriction: 2,
        size: 38,


        gradientColor1: "#86F8D7",
        gradientColor2: "#7C37EA",

        title: "#000",
        subtitle: "#000",
        selectionText: "#000",
        buttonColorLight: "#FFF",
        buttonColorDark: "#000",
        pageTitle: "#000",
        iconLight: "#FFF",
        iconDark: "#000",
        buttonBorder: "#000",
        headerTitle: "#FFF",
        inputTitle: "#000",
        inputPlaceholder: "grey"

    },
    scheme5: {
        confirm: "#000",
        lightBlack: "#333333",
        white: "#FFFFFF",
        gray: "#666666",
        icon: "#000000",
        black: "#000000",
        gray: "#333333",
        lightGray: "#666666",
        mainColor: "white",
        bodyTextColor: "white",
        secondaryTextColor: "#666666",
        btnColor: "#000000",
        pink: "#FF2DAB",
        borderColor: "#fff",
        buttonColor: "rgba(255, 255, 255, 0)",
        shadowStartColor: "rgba(6, 38, 100, 0.03)",
        shadowFinalColor: "rgba(6, 38, 100, 0.0)",
        shadowDistance: 10,
        transparent: "transparent",
        transparentWhite1: "rgba(255, 255, 255, 0.1)",

        fillColor:"#DACA79",
        unfillColor: "#F4E493",
        iconStyle: { borderColor: "#F4E493" },
        bounceEffect: 1,
        bounceFriction: 2,
        size: 38,
        background: 'apple',


        gradientColor1: "#F4E493",
        gradientColor2: "#fff",
        title: "#000",
        subtitle: "#000",
        selectionText: "#000",
        buttonColorLight: "#FFF",
        buttonColorDark: "#000",
        pageTitle: "#000",
        iconLight: "#FFF",
        iconDark: "#000",
        buttonBorder: "#000",
        headerTitle: "#FFF",
        inputTitle: "#000",
        inputPlaceholder: "grey"

    },

};

export const DEFAULT_AVATAR  = {
    body: "body1",
    eyes: "eyes3",
    facialHair: "facialHair3",
    hair: "hair3",
    mouth: "mouth5",
    nose: "nose1",
    backgroundColor: "bgc1",
    skinColor: "sc1",
    hairColor: "hc1",
    facialHairColor: "fhc1",
    bodyColor: "bc1" 
};

export const SIZES = {
    width,
    height,

    borderRadius: 10,
};
export const FONTS = {
    BodyText: {
        fontFamily: "Lato-Regular",
        fontSize: 16,
        lineHeight: 16 * 1.7,
    },
    Title: {
        fontFamily: "Gilroy-Bold",
        fontSize: 24
    },
    SubTitle: {
        fontFamily: "Gilroy-Medium",
        fontSize: 16
    },
    ModalButton: {
        fontFamily: 'Gilroy-SemiBold',
        fontSize: 20,
    }
};

export const AREA = {
    AndroidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: COLORS.gradientColor1,
    },
    DefaultBackground: {
        flex: 1,
    },
};

export const AndroidSafeArea = {
    AndroidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: COLORS.gradientColor1,
    },
    DefaultBackground: {
        flex: 1,
    },
};
