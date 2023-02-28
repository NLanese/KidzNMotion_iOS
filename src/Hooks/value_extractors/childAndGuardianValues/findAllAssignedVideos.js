export default function findAllAssignedVideos(user){
    // Inits
    let rArray = []
    let target

    // Determine Target
    if (user.role === "GUARDIAN"){
        target = user.children[0]
    }
    else if (user.role === "CHILD"){
        target = user
    }
    else{
        return "ALL"
    }

    // PArse Assignments
    if (! target.childCarePlans){
        return []
    }

    if (target.childCarePlans.length < 1){
        return []
    }


    let assignments =  target.childCarePlans[0].assignments
    assignments.forEach(ass => {
        ass.videos.forEach(vid => {
            rArray.push(vid.contentfulID)
        })
    })
    let uniqueArray = [...new Set(rArray)]
    return uniqueArray
}