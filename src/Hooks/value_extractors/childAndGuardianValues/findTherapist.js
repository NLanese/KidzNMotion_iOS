export default function findTherapist(user, childId=false){
    let child = false
    if (user.role === "CHILD"){
        child = user
        // console.log(child)
    }
    else if (user.role === "GUARDIAN"){
        let rArr = user.children.filter(chi => {
            if (chi.id === childId){
                // console.log("Child added to array")
                return chi
            }
        })
        child = rArr[0]
    }
    return (child.childCarePlans[0].therapist)
}