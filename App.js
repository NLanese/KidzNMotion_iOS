/////////////////////
// REACT and Async //
/////////////////////
import * as React from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import { RecoilRoot } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';


//////////////////////
// NAVIGATION Stuff //
//////////////////////
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//////////////////
// APOLLO Stuff //
//////////////////
import { ApolloClient, InMemoryCache, ApolloProvider, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from 'apollo-link-http';

/////////////////
// ERROR Stuff //
/////////////////
import ErrorBoundary from 'react-native-error-boundary'

///////////
// PAGES //
///////////

import { 
// Landing Pages
  SignIn,
  SignUp,

  // Home Page
  Home,

  // Calendar
  MyCalendar,
  CalendarPage,

  // Medals
  MyMedals, 

  // Settings Page
  SettingsLanding,
  ProfileEdit,
  EditClientSettings,
  GeneralSettings,
  OrganizationSettings,

  // Video
  VideoLibrary,
  TrackVideoProgress,
  WatchVideo,

  // Views
  ClientList,
  TherapistList,

  // Info
  Profile,
  ProfileVideoSettings,

  // Messages
  MessagesLanding,
  MessageThread,

  // Creators
  AddClient,
  AddUser,
  ScheduleAMeeting,
  ClientPool,


  // Scheduling
  SchedulingLanding,
  MedalDisplay,

  // Camera
  VisionComp

 } from './src/Pages';

 import {
  // Bottom Banner
  MainLayout
 } from './src/Global'


// /////////////////
// // Nuton PAGES //
// /////////////////

import {
  // AddClient,
  AddTherapist,

  
  AddANewCard,
  CategoryList,
  CategoryGrid,
  ChoosePaymentMethod,
  Checkout,
  CourseDetails,
  ConfirmationCode,
  CourseCompletedOne,
  CourseCompletedTwo,
  CourseLessons,
  CourseReviews,
  Filter,
  ForgotPassword,
  HelpAndSupport,

  LeaveAReview,
  

  MyCoupons,
  MyCourses,


  
  VideoSettings,
  MySettings,
  MyWallet,
  MyWishlist,
  OnBoarding,
  PaymentFailed,
  PaymentSuccess,
  PrivacyPolicy,

  ResetPassword,
  Search,


  SignUpAccountCreated,
  VerifyYourPhoneNumber,
  YourPasswordHasBeenReset,
 
} from "./NutonScreens";


export default function App() {

let state

////////////////
// Navigation //
////////////////
const Stack = createNativeStackNavigator();

////////////////////////////////
// Apollo Linking Information //
////////////////////////////////

  // Create HttpLink for Apollo
  const httpLink = createHttpLink({
    uri: 'https://kids-in-motion.vercel.app/api/graphql' // Live
    // uri: 'http://localhost:3000/api/graphql' // KW Studio
    // uri: 'http://192.168.1.85:5001/api/graphql' // KW Studio 5G
    // uri: 'http://10.0.0.46/api/graphql' // Home 
  });

  // Creates the Authorization Link
  const authLink = setContext( async (_, { headers }) => {
    const token = await AsyncStorage.getItem('@token')
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : ''
      }
    }
  })

  // Initialize Apollo Client (Connection Object for Apollo API)
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });




  return(
    <ErrorBoundary
      onError={(error) => console.log(error)}
    >
      <NavigationContainer>
        <ApolloProvider client={client}>
        <RecoilRoot>
        

          <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={{flexGrow:1,height:'100%'}}
          >
            <View style={{width: '100%', height: '100%'}}>
              <Stack.Navigator 
                screenOptions={{ headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
                headerShown: false,
                }}
                initialRouteName="SignIn"
              >
{/* ------------------------------------------------------------------------------ */}

                {/* HOME */}
                <Stack.Screen name="Home" component={Home} options={{orientation: 'portrait'}}/> 

                {/* SIGN IN */}
                <Stack.Screen 
                  name="SignIn"
                  component={SignIn} 
                  initialParams={{'key':'value'}}
                  options={{orientation: 'portrait'}}
                /> 

                {/* SIGN UP */}
                <Stack.Screen name="SignUp" component={SignUp} options={{orientation: 'portrait'}}/> 

                {/* SETTINGS */}
                <Stack.Screen name="SettingsLanding" component={SettingsLanding} options={{orientation: 'portrait'}}/> 
                <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{orientation: ' portrait'}}/> 
                <Stack.Screen name="EditClientSettings" component={EditClientSettings} options={{orientation: 'portrait'}}/> 
                <Stack.Screen name="GeneralSettings" component={GeneralSettings} options={{orientation: 'portrait'}}/> 
                <Stack.Screen name="orgSettings" component={OrganizationSettings} options={{orientation: 'portrait'}}/> 

                {/* Calander */}
                {/* <Stack.Screen name="MyCalendar" component={MyCalendar} options={{orientation: 'portrait'}}/>  */}
                <Stack.Screen name="Calendar" component={CalendarPage} options={{orientation: 'portrait'}}/> 

                {/* Creators */}
                <Stack.Screen name="AddUser" component={AddUser} options={{orientation: 'portrait'}}/> 
                <Stack.Screen name="AddClient" component={AddClient} options={{orientation: 'portrait'}}/> 
                <Stack.Screen name="AddTherapist" component={AddTherapist} options={{orientation: 'portrait'}}/> 
                <Stack.Screen name="ScheduleMeeting" component={ScheduleAMeeting} options={{orientation: 'portrait'}}/> 
                <Stack.Screen name="ClientPool" component={ClientPool} options={{orientation: 'portrait'}}/> 


                {/* Info */}
                <Stack.Screen name="Profile" component={Profile} options={{orientation: 'portrait'}}/> 
                <Stack.Screen name="ProfileVideoSettings" component={ProfileVideoSettings} options={{orientation: 'portrait'}}/> 

                {/* Videos */}
                <Stack.Screen name="TrackProgress" component={TrackVideoProgress} options={{orientation: 'portrait'}}/> 
                <Stack.Screen name="WatchVideo" component={WatchVideo} options={{orientation: 'all'}}/> 

                {/* Messages */}
                <Stack.Screen name="MessagesLanding" component={MessagesLanding} options={{orientation: 'portrait'}} />
                <Stack.Screen name="MessageThread" component={MessageThread} options={{orientation: 'portrait'}} />

                {/* Medals */}
                <Stack.Screen name="Medals" component={MyMedals} options={{orientation: 'portrait'}} />
                <Stack.Screen name="MedalDisplay" component={MedalDisplay} options={{orientation: 'portrait'}} />

                {/* Scheduling */}
                <Stack.Screen name="SchedulingLanding" component={SchedulingLanding} options={{orientation: 'portrait'}} />

                {/* Camera */}
                <Stack.Screen name="CameraComponent" component={VisionComp} options={{orientation: 'portrait'}} />           


                <Stack.Screen name="AddANewCard" component={AddANewCard} options={{orientation: 'portrait'}}/> 
                <Stack.Screen name="CategoryGrid" component={CategoryGrid} options={{orientation: 'portrait'}}/> 
                <Stack.Screen name="CategoryList" component={CategoryList} options={{orientation: 'portrait'}}/> 
                <Stack.Screen name="ConfirmationCode" component={ConfirmationCode} options={{orientation: 'portrait'}}/> 
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="Checkout" component={Checkout} />
                <Stack.Screen name="ChoosePaymentMethod" component={ChoosePaymentMethod} options={{orientation: 'portrait'}}/> 
                <Stack.Screen name="CourseCompletedOne" component={CourseCompletedOne} options={{orientation: 'portrait'}}/> 
                <Stack.Screen name="CourseCompletedTwo" component={CourseCompletedTwo} />
                <Stack.Screen name="CourseDetails" component={CourseDetails} />
                <Stack.Screen name="CourseLessons" component={CourseLessons} />
                <Stack.Screen name="CourseReviews" component={CourseReviews} />
                <Stack.Screen name="Filter" component={Filter} />
                <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
                <Stack.Screen name="LeaveAReview" component={LeaveAReview} />
                <Stack.Screen name="/" component={MainLayout} />
                
                <Stack.Screen name="MyCoupons" component={MyCoupons} />
                <Stack.Screen name="MyCourses" component={MyCourses} />
                <Stack.Screen name="MyMedals" component={MyMedals} />

                <Stack.Screen name="VideoLibrary" component={VideoLibrary} />
                
                
                <Stack.Screen name="VideoSettings" component={VideoSettings} />
                <Stack.Screen name="MySettings" component={MySettings} />
                <Stack.Screen name="MyWallet" component={MyWallet} />
                <Stack.Screen name="MyWishlist" component={MyWishlist} />
                <Stack.Screen name="OnBoarding" component={OnBoarding} />
                <Stack.Screen name="PaymentFailed" component={PaymentFailed} />
                <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
                
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen name="Search" component={Search} />
                
                <Stack.Screen name="SignUpAccountCreated" component={SignUpAccountCreated} />
                <Stack.Screen name="VerifyYourPhoneNumber" component={VerifyYourPhoneNumber} />
                <Stack.Screen name="YourPasswordHasBeenReset" component={YourPasswordHasBeenReset} />
                <Stack.Screen name="ClientList" component={ClientList}/>
                <Stack.Screen name="TherapistList" component={TherapistList}/>

              </Stack.Navigator>
            </View>
          </KeyboardAvoidingView>
        </RecoilRoot>
        </ApolloProvider>
      </NavigationContainer>
    </ErrorBoundary>
  )
}
