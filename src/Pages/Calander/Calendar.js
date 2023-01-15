// Reaact
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { useEffect } from "react";


// Hooks
import convertDateTimeToString from "../../Hooks/date_and_time/convertDateTimeToString";
import convertDateTimeToJavaScript from "../../Hooks/date_and_time/convertDateTimeToJavaScript";
import convertMonthToNumber from "../../Hooks/date_and_time/convertMonthIntoNumber";
import deslugVideoTitle from "../../Hooks/deslugVideoTitles";
import fullStringToDateFormat from "../../Hooks/date_and_time/fullStringTimeToDateFormat";
import getSchedNotificationsToBeDismissed from "../../Hooks/notifications/getSchedNotificationsToBeDismissed";
import assignmentsToSee from "../../Hooks/findAssignmentsToSee"

// GraphQL
import { useMutation } from "@apollo/client";
import client from "../../utils/apolloClient";
import { GET_NOTIFICATIONS, DISMISS_NOTIFICATION, TOGGLE_ASSGINMENT_SEEN } from "../../../GraphQL/operations";

// Nuton
import { Header, Button } from "../../../NutonComponents";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, userState, colorState, fontState, avatarState, meetingState, assignState, scheduleNotifications } from '../../../Recoil/atoms';

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import TabBar from "../../../OstrichComponents/TabBar";

// KNM
import CalendarComponent from "./CalendarComponent"
import findAssignmentsToSee from "../../Hooks/findAssignmentsToSee";

let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height


