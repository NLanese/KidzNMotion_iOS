// Reaact
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";

// Nuton
import { Header, Button, ProfileEditCategoryComponent } from "../../../NutonComponents";
import { AREA, COLORS } from "../../../NutonConstants";

// Apollo GraphQl
import { GET_USER, CREATE_ASSIGNMENT, CREATE_MEETING } from "../../../GraphQL/operations";
import { useMutation } from "@apollo/client";
import client from "../../utils/apolloClient"

// Recoil
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {sizeState, clientListState, userState, colorState, fontState, avatarState } from '../../../Recoil/atoms';

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import DatePicker from "../../../OstrichComponents/DatePicker";
import OptionsButtons from "../../../OstrichComponents/OptionsButtons";
import LoadingComponent from "../../Global/LoadingComponent"

// Hooks
import convertMonthToNumber from "../../Hooks/date_and_time/convertMonthIntoNumber";




///////////////////////
///     Styles      ///
///////////////////////

const Styles = StyleSheet.create({
    CalandarRow: {
        marginTop: 30, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-around'
    }
})


//////////// COMPONENT //////////// COMPONENT //////////// COMPONENT //////////// COMPONENT //////////// COMPONENT //////////// COMPONENT //////////// COMPONENT 

export default function ScheduleAMeeting(props) {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    ///////////////
    // Constants // 
    ///////////////

        const client = props.route.params?.item

        const COLORS = useRecoilValue(colorState)
        const FONTS = useRecoilValue(fontState)
        const SIZES = useRecoilValue(sizeState)
        const AVATAR = useRecoilValue(avatarState)
        const navigation = useNavigation();

        const today = new Date()

    /////////////////
    // Local State //
    /////////////////

        const [dateModal, setDateModal] = useState(false)

        const [date, setDate] = useState(today)

        const [selectedDate, setSelectedDate] = useState(today)

        const [dateOpen, setDateOpen] = useState(false)

        const [dateString, setDateString] = useState("Please Select a Date")

        const [timeString, setTimeString] = useState("Please Select a Time")

        const [meetingType, setMeetingType] = useState(false)

        const [reset, setReset] = useState(false)

        const [loading, setLoading] = useState(false)

    //////////////////
    // Recoil State //
    //////////////////

        const [user, setUser] = useRecoilState(userState)

        // Tracks the Children
        const [children, setChildren] = useState(user.children)


        let XselectedChild
        if (children.length > 0){
            XselectedChild = children[0]
        }

        // The Child who is selected
        const [selectedChild, setSelectedChild] = useState(XselectedChild)


        const [createMeeting, {loading: loadingMeeting, error: errorMeeting, data: meetingData}] = useMutation(CREATE_MEETING)

///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    // Renders the header bar and back arrow
    function renderHeader() {
        return(
            <View style={{marginTop: 45}}>
                <Header 
                    onPress={() => navigation.goBack()}
                    goBack={true}
                    profile={true}
                    filterOnPress={() => navigation.navigate("SettingsLanding")}
                    title={"Schedule a Meeting"}
                />
            </View>    
        ) 
    }

    // Renders the Title
    function renderTitle(){
        if (user.role === "GUARDIAN"){
            return (
                <Text style={{...FONTS.Title, color: 'black', textAlign: 'center'}}>
                    Request a meeting with {selectedChild.childCarePlans[0].therapist.firstName}
                </Text>
            )
        }
    }

    // Renders the Date Picker Button or the Time Picker, depending on the time boolean value
    function renderDateButton(){
        return(
            <TouchableOpacity 
                style={{alignItems: 'center', paddingTop: 3, paddingBottom: 3, marginTop: 30, borderWidth: 3, borderRadius: 5, ...determineSelectedTimeBracket(dateOpen), height: 50}}
                onPress={() => handleDateTimeClick()}
            >
                <Text>Meeting Date</Text>
                <Text style={{fontFamily: "Gilroy-Bold", fontSize: 16, marginTop :5}}>
                    {(selectedDate).toString().substring(0,21)}
                </Text>
            </TouchableOpacity>
            )
    }

    // Renders Date Picker (Conditionally)
    function renderDatePicker(meetings){
        let white = true
        if (COLORS.iconLight !== "#fff" && COLORS.iconLight !== "#FFF"){
            white = false
        }
        if (dateOpen){
            return(
                <View style={{marginTop: 20}}>
                    <DatePicker 
                        baseColor={COLORS.gradientColor2}
                        displayTileColor={COLORS.gradientColor1}
                        clearDate={reset}
                        // startDate={date}
                        onDateChange={(resolved) => handleDateChange(resolved)}
                        whiteArrow={white}
                        timeTitleStyle={{color: COLORS.iconLight, fontFamily: "Gilroy-Bold", marginBottom: 15, fontSize: 16}}
                        dateTextStyle={{fontSize: 26, fontFamily: 'Gilroy-SemiBold', textAlign: 'center', paddingTop: 2}}
                        displayTileStyle={{borderWidth: 0, padding: 7, minWidth: 90, height: 40, borderRadius: 5}}

                        timePicker={true}
                    />
                </View>
            )
        }
    }

    function renderMeetingTypeButtons(){
        return(
            <View style={{marginTop: 30}}>
                <OptionsButtons 
                    buttonsArray={["Virtual Meeting", "In-Person Meeting"]}
                    selectedStyle={{
                        backgroundColor: COLORS.gradientColor1,
                        height: 60,
                        width: 140,
                        borderRadius: 10,
                        justifyContent: 'center',
                        marginLeft: 7.5
                    }}
                    inactiveStyle={{
                        backgroundColor: 'white',
                        borderColor: 'black', borderWidth: 1, borderRadius: 10,
                        height: 45, width: 100,
                        marginTop: 7.5, marginLeft: 7.5,
                        justifyContent: 'center'
                    }}
                    onClick={(index) => handleSetMeetingType(index)}
                    textStyle={{...FONTS.Title, textAlign: 'center', fontSize: 15}}
                    activeTextStyle={{...FONTS.Title, textAlign: 'center', fontSize: 18}}
                    initialSelected={meetingType}
                />
            </View>
        )
    }

    // Handles the Meeting Type Selection
    function handleSetMeetingType(index){
        if (index === 0){
            setMeetingType("PHONE")
        }
        else if (index === 1){
            setMeetingType("IN_PERSON")
        }
    }

    // Renders the Submit Button if all conditions have been met
    function renderSubmitButton(){
        if (meetingType){
            return (
                <View style={{marginTop: 20, marginRight: 20, marginLeft: 20}}>
                    <Button
                        title="Request Meeting"
                        onPress={() => handleMeetingSubmissionClick()}
                    />
                </View>
            )
        }
    }



///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////

    // Outlines the selected Time Bracket
    function determineSelectedTimeBracket(state){
        if (state){
            return {
                borderColor: COLORS.gradientColor2
            }
        }
        else{
            return {
                borderColor: 'black'
            }
        }
    }
 
    // Handles when a start or end date prompt is selected
    const handleDateTimeClick = () => {
            setDateOpen(!dateOpen)        
    }

    // Hadles the changing of a date from the Date Pciker
    const handleDateChange = (dateObj) => {
            setSelectedDate(dateObj.dateObject)
    }

    function handleSetMeetingType(index){
        if (index === 0){
            setMeetingType("PHONE")
        }
        else if (index === 1){
            setMeetingType("IN_PERSON")
        }
    }

    // Changes JavaScripts Date Object to a format that DateTime can handle
    const determineDateTimeConversion = (dateObj) => {
        let timeObj = dateObj.toString().slice(16, 24)
        nDateObj = (dateObj.toString().slice(4, 15))

        // YYYY-MM-DD hh:mm:ss
        let dateTimeYear = nDateObj.slice(7)
        let dateTimeMonth = convertMonthToNumber(addLeadingZero(nDateObj.slice(0, 4)))
        let dateTimeDate = addLeadingZero(nDateObj.slice(4, 7))

        let dateTimeFormat = `${dateTimeYear}-${dateTimeMonth}-${dateTimeDate}${timeObj}`
        return (new Date(dateObj).toISOString())
    }

    // Handles Hitting Submit on Meetings Modal
    async function handleMeetingSubmissionClick(){
        setLoading(true)
        handleCreateMeeting(user)
        .then( (resolved) => {
            setLoading(false)
        })
    }

    // Runs the create Assignment Mutation
    async function handleCreateMeeting(client){
        return await createMeeting({
            variables: {
                title: `${selectedDate} ${meetingType}`,
                meetingDateTime: determineDateTimeConversion(selectedDate),
                type: meetingType,
                participantIDs: [client.id],
            }
        })
        .catch(err => {
            console.error(err)
            setDateOpen(false)
            setLoading(false)
        })
    }
       
    // Turns 6 into 06
    const addLeadingZero = (num) => {
        return String(num).padStart(2, '0')
    }

///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////
    return(
        <Gradient
            colorOne={COLORS.gradientColor1}
            colorTwo={COLORS.gradientColor2}
            style={{height: '105%'}}
        >
            <LoadingComponent loading={loading} label={"LOADING"} />
            {renderHeader()}
            <View style={{marginLeft: 15, marginRight: 15, marginTop: 15, padding: 15, borderColor: COLORS.iconLight, borderWidth: 0.5, borderRadius: 15, height: '70%'}}>
                {renderTitle()}
                {renderDateButton()}
                {renderDatePicker()}
                {renderMeetingTypeButtons()}
                {renderSubmitButton()}
            </View>
        </Gradient>
    )
}