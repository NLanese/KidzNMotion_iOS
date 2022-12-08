// Reaact
import { View, ScrollView,} from "react-native";
import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";

// Recoil

// GraphQL
import { GET_USER, CREATE_CHATROOM } from "../../../GraphQL/operations";
import { useMutation } from "@apollo/client";
import client from "../../utils/apolloClient";

// Ostrich
import SelectionButton from "../../../OstrichComponents/SelectionButton";

export default function ConversationsThread({user, setUser, guardian=false}) {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    ///////////////
    // Constants //
    ///////////////

        const navigation = useNavigation();

        const [allContacts, setAllContacts] = useState([])

    ///////////////
    // useEffect //
    ///////////////

        useEffect(() =>{
            let contacts = []
            ////////////////
            // THERAPIST  //
            if (user.role === "THERAPIST"){
                user.patientCarePlans.forEach(pcp => {

                    if (!pcp || !pcp.child || !pcp.child.guardian){
                        return null
                    }

                    ////////////////////////////////
                    // Adds the Child to Contacts //
                    // contacts.push({...pcp.child, plan: {...pcp, child: null}})

                    /////////////////////////////////////////////////////////
                    // Determines if the Child's parent needs to get added //
                    let potentialGuardianContact = pcp.child.guardian
                    let arrayWithParent = contacts.filter(contact => {
                        if (contact.id === potentialGuardianContact.id){
                            return contact
                        }
                    })
                    if (arrayWithParent.length === 0){
                        contacts.push({...potentialGuardianContact})
                    }
                })
            }
            setAllContacts(contacts)
        }, [])

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
        return allContacts.map(contact => {
            return renderContact(contact)
        })
    }


    // Renders a single Contact
    function renderContact(contact){
        return(
            <SelectionButton 
                title={`${contact.firstName} ${contact.lastName}`}
                subtitle={`${contact.role}`}
                hasProfilePic={true}
                profilePic={contact.profilePic}
                onSelect={() => navigateOrCreateChat(contact)}
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
        function handleCreateChatroom(contact){
            createChatroomMutation(contact)
            .then( async (resolved) => {
                await getUserQuery()
                // navigation.navigate("MessageThread", {chatroom: null})
            })
        }

        // Creates the Chatroom Mutation
        async function createChatroomMutation(contact){
            return await createChatRoom({
                variables: {
                    otherParticipantID: contact.id
                }
            }).catch(error => console.log(error))
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


    ///////////////////
    // DETERMINATORS //
    ///////////////////

        // Runs on SelectionButton Click, navigates or creates
        function navigateOrCreateChat(contact){
            if (!user.chatRooms){
                handleCreateChatroom(contact)
            }
            else if (!determineIfChatroomExists(contact)){
                handleCreateChatroom(contact)
            }
            else{
                navigation.navigate("MessageThread", {item: determineIfChatroomExists(contact)})
            }
        }

        // Runs when a contact card is selected. Determines if this contact has a thread with this therapist
        function determineIfChatroomExists(contact){
            let foundChat = false

            ///////////////////////////////////////////////////////////////////
            // Goes through each chatroom to find a guest with ther right ID //
            user.chatRooms.forEach(chatroom => {
                if (foundChat){
                    return foundChat
                }
                chatroom.users.forEach( user => {
                    if (user.id === contact.id){
                        foundChat = chatroom
                    }
                })
            })

            ///////////////////////////////
            // Returns false or Chatroom //
            return foundChat
        }



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