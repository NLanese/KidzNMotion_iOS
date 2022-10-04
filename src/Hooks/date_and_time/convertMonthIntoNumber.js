export default function convertMonthToNumber(mon){

    if (mon.includes("Jan")){
        return 1
    }
    else if (mon.includes("Feb")){
        return 2
    }
    if (mon.includes("Mar")){
        return 3
    }
    if (mon.includes("Apr")){
        return 4
    }
    if (mon.includes("May")){
        return 5
    }
    if (mon.includes("Jun")){
        return 6
    }
    if (mon.includes("Jul")){
        return 7
    }
    if (mon.includes("Aug")){
        return 8
    }
    if (mon.includes("Sep")){
        return 9
    }
    if (mon.includes("Oct")){
        return 10
    }
    if (mon.includes("Nov")){
        return 11
    }
    if (mon.includes("Dec")){
        return 12
    }
    else{
    }
}