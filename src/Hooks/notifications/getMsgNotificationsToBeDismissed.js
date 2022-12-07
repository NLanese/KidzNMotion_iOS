export default function getMsgNotificationsToBeDismissed(notifications, contact){
    return notifications.filter( noti => {
        if (noti.title === `New Message From ${contact.firstName}`){
            return noti
        }
    })
}