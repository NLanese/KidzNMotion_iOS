R A C E C A R

// Find String Length 7 

// Find half string length (INT) 3 


// substring of that length 

// substring from end to near middle same length

// Reverse order

function isPalidrome(str){
    let halfLen = str / 2
    let start = str.slice(0, halfLen-1)
    // start == 'rac'

    if (str.length % 2 !== 0){
        let end = str.slice(halfLen + 1, str.length - 1)
        // end = 'car'
    }
    else{
        let end = str.slice(halfLen, str.length - 1)
    }

    let reversedEnd = end.split("").reverse()
    // `car` == [c, a, r]  == [r, a, c]

    reversedEnd = reversedEnd.toString()
    // `rac`

    if (start === reversedEnd){
        return true
    }
    
    return false
}