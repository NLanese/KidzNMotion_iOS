export default function findTherapist(user, childId=false){
    let child = false
    if (user.role === "CHILD"){
        child = user
    }
    else if (user.role === "GUARDIAN"){
        let rArr = user.children.filter(chi => {
            if (chi.id === childId){
                return chi
            }
        })
        child = rArr[0]
    }
    return (child.childCarePlans[0].therapist)
}