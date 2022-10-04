export default function deslugVideoTitle(video){
    let rArray = video.contentfulID.split("_")
    let rString = ""
    const capitalize = (word) => {
        return (word[0].toUpperCase() + word.substring(1))
    }
    let len = rArray.length
    let i = 0
    while (i < len){
        if ( i > 0){
            rString = rString + " "
        }
        rString = rString + `${capitalize(rArray[i])}`
        i = i + 1
    }
    return rString
}