export default function getTherapistChatFronContacts(user, contact){
    let found = false
    user.chatRooms.forEach((chat) => {
        chat.users.forEach(person => {
            if (contact.id === person.id){
                found = chat
            }
        })
    })
    return found
}