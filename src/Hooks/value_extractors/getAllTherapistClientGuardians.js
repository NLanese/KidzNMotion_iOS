export default function getAllTherapistClientGuardians(therapist){
    let rArray = []
    let rArrayIDs = []
    therapist.patientCarePlans.forEach(pcp => {
        if (!pcp.child){
            return null
        }
        if (!rArrayIDs.includes(pcp.child.guardian.id)){
            rArray.push(pcp.child.guardian)
            rArrayIDs.push(pcp.child.guardian.id)
        }
    })
    return rArray
}