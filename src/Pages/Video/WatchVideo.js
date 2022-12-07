// Reaact
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";
import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import VideoPlayer from "react-native-video-controls";
import Modal from "react-native-modal";

// Nuton
import { Header, Button } from "../../../NutonComponents";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {sizeState, userState, colorState, fontState } from '../../../Recoil/atoms';

// GraphQL
import { useMutation } from "@apollo/client";
import { SET_VIDEO_COMPLETED } from "../../../GraphQL/operations";
import client from "../../utils/apolloClient";

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";
import TabBar from "../../../OstrichComponents/TabBar"
import SelectionButton from "../../../OstrichComponents/SelectionButton"
import OptionsButtons from "../../../OstrichComponents/OptionsButtons";
import LoadingComponent from "../../Global/LoadingComponent";

// SVG
import { MedalTab } from "../../../svg";



let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height

export default function WatchVideo(props) {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

        var Orientation = require('react-native').NativeModules.Orientation
 

    ///////////////
    // Constants // 
    ///////////////

        const tabsArray = ["Earning Medals", "Therapist Comments"]
        
        const navigation = useNavigation();
        const COLORS = useRecoilValue(colorState)
        const FONTS = useRecoilValue(fontState)
        const SIZES = useRecoilValue(sizeState)  
        var video = props.route.params?.item
        var description = video.description
        if (video.description === " " || video.description === "" || video.description === "  "){
            description = "PLEASE ENTER DESCRIPTION"
        }      

    /////////////////
    // Local State //
    /////////////////

        ////////////////////////////////////////////////////////////////////////////////////////
        // Both turns the video to fullscreen and changes its view boundaries and orientation //
        const [isFullscreen, setIsFullscreen] = useState(false)     
        const [changeDems, setChangeDems] = useState(false)

        /////////////////////////////////////////////////
        // Changes whether video is shown or thumbnail //
        const [isPlaying, setIsPlaying] = useState(false)

        ///////////////////////////////////
        // Landscape / Portrait Tracking //
        const [height, setHeight] = useState(maxHeight)
        const [width, setWidth] = useState(maxWidth)
        const [orientation, setOrientation] = useState('portrait')
        const [isFirstRender, setIsFirstRender] = useState(true)

        //////////////////////
        // Completion Modal //
        const [showComplete, setShowComplete] = useState(false)

        const [gotHelp, setGotHelp] = useState(true)
        const [gotBreaks, setGotBreaks] = useState(true)
        const [timeCompleted, setTimecompleted] = useState(0)

        //////////////////////////////
        // 0 = Medals, 1 = Comments //
        const [tabState, setTabState] = useState(0)

        ////////////////
        // Gif Status //
        const [gif, setGif] = useState(false)

        const [gifMedal, setGifMedal] = useState(0)

    //////////////////
    // Recoil State //
    //////////////////

        const [user, setUser] = useRecoilState(userState)

        // Tracks the Children
        const [children, setChildren] = useState(user.children)
        let OGselectedChild
        if (user.role === "GUARDIAN"){
            if (children.length > 0){
                OGselectedChild = children[0]
            }
            else {
                OGselectedChild = false
            }
        }
        else OGselectedChild = user
        const [selectedChild, setSelectedChild] = useState(OGselectedChild)

    ///////////////
    // Mutations //
    ///////////////

        const [setVideoCompleted, { loading: loadingVid, error: errorVid, data: typeVid }] =useMutation(SET_VIDEO_COMPLETED);

///////////////////////
///                 ///
///    useEffect    ///
///                 ///
///////////////////////

    // Changes dimensions and orientation for fullscreen
    useEffect(() => {
        if (isFirstRender){
            setIsFirstRender(false)
            return
        }
        if (orientation === 'portrait'){
            setOrientation('landscape')
            Orientation.lockToLandscape()
        }
        else if (orientation === 'landscape'){
            setOrientation('portrait')
            Orientation.lockToPortrait()
        }
        console.log("Changed orientation")
        setChangeDems(!changeDems)
    },[isFullscreen])

    useEffect(() => {
        if (isFirstRender){
            return
        }
        let temp = height
        setHeight(width)
        setWidth(temp)
        console.log("Reset height and width")
    }, [changeDems])
        
    useEffect(() => {
        if (user.role === "THERAPIST"){
            setTabState(1)
        }
    }, [])


///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    ////////////
    // Static //
    ////////////

        // Renders the Header, duh.
        function renderHeader() {
            return (
                <Header 
                    onPress={() => {
                        Orientation.lockToPortrait()
                        navigation.goBack()
                    }}
                    title="Video Library" 
                    goBack={true}
                    profile={true}
                    filterOnPress={() => navigation.goBack()}
                />
            );
        }

        // In charge of the main render depending on fullScreenState
        function renderMAIN() {
            if (isFullscreen){
                return renderFullScreenVideo()
            }
            else if (gif){
                console.log(gif)
                return(
                    <Gradient
                    colorOne={COLORS.gradientColor1}
                    colorTwo={COLORS.gradientColor2}
                    style={{paddingTop: 20, height: '100%'}}
                    >
                        {renderHeader()}
                        <TouchableOpacity 
                        onPress={() =>{
                            setGif(false)
                            console.log("dismiss gif")
                        }}
                        style={{height: maxHeight, width: maxWidth}}
                        >
                            <LoadingComponent loading={gif} source={gifMedal} label={"Congratulations!"} dismiss={true} setLoading={setGif}/>
                        </TouchableOpacity>
                    </Gradient>
                )
            }
            else{
                return(
                    <Gradient
                    colorOne={COLORS.gradientColor1}
                    colorTwo={COLORS.gradientColor2}
                    style={{paddingTop: 20, height: '100%'}}
                    >  
                        {renderFirstView()}
                        {renderCompletionModal()}
                    </Gradient>
                )
            }
        }

    //////////////////////////////
    // First View (Small Video) //
    //////////////////////////////
    
        // Renders the Video Title
        function renderVideoTitle() {
            return(
                <View>
                    <Text style={{...FONTS.Title, textAlign: 'center', color: COLORS.iconLight, marginTop: 25, fontSize: 40, letterSpacing: -0.5}}>
                        {video.title}
                    </Text>
                </View>
            )
        }

        // Renders the Video Description when in FirstView
        function renderDescription(){
            return(
                <View>
                    <Text style={{...FONTS.Subtitle, textAlign: 'center', marginTop: 7, marginBottom: 7, color: COLORS.iconLight}}>
                        {description}
                    </Text>
                </View>
            )
        }

        // Renders the Video View Box in First View
        function renderVideoBox(){
            // if (isPlaying){
            //     return(
            //         <View style={{borderColor: COLORS.iconLight, borderWidth: 1, borderRadius: 10, paddingBottom: 10, paddingRight: '2%', paddingLeft: '2%', paddingTop: '2%', marginTop: 15}}>
            //             {generateVideo()}
            //             {renderDescription()}
            //         </View>
            //     )
            // }
            // else{
                return(
                    // <TouchableOpacity onPress={() => handleFullScreenTransition()}>
                        <Image 
                        source={{uri: video.previewPictureURL}}
                        style={{height: 200, width: 320, alignSelf: 'center'}}
                        />
                    // </TouchableOpacity>
                )
            // }
            
        }

        // Renders an addiitonal (and more easily noticed)
        function renderFullScreenButton(){
            return(
                <View style={{margin: 30, marginBottom: 20, marginTop: 20}}>
                    <Button 
                        title={"Start Video"}
                        onPress={() => handleFullScreenTransition()}
                    />
                </View>
            )
        }

        // Renders the View that appears when you first load the page
        function renderFirstView(){
            return(
                <View>
                    {renderHeader()}
                    {renderVideoTitle()}
                    {renderVideoBox()}
                    <ScrollView contentContainerStyle={{paddingBottom: 150, height: 880}} bounces={false}>
                        {renderFullScreenButton()}
                        {/* {renderTabBar()} */}
                        {renderRemainingContent()}
                    </ScrollView>
                </View>
            )
        }

        // Generates the non-fullscreen video
        const generateVideo = () => {
            return(
                <VideoPlayer
                    source={{uri: video.videoURL}}
                    style={{height: 0, width: '100%'}}
                    // onBuffer={() => console.log("loading")}
                    // onError={() => console.log("error")}
                    controls={true}
                    showOnStart={false}
                    toggleResizeModeOnFullscreen={false}
                    onEnterFullscreen={() => handleFullScreenTransition()}
                    onExitFullscreen={() => handleFullScreenTransition()}
                    onEnd={() => handleVideoEnd()}
                />
            )
        }

        /////////////////////////
        // Medals and Comments //
        /////////////////////////

            // Condiitonally renders Medals or Comments
            function renderRemainingContent(){
                if (tabState === 0){ 
                    return renderMedalDescriptioms()
                }
                else if (tabState === 1){
                    // return renderTherapistComments()
                }
            }

            // Renders Medal Descriptions
            function renderMedalDescriptioms(){
                return(
                    <View style={{paddingBottom: 30}}>
                        <SelectionButton
                            title={`Bronze Medals`}
                            titleColor={COLORS.gradientColor2}
                            subtitle={"Complete the video for at least 30 seconds"}
                            subtitleColor={COLORS.iconDark}
                            icon={<MedalTab fillColor={'brown'} strokeColor={COLORS.iconDark}/>}
                            opaque={true}
                            selectable={false}
                        />
                        <SelectionButton
                            title={`Silver Medals`}
                            titleColor={COLORS.gradientColor2}
                            subtitle={"Complete the video for a minute, with or without breaks, with no physical help"}
                            subtitleColor={COLORS.iconDark}
                            icon={<MedalTab fillColor={'silver'} strokeColor={COLORS.iconDark}/>}
                            opaque={true}
                            selectable={false}
                        />
                        <SelectionButton
                            title={`Gold Medals`}
                            titleColor={COLORS.gradientColor2}
                            subtitle={"Complete the video without help, for a minute with no breaks"}
                            subtitleColor={COLORS.iconDark}
                            subTitle
                            icon={<MedalTab fillColor={'gold'} strokeColor={COLORS.iconDark}/>}
                            opaque={true}
                            selectable={false}
                        />
                    </View>
                )
            }
    
    /////////////////////
    // Fullscreen Mode //
    /////////////////////

        // Fullscreen Rende
        function renderFullScreenVideo(){
            if (isPlaying){
                return(
                    <View style={{position: 'absolute', backgroundColor: 'red', height: height, width: width}}>
                        <VideoPlayer
                        source={{uri: video.videoURL}}
                        style={{height: 0, width: '100%'}}
                        controls={true}
                        showOnStart={false}
                        toggleResizeModeOnFullscreen={false}
                        onEnterFullscreen={() => handleFullScreenTransition()}
                        onExitFullscreen={() => handleFullScreenTransition()}
                        onBack={() => handleFullScreenTransition()}
                        disableBack={true}
                        onEnd={() => handleVideoEnd()}
                    />
                    </View>
                )
            }
            else {

            }
        }

    //////////////////////
    // Completion Modal //
    //////////////////////

        // Renders the Modal and Backdrop for Completion
        function renderCompletionModal(){
            return(
                <Modal
                isVisible={showComplete}
                hideModalContentWhileAnimating={true}
                backdropTransitionOutTiming={0}
                style={{ margin: 0 }}
                animationIn="zoomIn"
                animationOut="zoomOut"
            >
                {renderCompletionModalContent()}
            </Modal>
            )
        }

        // Child Selection if Needed
        function renderChildSelectionForCompletion(){
            if (user.role !== "GUARDIAN"){
                return null
            }
            if (children.length > 1){
                let tabsContent = children.map(child => child.firstName)
                return(
                    <View>
                        <Text style={{...FONTS.SubTitle}}>
                            Which Child Completed the Video?
                        </Text>
                        <TabBar
                            tabsArray={tabsContent}
                            onChangeIndex={(index) => setSelectedChild(index)}
                            styleActive={{borderBottomColor: COLORS.gradientColor1, borderBottomWidth: 3, padding: 2, marginRight: 5, marginLeft: 5, width: 90}}
                            styleInactive={{borderBottomColor: "grey", borderBottomWidth: 3, padding: 2, marginRight: 5, marginLeft: 5, width: 90}}
                            tabTextStyleActive={{fontFamily: "Gilroy-Bold", textAlign: 'center', fontSize: 16, color: COLORS.gradientColor1, marginBottom: 3}}
                            tabTextStyleInactive={{fontFamily: "Gilroy-Bold", textAlign: 'center', fontSize: 16, color: "grey", marginBottom: 3}}
                        />
                    </View>
                )
            }

        }

        // Renders the content of the Completion Modal
        function renderCompletionModalContent(){
            return(
                <View 
                    style={{
                    width: SIZES.width - 40,
                    backgroundColor: COLORS.white,
                    marginHorizontal: 20,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    paddingTop: 40,
                    paddingBottom: 30,
                    }}
                >
                    <Text style={{...FONTS.Title, marginBottom: 20, textAlign: 'center'}}>
                        Congratulations on completing the video!
                    </Text>
                    {renderChildSelectionForCompletion()}
                    <Text style={{...FONTS.SubTitle, marginRight: -6}}>
                        Did your guardian give you any instructions or physical support to complete this activity?
                    </Text>
                    {renderYesOrNoButtons("gotHelp")}
                    <Text style={{...FONTS.SubTitle}}>
                        Did you need to stop at any point to take a break?
                    </Text>
                    {renderYesOrNoButtons("gotBreaks")}
                    {renderTimeOfCompletionButtons()}
                    <View style={{marginTop: 20}}/>
                    <Button
                        title={"Submit"}
                        onPress={() => handleSubmitVideoForm()}
                    />
                </View>
            )
        }

        // Renders a single YES or NO button
        function renderButton(yes_or_no, type){
            let selectedStyle = {
                backgroundColor: COLORS.gradientColor1,
                height: 60,
                width: 100,
                // borderColor: 'black',
                // borderWidth: 1,
                // borderRadius: 5,
            }

            let inactiveStyle = {
                backgroundColor: 'grey',
                height: 45,
                width: 70,
                marginTop: 7.5,
                marginLeft: 15
            }

            let val
            if (type === "gotHelp"){
                val = gotHelp
            }
            else if (type === "gotBreaks"){
                val = gotBreaks
            }

            let currentStyle = false

            if (yes_or_no === "YES" && val){
                currentStyle = selectedStyle
            }
            else if (yes_or_no === "YES" && !val){
                currentStyle = inactiveStyle
            }
            if (yes_or_no === "NO" && val){
                currentStyle = inactiveStyle
            }
            else if (yes_or_no === "NO" && !val){
                currentStyle = selectedStyle
            }

            return(
                <TouchableOpacity
                    onPress={() => handleYesNoClick(yes_or_no, type)}
                    style={{...currentStyle, borderRadius: 10,  alignItems: 'center'}}

                >
                    <View style={{ height: '50%', marginTop: '20%'}}>
                        <Text style={{...FONTS.Title, fontSize: 20, height: '100%', textAlignVertical: 'center' }}>
                            {yes_or_no}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }

        // Renders YES / NO buttons for ARE YOU CREATING AN ORGANIZATION
        function renderYesOrNoButtons(type){
            return(
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginTop: 10}}>
                    {renderButton("YES", type)}
                    {renderButton("NO", type)}
                </View>
            )
        }

        // Renders the OptionsButtons for Time
        function renderTimeOfCompletionButtons(){
            return(
                <View style={{marginBottom: 15}}>
                    <Text style={{...FONTS.SubTitle, marginBottom: 10}}>
                        How many seconds of the video were you able to successfully do
                    </Text>
                    <OptionsButtons
                        buttonsArray={["Less than 30 seconds", "Less than a minute", "Full minute"]}
                        selectedStyle={{
                            backgroundColor: COLORS.gradientColor1,
                            height: 60,
                            width: 100,
                            borderRadius: 10,
                            justifyContent: 'center',
                            marginLeft: 7.5
                        }}
                        inactiveStyle={{
                            backgroundColor: 'grey',
                            height: 45,
                            width: 70,
                            marginTop: 7.5,
                            marginLeft: 7.5,
                            borderRadius: 10,
                            justifyContent: 'center'
                        }}
                        textStyle={{...FONTS.Title, textAlign: 'center', fontSize: 12}}
                        activeTextStyle={{...FONTS.Title, textAlign: 'center', fontSize: 15}}
                        onClick={(index)=>handleTimeClick(index)}
                    />
                </View>
                
            )
        }


