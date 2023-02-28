import convertMonthToNumber from "../date_and_time/convertMonthIntoNumber"

export default function filterAssignments(ass){

    if (!ass){
        return []
    }

    if (ass.length < 1){
        return []
    }

    return ass.filter(assign => {
        let dt = assign.dateDue

        // Set Up //
        let y = (new Date().getFullYear())
        let m = (new Date().getMonth() + 1)
        let d = (new Date().getDate())
        let mm = convertMonthToNumber(dt.split(" ")[0])
        let md = dt.split(" ")[1]
        let my = dt.split(" ")[2]

        // Is the current year lower than the meeting year
        if (y < my){
            return assign
        }

        // Are the Years the same
        else if (y == my){

            // Is the Meeting Month further?
            if (m < mm){
                return assign
            }

            // Are the months the same?
            else if (m == mm){

                // As long as meeting date isnt less than current date
                if (d <= md){
                    return assign
                }
            }
        }
    })
}