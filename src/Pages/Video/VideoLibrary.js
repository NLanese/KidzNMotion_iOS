// React Native
import { SafeAreaView, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, TextInput, Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";


// Nuton
import { Header, Button } from "../../../NutonComponents";
import { clients } from "../../../NutonConstants";

// Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { colorState, sizeState, fontState, userState, videoDataState, firstVideoAccessState } from '../../../Recoil/atoms';

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";

// Other Images
import { ArrowDown, Check, CircleSvg, Play, InputSearch, PlayLarge } from "../../../svg";
import UpCarrot from "../../../svg/UpCarrot";

// KNM Components
import VideoItem from "./VideoItem";
import Camera from "../index"

let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height

export default function VideoLibrary(props) {
///////////////////////////////
///                         ///
///       Preliminary       ///
///                         ///
///////////////////////////////

    ///////////////
    // Constants //
    ///////////////
    
        const navigation = useNavigation();
        const COLORS = useRecoilValue(colorState)
        const SIZES = useRecoilValue(sizeState)
        const FONTS = useRecoilValue(fontState)

    ////////////
    // Client //
    ////////////

        let client = false
        if ( props.route.params?.item.firstName ){
            client = props.route.params.item
        }
   
    ////////////
    // Recoil //
    ////////////

        console.log(userState)

        // User State
        const [user, setUser] = useRecoilState(userState)

        // Video State
        const [allVideos, setAllVideos] = useRecoilState(videoDataState)

        // First Video Access
        const [firstVideoAccess, setFirstVideoAccess] = useRecoilState(firstVideoAccessState)

    //////////////////
    // Local States //
    //////////////////

        // Boolean to show the Client modal
        const [showClientModal, setShowClientModal] = useState(false);

        // Tracks which video level you are in
        const [levelState, setLevelState] = useState(false)

        // Tracks which children have been selected
        const [childState, setChildState] = useState({})

        // Tracks which videos have been selected
        const [videoState, setVideoState] = useState({})

        // Content state to render content
        const [contentState, setContentState] = useState('levels')

        // Tracks the current text in a search bar
        const [searchUser, setSearchUser] = useState('')

        // Videos that you are selecting
        const [videosToBeViewed, setVideosToBeViewed] = useState([])

        // Loading
        const [loading, setLoading] = useState(true)

///////////////////////////////
///                         ///
///        useEffect        ///
///                         ///
///////////////////////////////

    // Determines whether or not there is a client already fed into the page 
    useEffect(() => {
        if (props.route.params?.client) {
            setChildState(prevState => ({...prevState, [client.id]: client }));
            setLevelState({1: client.level1, 2: client.level2})
        }
        else if (user.role === "CHILD"){
            setChildState(user)
        }
        else if (user.role === "GUARDIAN"){
            if (user.children.length < 2){
                setChildState(user.children[0])
            }
        }
        setLoading(false)
    }, [props.route.params?.client, user]);

///////////////////////////////
///                         ///
///        Rendering        ///
///                         ///
///////////////////////////////


    ////////////
    // Static //
    ////////////
    
        // Renders the Header, duh.
        function renderHeader() {
            return (
                <Header 
                    onPress={() => {
                        if (contentState === 'levels'){
                            navigation.navigate("Home")
                            return
                        }
                        setContentState('levels')
                    }}
                    title="Video Library" 
                    goBack={true}
                    profile={true}
                    filterOnPress={() => navigation.navigate("SettingsLanding")}
                />
            );
        }

        // Renders the Play Button Icon and 'Videos' Title
        function renderTitleIcon() {
            return(
                <View style={{height: 'auto', marginTop: 60}}>
                    <PlayLarge fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} style={{
                        margin: "auto",
                        marginBottom: 5,
                        alignSelf: "center",
                    }}/>
                    <Text style={{...FONTS.Title, fontSize: 34, color: COLORS.iconLight, textAlign: 'center'}}>Videos</Text>
                </View>
            )
        }



    ///////////////
    // Therapist //
    ///////////////

        // This will render the Clients slide up modal to select Clients
        function renderClientButton(){
            if (user.role !== "THERAPIST"){
                return null
            }
            return null
            return(
                <TouchableOpacity style={{
                        key: `clientbutton`,
                        flex: 1,
                        alignSelf: "center",
                        justifyContent: "center",
                        height: 85,
                        backgroundColor: COLORS.iconLight,
                        width: "33%",
                        minWidth: "33%",
                        borderTopLeftRadius: SIZES.borderRadius,
                        borderTopEndRadius: SIZES.borderRadius,
                        borderStyle: "solid",
                        borderWidth: 1,
                        borderColor: COLORS.iconDark,
                        position: "absolute",
                        bottom: 0,
                    }}
                    onPress={() => { toggleClientModal()}}
        
                >
                    <View style={{       
                        justifyContent: "center",
                        alignContent: "center",
                        width: "100%",
                        height: 85, 
                    }}>
                        <UpCarrot fillColor={COLORS.iconDark} strokeColor={COLORS.iconDark} style={{ alignSelf: "center"}}/>
                        <Text style={{fontFamily: "Gilroy-Medium", fontSize: 16, color: COLORS.iconDark, alignSelf: "center"}} >CLIENTS</Text>
                    </View>
                </TouchableOpacity >
            )
        }

        // Header for the Modal
        function renderModalHeader(){
            return(
                <View 
                    style={{
                        flexDirection: "column",
                        backgroundColor: COLORS.gradientColor1
                    }}
                >
                    <TouchableOpacity style={{flex: 1, alignItems: "center", height: 50, justifyContent: "flex-start"}} onPress={() => setShowClientModal(false)}>
                        <ArrowDown />
                        <Text>CLIENTS</Text>
                    </TouchableOpacity>
                    <Text  style={{flex: 1, textAlign: "right", justifyContent: "flex-end"}} >Assign</Text>

                </View>
            )
        }

        // Renders the Client Search Bar
        function renderClientSearchBar(){
            return(
                <ImageBackground
                        style={{ width: "100%", height: 42, flexDirection: "row", alignItems: "center" }}
                        source={require("../../../assets/images/background-02.png")}
                        imageStyle={{ borderRadius: 5 }}
                    >
                        <View style={{ marginLeft: 16 }}>
                            <InputSearch fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} />
                        </View>
                        <TextInput
                            placeholder="Search"
                            onChangeText={setSearchUser}
                            style={{
                                flex: 1,
                                marginLeft: 8,
                                flex: 1,
                                marginRight: 16,
                            }}
                        />
                    </ImageBackground>
            )
        }

        // Renders one row for one user, touchable for selection
        function renderChildSelectionRow(user){
            const userId = user.id
            const {userId: currentChildState = false} = childState

            return(
                <TouchableOpacity
                            key= {user.id}
                            style={{
                                width: "100%",
                                height: 48,
                                backgroundColor: COLORS.gradientColor1,                               
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderBottomColor: COLORS.white,
                                borderTopColor: COLORS.white,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                flexDirection: "row",
                                paddingLeft: 15
                            
                            }}
                            onPress={() => {
                                handleSelectChild(userId, currentChildState)
                            }}
                        >
                            
                            <Text
                                style={{
                                    color: COLORS.mainColor,
                                    ...FONTS.Lato_700Bold,
                                    fontSize: 18,
                                    textTransform: "capitalize",
                                }}
                            >
                                {user.name}
                            
                            </Text>
                            
                            <CircleSvg style={{alignSelf: "flex-end", margin: 5}} fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight} selected={childState[userId]}>

                                <Check  fillColor="red" strokeColor={COLORS.iconLight} style={{ transform: [{ scale: 1.5 }, {translateX: 5}, {translateY: 6}]}}/>

                            </CircleSvg>
                </TouchableOpacity>
            )
        }

        // Renders the child selection modal entirely
        function renderChildrenForSelection(){
            return(
                <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: COLORS.gradientColor1}}>
                    {renderClientSearchBar()}
                        {filterClients(clients).map(user => renderChildSelectionRow(user))}    

                        <TouchableOpacity 
                            onPress={() => {handleLoadVideos()}}
                            style={{width: '100%', borderTopWidth: 1, borderTopColor: COLORS.iconLight}}
                        >
                            <Text  style={{height: 85, ...FONTS.Title, textAlign: 'center', marginTop: 20, marginBottom: -50}}>Confirm</Text>    
                        </TouchableOpacity>    
                </View>
            )

        }

        // This actually renders the Client Selection Modal
        function renderClientModal(){
            if (!showClientModal){
                return null
            }
            return(
            <Modal
                isVisible={showClientModal}
                onBackdropPress={()=>setShowClientModal(false)} hideModalContentWhileAnimating={true} backdropTransitionOutTiming={0}
                style={{ margin: 0}}
                backdropColor="rgba(1,1,1,0.3)" animationType="slide" animationIn="slideInUp" animationOut="slideOutDown"
            >
                <View
                    style={{
                        width: SIZES.width - 40,
                        backgroundColor: COLORS.gradientColor1,
                        marginHorizontal: 20,
                        borderRadius: SIZES.borderRadius,
                        paddingTop: 40,
                        paddingBottom: 30,
                        borderColor: COLORS.buttonBorder,
                        borderWidth: 0.5,
                        borderStyle: "solid",
                        position: "absolute",
                        bottom: 0
                    }}
                >
                    {renderModalHeader()}
                    {renderChildrenForSelection()}
                </View>
            </Modal>
            )
        }

    /////////////////////
    // Level Selection //
    /////////////////////

        // Renders the boxes indicating Lvl 1 Videos and Lvl 2 Videos
        function renderVideoLevelBoxes() {
            let levelsArray = [{title:"Level One", id: 1}, {title: "Level Two", id: 2}]
            return(
                <View style={{flexDirection: "row", justifyContent: 'space-between', marginTop: 60}}>
                    {renderSingleLevelBox(levelsArray[0])}
                    {renderSingleLevelBox(levelsArray[1])}
                </View>
            )
        }

        // Renders an Individual Level Box
        function renderSingleLevelBox(obj) {
            if (user.role !== "THERAPIST"){
                if (obj.id === 2 && childState.childCarePlans[0].level === 1){
                    return null
                }
            }
            return(
                <TouchableOpacity style={{
                    key: `level${obj.id}`,
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    backgroundColor: COLORS.buttonColor,
                    width: "45%",
                    minWidth: "45%",
                    margin: 5,
                    borderRadius: SIZES.borderRadius,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: COLORS.buttonBorder, 
                }}
                onPress= {() => handleLevelSelect(obj.id)}
                >
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: 105,
                        borderTopLeftRadius: SIZES.borderRadius,
                        borderTopEndRadius: SIZES.borderRadius,
                        backgroundColor: COLORS.gradientColor2 
                    }}>
                        <Play style={{alignSelf: "center"}} fillColor={COLORS.iconLight} strokeColor={COLORS.iconLight}/>
                        <Text style={{...FONTS.Title, fontSize: 20, textAlign: 'center', marginTop: 10, marginBottom: 10, color: COLORS.iconLight}}> {obj.title} </Text>
                    </View>

                </TouchableOpacity>
            )
        }

        // Renders all of the Level Selection Components
        function renderLevelSelection() {
            return(
                <View>
                    {renderVideoLevelBoxes()}
                </View>
            )
        }

    ////////////
    // Videos //
    ////////////

        // Renders the Videos
        function renderVideos() {
            const filteredVideos = allVideos.filter(vid => {
                if (vid.level === levelState){
                    return vid
                }
            })
            let i = filteredVideos.length
            let rArray = []
            while (i > 0){
                if (i >= 2){
                    rArray.unshift(renderVideoRow([filteredVideos[i], filteredVideos[i -1]]))
                    i = i - 2
                }
                else{
                    rArray.unshift(renderVideoRow(filteredVideos[i]))
                    i = i -1
                }
            }
            return(
                <ScrollView style={{height: maxHeight * 0.6}} contentContainerStyle={{paddingBottom: 0.10 * maxHeight}}>
                    {rArray}
                </ScrollView>
            )
        }

        // Renders a row of VideoItems. Either 2 or 1 depending on how many are left
        function renderVideoRow(items){
            if (items.length > 1){
                return(
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 15}}>
                        <VideoItem videoObject={items[0]} handleTherapistSelectVideo={handleTherapistSelectVideo} videoState={videoState}/>
                        <VideoItem videoObject={items[1]} handleTherapistSelectVideo={handleTherapistSelectVideo} videoState={videoState}/>
                    </View>
                )
            }
            
        }

        // I mean... duh?
        function renderRecordVideoButton(){
            if (user.role !== "GUARDIAN" && user.role !== "THERAPIST"){
                return null
            }
            return(
                <View style={{marginRight: 20, marginLeft: 20, marginTop: 90}}>
                    <Button 
                        title={"Record / Upload a Video"}
                        onPress={() => navigation.navigate("CameraComponent")}
                    />
                </View>
            )
        }

        // The screen display when =filming is active
        function renderRecordScreen(){
            if (contentState === "record"){
                return(
                    <View>
                        <Camera />
                    </View>
                )
            }
        }

    /////////////////////////
    // Conditional Renders //
    /////////////////////////

        // Determines which screen to display
        function selectContent(){
            switch(contentState){
                case 'levels':
                    return (
                        <>
                            {renderTitleIcon()}
                            {renderLevelSelection()}
                            {renderRecordVideoButton()}
                        </>
                    )
                case 'videos':
                    return(
                        <>
                            {renderTitleIcon()}
                            {renderVideos()}
                        </>
                       
                    )
                case 'record':
                    return renderRecordScreen()
                default:
                    console.log('select content error in VideoLibrary.js')
            }
        }

    /////////////
    // Filters //
    /////////////

        // Based on the search input, filters out users who no longer apply
        const filterClients = (allClients) => {
            let filteredList = []
            if (searchUser === ''){
                return allClients
            }
            let filterString = searchUser.toUpperCase()
            allClients.forEach( (client) => {
                if (client.firstName.includes(filterString) || client.lastName.includes(filterString)){
                    filteredList.push(client)
                }
            })
            return filteredList
        }

    

