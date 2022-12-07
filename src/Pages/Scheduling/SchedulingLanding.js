// Reaact
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from "react-native";
import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import DatePicker from "../../../OstrichComponents/DatePicker";

// Nuton
import { Header, } from "../../../NutonComponents";

// Apollo GraphQl
import { GET_USER, CREATE_ASSIGNMENT, CREATE_MEETING } from "../../../GraphQL/operations";
import { useMutation } from "@apollo/client";
import client from "../../utils/apolloClient"

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, userState, colorState, fontState, avatarState, videoDataState, meetingState, assignState } from '../../../Recoil/atoms';

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import TabBar from "../../../OstrichComponents/TabBar";
import SelectionButton from "../../../OstrichComponents/SelectionButton";
import Dropdown from "../../../OstrichComponents/Dropdown";
import OptionsButtons from "../../../OstrichComponents/OptionsButtons"
import LoadingComponent from "../../Global/LoadingComponent"

// Hooks
import getAllTherapistClients from "../../Hooks/value_extractors/therapistValues/getAllTherapistClients"
import getAllTherapistClientGuardians from "../../Hooks/value_extractors/therapistValues/getAllTherapistClientGuardians"
import convertMonthIntoNumber from "../../Hooks/date_and_time/convertMonthIntoNumber"
import convertDateTimeToJavaScript from "../../Hooks/date_and_time/convertDateTimeToJavaScript"

// Dimensions
let maxHeight = Dimensions.get('window').height

