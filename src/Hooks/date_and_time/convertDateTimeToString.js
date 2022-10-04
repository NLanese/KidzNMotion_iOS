import convertReactCalandarDateString from "./convertReactCalandarDateString"
import convertReactNativeTimeDateString from "./convertReactNativeTimeToString"

export default function convertDateTimeToString(dateTime){

    if (!dateTime){
        return ("xx-xx-xxxx")
    }
    dateTime = `${dateTime}`
    return dateTime
    // dateTime = 'yyyy-mm-ddThh:mm:ss'
    // let seperatedDateAndTime = dateTime.split("T")
    // let dateObj = convertReactCalandarDateString(seperatedDateAndTime[0])
    // let time = convertReactNativeTimeDateString(seperatedDateAndTime[1])

    // return {date: dateObj, time: time}

}