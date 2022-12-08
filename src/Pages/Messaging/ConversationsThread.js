// Reaact
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity } from "react-native";
import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { userState, activeChatroom } from '../../../Recoil/atoms';

// GraphQL
import { CREATE_CHATROOM } from "../../../GraphQL/operations";
import { useMutation } from "@apollo/client";
import client from "../../utils/apolloClient";

// Hooks
import getTherapistChatFronContacts from "../../Hooks/value_extractors/therapistValues/getTherapistChatFromContact";
import getAllTherapistClientGuardians from "../../Hooks/value_extractors/therapistValues/getAllTherapistClientGuardians";

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import SelectionButton from "../../../OstrichComponents/SelectionButton";

export default function ConversationsThread() {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    ///////////////
    // Constants //
    ///////////////

        const navigation = useNavigation();

        const [user, setUser] = useRecoilState(userState)

        const [allContacts, setAllContacts] = useState(getAllTherapistClientGuardians(user))
        
        const [activeChat, setActiveChat] = useRecoilState(activeChatroom)

    ///////////////
    // useEffect //
    ///////////////


    ///////////////////////////
    // Mutations and Queries //
    ///////////////////////////

        const [createChatRoom, { loading: loadingChat, error: errorChat, data: dataChat }] = useMutation(CREATE_CHATROOM);

///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    // Renders all contacts
    function renderAllContacts() {
        return allContacts.map((contact, index) => {
            return renderContact(contact, index)
        })
    }

    // Renders a single Contact
    function renderContact(contact, i){
        return(
            <SelectionButton 
                title={`${contact.firstName} ${contact.lastName}`}
                subtitle={`${contact.role}`}
                hasProfilePic={true}
                profilePic={contact.profilePic}
                onSelect={() => navigateOrCreateChat(contact)}
                key={i}
            />
        )
    }

///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////

    ///////////////////////////
    // MUTATIONS AND QUERIES //
    ///////////////////////////

        // Creates the Chatroom, Updates the User, and Navigates to the new chatroom
        // function handleCreateChatroom(contact){
        //     createChatroomMutation(contact)
        //     .then( async (resolved) => {
        //         await getUserQuery()
        //         // navigation.navigate("MessageThread", {chatroom: null})
        //     })
        // }

        // Creates the Chatroom Mutation
        // async function createChatroomMutation(contact){
        //     return await createChatRoom({
        //         variables: {
        //             otherParticipantID: contact.id
        //         }
        //     }).catch(error => console.log(error))
        // }

        // Gets the entire User Object
        // async function getUserQuery(){
        //     await client.query({
        //         query: GET_USER,
        //         fetchPolicy: 'network-only'  
        //     })
        //     .then(async (resolved) => {
        //         await setUser(resolved.data.getUser)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
        // }


    ///////////////////
    // DETERMINATORS //
    ///////////////////

        // Runs on SelectionButton Click, navigates or creates
        function navigateOrCreateChat(contact){
            // if (!user.chatRooms){
            //     handleCreateChatroom(contact)
            // }
            // else if (!determineIfChatroomExists(contact)){
            //     handleCreateChatroom(contact)
            // }
            // else{
            setActiveChat(getTherapistChatFronContacts(user, contact))
            navigation.navigate("MessageThread")
            // }
        }

        // Runs when a contact card is selected. Determines if this contact has a thread with this therapist
        // function determineIfChatroomExists(contact){
        //     let foundChat = false

        //     ///////////////////////////////////////////////////////////////////
        //     // Goes through each chatroom to find a guest with ther right ID //
        //     user.chatRooms.forEach(chatroom => {
        //         if (foundChat){
        //             return foundChat
        //         }
        //         chatroom.users.forEach( user => {
        //             if (user.id === contact.id){
        //                 foundChat = chatroom
        //             }
        //         })
        //     })

        //     ///////////////////////////////
        //     // Returns false or Chatroom //
        //     return foundChat
        // }



///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////
    return(
       <View>
            <View style={{marginTop: 40}}/>
            <ScrollView>
                {renderAllContacts()}
            </ScrollView>
       </View>
    )
}