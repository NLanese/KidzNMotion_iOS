export default function getAllGuardianAssignments(user){
    let rArray = []
    user.children.map(child => {
        if (child.childCarePlans.length > 0){
            rArray.push(child.childCarePlans[0].assignments)
        }
    })
    return rArray
}