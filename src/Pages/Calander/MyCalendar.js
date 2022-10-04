// React
import { View, TouchableOpacity, Text, SafeAreaView, ScrollView, TextInput, ImageBackground, FlatList, StyleSheet, Dimensions, Alert} from "react-native";
import {Calendar, Agenda, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import React, { useState, useEffect }  from "react";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from "react-native-modal";

// Nuton
import { Header, InputField } from "../../../NutonComponents";
import { AndroidSafeArea, promo, clients, videos, assignments } from "../../../NutonConstants";

// Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { colorState, fontState, sizeState, userState } from "../../../Recoil/atoms"

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import TabBar from "../../../OstrichComponents/TabBar";
import SelectionButton from "../../../OstrichComponents/SelectionButton";


// Hooks
import getTodaysDate from "../../Hooks/date_and_time/getTodaysDate";
import numberToMonth from "../../Hooks/date_and_time/numberIntoMonth";
import numToDayOfTheWeek from "../../Hooks/date_and_time/numToDayOfWeek";
import convertReactCalandarDateString from "../../Hooks/date_and_time/convertReactCalandarDateString";

// Dimensions
let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height

// SVG
import { PlusSvg, Repeat } from "../../../svg";

// KNM
import Assignment from "./Assignment";


//////////////// APP //////////////// APP //////////////// APP //////////////// APP //////////////// APP //////////////// APP //////////////// APP 
export default function MyCalendar(props) {
///////////////////////////
///                     ///
///     Preliminary     ///
///                     ///
///////////////////////////

    ///////////////
    // Constants //
    ///////////////

        const {client} = props
        const navigation = useNavigation();
        const COLORS = useRecoilValue(colorState)
        const FONTS = useRecoilValue(fontState)
        const SIZES = useRecoilValue(sizeState)

    ////////////
    // States //
    ////////////

        //////////
        // User //
        //////////

        const [user, setUser] = useRecoilState(userState)

        //////////////////
        // Date Display //
        //////////////////

            // Determines MonthView = 0 or WeekView = 1
            const [calandarType, setCalandarType] = useState(0)

            // Todays Date (String Format)
            const [day, setDay] = useState(getTodaysDate(0).day)

            // Month (numeric)
            const [month, setMonth] = useState(getTodaysDate(0).month)

            // Year 
            const [year, setYear] = useState(getTodaysDate(0).year)

            // Day of the week (numeric)
            const [dayOfTheWeek, setDayOfTheWeek] = useState(getTodaysDate(0).dayOfWeek)

        ///////////////////////////////
        // Date and Assignment Logic //
        ///////////////////////////////
        
            // Selected date range in monthly view.  Used in filtering and/or creating assignments
            const [dateRange, setDateRange] = useState({
                start: {timestamp: false},
                end: {timestamp: false}
            })

            // The currently selected Day
            const [selectedDay, setSelectedDay] = useState(new Date().toISOString())

        ///////////////////////////////////
        // Modals and Show Determinators //
        ///////////////////////////////////

            // Modal from create assignements button
            const [showAssignmentsModal, setShowAssignmentsModal] = useState(false)

            // Client selection inside assignments modal
            const [showClientDropdown, setShowClientDropdown] = useState(false)

            // Modal for Video selection inside assignments modal
            const [showVideoDropdown, setShowVideoDropdown] = useState(false)

            // Determines whether or not Assignments are shown
            const [showAssignments, setShowAssignments] = useState(false)


        /////////////////////
        // Data and Values //
        /////////////////////

            // All Selectable Clients
            const [dropdownClients, setDropdownClients] = useState(clients.map(client => ({label: `${client.firstName} ${client.lastName}`, value: client.id})))

            // All Videos to be Selected
            const [dropdownVideos, setDropdownVideos] = useState([{label: "Level 1", value: 1}, {label: "Level 2", value: 2}, ...videos.map(video => ({label: `${video.name} (${video.level === 1 ? "I" : "II"})`, value: video.id, parent: video.level}))])

            // Selected Clients 
            const [selectedClients, setSelectedClients] = useState([])

            // Selected Videos
            const [selectedVideos, setSelectedVideos] = useState([])

        
        ///////////////////
        // Search Values //
        ///////////////////
            
            // Search value for user
            const [searchUser, setSearchUser] = useState('')

            // Search value for Video
            const [searchVideo, setSearchVideo] = useState('')


            

        //state for assignments
        const [state, setState] = useState({items: undefined})
        //assignments for Calendar
        const [calendarAssignments, setCalendarAssignments] = useState({})

        const [isRecurring, setIsRecurring] = useState(false)

        const [showRepeatDropdown, setShowRepeatDropdown] = useState(false)
        const [selectedRepeat, setSelectedRepeat] = useState([])
        const [dropdownRepeat, setDropdownRepeat] = useState( [{label: "Daily", value: "daily"},{label: "Weekly", value: "weekly"},{label: "Biweekly", value: "biweekly"},{label: "Monthly", value: "monthly"}] )
        const [repeatDays, setRepeatDays] = useState({Sun: true, Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: true})


    function updateCurrentSlideIndex(e) {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / SIZES.width);
        setCurrentSlideIndex(currentIndex);
    }

///////////////////////////
///                     ///
///      useEffect      ///
///                     ///
///////////////////////////

    useEffect(() => {
        let nameDate = new Date(`${numberToMonth(month)} ${day}, ${year}`)
        let dayOfWeek = numToDayOfTheWeek(nameDate.getDay())
        setDayOfTheWeek(dayOfWeek)
    }, [])


    useEffect(() => {
        let nameDate = new Date(`${numberToMonth(month)} ${day}, ${year}`)
        let dayOfWeek = numToDayOfTheWeek(nameDate.getDay())
        setDayOfTheWeek(dayOfWeek)
    }, [day, month, year])

    useEffect(() => {
        if (client) {
            setSelectedClients(prevState =>([...prevState, client.id]))
        }
    }, [client]);


///////////////////////////
///                     ///
///       Handler       ///
///                     ///
///////////////////////////

    function toggleRepeat(){
        if (isRecurring){
            setIsRecurring(false)
            return
        }
        setIsRecurring(true)
    }


    function handleDateRange (day) {
        if (user.role !== "THERAPIST"){
            return null
        }
        let timestamp = day.timestamp

        //added to prefill state that has no items.  Empty date will load forever!
        if ( !state.items ){
            setState({items: { [day.dateString]: [] }})
            }
        if ( !state.items || !state.items[day.dateString] ){
            setState(prevState => ({...prevState, 
                items:{
                    ...prevState.items, [day.dateString]: []
                }
            }))       
        }

        if (dateRange.start.timestamp === timestamp) {
            setDateRange({
            start: {timestamp: false},
            end: {timestamp: false}
        })
        return
        }
        
        if (!!dateRange.end.timestamp){
            
            if (dateRange.start.timestamp > timestamp){
                 //Saving new start point and reseting the end date
                setDateRange({ start: day, end: false})
                return
            }

            //keeping the same start date and saving new end date
            setDateRange(prevState => ({ ...prevState, end: day}))
            return

        }

        if (!!dateRange.start.timestamp){

            if (dateRange.start.timestamp > timestamp){
                //Saving new start point and ensuring end is cleared
                setDateRange({ start: day, end: {timestamp: false}})
                return
            }

            //Saving the new end date
            setDateRange(prevState => ({ ...prevState, end: day}))

            return
        }

        //creating new start date
        setDateRange({ start: day, end: {timestamp: false}})
    }

    //Gets dates in dateRange and formats them for <Calendar/> markedDates
    function getDatesInRange(){
        if (!dateRange.start.timestamp){
            return {}
        }
        if (!dateRange.end.timestamp){
            return {[dateRange.start.dateString]: {startingDay: true, marked: true, color: 'red', textColor: 'white'}}
        }
        // let timestampRange = parseInt(dateRange.end.timestamp) - parseInt(dateRange.start.timestamp)
        const dates = {}
        const curDate = new Date( dateRange.start.dateString)
        const endDate = new Date( dateRange.end.dateString)

        dates[dateRange.start.dateString] =  {startingDay: true, color: 'red', textColor: 'white'}
        dates[dateRange.end.dateString] =  {endingDay: true, color: 'red', textColor: 'white'}
        
        curDate.setDate(curDate.getDate()+1)
        while (curDate < endDate){
            let curDateString = curDate.toISOString().split('T')[0]
            dates[curDateString] = {color: '#70d7c7', textColor: 'white'}
            curDate.setDate(curDate.getDate()+1)
        }

        return dates

    }

    function getDatesInRangeList(startDateString, endDateString, curAss){
        const dates = {...calendarAssignments}
        //start and end props blank
        if (!startDateString && !endDateString){
            return []
        }

        const dateArray = []
        const startDate = new Date( startDateString)

        //only end prop is blank
        if (!endDateString){
            return [startDate.toISOString().split('T')[0]]
        }

        const endDate = new Date( endDateString)
        const userColor = `rgb(${randomColor(curAss.client.name).join(',')})`
        

        while (startDate <= endDate){
            let curDateString = startDate.toISOString().split('T')[0]

            if (isFilteredDate(curDateString)){
                // dates[curDateString] = { marked: true}
                if (!!dates[curDateString]){
                    if(!dates[curDateString]["dots"].some( object => object.key === curAss.client.id)){
                        dates[curDateString]["dots"].push({key: curAss.client.id, color: userColor})
                    }
                   
                } else {
                    dates[curDateString] = { dots: [{key: curAss.client.id, color: userColor}], marked: true}
                }
            }

            dateArray.push(curDateString)
            startDate.setDate(startDate.getDate() +1 )
        }
        
        setCalendarAssignments(prevState => ({...prevState, ...dates}))
        //startDateString = "2022-07-25"
        //endDateString = "2022-07-27"
        //["2022-07-25", "2022-07-26", "2022-07-27"]
        return dateArray
    }

    //simple hash function to generate unique color from string
    function randomColor(nameString){
        let redColor = 150
        let blueColor = 50
        let greenColor = 90
        for (let i = 0; i < nameString.length; i++){
            let tnum = Number(nameString.charCodeAt(i)).toString(3)
            redColor += tnum
            blueColor += tnum * 2
            greenColor += tnum * 3
        }
        return [(redColor**2) % 255, (blueColor**2) % 255, (greenColor**2) % 255]
    }

    //Checks if date is within the dateRange of the selected monthly view
    function isFilteredDate(date){
        const curDate = new Date(date)
        //no date selected and no filter applied
        if (!dateRange.start.timestamp){
            return true
        }

        //only start date selected and filter applied to day
        if (!dateRange.end.timestamp){
            return dateRange.start.dateString === date
        }
        return new Date(dateRange.start.dateString) <= curDate && curDate <= new Date(dateRange.end.dateString)

        // return true
    }

    //if clients are selected their assignments are selectively chosen from all
    function filterAssignments(assignmentList){

        //if none are selected return all
        if (selectedClients.length === 0 ){
            return assignmentList
        }
        return assignmentList.filter(task => {
           
            return selectedClients.includes(`${task.client.id}`)
        })
    }

    //Takes string date input and saves datestring 
    function handleInput(input, field){
        if (input.length !== 10){
            return
        }
        let dateInput = new Date(input)
        
        if (field === "repeat"){
            alert('starting repeat')
            return null

            //need to finish logic to handle repeat
        }
        
        setDateRange(prevState => ({...prevState, [field]: 
            {"dateString": dateInput.toISOString().split('T')[0], "day": dateInput.getDay(), "month": dateInput.getMonth(), "timestamp": dateInput.getTime(), "year": dateInput.getFullYear()}
        }))
    
    }

    function handleRepeat(input){
        let dateInput = new Date(input)
        let start
        alert(selectedRepeat)
        switch(selectedRepeat[0]){
            case 'daily':
                alert('daily')
                break
            case 'weekly':
                alert('weekly')
                break
            case 'biweekly':
                alert('biweekly')
                break
            case 'monthly':
                alert('monthly')
                break
            default:
                // alert('fix handleRepeat')
        }
    }

///////////////////////////
///                     ///
///      Rendering      ///
///                     ///
///////////////////////////

    // Renders the Assigned Video Preview
    function renderAssignments() {
        if (calandarType !== 2){
            return (
                <View style={styles.renderPromo}>
                    <FlatList
                        horizontal={true}
                        index={2}
                        data={promo}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={updateCurrentSlideIndex}
                        contentContainerStyle={{ marginBottom: 16 }}
                        renderItem={({ item }) => (
                            <ImageBackground
                                source={item.image}
                                style={{
                                    width: SIZES.width - 40,
                                    height: 220,
                                    marginHorizontal: 20,
                                }}
                                imageStyle={{ borderRadius: 10 }}
                            ></ImageBackground>
                        )}
                    />
                </View>
            );
        }
        else{
            return null
        }
        
    }

    // Header Bar
    function renderHeader() {
        return (
            <> 
                <Header
                    title="Calendar"
                    goBack={true}
                    profile={true}
                    onPress={() => navigation.navigate('/')}
                    filterOnPress={() => navigation.navigate("SettingsLanding")}
                />
                
            </>
        );
    }

    // Mon, Tues, Weds ...
    function renderTheDayInWords(){
        return(
            <>
                <Text style={{...FONTS.Title, color: 'white', marginLeft: 30, marginTop: 30, marginBottom: 0, fontSize: 34}}>
                    {dayOfTheWeek}, {numberToMonth(month)} {day}
                </Text>
            </>
        )
    }

    // Renders the Tab to select Calandar Type
    function renderTabBar(){
        return(
            <View style={{alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <TabBar 
                    tabsArray={["Month View", "Weekly View", "Assignments"]}
                    styleActive={{
                        width: 120,
                        borderBottomColor: "white",
                        borderBottomWidth: 4,
                        padding: 2.5,
                    }}
                    styleInactive={{
                        width: 120,
                        padding: 2.5,
                        
                    }}
                    tabTextStyleActive={{
                        fontFamily: 'Gilroy-Bold',
                        fontSize: 16,
                        letterSpacing: 0.5,
                        textAlign: 'center',
                        color: 'white'
                    }}
                    tabTextStyleInactive={{
                        fontFamily: 'Gilroy-Bold',
                        fontSize: 15,
                        letterSpacing: 0.5,
                        textAlign: 'center',
                        color: "#565"
                    }}
                    onChangeIndex={(index) => setCalandarType(index)}
                />
            </View>
            
        )
    }

    // Renders the Calandar Part of things
    function renderCalandar() {
        let markedDates = getDatesInRange()
        if (calandarType === 0){
            // let markedDates = getDatesInRange()
            return(
                <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
                    <CalendarProvider date={selectedDay} onDateChanged={setSelectedDay} style={styles.calendar}>
                        <Calendar
                            disableArrowLeft={false}
                            disableArrowRight={false}
                            enableSwipeMonths={true}
                            markingType={'period'}
                            // markedDates={{
                            //     [`${year}-${month}-${day}`]: {
                            //         customStyles: {
                            //             container: {
                            //                 backgroundColor: 'green'
                            //             },
                            //             text: {
                            //                 color: 'red'
                            //             }
                            //         }
                            //     }
                            // }}
                            markedDates={{...markedDates}}
                            onMonthChange={month => {
                                let newDate = convertReactCalandarDateString(month.dateString);
                                let dateArray = newDate.split("/")
                                setMonth(dateArray[0])
                                setDay(dateArray[1])
                                setYear(dateArray[2])
                            }}
                            onDayPress={day => {
                                let newDate = convertReactCalandarDateString(day.dateString);
                                let dateArray = newDate.split("/")
                                setMonth(dateArray[0])
                                setDay(dateArray[1])
                                setYear(dateArray[2])
                                handleDateRange(day)
                            }}
                            theme={{
                                //not sure what this does
                                backgroundColor: 'black',
                                
                                //transparent background
                                calendarBackground: 'rbga(1,1,1,0)',


                                //Day number styles
                                dayTextColor: '#FFF',
                                textDayFontWeight: '900',
                                textDayFontSize: 20,
                                
                                //Day of week text (mon tue...)
                                textSectionTitleColor: '#FFF',
                                textDayHeaderFontWeight: '700',
                                textDayHeaderFontSize: 14,
                                
                                textSectionTitleDisabledColor: '#d9e1e8',
                                // selectedDayBackgroundColor: '#00adf5',
                                // selectedDayTextColor: '#ffffff',

                                //Today styles
                                todayTextColor: '#00adf5',
                                
                                //Days from previous and following month
                                textDisabledColor: '#d9e1e8',
                                
                                // Month and Year styles
                                textMonthFontSize: 30,
                                textMonthFontWeight: "900",
                                monthTextColor: '#FFF',
                                
                                //arrow style
                                arrowColor: '#FFF',

                                dotColor: '#00adf5',
                                selectedDotColor: '#ffffff',
                                disabledArrowColor: '#d9e1e8',
                                indicatorColor: 'blue',
                               
                                agendaDayTextColor: 'yellow',
                                agendaDayNumColor: 'green',
                                agendaTodayColor: 'red',
                                agendaKnobColor: 'blue'
                                
                                
                            }}
                        />
                    </CalendarProvider>
                </View>
            )
        }
        else if (calandarType === 1){
            return assignmentTest()
            
            return(
                <View style={{ marginLeft: 20, marginRight: 20 }}>
                    <CalendarProvider 
                        date={new Date().toISOString()} 
                        style={styles.calendar}
                        
                        disabledOpacity={0.6}>
                        
                        <WeekCalendar 
                            disableArrowLeft={false}
                            disableArrowRight={false}
                            markedDates={{...markedDates}}
                            firstDay={1}
                            // onDayPress={day => {
                            //     let newDate = convertReactCalandarDateString(day.dateString);
                            //     let dateArray = newDate.split("/")
                            //     setMonth(dateArray[0])
                            //     setDay(dateArray[1])
                            //     setYear(dateArray[2])
                            // }}
                            onDayPress={day => {
                                let newDate = convertReactCalandarDateString(day.dateString);
                                let dateArray = newDate.split("/")
                                setMonth(dateArray[0])
                                setDay(dateArray[1])
                                setYear(dateArray[2])
                                handleDateRange(day)
                            }}
                            theme={{
                                //not sure what this does
                                backgroundColor: 'black',
                                
                                //transparent background
                                calendarBackground: 'rbga(1,1,1,0)',

                                //Day number styles
                                dayTextColor: '#FFF',
                                textDayFontWeight: '700',
                                textDayFontSize: 14,
                                
                                //Day of week text (mon tue...)
                                textSectionTitleColor: '#FFF',
                                textDayHeaderFontWeight: '700',
                                textDayHeaderFontSize: 14,
                                
                                textSectionTitleDisabledColor: '#d9e1e8',
                                // selectedDayBackgroundColor: '#00adf5',
                                // selectedDayTextColor: '#ffffff',

                                //Today styles
                                todayTextColor: '#00adf5',
                                
                                //Days from previous and following month
                                textDisabledColor: '#d9e1e8',
                                
                                // Month and Year styles
                                textMonthFontSize: 30,
                                textMonthFontWeight: "900",
                                monthTextColor: '#FFF',
                                
                                //arrow style
                                arrowColor: '#FFF',

                                dotColor: '#00adf5',
                                selectedDotColor: '#ffffff',
                                disabledArrowColor: '#d9e1e8',
                                indicatorColor: 'blue',
                               
                                agendaDayTextColor: 'yellow',
                                agendaDayNumColor: 'green',
                                agendaTodayColor: 'red',
                                agendaKnobColor: 'blue'
                                
                            }}
                        />
                    </CalendarProvider>
                </View>
                )
        }
        else if (calandarType === 2){
            return assignmentTest()
            return null
        }
        
    }

    //Date labels for Therapist
    function showStart(){
        return dateRange.start.timestamp? `on ${dateRange.start.dateString}` : "Today"
    }
    function showEnd(){
        return dateRange.end.timestamp? `- ${dateRange.end.dateString}` : ''
    }
    function showClients(){
        return client ? `for ${client.name}` : ''
    }

    // Renders Create Assignment Button... Duh
    function renderCreateAssignmentsButton(){
        //conditionally renders if showAssignments is false
        if (showAssignments || calandarType !== 0){
            return
        }
        return (
            <SelectionButton
                    title={"Create Assignment"}
                    subtitle={showClients()}
                    subtitle2={`${showStart()} ${showEnd()}`}
                    
                    image={"calandar"}
                    onSelect={() => {
                            setShowAssignmentsModal(true)
                        }}
                    icon={<PlusSvg fillColor={COLORS.white} strokeColor={COLORS.white} />}
                />
        )
    // }
    // return null
    }
    // Renders Create Assignment Button... Duh
    function renderViewAssignmentsButton(){
        // if (dateRange.start.timestamp){
             if (showAssignments || calandarType !== 0){
                return
            }
            
            return (
                <SelectionButton
                        title={`View ${client ? `${client.firstName}'s` : ''} Assignments`}
                        subtitle={`${showStart()} ${showEnd()}`}
                        image={"calandar"}
                        onSelect={() => {
                             setShowAssignments(true)

                             //reset any previous state
                             setCalendarAssignments({})
                             setCalandarType(2)
                            }}
                        icon={<PlusSvg fillColor={COLORS.white} strokeColor={COLORS.white} />}
                    />
            )
        // }
        // return null
    }
    //Manual entry for start and end dates.
    //Dropdown for multiselect clients
    //Dropdown for multiselect videos
    function renderAssignmentsModal(){

        //if not therapist return null

        return (
            <Modal
                isVisible={showAssignmentsModal}
                onBackdropPress={setShowAssignmentsModal}
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
                    <TouchableOpacity onPress={ toggleRepeat } >
                        <Repeat  active={isRecurring} style={{alignSelf: "flex-end", margin: 5}}/>
                    </TouchableOpacity>
                    <View
                        style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                        }}>
                        <InputField
                            
                            placeholder={dateRange.start.dateString}
                            title="Start (yyyy-mm-dd)"
                            containerStyle={{ marginBottom: 10 }}
                            onChangeText={(content) => handleInput(content, 'start') }
                            titleTextColor= {COLORS.buttonColorDark}
                            style={{width: "49%", borderColor: COLORS.buttonColorDark, borderWidth: 0.5, margin: 1}}
                        />
                        <InputField
                            
                            placeholder={dateRange.end.dateString || dateRange.start.dateString}
                            title="End (yyyy-mm-dd)"
                            containerStyle={{ marginBottom: 10 }}
                            onChangeText={(content) => handleInput(content, 'end') }
                            titleTextColor= {COLORS.buttonColorDark}
                            style={{width: "49%", borderColor: COLORS.buttonColorDark, borderWidth: 0.5, margin: 1}}
                        />

                    </View>
                    {isRecurring && <View
                        style={{height: showRepeatDropdown ? 275 : 160}}>
                        <DropDownPicker
                            searchable={true}
                            open={showRepeatDropdown}
                            value={selectedRepeat}
                            items={dropdownRepeat}
                            setOpen={setShowRepeatDropdown}
                            setValue={setSelectedRepeat}
                            setItems={setDropdownRepeat}

                            theme="DARK"
                            multiple={false}
                            mode="BADGE"
                            badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                        />
                        <View
                            style={{flexDirection: "row"}}
                        >
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day =>(
                                <View
                                    style={{flexDirection: 'column'}}
                                >
                                    <Text>{day}</Text>
                                    <BouncyCheckbox 
                                        isChecked={repeatDays[day]}
                                        disableBuiltInState/>
                                </View>
                            ))}
                                {/* <View
                                    style={{flexDirection: 'column'}}
                                >
                                    <Text>{day}</Text>
                                    <BouncyCheckbox disableBuiltInState/>
                                </View> */}
                            
                            
                        </View>
                        <InputField
                            
                            placeholder={dateRange.start.dateString}
                            title="Repeat Through (yyyy-mm-dd)"
                            containerStyle={{ marginBottom: 10 }}
                            onChangeText={(content) => handleRepeat(content) }
                            titleTextColor= {COLORS.buttonColorDark}
                            style={{width: "69%", borderColor: COLORS.buttonColorDark, borderWidth: 0.5, margin: 1, alignSelf: "center"}}
                        />
                    </View>}
                    
                    <View
                        style={{height: showClientDropdown ? 275 : 70}}>
                         {/* <ImageBackground
                            style={{
                                width: "100%",
                                height: 42,
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                            source={require("../../../assets/images/background-02.png")}
                            imageStyle={{ borderRadius: 5 }}
                        >
                            <View style={{ marginLeft: 16 }}>
                                <InputSearch fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                            </View>
                            <TextInput
                                placeholder="Search"
                                onChangeText={setSearchUser}
                                style={{
                                    flex: 1,
                                    marginLeft: 8,
                                    flex: 1,
                                    marginRight: 16,
                                }}
                            />
                        </ImageBackground> */}
                        <DropDownPicker
                            searchable={true}
                            open={showClientDropdown}
                            value={selectedClients}
                            items={dropdownClients}
                            setOpen={setShowClientDropdown}
                            setValue={setSelectedClients}
                            setItems={setDropdownClients}

                            theme="DARK"
                            multiple={true}
                            mode="BADGE"
                            badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                        />
                    </View>
                    <View
                         style={{height: showVideoDropdown ? 275 : 70}}>
                       
                        <DropDownPicker
                            searchable={true}
                            categorySelectable={false}
                            open={showVideoDropdown}
                            value={selectedVideos}
                            items={dropdownVideos}
                            setOpen={setShowVideoDropdown}
                            setValue={setSelectedVideos}
                            setItems={setDropdownVideos}

                            theme="DARK"
                            multiple={true}
                            mode="BADGE"
                            badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 130,
                                height: 48,
                                backgroundColor: COLORS.buttonColorLight,
                                borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 10,
                                marginHorizontal: 7.5,
                                borderColor: COLORS.buttonColorDark,
                                borderWidth: 1,
                            }}
                            onPress={() => {
                                
                                setShowAssignmentsModal(false);
                               
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.confirm,
                                    ...FONTS.Lato_700Bold,
                                    fontSize: 18,
                                    textTransform: "capitalize",
                                }}
                            >
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
                </View>
            </Modal>
        );
    }

    function renderTodaysAssignments(){
        if (!showAssignments){
            return
        }
        let assignmentDate = dateRange.start.timestamp ? dateRange.start.dateString: new Date().toISOString().split("T")[0]

        let tempAssignments = {1: {}}
        return(
            <Text> {assignmentDate}</Text>
        )
    }

    function assignmentTest(){
        const loadItems = (day) => {
             
            
            // setState(prevState => ({...prevState, [state["items"]]:[]}))
            const items =  {};
            const time = day.timestamp;
            const strTime = timeToString(time);
            items[strTime] = []
            const selectedDayString = timeToString(selectedDay)
            items[selectedDayString] = []
            
            
            //reset to ensure duplicates are pushed into list.  May need to optimize and revisit

            let filteredAssignments = filterAssignments(assignments)
            filteredAssignments.forEach(ass => {
                let assDates = getDatesInRangeList(ass.startDate, ass.endDate, ass)
                assDates.forEach(date => {
                    if (!items[date]){
                        items[date] = []
                    }

                    //filter Dates
                    if (isFilteredDate(date)){
                        items[date].push({
                            id: ass.id,
                            name: ass.client.name,
                            height: 200,
                            day: ass.startDate,
                            videos: ass.videos,
                            title: ass.title
                        })
                    }


                    
                })

                // items[strTime].push({
                //     name: ass.client.name,
                //     height: 200,
                //     day: ass.startDate,
                //     videos: ass.videos,
                //     title: ass.title

                // })
            })
                    // const numItems = Math.floor(Math.random() * 3 +1);
                    // for (let j = 0; j < numItems; j++) {
                    //     items[strTime].push({
                    //     name: 'Item for ' + strTime + ' #' + j,
                    //     height: Math.max(50, Math.floor(Math.random() * 150)),
                    //     day: strTime
                    //     });
                    // }
                // }

            const newItems = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });
            setState({
                items: newItems
            });

            // setTimeout(() => {
            // for (let i = -15; i < 85; i++) {
            //     // const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            //     // const strTime = timeToString(time);

            //     // if (!items[strTime]) {
            //     //     items[strTime] = [];
                    
            //     //     const numItems = Math.floor(Math.random() * 3 +1);
            //     //     for (let j = 0; j < numItems; j++) {
            //     //         items[strTime].push({
            //     //         name: 'Item for ' + strTime + ' #' + j,
            //     //         height: Math.max(50, Math.floor(Math.random() * 150)),
            //     //         day: strTime
            //     //         });
            //     //     }
            //     // }
            // }
            
            // // const newItems = {};
            // // Object.keys(items).forEach(key => {
            // //     newItems[key] = items[key];
            // // });
            // // setState({
            // //     items: newItems
            // // });
            // }, 1000);
        }

    const renderItem = (reservation, isFirst) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'black' : 'red';
        return(
            <Assignment  
                flex={5}
                assignment={reservation}
                title={undefined}
                client={undefined}
                video={undefined}
                containerStyle={undefined}
                onPress={() => Alert.alert(reservation.name)}
                randomColor={randomColor}
            
            />
        )
        return (
        <TouchableOpacity
            flex={5}
            testID='item'
            style={[styles.item, {height: reservation.height}]}
            onPress={() => Alert.alert(reservation.name)}
        >
            <Text style={{fontSize, color, backgroundColor: "rgba(1,1,1,0)"}}>{reservation.name}</Text>
        </TouchableOpacity>
        );
    }

    function renderEmptyDate(){
        return (
            <TouchableOpacity 
                style={{
                    ...styles.emptyDate,

                }}
                onPress = {() => setShowAssignmentsModal(true)} 

            >
                <Text>No assignments scheduled</Text>
            </TouchableOpacity>
       
        );
    }

    //optimization function. Needs polishing
    function rowHasChanged(r1, r2){
        return r1.name !== r2.name;
        return r1.id !== r2.id;
    }

    function timeToString(time) {
        let date
        if (time === 'today'){
            date = new Date();
        } else {
            date = new Date(time);
        }

        return date.toISOString().split('T')[0];
    }
        
        return (
        <Agenda
            // Agenda container style
            style={{height: maxHeight*2/3, backgroundColor: "rgba(1,1,1,0)", borderBottomRightRadius: 20, borderBottomLeftRadius: 20}}
            testID='agenda'
            items={state.items}
            loadItemsForMonth={loadItems}

            // Initially selected day
            selected={!!dateRange.start.timestamp ? dateRange.start.dateString : timeToString('today')}

            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={!!dateRange.start.timestamp ? dateRange.start.dateString : undefined}

            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={!!dateRange.end.timestamp ? dateRange.end.dateString : undefined}
            
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={1}

            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={3}


            // Specify how each item should be rendered in agenda
            renderItem={renderItem}

            // Specify how each date should be rendered. day can be undefined if the item is not first in that day
            renderDay={(day, item) => {
                
                let thisDay;
                let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                if (day){
                    thisDay = new Date(day)
                    thisDay.setDate(thisDay.getDate()+1)

                }
                return(
                    <TouchableOpacity 
                        style={{width: "15%", marginLeft: "3%", flexDirection: "column", alignItems: "center", justifyContent: "center"}}
                        onPress = {() => setShowAssignmentsModal(true)}
                    >
                        <Text flex={1} style={{fontSize: 30}} >{day ? thisDay.getDate() : ''}</Text>
                        <Text flex={1}  >{day ? weekdays[thisDay.getDay()] : ''}</Text>
                    </TouchableOpacity>
                )


                return(<Text flex={1} style={{width: "15%", marginTop: "5%", marginLeft: "3%"}}>{day ? thisDay.getDate()+1 : ''}</Text>)}}

            // Specify how empty date content with no items should be rendered
            renderEmptyDate={renderEmptyDate}

            // Specify how agenda knob should look like
            // renderKnob={() => {
            //     return <View style={{alignSelf: "flex-start", backgroundColor: "blue", height: 100, width: 100, position: "absolute", top: 0, left: 0, zIndex: 9999}}></View> ;
            // }}

            // Specify what should be rendered instead of ActivityIndicator
            // renderEmptyData={() => {
            //     return <View />;
            // }}

            // Specify your item comparison function for increased performance
            rowHasChanged={rowHasChanged}
            
            // Hide knob button. Default = false
            hideKnob={false}

            // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
            showClosingKnob={true}
            
            // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
            // disabledByDefault={true}
            
            // // Set this true while waiting for new data from a refresh
            // refreshing={false}
            // // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
            // refreshControl={null}
            // // Agenda theme



            markingType={'multi-dot'}
            markedDates={{
                ...calendarAssignments
            }}
            monthFormat={'MMMM yyyy'}

            // Agenda theme
            theme={{
                ...styles.calendar,
                agendaDayTextColor: 'yellow',
                agendaDayNumColor: 'green',
                agendaTodayColor: 'red',
                agendaKnobColor: 'blue'
            }}
            

            hideExtraDays={true}
            showOnlySelectedDayItems={calandarType === 1}
            horizontal={false}
            onCalendarToggled={calendarOpened => {
            }}
           
        />
        );
  


    }

    // Self Explanatory
    function MainRender(){
        if (user.role === "GUARDIAN" || user.role === "PARENT"){
            return(
                <View style={{flex: 1}}>
                    {/* {renderHeader()} */}
                    {renderTheDayInWords()}
                    {renderTabBar()}
                    {renderCalandar()}
                    {/* {renderAssignments()} */}
                </View>
            )
        }
        else if (user.role === "THERAPIST"){
            return(
                <View style={{flex: 1}}>
                    {/* {renderHeader()} */}
                    {renderTheDayInWords()}
                    {renderTabBar()}
                    {renderCalandar()}
                    {/* {renderAssignments()} */}
                    {renderCreateAssignmentsButton()}
                    {renderAssignmentsModal()}
                    {renderViewAssignmentsButton()}
                    {/* {renderTodaysAssignments()} */}
                    {/* {assignmentTest()} */}
                </View>
            )
        }
        else{
            return(
                <View>
                    <Text> Whattt???</Text>
                    <Text> Whattt???</Text>
                    <Text> Whattt???</Text>
                    <Text> Whattt???</Text>
                    <Text> Whattt???</Text>
                    <Text> Whattt???</Text>
                    <Text> Whattt???</Text>
                </View>
                
            )
        }
    }