///////////// SchedulingLanding ///////////// SchedulingLanding ///////////// SchedulingLanding ///////////// SchedulingLanding ///////////// SchedulingLanding
export default function SchedulingLanding() {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    //////////////////
    // Recoil State //
    //////////////////

        // User
        const [user, setUser] = useRecoilState(userState)

        // Selectable Videos
        const [videos, setVideos] = useRecoilState(videoDataState)

        // Therapist Clients
        const [clients, setClients] = useState(getAllTherapistClients(user))

        // All of your clients' parents
        const [guardianClients, setGuardianClients] = useState(getAllTherapistClientGuardians(user))
        
        // All of the Meetings
        const [meetings, setMeetings] = useRecoilState(meetingState)

        // All of the Assignments
        const [assignments, setAssignments] = useRecoilState(assignState)

    ///////////////
    // Constants // 
    ///////////////

        const COLORS = useRecoilValue(colorState)
        const FONTS = useRecoilValue(fontState)
        const SIZES = useRecoilValue(sizeState)
        const AVATAR = useRecoilValue(avatarState)
        const navigation = useNavigation();

    /////////////////
    // Local State //
    /////////////////

        // Whether Upcoming Meetings or Current Assignments are Shown
        const [displayState, setDisplayState] = useState("meetings")

        // Selected Videos
        const [selectedVideos, setSelectedVideos] = useState([])

        // Selected Clients
        const [selectedClients, setSelectedClients] = useState([])

        // Loading
        const [loading, setLoading] = useState(false)

        // Resets DatePicker
        const [reset, setReset] = useState(false)

        //////////////////////////
        // Modals and Dropdowns //
        //////////////////////////

            // Tracks Assignment Modal Trigger
            const [showAssignmentsModal, setShowAssignmentsModal] = useState(false)

            // Tracks Meeting Modal Trigger
            const [showMeetingsModal, setShowMeetingsModal] = useState(false)

            // Tracks Client Dropdown
            const [showClientDropdown, setShowClientDropdown] = useState(false)

            // Tracks whether setting start date
            const [startDateOpen, setStartDateOpen] = useState(false)

            // Tracks whether setting end date
            const [endDateOpen, setEndDateOpen] = useState(false)

        ///////////////////////////////
        // Dates and Scheduling Data //
        ///////////////////////////////

            const today = new Date()

            // Assignments or Meetings
            const [scheduleType, setScheduleType] = useState(false)


            // Videos //

                const [startDate, setStartDate] = useState(today)

                const [endDate, setEndDate] = useState(today)

            // Meetings //

                const [meetingDateObj, setMeetingDateObj] = useState(today)

                const [meetingType, setMeetingType] = useState(false)

        ///////////////
        // Mutations //
        ///////////////

            // Create Assginment
            const [createAssignment, { loading: loadingCreate, error: errorCreate, data: typeCreate }] = useMutation(CREATE_ASSIGNMENT);

            // Create Meeting Mutation
            const [createMeeting, {loading: loadingMeeting, error: errorMeeting, data: meetingData}] = useMutation(CREATE_MEETING)

            // Gets the user obj and resets the userState
            async function getAndSetUser(){
                await client.query({
                    query: GET_USER,
                    fetchPolicy: 'network-only'  
                })
                .then(async (resolved) => {
                    await setUser(resolved.data.getUser)
                })
                .catch((error) => {
                    console.log(error)
                })
            }

///////////////////////
///                 ///
///    useEffect    ///
///                 ///
///////////////////////

    useEffect(() => {
        setSelectedClients([])
        setSelectedVideos([])
    },[showMeetingsModal, showAssignmentsModal])

    useEffect(() => {
        setReset(!reset)
    }, [startDateOpen, endDateOpen, showAssignmentsModal, showMeetingsModal])

//////////////////////
///                ///
///     Styles     ///
///                ///
//////////////////////

const Styles = StyleSheet.create({
    upcomingView: {
        height: maxHeight * 0.4, 
        borderColor: COLORS.iconLight, borderWidth: 1, borderRadius: 15, 
        marginLeft: 10, marginRight: 10, marginBottom: 15
    }
})
        
///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    /////////////////////////
    // Information Display //
    /////////////////////////

        // Renders the header bar and back arrow
        function renderHeader() {
                return(
                    <View style={{marginTop: 45}}>
                        <Header 
                            onPress={() => navigation.goBack()}
                            goBack={true}
                            profile={true}
                            filterOnPress={() => navigation.navigate("SettingsLanding")}
                            title={"Scheduling"}
                        />
                    </View>    
                ) 
        }

        // Renders the Next Upcoming Meetings
        function renderUpcomingMeetings(){
            if (meetings.length < 1){  // no meetings
                return(
                    <View style={Styles.upcomingView}>
                        <Text style={{...FONTS.Title, color: COLORS.iconLight, textAlign: 'center', margin: 10}}>
                            You have no meetings scheduled on this date!
                        </Text>
                    </View>
                )
            }
            return(
                <ScrollView style={{...Styles.upcomingView, maxHeight: 350}}>
                    {renderMeetingsList()}
                </ScrollView>
            )
        }

        // Renders each meeting card
        function renderMeetingsList(){
            return meetings.filter(meeting => {
                if (!meeting.completed && !meeting.canceled){
                    return meeting
                }
            }).map(meeting => {
                let dt = convertDateTimeToJavaScript(meeting.meetingDateTime)
                return(
                    <TouchableOpacity>
                        <View style={{flexDirection: 'row', margin: 8, borderWidth: 1, borderRadius: 15, borderColor: COLORS.iconLight, padding: 8}}>
                            <View style={{flex: 1, margin: 5}}>
                                <Text style={{...FONTS.SubTitle, color: COLORS.iconLight}}>
                                    Date: {dt.month} - {dt.date} - {dt.year}
                                </Text>
                                <Text style={{...FONTS.SubTitle, color: COLORS.iconLight}}>
                                    Time: {dt.time}
                                </Text>
                            </View>
                            <View style={{flex: 1, margin: 5, alignItems: 'flex-end'}}>
                                <Text style={{...FONTS.SubTitle, color: COLORS.iconLight}}>
                                    {meeting.type}
                                </Text>
                                <Text style={{...FONTS.SubTitle, color: COLORS.iconLight}}>
                                    With {meeting.users[0].firstName}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })
        }

        // Renders the Assignments that are currently ongoing
        function renderCurrentAssignments(){
            if (assignments.length < 1){  // no meetings
                return(
                    <View style={Styles.upcomingView}>
                        <Text style={{...FONTS.Title, color: COLORS.iconLight, textAlign: 'center', margin: 10}}>
                            You have no assignments scheduled!
                        </Text>
                    </View>
                )
            }
            return(
                <ScrollView style={{...Styles.upcomingView, maxHeight: 350}}>
                    {renderAssignmentCards()}
                </ScrollView>
            )
        }

        // Renders each assignment card
        function renderAssignmentCards(){
            return assignments[0].filter(ass => {
                // if (!ass.completed && !ass.canceled){

                    // Have it check against date
                    return ass
                // }
            }).map(ass => {
                let ds = ass.dateStart
                let de = ass.dateDue
                return(
                    <TouchableOpacity>
                        <View style={{flexDirection: 'row', margin: 8, borderWidth: 1, borderRadius: 15, borderColor: COLORS.iconLight, padding: 8}}>
                            <View style={{flex: 1, margin: 5}}>
                                <Text style={{...FONTS.SubTitle, color: COLORS.iconLight, marginBottom: 5}}>
                                    Date Start: {ds}
                                </Text>
                                <Text style={{...FONTS.SubTitle, color: COLORS.iconLight}}>
                                    Date End: {de}
                                </Text>
                            </View>
                            {/* <View style={{flex: 1, margin: 5, alignItems: 'flex-end'}}>
                                <Text style={{...FONTS.SubTitle, color: COLORS.iconLight}}>
                                    {meeting.type}
                                </Text>
                                <Text style={{...FONTS.SubTitle, color: COLORS.iconLight}}>
                                    With {meeting.users[0].firstName}
                                </Text>
                            </View> */}
                        </View>
                    </TouchableOpacity>
                )
            })
        }

        // Renders the Tab Bar to display upcoming meetings or current assignments
        function renderMeetingsAssignmentsTabBar(){
            return(
                <View style={{alignItems: 'center', marginTop: 20}}>
                    <TabBar 
                        tabsArray={["Upcoming Meetings", "Current Assignments"]}
                        styleActive={{borderBottomColor: COLORS.iconLight, borderBottomWidth: 3, padding: 2, marginRight: 15, marginLeft: 15, width: 120}}
                        styleInactive={{borderBottomColor: "grey", padding: 2, marginRight: 15, marginLeft: 15, width: 120}}
                        tabTextStyleActive={{fontFamily: "Gilroy-Bold", textAlign: 'center', fontSize: 16, color: COLORS.iconLight, marginBottom: 3}}
                        tabTextStyleInactive={{fontFamily: "Gilroy-Bold", textAlign: 'center', fontSize: 16, color: "white", marginBottom: 3}}
                        onChangeIndex={(index) => handleTabChange(index)}
                    />
                </View>
            )
        }

        // Dependent on Tab State, renders Meetings or Assingments
        function renderUpcomingDisplay(){
            if (displayState === "meetings"){
                return renderUpcomingMeetings()
            }
            else if (displayState === "assignments"){
                return renderCurrentAssignments()
            }
        }

    /////////////////////////
    //  Creation Displays  //
    /////////////////////////

        // Renders Both the Meeting and Assignments Button
        function renderCreationButtons(){
            return(
                <View>
                    {renderCreateAssignment()}
                    {renderCreateMeeting()}
                </View>
            )
        }

        // Opens Assignment Modal
        function renderCreateAssignment(){
            return(
                <SelectionButton 
                    title={"Create New Assignment"}
                    subtitle={"Assign Videos to your clients to complete"}
                    leftAlign={true}
                    onSelect={() => setShowAssignmentsModal(true)}
                />
            )
        }

        // Opens the Create Meeting Modal
        function renderCreateMeeting(){
            return(
                <SelectionButton 
                    title={"Create New Meeting"}
                    subtitle={"Schedule Meetings with your clients"}
                    leftAlign={true}
                    onSelect={() => setShowMeetingsModal(true)}
                />
            )
        }

    ////////////////////
    // Modal Displays //
    ////////////////////

        // Renders the Assignments Modal
        function renderAssignmentsModal(){
            if (!showAssignmentsModal){
                return null
            }
            return (
                <Modal
                    isVisible={showAssignmentsModal}
                    onBackdropPress={() => setShowAssignmentsModal(false)}
                    hideModalContentWhileAnimating={true}
                    backdropTransitionOutTiming={0}
                    style={{ margin: 0 }}
                    animationIn="zoomIn"
                    animationOut="zoomOut"
                >
                    {renderAssignmentsModalContent()}
                </Modal>
            );
        }

        // Renders the Main Content on Assignment Modals
        function renderAssignmentsModalContent(){
            return(
                <View
                    style={{
                        width: SIZES.width - 40,
                        backgroundColor: COLORS.white,
                        marginHorizontal: 20,
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        paddingTop: 40,
                        paddingBottom: 10,
                    }}
                >
                    <Text style={{...FONTS.Title, textAlign: 'center', marginBottom: 15}}>Assign Videos to Clients</Text>

                    {/* For Date Ranges */}
                    {renderDateRangeForAssignments()}

                    {/* Date Picker */}
                    {renderDatePicker()}
                    
                    {/* Client Selection */}
                    {renderClientDropdown("children")}

                    {/* Video Selection */}
                    {renderVideoDropDown()}

                    {/* Renders Confrimation or Cancellation */}
                    {renderAssignOrCancelForModal()}
                </View>
            )
        }

        // Renders the Meetings Modal
        function renderMeetingsModal(){
            if (!showMeetingsModal){
                return null
            }
            return (
                <Modal
                    isVisible={showMeetingsModal}
                    onBackdropPress={() => setShowAssignmentsModal(false)}
                    hideModalContentWhileAnimating={true}
                    backdropTransitionOutTiming={0}
                    style={{ margin: 0 }}
                    animationIn="zoomIn"
                    animationOut="zoomOut"
                >
                    {renderMeetingsModalContent()}
                </Modal>
            );
        }

        // Renders the Options Buttons
        function renderMeetingType(){
            return(
                <View style={{paddingTop: 15}}>
                    <Text style={{textAlign: 'center', ...FONTS.SubTitle, marginBottom: 10}}>
                        Select the Type of Meeting
                    </Text>
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

        // Renders the Meetings Modal
        function renderMeetingsModalContent(){
            return(
                <View
                    style={{
                        width: SIZES.width - 40,
                        backgroundColor: COLORS.white,
                        marginHorizontal: 20,
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        paddingTop: 40,
                        paddingBottom: 10,
                    }}
                >
                    <Text style={{...FONTS.Title, textAlign: 'center', marginBottom: 15}}>Schedule a Meeting</Text>

                    {/* Date Selection */}
                    <TouchableOpacity 
                        style={{alignItems: 'center', paddingTop: 3, paddingBottom: 3, marginRight: 5, borderWidth: 1}}
                        onPress={() => handleDateTimeClick("meeting")}
                    >
                        <Text>Meeting Date</Text>
                        <Text style={{fontFamily: "Gilroy-Bold", fontSize: 16, marginTop :5}}>
                            {(meetingDateObj).toString().substring(0, 15)}
                        </Text>
                    </TouchableOpacity>

                    {/* Date Picker */}
                    {renderDatePicker(true)}

                    {/* Client Selection */}
                    {renderClientDropdown("guardians")}

                    {/* Options Button */}
                    {renderMeetingType()}

                    {/* Renders Confrimation or Cancellation */}
                    {renderMeetingOrCancelForModal()}

                </View>
            )
        }

    // Dates //

        // Renders the two input fields for Assignment Assigning
        function renderDateRangeForAssignments(){
            return(
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <TouchableOpacity 
                        style={{flex: 1, alignItems: 'center', paddingTop: 3, paddingBottom: 3, marginRight: 5, borderWidth: 3, borderRadius: 5, ...determineSelectedTimeBracket(startDateOpen)}}
                        onPress={() => handleDateTimeClick("start", "assignments")}
                    >
                        <Text>Start Date</Text>
                        <Text style={{fontFamily: "Gilroy-Bold", fontSize: 16, marginTop :5}}>
                            {(startDate).toString().substring(0, 15)}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{flex: 1, alignItems: 'center',  paddingTop: 3, paddingBottom: 3, marginLeft: 5, borderWidth: 3, borderRadius: 5, ...determineSelectedTimeBracket(endDateOpen)}}
                        onPress={() => handleDateTimeClick("end", "assignments")}
                    >
                        <Text>End Date</Text>
                        <Text style={{fontFamily: "Gilroy-Bold", fontSize: 16, marginTop :5}}>
                            {(endDate).toString().substring(0, 15)}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }

        // Renders Date Picker (Conditionally)
        function renderDatePicker(meetings){
            let white = true
            if (COLORS.iconLight !== "#fff" && COLORS.iconLight !== "#FFF"){
                white = false
            }
            if (startDateOpen || endDateOpen){
                return(
                    <View style={{marginTop: 20}}>
                        <DatePicker 
                            baseColor={COLORS.gradientColor2}
                            displayTileColor={COLORS.gradientColor1}
                            clearDate={reset}
                            startDate={determineStartDate().dateString}
                            onDateChange={(resolved) => handleDateChange(resolved)}
                            whiteArrow={white}
                            timeTitleStyle={{color: COLORS.iconLight, fontFamily: "Gilroy-Bold", marginBottom: 15, fontSize: 16}}
                            dateTextStyle={{fontSize: 26, fontFamily: 'Gilroy-SemiBold', textAlign: 'center', paddingTop: 2}}
                            displayTileStyle={{borderWidth: 0, padding: 7, minWidth: 90, height: 40, borderRadius: 5}}

                            timePicker={meetings}
                        />
                    </View>
                )
            }
        }
        

    // Clients //

        // Renders Client Selection Dropdown
        function renderClientDropdown(childrenOrGuardian){
            if (!showAssignmentsModal && !showMeetingsModal){
                return null
            }
            let title = "Clients"
            let prompt = "Select Clients to Schedule a Meeting With"
            if (selectedClients.length > 0){
                title = `${selectedClients.length} Clients Selected`
            }
            if (childrenOrGuardian === "children"){
                prompt = "Select Clients to Assign Videos to"
                let childrenNames = clients.map(client => {
                    return `${client.firstName} ${client.lastName}`
                })
                return(
                    <View style={{marginTop: 20}}>
                        <Text style={{marginBottom: 10, textAlign: 'center', ...FONTS.SubTitle}}>{prompt}</Text>
                        <Dropdown
                            title={title}
                            titleStyle={{fontFamily: 'Gilroy-SemiBold', fontSize: 18, marginTop: 10}}

                            dropArray={clients}
                            dropTitleProp={"firstName"}
                            
                            onTitleClick={() => setShowClientDropdown(!showClientDropdown)}
                            onIndexClick={(content) => handleDropIndexClick(content, setSelectedClients, selectedClients)}

                            indexText={{fontFamily: "Gilroy-SemiBold", }}
                            selectedIndexColor={COLORS.gradientColor1}

                            
                        />
                    </View>
                )
            }
            else{
                return(
                    <View style={{marginTop: 20}}>
                        <Text style={{marginBottom: 10, textAlign: 'center', ...FONTS.SubTitle}}>Select Clients to Assign Videos to</Text>
                        <Dropdown
                            title={title}
                            titleStyle={{fontFamily: 'Gilroy-SemiBold', fontSize: 18, marginTop: 10}}

                            dropArray={guardianClients}
                            dropTitleProp={"firstName"}
                            
                            onTitleClick={() => setShowClientDropdown(!showClientDropdown)}
                            onIndexClick={(content) => handleDropIndexClick(content, setSelectedClients, selectedClients)}

                            indexText={{fontFamily: "Gilroy-SemiBold", }}
                            selectedIndexColor={COLORS.gradientColor1}

                            
                        />
                    </View>
                )
            }
        }

    // Videos //

        // Renders Video Selection Dropdown
        const renderVideoDropDown = () => {

            let title = "Videos"
            if (selectedClients.length > 0){
                title = `${selectedVideos.length} Videos Selected`
            }

            return(
                <View style={{marginTop: 20}}>
                    <Text style={{marginBottom: 10, textAlign: 'center', ...FONTS.SubTitle}}>Select the Videos</Text>
                    <Dropdown
                        title={title}
                        titleStyle={{fontFamily: 'Gilroy-SemiBold', fontSize: 18, marginTop: 10}}

                        dropArray={videos}
                        dropTitleProp={"title"}
                        
                        onTitleClick={() => setShowClientDropdown(!showClientDropdown)}
                        onIndexClick={(content) => handleDropIndexClick(content, setSelectedVideos, selectedVideos)}

                        indexText={{fontFamily: "Gilroy-SemiBold", }}
                        selectedIndexColor={COLORS.gradientColor1}

                        dropScrollStyle={{height: 200}}
                    />
                </View>
            )
        }

    // Static //

        // Renders the Assign or Cancel Buttons in the Assignment Modal
        function renderAssignOrCancelForModal(){
            return(
                <View
                    style={{
                        marginTop: 30,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity
                        style={{width: 130, height: 48, backgroundColor: COLORS.buttonColorLight, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 10, marginHorizontal: 7.5, borderColor: COLORS.buttonColorDark, borderWidth: 1}}
                        onPress={() => {handleAssignSubmissionClick()}}
                    >
                        <Text style={{ color: COLORS.confirm, ...FONTS.Lato_700Bold, fontSize: 18, textTransform: "capitalize" }} >
                            Assign
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={{
                            width: 130,
                            height: 48,
                            backgroundColor: COLORS.btnColor,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            marginHorizontal: 7.5,
                            marginTop: 10,
                        }}
                        onPress={() => setShowAssignmentsModal(false)}
                    >
                        <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.Lato_700Bold,
                                fontSize: 18,
                                textTransform: "capitalize",
                            }}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }

        // Renders the Assign or Cancel Buttons in the Assignment Modal
        function renderMeetingOrCancelForModal(){
            return(
                <View
                    style={{
                        marginTop: 30,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity
                        style={{width: 130, height: 48, backgroundColor: COLORS.buttonColorLight, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 10, marginHorizontal: 7.5, borderColor: COLORS.buttonColorDark, borderWidth: 1}}
                        onPress={() => {handleMeetingSubmissionClick()}}
                    >
                        <Text style={{ color: COLORS.confirm, ...FONTS.Lato_700Bold, fontSize: 18, textTransform: "capitalize" }} >
                            Assign
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={{
                            width: 130,
                            height: 48,
                            backgroundColor: COLORS.btnColor,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            marginHorizontal: 7.5,
                            marginTop: 10,
                        }}
                        onPress={() => setShowMeetingsModal(false)}
                    >
                        <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.Lato_700Bold,
                                fontSize: 18,
                                textTransform: "capitalize",
                            }}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }




///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////

    // Takes the int from index changing and assigns it a string state
    function handleTabChange(index){
        if (index === 0){
            setDisplayState("meetings")
        }
        else if (index ===1){
            setDisplayState("assignments")
        }
    }

    function handleSetMeetingType(index){
        if (index === 0){
            setMeetingType("PHONE")
        }
        else if (index === 1){
            setMeetingType("IN_PERSON")
        }
    }

    // Dates // 

        // Handles when a start or end date prompt is selected
        const handleDateTimeClick = (start_or_end, type=false) => {
            if (start_or_end === "start"){
                setEndDateOpen(false)
                setStartDateOpen(!startDateOpen)
            }
            else if (start_or_end === "end"){
                setStartDateOpen(false)
                setEndDateOpen(!endDateOpen)
            }
            if (type === "assignments"){
                setScheduleType("assignments")
            }
            else if (start_or_end === "meeting"){
                setStartDateOpen(!startDateOpen)
                setScheduleType("meetings")
            }
        }

        // Hadles the changing of a date from the Date Pciker
        const handleDateChange = (dateObj) => {
            if (showAssignmentsModal && !showMeetingsModal){
                if (startDateOpen && ! endDateOpen){
                    setStartDate(dateObj.dateObject)
                }
                else{
                    setEndDate(dateObj.dateObject)
                }
            }
            else{
                setMeetingDateObj(dateObj.dateObject)
            }
        }

        // Turns 6 into 06
        const addLeadingZero = (num) => {
            return String(num).padStart(2, '0')
        }

        // Determines, based on which date toggler, the start for the Date Picker (although the current-ness of the Date Object kinda fucks that all up currently)
        const determineStartDate = () => {
            if (showAssignmentsModal && !showMeetingsModal){
                if (startDateOpen && ! endDateOpen){
                    return startDate
                }
                else{
                    return endDate
                }
            }
            else{
                return meetingDateObj
            }
        }

    // Dropdowns // 

        // Runs when a dropdown item has been clicked
        const handleDropIndexClick = (content, setter, getter) => {
            let exists = false
            getter.forEach(got => {
                if (got.id === content.id){
                    exists = true
                }
            })
            if (!exists){
                setter([...getter, content])
            }
            else{
                setter([
                    ...getter.filter(value => {
                        if (value.id !== content.id){
                            return value
                        }
                    })
                ])
            }
        }


///////////////////////
///                 ///
///  Determinators  ///
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

    // Changes JavaScripts Date Object to a format that DateTime can handle
    const determineDateTimeConversion = (dateObj) => {
        let timeObj = dateObj.toString().slice(16, 24)
        nDateObj = (dateObj.toString().slice(4, 15))

        // YYYY-MM-DD hh:mm:ss
        let dateTimeYear = nDateObj.slice(7)
        let dateTimeMonth = convertMonthIntoNumber(addLeadingZero(nDateObj.slice(0, 4)))
        let dateTimeDate = addLeadingZero(nDateObj.slice(4, 7))

        let dateTimeFormat = `${dateTimeYear}-${dateTimeMonth}-${dateTimeDate}${timeObj}`
        return (new Date(dateObj).toISOString())
    }

///////////////////////
///                 ///
// Mutator + Helpers //
///                 ///
///////////////////////

    // Handles Hitting Submit onn Assignments Modal
    async function handleAssignSubmissionClick(){
        setLoading(true)
        await selectedClients.forEach((client) => {
            let dateString = startDate.toString()
            let sDate = dateString.slice(4, 16)
            dateString = endDate.toString()
            let eDate = dateString.slice(4, 16)
            handleCreateAssignment({client: client, sDate: sDate, eDate: eDate})
            .then((resolved) => {
                setShowAssignmentsModal(false)
            })
            .then(() => {
                getAndSetUser()
                setLoading(false)
            })
        })
    }

    // Runs the create Assignment Mutation
    async function handleCreateAssignment(obj){
        return await createAssignment({
            variables: {
                childCarePlanID: obj.client.childCarePlans[0].id,
                dateStart: obj.sDate,
                dateDue: obj.eDate,
                title: "Video Assignment",
                description: "Complete all of the Assgined Videos Before the End Date",
                videoIDs: extractIdsFromVideos()
            }
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    // Extracts the ids from each video in the selectedVideos state, 
    function extractIdsFromVideos(){
        return selectedVideos.map(vid => {
            return vid.id
        })
    }

    // Handles Hitting Submit on Meetings Modal
    async function handleMeetingSubmissionClick(){
        setLoading(true)
        await selectedClients.forEach((client) => {
           handleCreateMeeting(client)
           .then( (resolved) => {
           })
           .then(() => {
                getAndSetUser()
                setLoading(false)
           })
        })
        setShowMeetingsModal(false)
    }

    // Runs the create Meeting Mutation
    async function handleCreateMeeting(client){
        return await createMeeting({
            variables: {
                title: `${meetingDateObj} ${meetingType}`,
                meetingDateTime: determineDateTimeConversion(meetingDateObj),
                type: meetingType,
                participantIDs: [client.id],
            }
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
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
            style={{height: '100%'}}
        >
            {renderHeader()}
            <LoadingComponent loading={loading} label={"LOADING"} />
            {renderMeetingsAssignmentsTabBar()}
            {renderUpcomingDisplay()}
            {renderAssignmentsModal()}
            {renderMeetingsModal()}
            {renderCreationButtons()}
        </Gradient>
    )
}