///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////

        // Duh?
        function handleFullScreenTransition() {
            setIsPlaying(true)
            setIsFullscreen(!isFullscreen)
        }

        // Brings up the Completion Modal
        function handleVideoEnd(){
            if (user.role === "CHILD" || user.role === "GUARDIAN"){
                setIsFullscreen(false)
                setShowComplete(true)
            }
        }

        // For Modal Questions. Handles the state changes for Video Questions
        function handleYesNoClick(yes_or_no, type){
            let tf
            yes_or_no === "YES" ? tf = true : tf = false
            if (type === "gotHelp"){
                setGotHelp(tf)
            }
            else if (type === "gotBreaks"){
                setGotBreaks(tf)
            }
        }

        // Handles all clicks on the TimeOptions
        function handleTimeClick(index){
            if (index === 0){
                setTimecompleted("Less than 30")
            }
            else if (index === 1){
                setTimecompleted("Less than a minute")
            }
            else if (index === 2){
                setTimecompleted("full")
            }
            else{
                throw new Error("I'm not sure how we got here")
            }
        }

        // Submits the Completion Form
        function handleSubmitVideoForm(){
            setVideoCompletedMutation()
            .then((resolved) => {
            })
            .then(() => {
                let medal = determineMedal()
                let source
                if (medal === "bronze"){
                    source = 2
                }
                else if (medal === "silver"){
                    source = 3
                }
                else if (medal === "gold"){
                    source = 4
                }
                setGifMedal(source)
                setShowComplete(false)
                setGif(true)
            })
        }

        // Handles the watch video mutation
        async function setVideoCompletedMutation(){
            console.log(selectedChild)
            if (user.role === "CHILD"){
                return await setVideoCompleted({
                    variables: {
                        videoID: video.id,
                        medalType: determineMedal(),
                        childID: user.id
                    }
                }).catch(err => console.log(err))
            }
            else if (user.role === "GUARDIAN" && selectedChild){
                return await setVideoCompleted({
                    variables: {
                        videoID: video.id,
                        medalType: determineMedal(),
                        childID: selectedChild.id
                    }
                }).catch(err => console.log(err))
            }
            else{
                console.log("What???? Error!!!")
            }
        }

        // Returns a string of the medal depending on the Completion Form
        function determineMedal(){
            //////////////
            // No Medal //
            if (timeCompleted === "Less than 30"){
                return "bronze"
            }

            ////////////////////////////
            // Enough Time to Qualify //
            else if (timeCompleted === "Less than a minute"){
                if (!(gotBreaks && gotHelp)){
                    return "silver"
                }
                else {
                    return "bronze"
                }
            }

            /////////////////////
            // Full Completion //
            else if (timeCompleted === "full"){
                if (!gotBreaks && !gotHelp){
                    return "gold"
                }
                else {
                    return "silver"
                }
            }

            else {
                throw new Error ("Invalid Criteria for Medals")
            }
        }

///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////
    return renderMAIN()
}