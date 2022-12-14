export default function findVideosMissing(ass){
    return ass.videos.filter(vid => {
        if (!vid.completed){
            return vid
        }
    })
}