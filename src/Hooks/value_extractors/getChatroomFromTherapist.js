export default function getChatroomFromTherapist(user, therapist){
    let rChat = null
    user.chatRooms.forEach(chat => {
        chat.users.forEach(usr => {
            if (usr.id === therapist.id){
                rChat = chat
                return
            }
        })
    })
    return rChat
}
