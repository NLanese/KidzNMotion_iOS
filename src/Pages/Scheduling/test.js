const [msgs, setMsgs] = useRecoilState(messageDataState)


// RENDERINGS // 

// Renders the Next Upcoming Meetings
function renderUpcomingMeetings(){
    if (msgs.length < 1){  // no meetings
        return(
            <View style={Styles.upcomingView}>
                <Text style={{...FONTS.Title, color: COLORS.iconLight, textAlign: 'center', margin: 10}}>
                    You have no messages yet!
                </Text>
            </View>
        )
    }
    return(
        <ScrollView style={{...Styles.upcomingView, maxHeight: 350}}>
            {renderMsgs()}
        </ScrollView>
    )
}

// Renders each meeting card
function renderMsgs(){
    return msgs.filter(msg => {
        if (!msg.sent && msg.deleted){
            return null
        }
    }).map(meeting => {
        let dt = convertDateTimeToJavaScript(msg.sentTime)
        return(
           // A bunch of irrelevant styling stuff
        )
    })
}


// SENDINGS //

// Sends message 
async function handleAssignSubmissionClick(){
    setLoading(true)
    sendMessage({client: client, sDate: sDate})
    .then((resolved) => {
        setRefresh(!refresh)
    })
}

// Triggers the Requery when refresh is changed post mutation
useEffect(() => {
    getAndSetUser()
    setLoading(false)
}, [refresh])

 // Gets the user obj and resets the userState
 async function getAndSetUser(){
    await client.query({
        query: GET_CHAT,
        fetchPolicy: 'network-only'  
    })
    .then(async (resolved) => {
        await setUser(resolved.data.getChat.messages)
    })
    .catch((error) => {
        console.log(error)
    })
}
}