///////////////////////////////
///                         ///
///         Handler         ///
///                         ///
///////////////////////////////

    ////////////////////////
    // Therapist Specific //
    ////////////////////////

        // Toggles Client Modal
        function toggleClientModal(){
            if (showClientModal){
                setShowClientModal(false)
                return
            }
            setShowClientModal(true)
        }

        // Handles the selection of a child
        const handleSelectChild= (thisUserId) => {
            if (childState[thisUserId]){
                setChildState(prevState => ({...prevState, [thisUserId]:false }));
                return
            }
            setChildState(prevState => ({...prevState, [thisUserId]: true}));
        }

        // Selects Videos from a Therapist Standpoint
        const handleTherapistSelectVideo = (videoId) => {
            // const videoId = `${video.id}`
            if (videoState[videoId]){
                setVideoState(prevState => ({...prevState, [videoId]: false}))
                return
            }
            setVideoState(prevState => ({...prevState, [videoId]: true}))
        }

    /////////////
    // General //
    /////////////

        // Handles Video Level Selection
        const handleLevelSelect = (item) => {
            setContentState('videos')
            setLevelState(item)
        }


///////////////////////////////
///                         ///
///       MAIN RENDER       ///
///                         ///
///////////////////////////////

    function MAIN(){
        console.log(loading)
        if (loading){
            return null
        }
        else{
            return(
                <>
                    {selectContent()}
                    {renderClientModal()}
                </>
            )
        }
    }

    return (
        <View>
            <Gradient
                colorOne={COLORS.gradientColor1}
                colorTwo={COLORS.gradientColor2}
                style={{height: '100%'}}
            >
                <View style={{marginBottom: 50}} />
                {renderHeader()}
                {MAIN()}
            </Gradient>
            {renderClientButton()}
        </View>
    );
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 40,
    marginBottom: 50
   }
});
