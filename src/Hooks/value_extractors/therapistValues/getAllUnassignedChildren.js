export default function getAllUnassignedChildren(therapist){
    let rArr = []
    therapist.organizations[0].organization.organizationUsers.forEach(user => {
        if (user.user){
            if (user.user.role === "GUARDIAN"){
                user.user.children.forEach( child => {
                    if (!child.childCarePlans.therapist){
                        rArr.push(child)
                    }
                })
            }
        }
    })
    return rArr
}