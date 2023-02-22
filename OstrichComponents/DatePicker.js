// Reaact
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import React, {useState} from "react";
import { useEffect } from "react";

import blackDown from "./images/blackDownArrow.png"
import blackUp from "./images/blackUpArrow.png"

import whiteDown from "./images/whiteDownArrow.png"
import whiteUp from "./images/whiteUpArrow.png"




///////////////////////
///      Style      ///
///////////////////////
    const Styles = StyleSheet.create({

        displayTiles: {
            borderColor: 'black',
            borderRadius: 10,
            borderWidth: 1,
            paddingTop: 7,
            paddingBottom: 7, 
            paddingLeft: 10,
            paddingRight: 10,
            minWidth: 50
        },

        baseStyle: {
            borderRadius: 10,
            paddingTop: 10,
            paddingBottom: 10
        },

        timeTitleStyle: {
            marginBottom: 5,
            fontSize: 16,
            fontWeight: "600"
        },

        dateTextStyle: {
            fontWeight: "400",
            fontSize: 15,
        }

    })
///////////////////////
///      Today      ///
///////////////////////

    let today = new Date(Date.now())
    let today2 = new Date(today).setMinutes(0)
   

export default function DatePicker({
    startDate=today2,

    dateFormat=("dateString"),

    onSelectDay={function(){return null}},
    onSelectMonth={function(){return null}},
    onSelectYear={function(){return null}},

    onDateChange={function(returnDateObject){console.error("No 'onDateChange' function prop added")}},

    timeTitleStyle={...Styles.timeTitleStyle},

    displayTileStyle={...Styles.displayTiles},
    displayTileColor='#E0E0F3',
    dateTextStyle={...Styles.dateTextStyle},

    baseStyle={...Styles.baseStyle},
    baseColor='#090A7A',

    whiteArrow=false,

    clearDate=true,

    timePicker=false,

}){
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    /////////////////
    //  Constants  //
    /////////////////

        const dayInMilliseconds = 1000 * 60 * 60 * 24
      
    /////////////////
    // Local State //
    /////////////////

        const startDay = startDate
        const DateForSetting = new Date(startDay)

        const startMonth = DateForSetting.getMonth() + 1
        const startYear = DateForSetting.getFullYear()
        const startDateDay = DateForSetting.getDate()
        const startHours = DateForSetting.getHours()
        const startMin = DateForSetting.getMinutes()

        const [initialLoad, setInitialLoad] = useState(false)

        const [now, setNow] = useState(new Date(DateForSetting))

        const [getDay, setDay] = useState(startDateDay)

        const [getMonth, setMonth] = useState(startMonth)

        const [getYear, setYear] = useState(startYear)

        const [getHours, setHours] = useState(startHours)

        const [getMinutes, setMinutes] = useState(startMin)

        let amPM = 'am'
        if (getHours >= 12){
            amPM = 'pm'
        }

        const [amPm, setAmPm] = useState(amPM)


        // const [clear, setClear] = useState(false)

///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    // Renders the date number, as well as the title and up and down
    function renderSelection(getter, time){
        if (time === "none"){
            return(
                <TouchableOpacity style={{marginTop: 67.5}}>
                    {renderValueBlock(getter)}
                </TouchableOpacity>
            )
        }
        return(
            <View>

                <Text style={{textAlign: 'center', ...timeTitleStyle}}>
                    {time}
                </Text>

                {/* Up Arrow */}
                <TouchableOpacity >
                    {renderUpArrow(time)}
                </TouchableOpacity>

                {/* Number */}
                <TouchableOpacity>
                    {renderValueBlock(getter)}
                </TouchableOpacity>

                {/* Dowm Arrow */}
                <TouchableOpacity >
                    {renderDownArrow(time)}
                </TouchableOpacity>
            </View>
        )
    }

    // Up arrow
    function renderUpArrow(time){
        let image = blackUp
        if (whiteArrow){
            image = whiteUp
        }
        return(
            <TouchableOpacity style={{alignItems: 'center', height: 36}} onPress={() => handleClick(time, "add")}>
                <Image source={image} style={{width: 25, height: 25, marginBottom: 5}} />
            </TouchableOpacity>
        )
    }

    // Down arrow
    function renderDownArrow(time){
        let image = blackDown
        if (whiteArrow){
            image = whiteDown
        }
        return(
            <TouchableOpacity style={{alignItems: 'center',  height: 36}}  onPress={() => {
                handleClick(time, "sub")
            }}>
                <Image source={image} style={{width: 25, height: 25, marginTop: 5}} />
            </TouchableOpacity>
        )
    }

    // renders the current day, month, or year
    function renderValueBlock(getter){
        return (
            <View style={{...displayTileStyle, backgroundColor: displayTileColor}}>
                <Text style={{textAlign: 'center', ...dateTextStyle}}>
                    {getter}
                </Text>
            </View>
        )
    }


///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////

    // Adds or Removes a Day, Month, or Year
    function handleClick(time, subOrAdd){
        let op = 1
        if (subOrAdd === "sub"){ op = -1}

        if (time === "Day"){
            // Changes the now obejct (full date object representing day)
            // if (!now){
            //     return  null
            // }
            setNow(new Date(now.setDate(now.getDate() + (1 * op))))
        }
        else if (time === "Month"){
            // Changes the now obejct (full date object representing day)
            setNow(new Date(now.setMonth(now.getMonth() + (1 * op))))
            
        }
        else if(time === "Year"){
            // Changes the now obejct (full date object representing day)
            setNow(new Date(now.setFullYear(now.getFullYear() + (1 * op))))
        }
        else if (time === "Hour"){
            // Changes the Hour of the full date object
            setNow(new Date(now.setHours(now.getHours() + (1 * op))))
        }
        else if (time === "Minute"){
            // Changes the Hour of the full date object
            setNow(new Date(now.setMinutes(now.getMinutes() + (15 * op))))
        }
    }


    // Runs in UseEffect to set all numeric states to match date
    async function setAllStates(){
        if (typeof now.getDate() === 'undefined'){
            return null
        }
        await setDay(now.getDate())
        await setMonth(now.getMonth() + 1)
        await setYear(now.getFullYear())
        await setMinutes(now.getMinutes())
        let newHours = (now.getHours())
        if (newHours > 12){
            newHours = newHours - 12
            setAmPm("pm")
            setHours(newHours)
        }
        else if (newHours === 12 && getMinutes > 0){
            setAmPm("pm")
            setHours(newHours)
        }
        else {
            if (newHours === 0){
                newHours = 12
            }
            setAmPm("am")
            setHours(newHours)
        }
    }

    // Runs the imported prop function with a returned dateObject
    function runOnDateChange(){
        if (typeof now.getDate() === 'undefined'){
            return null
        }
        onDateChange({dateObject: `${now}`, date: now.getDate(), month: now.getMonth(), year: now.getFullYear()})
    }

////////////////////////
///                  ///
///    UseEffects    ///
///                  ///
////////////////////////

        // Resets the Date back to Start on Reset
        useEffect(() => {
            if (!initialLoad){
                return
            }
            // let resetObj = new Date( new Date().setFullYear(startYear))
            // resetObj = new Date(resetObj.setMonth(startMonth))
            // resetObj = new Date(resetObj.setDate(startDay))
            // setNow(resetObj)
        }, [clearDate])


        // Sets the Individual Numeric States based off of `now` changes
        useEffect(() => {

            //////////////////////
            // Sets the Numbers //
            setAllStates()
            .then(() => {

                /////////////////////////////
                // Fires the Prop Function //
                runOnDateChange()

            })
        }, [now])

        useEffect(() => {
            setInitialLoad(false)
        }, [])

///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////

    // Main render function
    function MAIN(){
        if (timePicker){
            return(
                <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: baseColor, ...baseStyle}}>
                        {renderSelection(getMonth, "Month")}
                        {renderSelection(getDay, "Day")}
                        {renderSelection(getYear, "Year")}
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: baseColor, ...baseStyle, marginTop: 10}}>
                        {renderSelection(getHours, "Hour")}
                        {renderSelection(getMinutes, "Minute")}
                        {renderSelection(amPm, "none")}
                    </View>
                </View>
            )
        }
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: baseColor, ...baseStyle}}>
                {renderSelection(getMonth, "Month")}
                {renderSelection(getDay, "Day")}
                {renderSelection(getYear, "Year")}
            </View>
        )
    }

    return MAIN()
}