// Reaact
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import {Calendar, Agenda, CalendarProvider} from 'react-native-calendars';

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, clientListState, userState, colorState, fontState } from '../../../Recoil/atoms';
import { COLORS } from "../../../NutonConstants";

// Hooks
import numberToMonth from "../../Hooks/date_and_time/numberIntoMonth";


export default function CalendarComponent({allAssignments, allMeetings, markedDates, loading, setLoading, setSelectedFullDate}) {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    //////////////////
    // Recoil State //
    //////////////////

    const COLORS = useRecoilValue(colorState)
    const FONTS = useRecoilValue(fontState)


    ///////////////
    // Constants // 
    ///////////////

    const calendarTheme = {
        //     transparent background
            calendarBackground: 'rbga(1,1,1,0.2)',

        //     Day number styles
            dayTextColor: COLORS.iconLight,
            textDayFontWeight: '500',
            textDayFontSize: 18,
            textDayStyle: { 
                zIndex: 3, marginLeft: -2
                // borderWidth: 0.5, width: 55, height: 46, borderColor: COLORS.iconLight, padding: 2
            },
            
        //     Day of week text (mon tue...)
            textSectionTitleColor: COLORS.iconLight,
            textDayHeaderFontWeight: '700',
            textDayHeaderFontSize: 14,

        //     Today
            todayBackgroundColor: 'white',
            todayTextColor: COLORS.gradientColor1,

        //     Selected Day
            selectedDayBackgroundColor: 'red',
            selectedDayTextColor: 'black',
                                        
            
        //     Month and Year styles
            textMonthFontSize: 30,
            textMonthFontWeight: "700",
            monthTextColor: '#FFF',
            
        //     arrow style
            arrowColor: '#FFF',

        //     Marked

        //     dot Style
            dotStyle: {marginTop: 0, height: 9, width: 9, borderRadius: 20, zIndex: 0}
    }

    /////////////////
    // Local State //
    /////////////////

///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    // Renders the Calendar
    function renderCalendar(){
        return(
            <Calendar
                markingType={`multi-dot`}
                markedDates={markedDates}
                hideExtraDays={true}

                disableArrowLeft={false}
                disableArrowRight={false}
                enableSwipeMonths={true}

                // markingType={'period'}
                
                onDayPress={day => { handleDateClick(day) }}
                theme={calendarTheme}
            />
        )
    }

    function MAIN(){
        // IF LOADING
        if (loading){
            return(
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{...FONTS.SubTitle, color: COLORS.iconLight}}>
                        Please Wait While the Calendar Populates...
                    </Text>
                </View>
            )
        }

        // NOT LOADING
        else{
            return renderCalendar()
        }
    }

///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////

    // Runs when a date is clicked. Sets the clicked day as the selected Date
    function handleDateClick(day){
        let temp = new Date(day.dateString)
        setSelectedFullDate(new Date(temp.setDate(temp.getDate() + 1)))
    }

///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////
    return MAIN()
}