export default function CalendarPage() {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    ///////////////
    // Constants // 
    ///////////////

        const COLORS = useRecoilValue(colorState)
        const FONTS = useRecoilValue(fontState)
        const SIZES = useRecoilValue(sizeState)
        const AVATAR = useRecoilValue(avatarState)
        const navigation = useNavigation();


        // Calendar Dots
        const assignDot = {key: 'assignDot', color: COLORS.gradientColor1, selectedDotColor: 'white',};
        const meetingDot = {key: 'meetingDot', color: COLORS.gradientColor2, selectedDotColor: 'white'};

    //////////////////
    // Recoil State //
    //////////////////

            const [user, setUser] = useRecoilState(userState)

            const [meetings, setMeetings] = useRecoilState(meetingState)

            const [assignments, setAssignments] = useRecoilState(assignState)

            const [schedNotis, setSchedNotis] = useRecoilState(scheduleNotifications)

    /////////////////
    // Local State //
    /////////////////

            // Determines whether Meetings or Assginments are shown
            const [tabState, setTabState] = useState("meetings")

            // Detrmines whether on the Calendar View or the All view
            const [allPageTab, setAllPageTab] = useState("meetings")

            // Assures the Calendar or Assignments / Meetings don't render prematurely
            const [loading, setLoading] = useState(true)

            // In charge of rendering the detailed modal of an assignment if clicked
            const [showAssignModal, setShowAssignModal] = useState(false)

            // The contents of the assignment that would be displayed in the Modal
            const [selectedAssignment, setSelectedAssignment] = useState({})

        ///////////////////////////////
        // Date and Assignment Logic //
        ///////////////////////////////


            // The currently Selected Day 
            const [selectedFullDate, setSelectedFullDate] = useState(new Date())
            
            // Meetings on the Selected Day
            const [selectedMeetings, setSelectedMeetings] = useState([])

            // Assignments on the Selected Day
            const [selectedAss, setSelectedAss] = useState([])

            // The Days With Meetins
            const [meetingDays, setMeetingDays] = useState([])

            // The Days With Assignments
            const [assDays, setAssDays] = useState([])

            // The Object for the Calendar
            const [markedDateObjects, setMarkedDateObjects] = useState({})


    //////////////////
    //   UseState   //
    //////////////////

            //////////////////////////////
            // Sets All Calendar States //
            useState(() => {
                handleAllDates()
            }, [])

            /////////////////////////////////////////////////////////////////////////////
            // Changes SelectedAssignments and Selected Meetings to match Selected Day //
            useEffect(() => {

                findAndSetAllTodaysMeetings()
                findAndSetAllTodaysAssignments()
                handleNotifications(selectedFullDate)
                handleSeenAssignment(selectedFullDate)
                
                // Changes the 'today' marked indicator to the day you clicked on
                let allDays = Object.keys(markedDateObjects)
                let hit = false

                // Goes through all of the dates that are listed as keys
                allDays.forEach( day => {
                    if (markedDateObjects[day].selected){
                        setMarkedDateObjects( markedDateObjects => ({
                            ...markedDateObjects,
                            [day]: {...markedDateObjects[day], selected: false}
                        }))
                    }
                    else if (selectedFullDate.toString().includes(day)){
                        setMarkedDateObjects( markedDateObjects => ({
                            ...markedDateObjects,
                            [day]: {...markedDateObjects[day], selected: true}
                        }))
                        hit = true
                    }
                })

                if (!hit){
                    setMarkedDateObjects( markedDateObjects => ({
                        ...markedDateObjects,
                        [selectedFullDate.toString().slice(0, 9)]: {selected: true}
                    }))
                }

                setLoading(false)


            }, [selectedFullDate])

            ///////////////////////////////////////////////////
            // Dismisses All Notifications on View All State //
            useEffect(() => {
                if (tabState === "all"){
                    handleNotifications("all")
                    handleSeenAssignment("all")
                }
            }, [])

    ///////////////
    // Mutations //
    ///////////////

    // Dismisses Notifications
    const [dismissNotifications, { loading: loadingDis, error: errorDis, data: typeDis }] =useMutation(DISMISS_NOTIFICATION);

    // Triggers Seen Assignments
    const [toggleAssignmentSeen, { loading: loadingA, error: errorA, data: typeA }] =useMutation(TOGGLE_ASSGINMENT_SEEN);

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
                    title={"Calendar"}
                />
            </View>    
        ) 
    }

    // Renders The Date Obj ( Mon Sep 15 2022 )
    function renderSelectedDate(){
        return(
            <Text style={{...FONTS.Title, color: 'white', textAlign: 'center'}}>
                {convertDateTimeToString(selectedFullDate).slice(0, 15)}
            </Text>
        )
    }

    //////////////
    // Calendar //
    //////////////


        // Renders the Calendar and its Styles
        const renderCalendar = () => {
            if (loading){
                return null
            }
            else{
                return(<CalendarComponent allAssignments={assignments} allMeetings={meetings} markedDates={markedDateObjects} loading={loading} setLoading={setLoading} setSelectedFullDate={setSelectedFullDate}/>)
            }
        }


    //////////////////////////////
    // Meetings and Assignments //
    //////////////////////////////

        // Renders Meetings on This Day
        function renderDaysMeetings(all){

            // Determines if its showing daily or all meetings
            meetForThisFunction = selectedMeetings
            if (all){
                meetForThisFunction = meetings
            }


            ////////////////
            // Not Loaded //
            if (!meetForThisFunction){
                return null
            }

            //////////////////////////////
            // No meetings on this date //
            if (meetForThisFunction.length < 1){ 
              return(
                <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 18, color: COLORS.iconLight, textAlign: 'center', margin: 10}}>
                    You have no meetings scheduled!
                </Text>
              ) 
            }

            ///////////////////////////
            // Meetings on this date //
            else {
                return meetForThisFunction.map(meeting => {
                    let d = displayMeetingData(meeting).allTme
                    let t = displayMeetingData(meeting).type
                    return(
                        <View style={{marginright: 4, marginLeft: 4, marginBottom: 4, borderColor: COLORS.iconLight, borderWidth: 1, borderRadius: 10, flexDirection: 'row'}}>
                            <Text style={{...FONTS.SubTitle, fontSize: 20, color: COLORS.iconLight, padding: 7, width: 180}}>
                                {t} Meeting
                            </Text>
                            <Text style={{...FONTS.SubTitle, fontSize: 18, color: COLORS.iconLight, padding: 7, marginLeft: 0}}>
                                |  {d.month}-{d.date}  |  
                            </Text>
                            <Text style={{...FONTS.SubTitle, fontSize: 18, color: COLORS.iconLight, padding: 7, marginLeft: -3}}>
                                {d.time}
                            </Text>
                        </View>
                    )
                })
            }
        }

        // Renders Assignments that exist on this day
        function renderDaysAssignments(all){
            assForThisFunction = selectedAss
            if (all){
                assForThisFunction = assignments
            }

            ////////////////
            // Not Loaded //
            if (!assForThisFunction){
                return null
            }

            /////////////////////////////////
            // No Assignments on this date //
            if (!assForThisFunction[0]){ 
                return( 
                    <Text style={{fontFamily: 'Gilroy-SemiBold', fontSize: 18, color: COLORS.iconLight, textAlign: 'center', margin: 10}}>
                        Your children have no assignments on this date!
                    </Text>
                )
            }

            ///////////////////////////
            // Meetings on this date //
            else {
                return assForThisFunction.map(assign => {
                    return(
                        <TouchableOpacity 
                            style={{marginright: 4, marginLeft: 4, marginBottom: 4, borderColor: COLORS.iconLight, borderWidth: 1, borderRadius: 10, flexDirection: 'row'}}
                            onPress={() => handleOpenAssignment(assign)}
                        >
                            <View>
                                <Text style={{...FONTS.SubTitle, fontSize: 20, color: COLORS.iconLight, padding: 7}}>
                                    Assignment
                                </Text>
                                <Text style={{...FONTS.SubTitle, color: COLORS.iconLight, padding: 7, fontSize: 14, letterSpacing: -.5}}>
                                    Date Started: {assign.dateStart}
                                </Text>
                            </View>
                            <View>
                                <Text style={{...FONTS.SubTitle, fontSize: 20, color: COLORS.iconLight, padding: 7, paddingLeft: -7, marginLeft: -10,  marginLeft: 5}}>
                                    {assign.videos.length} Videos 
                                </Text>
                                <Text style={{...FONTS.SubTitle, color: COLORS.iconLight, padding: 7, fontSize: 14, letterSpacing: -.5}}>
                                    Date Due: {assign.dateDue}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        }

        // Renders TabBar for selection
        function renderAssignmentsOrMeetingsTab(){
            return(
                <View style={{alignItems: 'center'}}>
                    <TabBar
                        tabsArray={["Meetings", "Assignments", "View All"]}
                        onChangeIndex={(index) => handleTabChange(index)}
                        styleActive={{borderBottomColor: COLORS.iconLight, borderBottomWidth: 3, padding: 2, marginRight: 5, marginLeft: 5, width: 110}}
                        styleInactive={{borderBottomColor: "white", borderBottomWidth: 0, padding: 2, marginRight: 5, marginLeft: 5, width: 110}}
                        tabTextStyleActive={{fontFamily: "Gilroy-Bold", textAlign: 'center', fontSize: 16, color: COLORS.iconLight, marginBottom: 3}}
                        tabTextStyleInactive={{fontFamily: "Gilroy-Bold", textAlign: 'center', fontSize: 16, color: "white", marginBottom: 3}}
                    />
                </View>
            )
        }

        // Renders the content
        const renderMeetingsOrAssignmnets = (all) => {
            if (!all){
                if (tabState === "meetings"){
                    return(
                        <ScrollView>
                            {renderDaysMeetings()}
                        </ScrollView>
                    )
                }
                else if (tabState === "assignments"){
                    return(
                        <ScrollView>
                            {renderDaysAssignments()}
                        </ScrollView>
                    )
                }
            }
            else if (tabState === "all" && all){
                if (allPageTab === "meetings"){
                    return(
                        <ScrollView>
                            {renderDaysMeetings(all)}
                        </ScrollView>
                    )
                }
                else if (allPageTab === "assignments"){
                    return(
                        <ScrollView>
                            {renderDaysAssignments(all)}
                        </ScrollView>
                    )
                }
            }
        }

    ////////////
    // Modals //
    ////////////

        function renderAssignmentModal(){
            return(
                <Modal
                    isVisible={showAssignModal}
                    onBackdropPress={() => setShowAssignModal(!showAssignModal)}
                    hideModalContentWhileAnimating={true}
                    backdropTransitionOutTiming={0}
                    style={{ margin: 0 }}
                    animationIn="zoomIn"
                    animationOut="zoomOut"
                >
                    {renderAssignmentModalContent()}
                </Modal>
            )
        }

        function renderAssignmentModalContent(){
            if (!showAssignModal){
                return null
            }
            return(
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
                    <Text style={{...FONTS.Title, color: 'black', marginBottom: 20}}>
                        {selectedAssignment.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 6}}>
                            <Text style={{...FONTS.SubTitle, marginBottom: 10}}>
                                Assigned Videos
                            </Text>
                            {renderAllVideos(selectedAssignment.videos)}
                        </View>
                        <View style={{flex: 4}}>
                            <View style={{borderWidth: 1, borderRadius: 15, padding: 10}}>
                                <Text style={{...FONTS.SubTitle, marginBottom: 10}}>
                                    Date Assigned
                                </Text>
                                <Text>
                                    {selectedAssignment.dateStart}
                                </Text>
                            </View>

                            <View style={{borderWidth: 1, borderRadius: 15, padding: 10}}>
                                <Text style={{...FONTS.SubTitle, marginBottom: 10}}>
                                    Date Due
                                </Text>
                                <Text>
                                    {selectedAssignment.dateDue}
                                </Text>
                            </View>
                        </View>
                    </View>

    
                </View>
            )
        }

        function renderAllVideos(vids){
            return vids.map(vid => {
                return(
                    <Text style={{...FONTS.SubTitle, lineHeight: 25, padding: 5, marginRight: 30, paddingLeft: 8, borderWidth: 1, borderRadius: 15, marginBottom: 5}}>
                        {deslugVideoTitle(vid)}
                    </Text>
                )
            })
        }

///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////

    //////////////////
    // Initializers //
    //////////////////
        
        // EXTRACTS MEETINGS AND ASSIGNMNETS, ASSIGNS THEM TO STATE AND MARKEDATES
        async function handleAllDates(){

            return await handleAllMeetings()
            .then( async () => {
                await handleAllAssignmnets()
            })
            .then(() => {
                return true
            })


        }

        // Sets markedDate for Meetings. RUNS FIRST
        async function handleAllMeetings(){
            //////////////////
            // All Meetings //
            await meetings.forEach( async meeting => {
                let jsTime = (convertDateTimeToJavaScript(meeting.meetingDateTime))
                let timekey = `${jsTime.year}-${(jsTime.month)}-${(jsTime.date)}`
                await setMeetingDays(...meetingDays, timekey)
                await setMarkedDateObjects( markedDateObjects => ({
                    ...markedDateObjects, [timekey]: { marked: true, dots: [meetingDot], color: 'white', activeOpacity: 0.5,}
                }))
            })
            return true
        }

        // Sets markedDate for Assignments. RUNS SECOND
        async function handleAllAssignmnets(){

            let theseAssignments = assignments

            /////////////////////
            // All Assignments //
            await theseAssignments.forEach( async assign => {
                let year = assign.dateDue.slice(7, 11)
                let day = (assign.dateDue.slice(4, 6))
                let month = assign.dateDue.slice(0, 4)
                month = (convertMonthToNumber(month))
                let timekey = (`${year}-${month.toString().padStart(2, '0')}-${(day)}`)
                await setAssDays(...assDays, )
                let dots = [assignDot]
                if (markedDateObjects[timekey]){
                    if (markedDateObjects[timekey].dots){
                        dots = [...markedDateObjects[timekey].dots, assignDot]
                    }
                }
                await setMarkedDateObjects( markedDateObjects => ({
                    ...markedDateObjects, [timekey]: { marked: true, dots: dots, color: 'white', activeOpacity: 0.5 }
                }))
                year = assign.dateStart.slice(7, 11)
                day = (assign.dateStart.slice(4, 6))
                month = assign.dateStart.slice(0, 4)
                month = (convertMonthToNumber(month))
                timekey = (`${year}-${month.toString().padStart(2, '0')}-${(day)}`)
                await setAssDays(...assDays, )
                dots = [assignDot]
                if (markedDateObjects[timekey]){
                    if (markedDateObjects[timekey].dots){
                        dots = [...markedDateObjects[timekey].dots, assignDot]
                    }
                }
                await setMarkedDateObjects( markedDateObjects => ({
                    ...markedDateObjects, [timekey]: { marked: true, dots: dots, color: 'white', activeOpacity: 0.5 }
                }))
            })
            return true
        }

        // Handles Notifications -- Fired right away upon loading this page
        function handleNotifications(date){
            let notisToDismiss = getSchedNotificationsToBeDismissed(schedNotis, date)
            notisToDismiss.forEach((noti) => {
                dismissNotificationsMutation(noti)
            })
            getAndSetNotifications()
        }

        // Handles the actual dismissal mutation
        async function dismissNotificationsMutation(notification){
            return await dismissNotifications({
                variables: {
                    notificationID: notification.id
                }
            })
            .then((resolved) => {
                getAndSetNotifications()
            })
            .catch(err => console.log(err, "============\n614\n==========="))
        }

        // Gets and Sets Notifications, sets categorical notis too
        async function getAndSetNotifications(){
            setSchedNotis( schedNotis => [])
            await client.query({
                query: GET_NOTIFICATIONS,
                fetchPolicy: 'network-only'
            })
            .catch(err => console.log(err, "============\n624\n==========="))
            .then((resolved) => {
                let msgN = resolved.data.getNotifications.filter((noti, index) => {
                    if (noti.title.includes("New Message")){
                        return noti
                    }
                })
                setSchedNotis( schedNotis => ([...msgN]))
            })
        }

        // Takes Assignments of Today to Set as Seen
        function handleSeenAssignment(date){
            let assignmentsToSeen = findAssignmentsToSee(assignments, date)
            if (user.role === "CHILD")
            assignmentsToSeen.forEach((ass) => {
                seeAssignmentMutation(ass)
            })
        }

        // Sets the assignment provided as seen
        async function seeAssignmentMutation(ass){
            return await toggleAssignmentSeen({
                variables:{
                    assignmentID: ass.id,
                    hasSeen: true
                }
            })
            .then(resolved => {
                // console.log(resolved)
            })
        }

    //////////////
    // Handlers //
    //////////////
    

        // Determines Tab State Meetings or Assignments
        function handleTabChange(index){
            if (index === 0){
                setTabState("meetings")
            }
            else if (index === 1){
                setTabState("assignments")
            }
            else if (index === 2){
                setTabState("all")
            }
        }

        // Determines Tab State Meetings or Assignments on All Page
        function handleTabChange2(index){
            if (index === 0){
                setAllPageTab("meetings")
            }
            else if (index === 1){
                setAllPageTab("assignments")
            }
            else if (index === 2){
                setTabState("all")
            }
        }

        // Opens an Assignment Modal
        function handleOpenAssignment(assignment){
            setSelectedAssignment( selectedAssignment => ({
                ...assignment
            }))
            setShowAssignModal(true)
        }

        // Turns IN_PERSON to In Person
        function displayMeetingData(meeting){
            let type = "In Person"
            if (meeting.type !== "IN_PERSON"){
                type = "Phone"
            }
            let jsDate = convertDateTimeToJavaScript(meeting.meetingDateTime)
            return {allTme: jsDate, type: type}
        }

        function handleMonthDateYearFormatting(dateArr){
            // [sep, 28, 2022]   => 2022-09-28
            let m = convertMonthToNumber(dateArr[0]).toString()
            m = m.padStart(2, '0')
            let d = dateArr[1]
            let y = dateArr[2]
            return `${y}-${m}-${d}`
        }

    /////////////
    // Finders //
    /////////////

        // Finds and sets all meetings that are today
        function findAndSetAllTodaysMeetings(){
            let todaysMeetings = meetings.filter(meeting => {
                let meetingDateAbv = meeting.meetingDateTime.slice(0, 10) 
                let selectedDateAbv = selectedFullDate.toString()
                if (meetingDateAbv === fullStringToDateFormat(selectedDateAbv)){
                    return meeting
                }
            })
            setSelectedMeetings([...todaysMeetings])
        }

        // Finds and sets all assignments
        function findAndSetAllTodaysAssignments(){

            // Finds the assignment stack
            let theseAssignments = assignments
            

            // Determines which of all the assignments are today
            let todaysAssignments = theseAssignments.filter(assign => {
                let assignStartArr = assign.dateStart.split(" ")
                let assignDueArr = assign.dateDue.split(" ")

                let assignStart = handleMonthDateYearFormatting(assignStartArr)
                let assignDue = handleMonthDateYearFormatting(assignDueArr)

                let selectedDateAbv = selectedFullDate.toString()
                selectedDateAbv = (fullStringToDateFormat(selectedDateAbv))

                if (assignStart === selectedDateAbv || assignDue === selectedDateAbv){
                    return assign
                }
            })

            // Sets selected
            setSelectedAss([...todaysAssignments])
        }


///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////


    function MAIN(){
        if (tabState === "assignments" || tabState === "meetings"){
            return(
                <>
                    {renderHeader()}
                    <ScrollView 
                    style={{height: '110%'}}
                    contentContainerStyle={{height: '120%'}}>
                        {renderCalendar()}
                        {renderAssignmentModal()}
                        <View style={{backgroundColor: 'rgba(255, 255, 255, 0.25)', margin: 10, marginTop: 50, borderRadius: 10, padding: 10}}>
                            {renderSelectedDate()}
                            {renderAssignmentsOrMeetingsTab()}
                            {renderMeetingsOrAssignmnets()}
                        </View>
                        <View style={{height: 120}}/>
                    </ScrollView>
                </>
            )
        }
        else{
            return(
                <>
                    {renderHeader()}
                    {renderAssignmentModal()}
                    <View style={{alignItems: 'center'}}>
                        <TabBar 
                            tabsArray={["Meetings", "Assignments",]}
                            onChangeIndex={(index) => handleTabChange2(index)}
                            styleActive={{borderBottomColor: COLORS.iconLight, borderBottomWidth: 3, padding: 2, marginRight: 5, marginLeft: 5, width: 110}}
                            styleInactive={{borderBottomColor: "white", borderBottomWidth: 0, padding: 2, marginRight: 5, marginLeft: 5, width: 110}}
                            tabTextStyleActive={{fontFamily: "Gilroy-Bold", textAlign: 'center', fontSize: 16, color: COLORS.iconLight, marginBottom: 3}}
                            tabTextStyleInactive={{fontFamily: "Gilroy-Bold", textAlign: 'center', fontSize: 16, color: "white", marginBottom: 3}}
                        />
                    </View>
                    <View style={{marginLeft: 10, marginRight: 10, height: 500}}>
                        {renderMeetingsOrAssignmnets(true)}
                    </View>
                    
                    <View style={{marginRight: 30, marginLeft: 30}}>
                        <Button
                            title={"Return to Calendar"}
                            onPress={() => handleTabChange(0)}
                        />
                    </View>
                </>
            )
        }
    }


    return(
        <Gradient
            colorOne={COLORS.gradientColor1}
            colorTwo={COLORS.gradientColor2}
            style={{height: '100%'}}
        >
            {MAIN()}
        </Gradient>
    )

}