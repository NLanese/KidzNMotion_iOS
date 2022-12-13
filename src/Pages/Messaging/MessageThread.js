// Reaact
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";

// Pusher
import pusherClient from "../../utils/pusherClient";

// Nuton
import { Header } from "../../../NutonComponents";

// GraphQL
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE, GET_CHAT_FROM_ID, GET_USER, DISMISS_NOTIFICATION, GET_NOTIFICATIONS } from "../../../GraphQL/operations";
import client from "../../utils/apolloClient";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, userState, colorState, fontState, avatarState, tokenState, activeChatroom, messageNotifications } from '../../../Recoil/atoms';

// Hooks
import getMsgNotificationsToBeDismissed from "../../Hooks/notifications/getMsgNotificationsToBeDismissed";
import sortMessagesBySendDate from "../../Hooks/messages/sortMessages";

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import { useEffect } from "react";

// Dimensions 
let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height

export default function MessageThread(props) {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

const COLORS = useRecoilValue(colorState)
const FONTS = useRecoilValue(fontState)
const SIZES = useRecoilValue(sizeState)
const AVATAR = useRecoilValue(avatarState)
const token = useRecoilValue(tokenState)
const navigation = useNavigation();

// User
const [user, setUser] = useRecoilState(userState)

// Chatroom (active)
const [chatroom, setChatroom] = useRecoilState(activeChatroom)

// Contact Filler
const [contact, setContact] = useState({
    firstName: false,
    lastName: false,
    profilePic: "null"
})

// Notifications
const [notis, setNotis] = useRecoilState(messageNotifications)

// Text Entered in Message Space
const [textEntered, setTextEntered] = useState()

// Not sure anymore
const [reset, setReset] = useState(props.reset)

// For paddingBottom
const [inMessageSpace, setInMessageSpace] = useState(false)

// Padding for the bottom of the view when keyboard comes up since KeyboardAvoidingView is the worst thing since aids
const [bottomPad, setBottomPad] = useState(0)


///////////////////////
///                 ///
///    useEffect    ///
///                 ///
///////////////////////

    // Populates Contact State
    useEffect(() => {
        setContact(chatroom.users.filter(person => {
            if (person.id !== user.id){
                return person
            }
        })[0])
    }, [chatroom])

    // Utilizes Pusher API in order to refresh chat on newly recieved messages
    useEffect(() => {
        // // Creates a connection to pusher, which will send a signal here once IT recieves a signal from another message sender
        // // For example, if this is a chat between person X and person Y, and this file is being used by person X, 
        // // if person Y were to send a messaage, that message is now in the db (duh) and a signal is sent to pusher
        // // which sends a signal to this new client. This will then allow me to trigger a rerender on signal recieving
        // const chatRoomChannel = pusherClient.subscribe(
        //   chatroom.id.toString()
        // );
    
        // chatRoomChannel.bind("new-message", function (data) {
        //   fetchChatDetail();
        // });
    
        // return () => {
        //   pusherClient.unsubscribe(chatroom.id.toString());
        // };
    }, [chatroom.id]);
    
    // Backup for live refresh
    useEffect(() => {
        fetchChatDetail();
    }, [chatroom.id]);

    // Handles Notification Dismissal
    useEffect(() => {
        handleNotifications()
    }, [contact])

    // Adds padding to the bottom since KeyboardAvoidingView is absolutely gay as fuck
    useEffect(() => {
        console.log("changed")
        if (inMessageSpace){
            console.log("padding")
            setBottomPad(-155)
        }
        else{
            console.log("none")
            setBottomPad(0)
        }
    }, [inMessageSpace])


///////////////////////
///                 ///
///    Mutations    ///
///                 ///
///////////////////////

    // Sends Message
    const [sendMessage, { loading: loadingAdd, error: errorAdd, data: typeAdd }] =useMutation(SEND_MESSAGE);

    // Dismisses Notifications
    const [dismissNotifications, { loading: loadingDis, error: errorDis, data: typeDis }] =useMutation(DISMISS_NOTIFICATION);

    // Refreshes the Chat when you send a message
    const fetchChatDetail = async () => {
        if (token) {
          await client
            .query({
              query: GET_CHAT_FROM_ID,
              fetchPolicy: "network-only",
              variables: {
                id: chatroom.id,
              },
            })
            .then(async (resolved) => {
              setChatroom(resolved.data.getChatFromId);
            })
            .catch((error) => {
                console.log("Sorry, there was an error getting this information\n", error);
            });
        } else {
            console.log("No token?")
        }
    };

///////////////////////
///                 ///
///      Style      ///
///                 ///
///////////////////////

const Styles = StyleSheet.create({
    yourMessageBubble: {
        padding: maxWidth * 0.01,
        paddingLeft: maxWidth * 0.03,
        backgroundColor: COLORS.gradientColor1,
        borderRadius: 10,
        flex: 7,
        marginBottom: 8
    },
    yourMessageBubbleNA: {
        padding: maxWidth * 0.01,
        paddingLeft: maxWidth * 0.03,
        marginLeft: maxWidth * 0.015,
        borderRadius: 10,
        flex: 7,
        marginBottom: 8
    },
    messageProfilePic:{
        flex: 2
    },
    theirMessageBubble: {
        padding: maxWidth * 0.01,
        marginRight: maxWidth * 0.015,
        paddingLeft: maxWidth * 0.03,
        backgroundColor: 'white',
        borderRadius: 10,
        flex: 7,
        marginBottom: 8
    },
    theirMessageBubbleNA: {
        padding: maxWidth * 0.01,
        paddingRight: maxWidth * 0.03,
        borderRadius: 10,
        flex: 7,
        marginBottom: 8
    },
    messageSpace: {
        // position: 'relative',
        marginRight: 2, 
        marginLeft: 2, 
        borderColor: COLORS.iconLight, 
        height: maxHeight * 0.72,
        padding: 4, 
        borderColor: COLORS.iconLight, 
        borderWidth: 1, 
        borderRadius: 10,
        paddingTop: 30, 
        paddingBottom: 20,
    },
    textBubbleView: {
    //    position: 'relative',
       height: maxHeight * .20,
       backgroundColor: COLORS.gradientColor1,
       flexDirection: 'row'
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        marginLeft: maxWidth * 0.07,
        margin: 10,
        height: maxHeight * 0.12,
        width: maxWidth * .75,
        backgroundColor: 'white',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 15
    }
})
   
///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    // Renders the Header guy
    function renderHeader() {
        return (
            <View style={{marginTop: 40}}>
                <Header
                    title={`Chat with ${contact.firstName}`}
                    goBack={true}
                    onPress={() => navigation.goBack()}
                    profile={false}
                    thisFontSize={18}
                />
            </View>
        );
    }

    // Renders a single message
    function renderSingleMessage(message, thisUser, first, last, i){


        if (!message.sentBy){
            return null
        }

        /////////////////
        // Sent By You //
        if (thisUser){
            
            //////////////////////////////////// 
            // This is the first of the clump //
            if (first){
                return(
                    <View style={{display: 'flex', flexDirection: 'row'}} key={i}>
                        <View style={Styles.messageProfilePic} />

                        <View style={Styles.theirMessageBubbleNA} />

                        <View style={Styles.yourMessageBubble}>
                            <Text>{message.content}</Text>
                        </View>

                        <View style={Styles.messageProfilePic}>

                        </View>
                    </View>
                )
            }

            ////////////////////////////////////
            // This is the last of the clump //
            if (last){
                return(
                    <View style={{display: 'flex', flexDirection: 'row'}} key={i}>
                        <View style={Styles.messageProfilePic} />

                        <View style={Styles.theirMessageBubbleNA}>
                            
                        </View>


                        <View style={Styles.yourMessageBubble}>
                            <Text>{message.content}</Text>
                        </View>

                        <View style={Styles.messageProfilePic}/>

                    </View>
                )
            }

            /////////////////////////////////////////
            // Neither first nor last of the clump //
            if (!last && !first){
                return(
                    <View style={{display: 'flex', flexDirection: 'row'}} key={i}>
                        <View style={Styles.messageProfilePic} />

                        <View style={Styles.theirMessageBubbleNA}>
                            
                        </View>


                        <View style={Styles.yourMessageBubble}>
                            <Text>{message.content}</Text>
                        </View>

                        <View style={Styles.messageProfilePic}/>

                    </View>
                )
            }
            
        }
        ///////////////////
        // Sent By Other //
        else if (!thisUser){


            //////////////////////////////////// 
            // This is the first of the clump //
            if (first){
                return(
                    <View style={{display: 'flex', flexDirection: 'row'}} key={i}>

                        <View style={Styles.messageProfilePic}>

                        </View>
                        <View style={Styles.theirMessageBubble}>
                            <Text>{message.content}</Text>
                        </View>


                        <View style={Styles.yourMessageBubbleNA}/>

                        <View style={Styles.messageProfilePic}/>
                    </View>
                )
            }

            ////////////////////////////////////
            // This is the last of the clump //
            if (last){
                return(
                    <View style={{display: 'flex', flexDirection: 'row'}} key={i}>
                        <View style={Styles.messageProfilePic} />

                        <View style={Styles.theirMessageBubble}>
                            <Text>{message.content}</Text>
                        </View>


                        <View style={Styles.yourMessageBubbleNA}/>

                        <View style={Styles.messageProfilePic}/>
                    </View>
                )
            }

            /////////////////////////////////////////
            // Neither first nor last of the clump //
            if (!last && !first){
                return(
                    <View style={{display: 'flex', flexDirection: 'row'}} key={i}>
                        <View style={Styles.messageProfilePic} />

                        <View style={Styles.theirMessageBubble}>
                            <Text>{message.content}</Text>
                        </View>


                        <View style={Styles.yourMessageBubbleNA}>
                            
                        </View>

                        <View style={Styles.messageProfilePic}/>

                    </View>
                )
            }
        }


    }

    // Renders all messages consecutively sent by the same user
    function renderMessagesBySameSender(messageArray){

        let thisSend = user.id

        ////////////////////////////////////////////
        // Iterates through all Supplied Messages //
        return messageArray.map((message, index) => {

            if (!message.sentBy){
                return null
            }

            // This User? If its the user id, yes otherwise, no
            let thisUser = message.sentBy.userID === thisSend ? true : false

            // Fist message? Index == 0 yes, otherwise, no
            let first = index === 0 ? true : false

            // Last message? index = legnth - 1 yes, otheriwse no
            let last = index < messageArray.legth ? false : true

            ////////////
            // RETURN //
            return renderSingleMessage(message, thisUser, first, last, index)
        })
    }

    // Renders all of the messages
    function renderAllMessages(){

        let messageArray = [...chatroom.messages]

        messageArray = (sortMessagesBySendDate(messageArray))

        /////////////////////////////////////////
        // Gets all consecutive message clumps //
        let messageClumps = chopAtDifferentSenders(messageArray)


        //////////////////////////////////////////////////////////////////////////////////
        // Breaks up each message clump into an individual render to return all message //
        return messageClumps.map(messageClump => {
            return renderMessagesBySameSender(messageClump)
        })
    }

    // Renders The Text Input Space
    function renderTextInput(){
        return(
            <View style={Styles.textInput}>
                <TextInput
                    style={{height: '100%'}}
                    value={textEntered}
                    onPressIn={() => setInMessageSpace(true)}
                    onChangeText={(content) => { setTextEntered(content) }}
                    multiline={true}
                />
            </View>
        )
    }

    // Renders the Send Button
    function renderSendButton(){
        return(
            <TouchableOpacity onPress={() => handleSendMessage()} style={{marginTop: 40}}>
                <Gradient
                    style={{height: 50, width: 50, borderRadius: 100, justifyContent: 'center', borderColor: 'black', borderWidth: 1}}
                    colorOne={COLORS.gradientColor1}
                    colorTwo={COLORS.gradientColor2}
                > 
                   <Text style={{textAlign: 'center', fontFamily: 'Gilroy-Bold', fontSize: 16}}>Send</Text>
                </Gradient>
            </TouchableOpacity>
        )
    }
    
    // Combines the Text Input and Send Button into one display
    function renderInputSpace(){
        return(

                <View style={Styles.textBubbleView}>
                    {renderTextInput()}
                    {renderSendButton()}
                </View>
        )
    }

    // Main Render
    function MainRender(){
        return(
            <View>
                {/* All messages */}
                <TouchableWithoutFeedback onPress={() => setInMessageSpace(false)}>
                <ScrollView style={Styles.messageSpace} contentContainerStyle={{paddingBottom: 40}}>
                        {renderAllMessages()}
                </ScrollView>
                </TouchableWithoutFeedback>
                {renderInputSpace()}
            </View>
        )
    }


///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////


    // Returns all of the messages, but grouped by sender
    function chopAtDifferentSenders(messageArray){

        ///////////////
        // Constants //
        let user1 = user
        let user2 = contact
        let returnArrayOfMessages = []
        let arrayOfSameSender = []

        // messageArray.forEach( (msg, i) => {
        //     console.log(i, " : ", msg.content, msg.createdAt)
        //     console.log("\n---")
        // })

        ///////////////////////////////////
        // Iterates through all messages //
        for (let i = 0; i < messageArray.length + 1; i++){

            ///////////////////////////////////////////////////////////////////////////
            // Final iteration, one beyond legth. This pushes all remaining messaged //
            if (!(i < messageArray.length)){
                returnArrayOfMessages.push(arrayOfSameSender)
            }

            ///////////////////////
            // Normal Iterations //
            else {

                /////////////////////////////////////
                // First time accessing this array //
                if (arrayOfSameSender.length === 0){
                    arrayOfSameSender.push(messageArray[i])
                }

                ////////////////////////////////
                // Another of the Same Sender //
                else if (messageArray[i].sentBy.id === arrayOfSameSender[0].sentBy.id){
                    arrayOfSameSender.push(messageArray[i])
                }

                //////////////////////
                // Different Sender //
                else if (messageArray[i].sentBy.id !== arrayOfSameSender[0].sentBy.id){
                    returnArrayOfMessages.push(arrayOfSameSender)
                    arrayOfSameSender = []
                    arrayOfSameSender.push(messageArray[i])
                }
            }

            
        }
 
        //////////////////
        // Final Return //
        return returnArrayOfMessages
    }

    // Does all the mutations, queries, and state changes related nwith sending a message
    function handleSendMessage(){
        if (textEntered === "" || !textEntered){
            return null
        }
        handleSendMessageMutation()
        .then( async (resolved) => {
            setTextEntered("")
            await getAndSetUser()
            await fetchChatDetail()
        })
    }

    // Runs the Apollo Mutation to send the message
    async function handleSendMessageMutation(){
        return await sendMessage({
            variables: {
                content: textEntered,
                chatRoomID: chatroom.id
            }
        }).catch(err => console.log(err, "============\n575\n==========="))
        .then(() => console.log("message sent technically (2 - 572"))
    }

    // Gets Refreshed User Object and Updates the User Atom
    async function getAndSetUser(){
        await client.query({
            query: GET_USER,
            fetchPolicy: 'network-only'  
        })
        .then(async (resolved) => {
            // setUser(resolved.data.getUser)
        })
        .catch((error) => {
            console.log(error, "============\n591\n===========")
        })
    }

    // Handles Notifications -- Fired right away upon loading this page
    function handleNotifications(){
        let notisToDismiss = getMsgNotificationsToBeDismissed(notis, contact)
        notisToDismiss.forEach((noti) => {
            dismissNotificationsMutation(noti)
        })
        getAndSetNotifications()
    }

    // Handles the actual dismissal mutation
    async function dismissNotificationsMutation(notification){
        return await dismissNotifications({
            variables: {
                notificationID: notification.id
            }
        })
        .then((resolved) => {
            console.log(resolved)
        })
        .catch(err => console.log(err, "============\n614\n==========="))
    }

    // Gets and Sets Notifications, sets categorical notis too
    async function getAndSetNotifications(){
        setNotis( notis => [])
        await client.query({
            query: GET_NOTIFICATIONS,
            fetchPolicy: 'network-only'
        })
        .catch(err => console.log(err, "============\n624\n==========="))
        .then((resolved) => {
            let msgN = resolved.data.getNotifications.filter((noti, index) => {
                if (noti.title.includes("New Message")){
                    return noti
                }
            })
            setNotis( msgNotis => ([...msgN]))
        })
    }

///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////

    return(
        // <SafeAreaView style={{ flex: 1 }}>
        // <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        // style={{flex: 1}}
        // enabled
        // >
            <View>
                <Gradient
                colorOne={COLORS.gradientColor1}
                colorTwo={COLORS.gradientColor2}
                style={{marginTop: bottomPad}}
                >
                    {renderHeader()}
                    {MainRender()}
                </Gradient>
            </View>
        // </KeyboardAvoidingView>
        // </SafeAreaView>
    )
}