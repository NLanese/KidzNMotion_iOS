// React
import { View, Text, TextInput, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import React, {useEffect, useState} from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

// Nuton
import { Button, Header } from "../../../NutonComponents";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, clientListState, userState, colorState, fontState, avatarState, videoDataState, tokenState } from '../../../Recoil/atoms';

// GraphQL
import { CREATE_COMMENT, GET_USER } from "../../../GraphQL/operations";
import { useMutation } from "@apollo/client";
import client from "../../utils/apolloClient";

// Ostrich 
import Gradient from "../../../OstrichComponents/Gradient";

// Hooks
import convertReactCalandarDateString from "../../Hooks/date_and_time/convertReactCalandarDateString"

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

        let client1 = props.route.params?.item
        const plan = client1.plan
        const client = client1.user

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

        // Determines whether the comment modal is open or not
        const [modalOpen, setModalOpen] = useState(false)

        // Tracks the current type
        const [textEntered, setTextEntered] = useState('')

        // Tracks all ids that have comments
        const [vidIds, setVidIds] = useState([])

        // Object with a key/value pair for each video/commentList
        const [commentIds, setCommentIds] = useState({
            test: "empty"
        })

    //////////////////
    // Recoil State //
    //////////////////

    const [videos, setVideos] = useRecoilState(videoDataState)

    const [user, setUser] = useRecoilState(userState)

    const token = useRecoilValue(tokenState)

    ////////////////
    // UseEffects //
    ////////////////

    // Populates CommentIds object upon rendering
    useEffect(() => {
        // Local variable to track new additions
        let newComments = commentIds

        // Goes through ever Comment
        plan.comments.forEach( (comment, i) => {

            // If a video id alredy has comments, add this to it
            if (newComments[(comment.videoId)]){
                newComments = {...newComments, [comment.videoId]: [...newComments[comment.videoId], comment]}
            }

            // If a video id does not yet have a comment
            else{
                newComments = {...{...newComments}}
                newComments = {...newComments, [comment.videoId]: [{...comment}]}
            }
        })

        // Sets the overall object
        setCommentIds( commentIds => ({...{...newComments}}))
    }, [client1])


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
        return videos.map( (video, index) => {
            let count = 0
            let theseComments = []
            let tag = `${video.id}`
            if (commentIds[tag]){
                theseComments = commentIds[tag]
                count = commentIds[tag].length
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
                    Comments for {client1.user.firstName} {client1.user.lastName}
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
            <View style={{marginRight: 20, marginLeft: 20}}>
                <TextInput
                    style={{borderWidth: 1, borderColor: COLORS.iconDark, borderRadius: 15, height: 120, marginBottom: 20, padding: 10}}
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
        createCommentMutation(video)
        .then(() => {
            setTextEntered("")
            setModalOpen(false)
        })
    }

    // Runs the Create Comment Mutation
    async function createCommentMutation(video){
        return await createComment({
            variables: {
                childCarePlanID: plan.id,
                commentContent: textEntered,
                videoID: video.id
            }
        })
        .catch(err => console.log(err))
        .then((resolved) => {
            console.log(resolved)
        })
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
            <View 
            style={{marginRight: 5, marginLeft: 5, borderColor: 'white', borderWidth: 1, borderRadius: 15, marginTop: 15, height: maxHeight * 0.70}}
            >
                <ScrollView>
                    {renderAllVideoComments()}
                    {renderCommentModal()}
                </ScrollView>
            </View>
        </Gradient>
    )
}