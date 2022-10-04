export default function getAllTherapistClients(therapist){
    let rArray = []
    let rArrayIDs = []
    therapist.patientCarePlans.forEach(pcp => {
        if (!pcp.child){
            return null
        }
        if (!rArrayIDs.includes(pcp.child.id)){
            rArray.push(pcp.child)
            rArrayIDs.push(pcp.child.id)
        }
    })
    return rArray
}