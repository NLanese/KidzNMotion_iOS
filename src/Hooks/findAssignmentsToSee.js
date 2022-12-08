import convertMonthToNumber from "./date_and_time/convertMonthIntoNumber"

export default function findAssignmentsToSee(assignments, date){ 
    if (date === "all"){
        return assignments
    }
    let m = ((date.toString().split(" ")[1]))
    let d = date.toString().split(" ")[2]
    let target = (`${m} ${d}`)
    let rArray = assignments.filter(ass => {
        if (ass.dateStart.includes(target) || ass.dateDue.includes(target)){
            return ass
        }
    })
    return rArray
}