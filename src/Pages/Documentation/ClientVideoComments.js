// React
import { View, Text, TextInput, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import React, {useEffect, useState} from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

// Nuton
import { Button, Header } from "../../../NutonComponents";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, clientListState, userState, colorState, fontState, avatarState, videoDataState, tokenState, selectedClientState } from '../../../Recoil/atoms';

// GraphQL
import { CREATE_COMMENT, GET_USER } from "../../../GraphQL/operations";
import { useMutation } from "@apollo/client";
import apollo_client from "../../utils/apolloClient";

// Ostrich 
import Gradient from "../../../OstrichComponents/Gradient";

// Hooks
import convertReactCalandarDateString from "../../Hooks/date_and_time/convertReactCalandarDateString"
import getAllTherapistClients from "../../Hooks/value_extractors/therapistValues/getAllTherapistClients"

// Dimensions
let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height

export default function ClientVideoComments(props) {
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

        // Determines which video and which comments will be shown in the comment modal
        const [selectedVid, setSelectedVid] = useState(false)

        const [selectedComments, setSelectedComments] = useState([])

        const [loading, setLoading] = useState(true)

        // Determines whether the comment modal is open or not
        const [modalOpen, setModalOpen] = useState(false)

        // Tracks the current type
        const [textEntered, setTextEntered] = useState('')

        // Tracks all ids that have comments
        const [vidIds, setVidIds] = useState([])

        // Object with a key/value pair for each video/commentList
        const [comments, setComments] = useState({
            step_up: [],        toe_walking: [],
            toe_touches: [],    squat: [],
            side_to_side: [],   rolling: [],
            leg_lifts: [],      hand_to_knees: [],
            floor_to_stand: [], chair_elevation: [],    
            jumping_jacks: [],  jump_rope: [],
            bear_crawl: []
        })

    //////////////////
    // Recoil State //
    //////////////////

    const [videos, setVideos] = useRecoilState(videoDataState)

    const [user, setUser] = useRecoilState(userState)

    const [selectedClient, setSelectedClient] = useRecoilState(selectedClientState)

    const [client, setClient] = useState(selectedClient.user)

    const [clients, setClients] = useRecoilState(clientListState)

    const token = useRecoilValue(tokenState)

    ////////////////
    // UseEffects //
    ////////////////

    // When selected Client is changed, keeps consistent
    useEffect(() => {
        setClient(selectedClient.user)
    }, [selectedClient])

    useEffect(() => {
        selectedClient.plan.comments.forEach(comment => {
          const { videoId } = comment;
      
          // Enqueue functional state update
          setComments(comments => {
            if (comments[videoId]) {
              // State has matching property value, update state
              return {
                ...comments,
                [videoId]: comments[videoId].concat(comment)
              };
            } else {
              // Nothing to update, return existing state
              return comments;
            }
          });
        });
        setLoading(false);
      }, [selectedClient]);


    ///////////////
    // Mutations //
    ///////////////

    const [createComment, { loading: loadingC, error: errorC, data: typeC }] =useMutation(CREATE_COMMENT);

///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

   // Renders the header bar and back arrow
   function renderHeader() {
        return(
            <View style={{marginTop: 40}}>
                <Header 
                    onPress={() => navigation.goBack()}
                    goBack={true}
                    profile={true}
                    filterOnPress={() => navigation.navigate("SettingsLanding")}
                    title={`Video Comments`}
                />
            </View>    
        )
    }

    // Renders the header font
    function renderTitle(){
        return(
            <View style={{alignSelf: 'center', marginTop: 30}}>
                <Text style={{...FONTS.Title, color: 'white', textAlign: 'center'}}>
                    {client.firstName} {client.lastName}'s Video Comments
                </Text>
            </View>
        )
    }

    // Renders all Video Tabs with Comments 
    function renderAllVideoComments(){

        // Removes 'great job' from videos
        let filtered = videos.filter(vid => {
            if (vid.title !== "Great Job"){
                return vid
            }
        })
        
        return filtered.map( (video, index) => {
            let count = 0
            let theseComments = []
            let tag = `${video.id}`
            if (comments[tag]){
                theseComments = comments[tag]
                count = comments[tag].length
            }
            return (
                <TouchableOpacity 
                key={index}  
                onPress={() => handleHeaderClick(video, theseComments)}
                style={{marginTop: 12, marginRight: 4, marginLeft: 4, borderColor: 'white', borderWidth: 0.5, paddingTop: 10, paddingBottom: 10, paddingRight: 4, paddingLeft: 4, borderRadius: 6, flexDirection: 'row'}}>
                    <View style={{flex: 7}}>
                        <Text style={{...FONTS.SubTitle, color: 'white', fontSize: 22}}>
                            {video.title}
                        </Text>
                    </View>
                    <View style={{flex: 3}} >
                        <Text style={{...FONTS.SubTitle, color: 'white', fontSize: 18}}>
                            {count} Comments
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    // Renders the Modal and Styling. Just the Shell
    function renderCommentModal(){
        if (!modalOpen){
            return null
        }
        return (
            <Modal
                isVisible={modalOpen}
                onBackdropPress={() => setModalOpen(false)}
                hideModalContentWhileAnimating={true}
                backdropTransitionOutTiming={0}
                style={{ margin: 0 }}
                animationIn="zoomIn"
                animationOut="zoomOut"
            >
                <View 
                style={{
                width: SIZES.width - 40,
                backgroundColor: COLORS.white,
                marginHorizontal: 20,
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingTop: 40,
                paddingBottom: 10,
                }}>
                    {renderCommentContent()}
                </View>
            </Modal>
        );
    }

    // Renders the actual content within the modal
    function renderCommentContent(){
        return(
            <View>
                <Text style={{...FONTS.SubTitle, fontSize: 20, textAlign: 'center', marginBottom: 4}}>
                    Comments for {selectedClient.user.firstName} {selectedClient.user.lastName}
                </Text>
                <Text style={{...FONTS.SubTitle, textAlign: 'center', marginBottom: 10}}>
                    {selectedVid.title}
                </Text>
                <View style={{marginTop: 10, marginBottom: 10}}>
                    {renderCommentsForVideo()}
                </View>
                {renderAddCommentSpace()}
            </View>
        )
    }

    function renderCommentsForVideo(){
        return selectedComments[0].map( (com, i) => {
            return(
                <View key={i} style={{borderWidth: 1, borderColor: 'black', padding: 10}}>
                    <Text style={{textAlign: 'center', marginTop: -6, fontSize: 12}}>
                        {convertReactCalandarDateString(com.createdAt.split("T")[0])}
                    </Text>
                    <Text style={{textAlign: 'center', fontSize: 16, marginTop: 5}}>
                        {`${com.content}`}
                    </Text>
                </View>
            )
        })
    }

    // Renders the Text Input as well as the send button
    function renderAddCommentSpace(){
        return(
            <View style={{marginRight: 20, marginLeft: 20, borderWidth: 1, borderColor: 'black', borderRadius: 15,}}>
                <TextInput
                    style={{height: 120, marginBottom: 20, padding: 10}}
                    value={textEntered}
                    onChangeText={(content) => setTextEntered(content)}
                    multiline={true}
                />
                <Button 
                title={"Save Comment"}
                onPress={() => handleSaveComment(selectedVid)}
            />
            </View>
        )
    }

    function MAIN(){
        if (!loading){
            return(
                <View style={{marginRight: 5, marginLeft: 5, borderColor: 'white', borderWidth: 1, borderRadius: 15, marginTop: 15, height: maxHeight * 0.70}} >
                    <ScrollView>
                        {renderAllVideoComments()}
                        {renderCommentModal()}
                    </ScrollView>
                </View>
            )
        }
        else{
            return null
        }
    }


///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////

    // Runs on Pressing a Comment Header
    function handleHeaderClick(video, comments){
        setSelectedVid(video)
        setSelectedComments(selectedComments => ([comments]))
        setModalOpen(true)
    }

    // Runs the Save Comment Process
    function handleSaveComment(video){
        setLoading(true)
        createCommentMutation(video)
        .then(() => {
            setTextEntered("")
            setModalOpen(false)
            setLoading(false)
        })
    }

    // Runs the Create Comment Mutation
    async function createCommentMutation(video){
        return await createComment({
            variables: {
                childCarePlanID: selectedClient.plan.id,
                commentContent: textEntered,
                videoID: video.id
            }
        })
        .catch(err => {
            console.log(error, "============323\n===========")
        })
        .then(async (resolved) => {
            getAndSetUser()
        })
    }

    // Gets the new user object with the revised client
    async function getAndSetUser(){
        await apollo_client.query({
            query: GET_USER,
            fetchPolicy: 'network-only'  
        })
        .then((resolved) => {
            setUser(resolved.data.getUser)
            setClients(getAllTherapistClients(resolved.data.getUser))
        })
        .then(() => {
            return true
        })
        .catch((error) => {
            console.log(error)
        })
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
            style={{height: '120%'}}
        >
            {renderHeader()}
            {renderTitle()}
            {MAIN()}
        </Gradient>
    )
}