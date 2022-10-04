const convertReactCalandarDateString = (DateString) => {

    if (!DateString){
        return ("xx-xx-xxxx")
    }

    // "2022-05-24" to "05/24/2022"
    let DateArray = `${DateString}`.split("-")
    let revisedDateString = `${DateArray[1]}/${DateArray[2]}/${DateArray[0]}`
    return revisedDateString
}

export default convertReactCalandarDateString