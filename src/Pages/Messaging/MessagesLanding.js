// Reaact
import { View, Text, Dimensions } from "react-native";
import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";

// Nuton
import { Header } from "../../../NutonComponents";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, userState, colorState, fontState, avatarState } from '../../../Recoil/atoms';

// GraphQL and Shit
import { GET_CHATS, CREATE_CHATROOM, GET_USER } from "../../../GraphQL/operations";
import { useMutation, useQuery } from "@apollo/client";
import client from "../../utils/apolloClient";

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import TabBar from "../../../OstrichComponents/TabBar";

// KNM Components
import ConversationsThread from "./ConversationsThread";
import MessageThread from "./MessageThread";

let maxHeight = Dimensions.get('window').height

export default function MessagesLanding() {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    ///////////////
    // Constants // 
    ///////////////

        const COLORS = useRecoilValue(colorState)
        const FONTS = useRecoilValue(fontState)
        const SIZES = useRecoilValue(sizeState)
        const AVATAR = useRecoilValue(avatarState)
        const navigation = useNavigation();

    /////////////////
    // Local State //
    /////////////////

        const [loading, setLoading] = useState(true)

        const [myChats, setMyChats] = useState([])

        const [chatState, setChatState] = useState(false)

        const [loadingChats, setLoadingChats] = useState(false)

        const [reset, setReset] = useState(false)

    //////////////////
    // Recoil State //
    //////////////////

        // Tracks user data
        const [user, setUser] = useRecoilState(userState)

        // Tracks the Children
        const [children, setChildren] = useState(user.children)

        // The Child who is selected
        const [msgUser, setMsgUser] = useState(user)


///////////////////////
///                 ///
///    useEffect    ///
///                 ///
///////////////////////

    useEffect( () => {
        setLoading(true)
        setReset(!reset)
        ///////////////////////
        // Guardian Messages //
        if (msgUser.role === "GUARDIAN"){
            setMyChats(user.chatRooms)
            setChatState(<MessageThread hardCodedChat={user.chatRooms} hardCoderUserId={msgUser.id} isItMe={isThisChatMine()} reset={reset}/>)
        }

        ////////////////////
        // Child Messages //
        else if (msgUser.role === "CHILD"){
            if (msgUser.chatRooms.length < 1){
                setMyChats("No Chats")
            }
            else{
                setMyChats(msgUser.chatRooms)
                setChatState(<MessageThread hardCodedChat={msgUser.chatRooms} hardCoderUserId={msgUser.id} isItMe={isThisChatMine()} reset={reset}/>)
                setReset(!reset)
            }
            setLoading(false)
        }

        setLoading(false)
    }, [msgUser])

    useEffect(() => {
    }, [user])

    useEffect(() => {
    }, [myChats])

    
///////////////////////
///                 ///
///    Mutations    ///
///                 ///
///////////////////////

    const [createChatRoom, { loading: loadingChat, error: errorChat, data: dataChat }] = useMutation(CREATE_CHATROOM);

///////////////////////
///                 ///
///    Rendering    ///
///                 ///
///////////////////////

    ////////////
    // Static //
    ////////////

    // Renders the header bar and back arrow
    function renderHeader() {
        return(
            <View style={{marginTop: 45}}>
                <Header 
                    onPress={() => navigation.goBack()}
                    goBack={true}
                    profile={true}
                    filterOnPress={() => navigation.navigate("SettingsLanding")}
                    title={"Messages"}
                />
            </View>    
        ) 
    }

    // Renders based on role
    function mainRender(){
        if (user.role === "GUARDIAN" || user.role === "CHILD"){
            return(
                <View style={{marginTop: maxHeight * 0.05}}>
                    {/* {renderTabBar()} */}
                    {renderChildOrGuardianMessages()}
                </View>
            )
        }
        else if (user.role === "THERAPIST"){
            return(
                <ConversationsThread user={user} setUser={setUser}/>
            )
        }
    }

    ////////////////////////////
    // Guardians and Children //
    ////////////////////////////

    // Renders the Child Selection TabBar
    function renderTabBar(){
        if (children){
            if (children.length > 0){
                let tabsContent = children.map(child => child.firstName)
                if (user.role === "GUARDIAN"){
                    tabsContent.push("My Chats")
                }
                return(
                    <View style={{alignItems: 'center'}}>
                        <TabBar
                            tabsArray={tabsContent}
                            onChangeIndex={(index) => {selectChild(index)}}
                            styleActive={{borderBottomColor: COLORS.iconLight, borderBottomWidth: 3, padding: 2, marginRight: 5, marginLeft: 5, width: 90}}
                            styleInactive={{borderBottomColor: "grey", borderBottomWidth: 3, padding: 2, marginRight: 5, marginLeft: 5, width: 90}}
                            tabTextStyleActive={{fontFamily: "Gilroy-Bold", textAlign: 'center', fontSize: 16, color: COLORS.iconLight, marginBottom: 3}}
                            tabTextStyleInactive={{fontFamily: "Gilroy-Bold", textAlign: 'center', fontSize: 16, color: "grey", marginBottom: 3}}
                            startIndex={tabsContent.length -1}
                        />
                    </View>
                )
            }
        }
    }

    // Renders the Child Screen, which is just going to be a 1 on 1 with the therapist, no conversation thread
    function renderChildOrGuardianMessages(){
        if (loading){
            return null
        }
        if (myChats === "No Chats"){
            return(
                <View>
                    <Text style={{...FONTS.Title, textAlign: 'center'}}>
                        Your child hasn't sent or recieved any messages yet
                    </Text>
                </View>
            )
        }
        else{
            return renderMessageThread(myChats)
        }
    }

    // Renders.. I mean dude just read the name fr
    function renderMessageThread(chat){
        if (loading){
            return  null
        }
        return chatState
    }



///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////

    ///////////////////////////
    // Mutations and Queries //
    ///////////////////////////

        // Chat Getter
        async function getMyChats() {
            await client.query({
                query: GET_CHATS,
                fetchPolicy: 'network-only'  
            })
            .then(async (resolved) => {
                setMyChats(resolved.data.getUserChatRooms)
            })
            .catch((error) => {
                console.log(error)
            });
        }

        // Creates the Chatroom Mutation
        async function createChatroomMutation(contact){
            return await createChatRoom({
                variables: {
                    otherParticipantID: contact.id
                }
            }).catch(error => console.log(error))
        }

        // Used in getMyChats to filter out children chats
        function filterChats(chatrooms, ID){
            return chatrooms.filter(chatroom => {
                let passing = false
                chatroom.users.forEach(user => {
                    if (user.id === ID){
                        passing = true
                        return
                    }
                })
                if (passing){
                    return chatroom
                }
            })
        }

        // Creates the Chatroom, Updates the User, and Navigates to the new chatroom
        function handleCreateChatroom(contact){
            createChatroomMutation(contact)
            .then( async (resolved) => {
                await getUserQuery()
                // navigation.navigate("MessageThread", {chatroom: null})
            })
        }

        // Gets the entire User Object
        async function getUserQuery(){
            await client.query({
                query: GET_USER,
                fetchPolicy: 'network-only'  
            })
            .then(async (resolved) => {
                await setUser(resolved.data.getUser)
            })
            .catch((error) => {
                console.log(error)
            })
        }

    ////////////////////
    // Local Handlers //
    ////////////////////

        // Assists TabBar in assigning 
        function selectChild(index){
            setReset(!reset)
            if (index >= children.length){
                setMsgUser(user)
            }
            else {
                setMsgUser(children[index])
            }
        }

        // For HardCoded MessageThread, cannot send messages if it is not yours
        function isThisChatMine(){
            if (msgUser.id === user.id){
                return true
            }
            else{
                return false
            }
        }

        // Finds all children therapists to create Guardian chats with them
        async function findAllChildrenTherapists(){
            if (children && children.length > 1){
                children.forEach( async (child) => {
                    await findTherapistAndCreateChat(child)
                })
            }
            else{
                await findTherapistAndCreateChat(children[0])
            }
        }

        // Finds one childs Therapist and creates the chat
        function findTherapistAndCreateChat(child){
            if (child.role !== "CHILD"){
                return null
            }
            let therId = findTherapist(child)
            handleCreateChatroom({id: therId})
        }

        // Finds Child's Therapist ID 
        function findTherapist(child){
            return (child.childCarePlans[0].therapist.id)
        }

   

///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////
    return(
        <Gradient
            colorOne={COLORS.gradientColor1}
            colorTwo={COLORS.gradientColor2}
            style={{height: '100%'}}
        >
            {renderHeader()}
            {mainRender()}
        </Gradient>
    )
}