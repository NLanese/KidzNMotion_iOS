export default function getUserChatroom(user){
    if (user.role === "GUARDIAN"){
        return user.chatRooms[0]
    } 
    else if (user.role === "CHILD"){
        return false
    }
    else if (user.role === "THERAPIST"){
        return user.chatRooms
    }
} 