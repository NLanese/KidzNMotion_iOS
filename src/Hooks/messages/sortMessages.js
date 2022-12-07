import convertMonthToNumber from "../date_and_time/convertMonthIntoNumber"

export default function sortMessagesBySendDate(messages){
    if (!messages){
        return false
    }
    // messages.sort(compareTwoDates(a.createdAt, b.createdAt)});
    return messages.sort(function(a,b){
        date1 = a.createdAt
        date2 = b.createdAt
        return (new Date(date1) - new Date(date2))
    })
}

function compareTwoDates(date1, date2){
    let date1Array = (date1.split(" "))
    let date2Array = (date2.split(" "))
    let m1 = convertMonthToNumber(date1Array[1])
    let m2 = convertMonthToNumber(date2Array[1])

    let d1 = date1Array[2]
    let d2 = date1Array[2]

    let y1 = date1Array[3]
    let y2 = date2Array[3]

    let t1 = date1Array[4]
    let t2 = date2Array[4]

    m1 = parseInt( m1, 10)
    m2 = parseInt( m2, 10)
    
    d1 = parseInt( d1, 10)
    d2 = parseInt( d2, 10)

    y1 = parseInt( y1, 10)
    y2 = parseInt( y2, 10)

    t1 = parseInt( t1, 10)
    t2 = parseInt( t2, 10)

    // Year Check
    if (y1 < y2){
        return -1
    }
    else if (y2 < y1){
        return 1
    }
    else{

        // Month Check
        if (m1 < m2){
            return -1
        }
        else if (m2 < m1){
            return 1
        }
        else{

            // Day Check
            if (d1 < d2){
                return -1
            }
            else if (d2 < d1){
                return 1
            }
            else{

                // Time Check
                if (t1 < t2){
                    return -1
                }
                else if (t2 < t1){
                    return 1
                }
            }
        }
    }

}