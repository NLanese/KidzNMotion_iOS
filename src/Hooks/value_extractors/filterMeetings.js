export default function filterMeetings(meet){
    return meet.filter(meeting => {
        let dt = meeting.meetingDateTime
        if (!meeting.canceled){

            // Set Up //
            let y = (new Date().getFullYear())
            let m = (new Date().getMonth() + 1)
            let d = (new Date().getDate())
            let my = dt.split("-")[0]
            let mm = dt.split("-")[1]
            let md = dt.split("-")[2].split("T")[0]

            // Checking Dates

            // Is the current year lower than the meeting year
            if (y < my){
                return meeting
            }

            // Are the Years the same
            else if (y == my){

                // Is the Meeting Month further?
                if (m < mm){
                    return meeting
                }

                // Are the months the same?
                else if (m == mm){

                    // As long as meeting date isnt less than current date
                    if (d <= md){
                        return meeting
                    }
                }
            }
        }
    })
}