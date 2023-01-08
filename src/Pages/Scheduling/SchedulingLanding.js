// Reaact
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from "react-native";
import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";


// Nuton
import { Header, } from "../../../NutonComponents";

// Apollo GraphQl
import { GET_USER, GET_MEETINGS } from "../../../GraphQL/operations";
import client from "../../utils/apolloClient"

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, userState, colorState, fontState, avatarState, videoDataState, meetingState, assignState } from '../../../Recoil/atoms';

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import TabBar from "../../../OstrichComponents/TabBar";
import SelectionButton from "../../../OstrichComponents/SelectionButton";
import LoadingComponent from "../../Global/LoadingComponent"

// KNM
import SchedulingModal from "./SchedulingModal";

// Hooks
import getAllTherapistClients from "../../Hooks/value_extractors/therapistValues/getAllTherapistClients"
import getAllTherapistClientGuardians from "../../Hooks/value_extractors/therapistValues/getAllTherapistClientGuardians"
import convertDateTimeToJavaScript from "../../Hooks/date_and_time/convertDateTimeToJavaScript"
import getAllTherapistAssignments from "../../Hooks/value_extractors/therapistValues/getAllTherapistAssignments";
import pusherClient from "../../utils/pusherClient";
import filterAssignments from "../../Hooks/value_extractors/filterAssignments"
import filterMeetings from "../../Hooks/value_extractors/filterMeetings"

// Dimensions
let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height

///////////// SchedulingLanding ///////////// SchedulingLanding ///////////// SchedulingLanding ///////////// SchedulingLanding ///////////// SchedulingLanding /////////
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

        // Refresh (After mutations to trigger requery)
        const [refresh, setRefresh] = useState(false)

        // Resets DatePicker
        const [reset, setReset] = useState(false)

        //////////////////////////
        // Modals and Dropdowns //
        //////////////////////////

            // Tracks Assignment Modal Trigger
            const [showAssignmentsModal, setShowAssignmentsModal] = useState(false)

            // Tracks Meeting Modal Trigger
            const [showMeetingsModal, setShowMeetingsModal] = useState(false)

            // Tracks whether setting start date
            const [startDateOpen, setStartDateOpen] = useState(false)

            // Tracks whether setting end date
            const [endDateOpen, setEndDateOpen] = useState(false)

        ///////////////////////////////
        // Dates and Scheduling Data //
        ///////////////////////////////

            const today = new Date()

        ///////////////
        // Mutations //
        ///////////////

            // Gets the user obj and resets the userState
            async function getAndSetUser(){
                await client.query({
                    query: GET_USER,
                    fetchPolicy: 'network-only'  
                })
                .then(async (resolved) => {
                    // Sets new User //
                    setUser(resolved.data.getUser)

                    // Sets new Assignments //
                    setAssignments(filterAssignments(getAllTherapistAssignments(resolved.data.getUser)))

                    // Get and Sets Meetings //
                    await client.query({
                        query: GET_MEETINGS,
                        fetchPolicy: 'network-only'
                    })
                        .catch(err => {
                            setLoading(false)
                            return null
                        })
                        .then(async (resolved) => {
                            setMeetings(filterMeetings(resolved.data.getMeetings))
                        })
                    })
                    .catch((error) => {
                    })
            }

///////////////////////
///                 ///
///    useEffect    ///
///                 ///
///////////////////////

    // Clears all selections when a different toggle is selected
    useEffect(() => {
        setSelectedClients([])
        setSelectedVideos([])
    },[showMeetingsModal, showAssignmentsModal])

    // Triggers a date reset
    useEffect(() => {
        setReset(!reset)
        setLoading(false)
    }, [startDateOpen, endDateOpen, showAssignmentsModal, showMeetingsModal])

    // Triggers the Requery when refresh is changed post mutation
    useEffect(() => {
        // const schedulingChannel = pusherClient.subscribe(
        //     user.id.toString()
        // )

        // schedulingChannel.bind("updated-schedule", function(data){
        //     getAndSetUser()
        // })

        // return () => {
        //     pusherClient.unsubscribe(user.id.toString())
        // }

        // setLoading(false)
    }, [user.id])

    useEffect(() => {
        getAndSetUser()
        setLoading(false)
    }, [refresh])

//////////////////////
///                ///
///     Styles     ///
///                ///
//////////////////////

const Styles = StyleSheet.create({
    upcomingView: {
        height: maxHeight * 0.4, 
        borderColor: COLORS.iconLight, borderWidth: 1, borderRadius: 15, 
        marginLeft: 10, marginRight: 10, marginBottom: 15,
    }
})
        
///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

        // MAIN Return
        function MAIN(){
            if (loading){
                return(
                    <View style={{flex: 1, backgroundColor: 'grey'}}>
                        <LoadingComponent loading={loading} label={"LOADING"} />
                    </View>
                )
            }
            else{
                return(
                    <Gradient
                    colorOne={COLORS.gradientColor1}
                    colorTwo={COLORS.gradientColor2}
                    style={{height: '100%'}}
                    >
                        {renderHeader()}
                        {renderMeetingsAssignmentsTabBar()}
                        {renderUpcomingDisplay()}
                        {renderCreationButtons()}
                        <SchedulingModal showAssignmentsModal={showAssignmentsModal} setShowAssignmentsModal={setShowAssignmentsModal} showMeetingsModal={showMeetingsModal} setShowMeetingsModal={setShowMeetingsModal} refresh={refresh} setRefresh={setRefresh} setLoading={setLoading} />
                    </Gradient>
                )
            }
        }

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
            }).map( (meeting , index)=> {
                let dt = convertDateTimeToJavaScript(meeting.meetingDateTime)
                return(
                    <TouchableOpacity key={index}>
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
                                    With {meeting.users[1].firstName}
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
            if (!assignments || assignments.length < 1){
                return null
            }
            return assignments.filter( (ass) => {
                // if (!ass.completed && !ass.canceled){

                    // Have it check against date
                    return ass
                // }
            }).map( (ass, index) => {
                let ds = ass.dateStart
                let de = ass.dateDue
                return(
                    <TouchableOpacity key={index}>
                        <View style={{flexDirection: 'row', margin: 8, borderWidth: 1, borderRadius: 15, borderColor: COLORS.iconLight, padding: 8}}>
                            <View style={{flex: 2, margin: 5}}>
                                <Text style={{...FONTS.SubTitle, color: COLORS.iconLight, marginBottom: 5}}>
                                    Date Start: {ds}
                                </Text>
                                <Text style={{...FONTS.SubTitle, color: COLORS.iconLight}}>
                                    Date End: {de}
                                </Text>
                            </View>
                            <View style={{flex: 1, margin: 5, alignItems: 'flex-end'}}>
                                <Text style={{...FONTS.SubTitle, color: COLORS.iconLight}}>
                                    {ass.childCarePlan.child.firstName}
                                </Text>
                                <Text style={{...FONTS.SubTitle, color: COLORS.iconLight}}>
                                    {ass.childCarePlan.child.lastName}
                                </Text>
                            </View>
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

///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////
    return MAIN()
}