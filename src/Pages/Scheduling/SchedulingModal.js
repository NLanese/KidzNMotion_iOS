// Reaact
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import Modal from "react-native-modal";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, userState, colorState, fontState, videoDataState, meetingState, assignState } from '../../../Recoil/atoms';

// Apollo GraphQl
import { GET_MEETINGS, CREATE_ASSIGNMENT, CREATE_MEETING, CREATE_USER_TO_USER_NOTIFICATION } from "../../../GraphQL/operations";
import { useMutation } from "@apollo/client";

// Ostrich
import DatePicker from "../../../OstrichComponents/DatePicker";
import Dropdown from "../../../OstrichComponents/Dropdown";
import OptionsButtons from "../../../OstrichComponents/OptionsButtons"

// Hooks
import getAllTherapistClients from "../../Hooks/value_extractors/therapistValues/getAllTherapistClients"
import getAllTherapistClientGuardians from "../../Hooks/value_extractors/therapistValues/getAllTherapistClientGuardians"
import convertMonthIntoNumber from "../../Hooks/date_and_time/convertMonthIntoNumber"
import sortVideosByLevel from "../../Hooks/videos/sortVideosByLevel";


export default function SchedulingModal({showAssignmentsModal, setShowAssignmentsModal, showMeetingsModal, setShowMeetingsModal, refresh, setRefresh, setLoading}) {
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

    //////////////////
    // Recoil State //
    //////////////////

        // User
        const [user, setUser] = useRecoilState(userState)

        // Selectable Videos
        const [videos, setVideos] = useRecoilState((videoDataState))

        // All of the Meetings
        const [meetings, setMeetings] = useRecoilState(meetingState)

    /////////////////
    // Local State //
    /////////////////

    // Loads possible Clients

        // Therapist Clients
        const [clients, setClients] = useState(getAllTherapistClients(user))

        // All of your clients' parents
        const [guardianClients, setGuardianClients] = useState(getAllTherapistClientGuardians(user))

    // Tracks the selected options (videos and clients)

        // Selected Videos
        const [selectedVideos, setSelectedVideos] = useState([])

        // Selected Clients
        const [selectedClients, setSelectedClients] = useState([])

    // Computer Functionality States
 
         // Resets DatePicker
         const [reset, setReset] = useState(false)

    // Dropdowns

        // Client Dropdown
        const [showClientDropdown, setShowClientDropdown] = useState(false)

    // Scheduling //

        // Today's Date
        const today = new Date()

        // Assignments or Meetings
        const [scheduleType, setScheduleType] = useState(false)

        // Date Trackers // 

            // Tracks whether setting start date
            const [startDateOpen, setStartDateOpen] = useState(false)

            // Tracks whether setting end date
            const [endDateOpen, setEndDateOpen] = useState(false)

        // Scheduling  //

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
        const [createAssignment, {loading: loadingCreate, error: errorCreate, data: typeCreate }] = useMutation(CREATE_ASSIGNMENT);

        // Create Meeting Mutation
        const [createMeeting, {loading: loadingMeeting, error: errorMeeting, data: meetingData}] = useMutation(CREATE_MEETING)

        // Sends notification on scheduled meeting
        const [sendAssign, {loading: loadAss, error: errorAss, data: dataAss}] = useMutation(CREATE_USER_TO_USER_NOTIFICATION)

///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    // Modals and Content //

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

    // DateTime Renderings //     

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

    // Dropdown Managers // 

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
                            secondDropTitleProp={"lastName"}
                            
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
                        <Text style={{marginBottom: 10, textAlign: 'center', ...FONTS.SubTitle}}>Select Parents to Schedule a Meeting with</Text>
                        <Dropdown
                            title={title}
                            titleStyle={{fontFamily: 'Gilroy-SemiBold', fontSize: 18, marginTop: 10}}

                            dropArray={guardianClients}
                            dropTitleProp={"firstName"}
                            secondDropTitleProp={"lastName"}
                            
                            onTitleClick={() => setShowClientDropdown(!showClientDropdown)}
                            onIndexClick={(content) => handleDropIndexClick(content, setSelectedClients, selectedClients)}

                            indexText={{fontFamily: "Gilroy-SemiBold", }}
                            selectedIndexColor={COLORS.gradientColor1}

                            
                        />
                    </View>
                )
            }
        }

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

                        dropArray={sortVideosByLevel(videos)}
                        dropTitleProp={"title"}
                        secondDropTitleProp={"level"}
                        
                        onTitleClick={() => setShowClientDropdown(!showClientDropdown)}
                        onIndexClick={(content) => handleDropIndexClick(content, setSelectedVideos, selectedVideos)}

                        indexText={{fontFamily: "Gilroy-SemiBold", }}
                        selectedIndexColor={COLORS.gradientColor1}

                        dropScrollStyle={{height: 200}}
                    />
                </View>
            )
        }
    
    // Accept or Cancel Fields // 

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
                    
                    {renderSubmitButton("ass")}

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
                <View style={{marginTop: 30, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>

                    {renderSubmitButton("meeting")}

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

        function renderSubmitButton(type){
            if (selectedClients.length > 0){
                if (type === "ass"){
                    return(
                        <TouchableOpacity
                        style={{width: 130, height: 48, backgroundColor: COLORS.buttonColorLight, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 10, marginHorizontal: 7.5, borderColor: COLORS.buttonColorDark, borderWidth: 1}}
                        onPress={() => {handleMainSubmit("ass")}}
                        >
                            <Text style={{ color: COLORS.confirm, ...FONTS.Lato_700Bold, fontSize: 18, textTransform: "capitalize" }} >
                                Assign
                            </Text>
                        </TouchableOpacity>
                    )
                }
                else if (type === "meeting"){
                    return(
                        <TouchableOpacity
                        style={{width: 130, height: 48, backgroundColor: COLORS.buttonColorLight, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 10, marginHorizontal: 7.5, borderColor: COLORS.buttonColorDark, borderWidth: 1}}
                        onPress={() => {handleMainSubmit("meeting")}}
                        >
                            <Text style={{ color: COLORS.confirm, ...FONTS.Lato_700Bold, fontSize: 18, textTransform: "capitalize" }} >
                                Schedule
                            </Text>
                        </TouchableOpacity>
                    )
                }
            }
            else{
                return(
                    <View
                    style={{width: 130, height: 48, backgroundColor: "grey", borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 10, marginHorizontal: 7.5, borderColor: COLORS.buttonColorDark, borderWidth: 1}}>
                        <Text style={{ color: COLORS.confirm, ...FONTS.Lato_700Bold, fontSize: 18, textTransform: "capitalize" }} >
                            Needs Clients
                        </Text>
                    </View>
                )
            }
        }

///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////

    // Meeting Modal Options //

        // Changes whether you are scheduling an in-person 
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

    // Stylers // 

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
            return ((new Date(dateObj).toLocaleString('en-US', { timeZone: 'America/New_York' })))
        }

/////////////////////////
///                   ///
//  Mutator + Helpers  //
///                   ///
/////////////////////////

    
    async function handleMainSubmit(type){
        if (type === "meeting"){
            return handleMeetingSubmissionClick()
        }
        else if (type === "ass"){
            return handleAssignSubmissionClick()
        }
        else{
            console.log("Error")
        }
    }

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
                setRefresh(!refresh)
            })
            .catch((err) => {
                console.log("Error in Handle Assignment Submission", err)
            })
        })
    }

    // Runs the create Assignment Mutation
    async function handleCreateAssignment(obj){
        handleMadeAssignmentMutation({startDate: obj.startDate, user: obj.client.childCarePlans[0]})
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
        .then((resolved) => {
            
        })
        .catch(err => {
            setLoading(false)
            console.log("Error in creating the assignment", err)
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
                setRefresh(!refresh)
           })
           .catch((err) => {
                console.log("Error in handleMeetingSubmission ", err)
           })
        })
        setShowMeetingsModal(false)
    }

    // Runs the create Meeting Mutation
    async function handleCreateMeeting(client){
        let dateAsArray = (determineDateTimeConversion(meetingDateObj).split(",")[0].split("/"))
        let timeArray = (determineDateTimeConversion(meetingDateObj).split(",")[1].split(" ")[1].split(":"))
        let amPm = (determineDateTimeConversion(meetingDateObj).split(",")[1].split(" ")[2])
        timeArray[0] = (parseInt(timeArray[0], 10) - 1).toString()
        if (amPm === "PM"){
            timeArray[0] = (parseInt(timeArray[0], 10) + 12).toString()
        }
        let submissionDate = new Date(`${dateAsArray[2]}-${dateAsArray[0]}-${dateAsArray[1]}T${timeArray[0]}:${timeArray[1]}:${timeArray[2]}.00Z`)
        submissionDate = submissionDate.setHours(submissionDate.getHours() + 1)
        submissionDate = new Date(submissionDate)
        // submissionDate = (submissionDate.toISOString().replace(".000Z", ""))
        return await createMeeting({
            variables: {
                title: `${meetingDateObj} ${meetingType}`,
                meetingDateTime: submissionDate,
                type: meetingType,
                participantIDs: [client.id],
            }
        })
        .then((resolved) => {
            console.log("handle Create Meeting", resolved)
        })
        .catch(err => {
            console.log("Error from handleCreateMeeting", err)
            setLoading(false)
        })
    }

    // Sends the Notification for the Scheduled Assignment
    function handleMadeAssignmentMutation(ass){
        return sendAssign({
            variables: {
                title: `You have a new Assignment Starting ${ass.startDate}`,
                description: `The Assignment has ${selectedVideos.length} videos`,
                type: "Assignment Scheduled",
                toUserId: ass.user.id
            }
        })
        .then((resolved) => {
            console.log("MADE ASSIGN MUTATION: ", resolved)
        })
        .catch((err) => console.log(err))
    }




///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////
    return(
       <View style={{flex: 1}}>
            {renderMeetingsModal()}
            {renderAssignmentsModal()}
       </View>
    )
}