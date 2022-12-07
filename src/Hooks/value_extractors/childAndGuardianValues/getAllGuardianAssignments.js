export default function getAllGuardianAssignments(user){
    return user.children.map(child => {
        return child.childCarePlans[0].assignments
    })
}