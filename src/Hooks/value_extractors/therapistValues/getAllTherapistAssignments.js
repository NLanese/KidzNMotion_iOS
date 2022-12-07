export default  function getAllTherapistAssignments(user){
    let rArray = []
    user.patientCarePlans.forEach(pcp => {
        if (!pcp.assignments){
            return null
        }
        pcp.assignments.forEach( ass => {
            rArray = [...rArray, ass]
        })
    })
    return rArray
}