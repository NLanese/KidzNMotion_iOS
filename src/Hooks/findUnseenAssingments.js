
export default function findUnseenAssignments(assign){
    return assign.filter(ass => {
        if (!ass.seen){
            return ass
        }
    })
}