///////////////////////////
///                     ///
///     Main Return     ///
///                     ///
///////////////////////////

    return (
    //   <SafeAreaView style={{ ...AndroidSafeArea.AndroidSafeArea }}>
        <Gradient
            colorOne={COLORS.gradientColor1}
            colorTwo={COLORS.gradientColor2}
            style={{height: '100%'}}
        >
            <View style={{marginTop: 45}}/>
            {renderHeader()}
            <ScrollView contentContainerStyle={{paddingBottom: maxHeight * 0.2}}>
                {MainRender()}
            </ScrollView>
        </Gradient>
    // </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    dot: {
        width: 10,
        height: 2,
        marginHorizontal: 5,
        borderRadius: 6,
        
    },
    calendar: {
        marginTop: 10,
        flex: 1,
        backgroundColor: 'rgba(1,1,1,0)',
        
        //transparent background
        // calendarBackground: 'rbga(1,1,1,.5)',


        //Day number styles
        dayTextColor: 'blue',
        // textDayFontWeight: '900',
        // textDayFontSize: 20,
        
        //Day of week text (mon tue...)
        textSectionTitleColor: 'blue',
        // textDayHeaderFontWeight: '700',
        // textDayHeaderFontSize: 14,
        
        textSectionTitleDisabledColor: '#d9e1e8',

        selectedDayBackgroundColor: 'orange',
        selectedDayTextColor: 'green',

        //Today styles
        todayTextColor: '#00adf5',
        
        //Days from previous and following month
        textDisabledColor: '#d9e1e8',
        
        // Month and Year styles
        // textMonthFontSize: 30,
        // textMonthFontWeight: "900",
        monthTextColor: '#000',
        
        //arrow style
        arrowColor: '#FFF',

        dotColor: '#00adf5',
        selectedDotColor: 'brown',
        disabledArrowColor: '#d9e1e8',
        indicatorColor: 'blue',
        
        agendaDayTextColor: 'yellow',
        agendaDayNumColor: 'green',
        agendaTodayColor: 'red',
        agendaKnobColor: 'blue'
    },
    renderPromo: {
        flex: 5
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
  emptyDate: {
    height: 50,
    flex: 1,
    paddingTop: 30
  }
});