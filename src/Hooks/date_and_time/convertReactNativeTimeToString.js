export default function convertReactNativeTimeDateString(time){
    // "13:47:15:1232"
    if (!time){
        return (null)
    }
    let am_pm = "am"
    let timeArray = time.split(":")

    let hours = timeArray[0]
    if (hours > 12){
        hours = hours - 12
        am_pm = "pm"
    }
    else if (hours == 12){
        am_pm = "pm"
    }
    else if (hours == 0){
        hours = 12
    }

    let min = timeArray[1]

    return `${hours}:${min}${am_pm}`
}