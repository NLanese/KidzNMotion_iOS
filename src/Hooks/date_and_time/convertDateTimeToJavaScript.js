import convertReactCalandarDateString from "./convertReactCalandarDateString"
import convertReactNativeTimeDateString from "./convertReactNativeTimeToString"

export default function convertDateTimeToJavaScript(dateTime){

    if (!dateTime){
        return ("xx-xx-xxxx")
    }

    // dateTime = 'yyyy-mm-ddThh:mm:ss'
    let seperatedDateAndTime = dateTime.split("T")
    let dateObj = convertReactCalandarDateString(seperatedDateAndTime[0])
    let time = convertReactNativeTimeDateString(seperatedDateAndTime[1])

    let year = dateTime.split("-")[0]
    let month = dateTime.split("-")[1]
    let day = dateTime.split("-")[2].split("T")[0]

    let hour = time.split(":")[0]
    let min = time.split(":")[1].slice(0, 2)

    if (hour === 0){
        hour = hour + 1
    }

    let amPm = "am"
    let amPmHour = hour

    if (hour > 12){
        amPm = "pm"
        amPmHour = hour - 12
    }
    else if (hour === 12 && min > 0){
        amPm = 'pm'
    }

    return {dateObj: dateObj, time: time, year: year, month: month, date: day, hour: hour, amPm: amPm, amPmHour: amPmHour, min: min}

}