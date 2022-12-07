export default function sortVideosByLevel(videos){
    let rVideos = videos.filter((vid) => {
        if (vid.level !== 0){
            return vid
        }
    })
    return rVideos.sort(function(a, b){
        let l1 = a.level
        let l2 = b.level
        return l1 - l2
    })
}