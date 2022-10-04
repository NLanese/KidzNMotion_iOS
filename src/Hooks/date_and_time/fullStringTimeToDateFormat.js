import convertMonthToNumber from "./convertMonthIntoNumber";

export default function fullStringToDateFormat(str){
    if (!str){
        return null
    }
    str = str.toString()
    let month = `${convertMonthToNumber(str.split(" ")[1])}`
    month = month.toString().padStart(2, '0')
    let day = `${(str.split(" ")[2])}`
    day = day.toString().padStart(2, '0')
    let year = str.split(" ")[3]
    return `${year}-${month}-${day}`
    // return str
}