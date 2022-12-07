import convertMonthToNumber from "../date_and_time/convertMonthIntoNumber"

export default function getSchedNotificationsToBeDismissed(notifications, date){ 
    if (date === "all"){
        return notifications
    }
    let m = (convertMonthToNumber(date.toString().split(" ")[1]))
    let d = date.toString().split(" ")[2]
    let target = (`${m}/${d}`)
    let rArray = notifications.filter(noti => {
        if (noti.description.includes(target)){
            return noti
        }
    })
    return rArray
}