// Reaact
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Button } from "react-native";
import React, {useState, useEffect, useRef} from "react";
import { useNavigation } from "@react-navigation/native";
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import Modal from "react-native-modal";

// Expo
import * as MediaLibrary from 'expo-media-library';
import * as MailComposer from 'expo-mail-composer';

// Apollo / GraphQL
import { SEND_MESSAGE, GET_USER } from "../../../GraphQL/operations";
import { useMutation } from "@apollo/client";
import client from "../../utils/apolloClient"


// Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { colorState, fontState, userState } from '../../../Recoil/atoms';

// Nuton
import { Header, ProfileEditCategoryComponent } from "../../../NutonComponents";

// Ostrich
import Gradient from "../../../OstrichComponents/Gradient";

// Hooks
import getChatroomFromTherapist from "../../Hooks/value_extractors/therapistValues/getChatroomFromTherapist"

// Dimensions
let maxWidth = Dimensions.get('window').width
let maxHeight = Dimensions.get('window').height

const VisionComp = () => {
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    ///////////////
    // Constants // 
    ///////////////

      const devices = useCameraDevices();
      const device = devices.back;
      const camera = useRef(null);

      const COLORS = useRecoilValue(colorState)
      const FONTS = useRecoilValue(fontState)
      const navigation = useNavigation();

      // Media Library Permissions
      const [status, requestPermission] = MediaLibrary.usePermissions()

      // Video Path after Recording
      const [videoPath, setVideoPath] = useState(false)

      // Determines whether the 'sent' 
      const [emailSent, setEmailSent] = useState(false)

  ////////////
  // Recoil //
  ////////////

      // User
      const [user, setUser] = useRecoilState(userState)

      // Therapist of which the email is getting sent to
      let therapist
      if (user.role === "THERAPIST"){
        therapist = user
      }
      else{
        therapist = user.children[0].childCarePlans[0].therapist
      }

      // Chatroom 
      const chatroom = getChatroomFromTherapist(user, therapist)


  ///////////
  // Local //
  ///////////

    // True during Recording
    const [recording, setRecording] = useState(false)

    // False unless a video has been recorded
    const [recorded, setRecorded] = useState(false)

    // Determines whether emails can be sent
    const [canSendEmails, setCanSendEmails] = useState(MailComposer.isAvailableAsync())

    // Camera Permission State
    const [cameraPerm, setCameraPerm] = useState(false)

    // Makes sure to recheck permissions only once
    const [checked, setChecked] = useState(false)

///////////////////////
///                 ///
///    useEffect    ///
///                 ///
///////////////////////

useEffect(() => {
  checkPermissions();
}, []);

useEffect(() => {
  console.log("CAMERAPERM::::::", cameraPerm)
  if (cameraPerm === "denied" && !checked){
    checkPermissions()
    setChecked(true)
    console.error("Camera Permissions Denied. Try Again")
  }
}, [cameraPerm])


///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////


  // Called in a useEffect to gain (and log the results of) permissions
  const checkPermissions = async () => {
    // Request Permissions on component load
    await Camera.requestCameraPermission();
    await Camera.requestMicrophonePermission();
    await requestPermission()

    // Console log permissions
    const cameraPermission = await Camera.getCameraPermissionStatus();
    setCameraPerm(cameraPermission)
    const microphonePermission = await Camera.getMicrophonePermissionStatus();
  };


  // Starts the Video Recording, and beging handling 
  const startVideoRecording = async () => {
    setRecording(true)
    camera.current.startRecording({
      flash: 'on',
      onRecordingFinished: video => handleVideoRecorded(video), // Need to save video file here one recording is done
      onRecordingError: error => console.error(error),
    });
  };

  // Triggers the end of the recording process
  const stopVideoRecording = async () => {
    await camera.current.stopRecording();
  };

  // Handles the process that occurs after a video has completed recording
  function handleVideoRecorded(video){
    setRecording(false)
    setVideoPath(video.path)
    setRecorded(true)
  }

  // Sends the Video, triggers the message, opens the modal
  function handleSendVid(){
    saveVidToLib()
    .then(resolved => {
      emailVid(resolved)
    })
    .then(() => {
      handleSendMessage()
    })
  }
  
///////////////////////
///                 ///
///    Mutations    ///
///                 ///
///////////////////////

  // Message Send Mutation 
  const [sendMessage, { loading: loadingAdd, error: errorAdd, data: typeAdd }] =useMutation(SEND_MESSAGE);


  // Adds taken picture to Media Library
  async function saveVidToLib(vidPath){
    return await MediaLibrary.createAssetAsync(videoPath)
  }

  // Emails the now saved video
  async function emailVid(video){
    MailComposer.composeAsync({
      recipients: [therapist.email],
      subject: `Video Of Exercise From: ${user.firstName} ${user.lastName}`,
      body: "These are videos uploaded for your viewing",
      attachments: [videoPath]
    })
    .catch((err) => console.error(err))
    .then(() => {
      setEmailSent(true)
    })
  }


  // Does all the mutations, queries, and state changes related nwith sending a message
  function handleSendMessage(){
    handleSendMessageMutation()
    .then( async (resolved) => {
        await getAndSetUser()
    })
  }

  // Runs the Apollo Mutation to send the message
  async function handleSendMessageMutation(){
      return await sendMessage({
          variables: {
              content: "Email of video sent",
              chatRoomID: chatroom.id
          }
      }).catch(err => console.error(err))
  }

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
                title={"Record Video"}
            />
        </View>    
    ) 
  }

  // Renders the outeer frame 
  function renderOutterBorder(){
    return(
      <View>

        {/* Camera */}
        <View style={{marginRight: 20, marginLeft: 20, marginTop: 30}}>
          {renderCameraScreen()}
        </View>

      </View>
    )
  }

  // Renders the Record Button
  function renderRecordButton(){
    if (recording){
      return(
        <TouchableOpacity 
        style={{height: 80, width: 80, borderRadius: 50, borderWidth: 4, borderColor: COLORS.gradientColor1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center'}}
        onPress={() => {
          stopVideoRecording();
        }}>
          <View style={{backgroundColor: COLORS.gradientColor2, height: 50, width: 50, borderRadius: 5}}/>
        </TouchableOpacity>
      )
    }
    else{
      return(
        <TouchableOpacity 
        style={{height: 80, width: 80, borderRadius: 50, borderWidth: 4, borderColor: COLORS.gradientColor1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center'}}
        onPress={() => {
          startVideoRecording();
        }}>
          <View style={{backgroundColor: COLORS.gradientColor2, height: 55, width: 55, borderRadius: 100,}}/>
        </TouchableOpacity>
      )
    }
  }

  // Renders The Camera, if permissed and not done recording
  function renderCameraScreen(){
    // No permissions
    if (device == null) return <View style={{backgroundColor: 'black'}}/>;

    // Video Recorded
    if (recorded){
      return(
        <View>
          <Text style={{...FONTS.Title, textAlign: 'center', marginTop: 100}}>
            Video Recorded
          </Text>
        </View>
      )
    }

    if (!cameraPerm){
      return(
        <View>
          <Text style={{...FONTS.Title, textAlign: 'center', marginTop: 100}}>
            Please enable video permissions from your settings to access the camera
          </Text>
        </View>
      )
    }


    return (
      <View style={{backgroundColor: 'black', height: maxHeight * 0.70,}}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          video={true}
          audio={true}
          ref={camera}
        />
        <View style={{alignSelf: 'center', marginTop: maxHeight * 0.65}}>
          {renderRecordButton()}
        </View>
      </View>
    );
  };

  // Renders the Send or Cancel Buttons
  function renderSendOrReplace(){
    if (!recorded){
      return null
    }
    return(
      <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 60}}>

          {/* Send to Therapist */}
          <TouchableOpacity 
          style={{backgroundColor: 'white', borderRadius: 15, padding: 10, width: 160, height: 80, alignItems: 'center', justifyContent: 'center'}}
          onPress={() => {
            handleSendVid(videoPath)
          }}>
            <Text style={{textAlign: 'center', ...FONTS.SubTitle, color: 'black'}}>
              Send to Therapist
            </Text>
          </TouchableOpacity>

          {/* Replace */}
          <TouchableOpacity style={{backgroundColor: 'black', borderRadius: 15, padding: 10, width: 160, height: 80, alignItems: 'center', justifyContent: 'center'}}
          onPress={() => {
            setVideoPath(false)
            setRecorded(false)
          }}>
            <Text style={{textAlign: 'center', ...FONTS.SubTitle, color: '#FFF'}}>
              Start Over
            </Text>
          </TouchableOpacity>

      </View>
    )
  }

  // Renders the Email Sent Modal
  function renderEmailSentModal(){
    return(
      <Modal
        isVisible={emailSent}
        onBackdropPress={() => setEmailSent(false)}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        style={{ margin: 0 }}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        {renderEmailSentModalContent()}
      </Modal>
    )
  }

  // Renders the content of the Modal
  function renderEmailSentModalContent(){
    return(
      <View
        style={{
          width: maxWidth - 60,
          backgroundColor: COLORS.white,
          marginHorizontal: 20,
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 30,
        }}
      >
        <Text style={{textAlign: 'center', ...FONTS.Title}}>
          Email Sent!
        </Text>
        <Text style={{textAlign: 'center', ...FONTS.SubTitle}}>
          Click anywhere outside this window to continue
        </Text>
      </View>
    )
  }


///////////////////////
///                 ///
///   Main Render   ///
///                 ///
///////////////////////

  // Main Render
  function Main(){

    if (cameraPerm){
      return(
        <Gradient
        colorOne={COLORS.gradientColor1}
        colorTwo={COLORS.gradientColor2}
        style={{height: '110%', paddingTop: 5}}
        >
          {renderEmailSentModal()}
          {renderHeader()}
          {renderOutterBorder()}
          {renderSendOrReplace()}
          <View>
            <Text style={{textAlign: 'center', fontSize: 30, marginTop: 30}}>
              {/* {cameraPerm} */}
            </Text>
          </View>
        </Gradient>
      )
    }
    return(
      <Gradient
        colorOne={COLORS.gradientColor1}
        colorTwo={COLORS.gradientColor2}
        style={{height: '110%', paddingTop: 5}}
        >
          {renderHeader()}
          <Text style={{textAlign: 'center', ...FONTS.Title, color: COLORS.iconLight, marginTop: 35}}>
            Please Enable Camera Permissions to use this feature!
          </Text>
        </Gradient>
    )
  }


  return (
    Main()
  )

}

export default VisionComp;