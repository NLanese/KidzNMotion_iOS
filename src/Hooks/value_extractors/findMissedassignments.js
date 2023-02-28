import convertMonthToNumber from "../date_and_time/convertMonthIntoNumber"

export default function findMissedAssignments(ass){

    if (!ass){
        return []
    }

    if (ass.length < 1){
        return []
    }

    let nonComplete = ass.filter(a => {
        let allComplete = true
        a.videos.forEach(vid => {
            if (!vid.completed){
                allComplete = false
            }
        })
        if (!allComplete){
            return a
        }
    })

    return nonComplete.filter(assign => {
        let dt = assign.dateDue

        // Set Up //
        let y = (new Date().getFullYear())
        let m = (new Date().getMonth() + 1)
        let d = (new Date().getDate())
        let am = convertMonthToNumber(dt.split(" ")[0])
        let ad = dt.split(" ")[1]
        let ay = dt.split(" ")[2]

        // Is the current year lower than the meeting year
        if (y > ay){
            return assign
        }

        // Are the Years the same
        else if (y <= ay){

            // Is the Meeting Month further?
            if (m > am){
                return assign
            }

            // Are the months the same?
            else if (m == am){

                // As long as meeting date isnt less than current date
                if (d <= ad){
                    return assign
                }
            }
        }
    })
}