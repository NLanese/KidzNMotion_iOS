import { gql } from '@apollo/client';


//////////////////////////////////////////
//                                      //
//                QUERIES               //   
//                                      //
//////////////////////////////////////////


const GET_USER = gql`
query Query{
    getUser{
      id
      fcmToken
      email
      username
      firstName
      lastName
      title
      password
      phoneNumber
      role
      createdAt
      childDateOfBirth
      colorSettings
      muteAllAssignments
      muteAllMessages
      assignMuted
      messagesMuted
      profilePic
      accessMessages
      accessSettings
      leaveApp
      solo
      children {
        role
        id
        firstName
        lastName
        accessSettings
        accessMessages
        assignMuted
        leaveApp
        guardian{
          role
          id
          assignMuted
          messagesMuted
          username
          firstName
          lastName
          email
          profilePic
        }
        childCarePlans{
          id
          allVideoStatus
          weeklyVideoStatus
          active
          level
          childId
          assignments{
            id
            dateStart
            dateDue
            title
            description
            childCarePlan{
              childId
            }
            videos{
              id
              contentfulID
              completed
            }
          }
          therapist{
            id
            firstName,
            lastName,
            profilePic
            email
            patientCarePlans{
              id
              allVideoStatus
              weeklyVideoStatus
              active
              level
              assignments{
                id
                dateStart
                dateDue
                title
                description
                childCarePlan{
                  childId
                }
                videos{
                  id
                  contentfulID
                  completed
                }
              }
            }
          }
        }
        chatRooms {
          id
          users{
              firstName
              lastName
              title
              id
            }
          messages{
              content
              createdAt
              sentAt
              sentBy
          }
        }
      }

      guardianId
      guardian{
        role
        id
        username
        firstName
        lastName
        email
        profilePic
      }

      ownedOrganization {
        id
        phoneNumber
        organizationUsers{
          user{
            role
            username
            firstName
            lastName
            email
            role
            children{
              role
              username
              firstName
              lastName
              role
              childCarePlans {
                id
                allVideoStatus
                weeklyVideoStatus
                active
                level
                childId
                child{
                  role
                  firstName
                  lastName
                  childDateOfBirth
                  profilePic
                  guardian{
                    role
                    id
                    username
                    firstName
                    lastName
                    email
                    profilePic
                  }
                }
                assignments{
                  id
                  dateStart
                  dateDue
                  title
                  description
                  childCarePlan{
                    childId
                  }
                  videos{
                    id
                    contentfulID
                    completed
                  }
                }

            }
          }
        }
      }
    }

    childCarePlans {
      id
      allVideoStatus
      weeklyVideoStatus
      active
      level
      childId
      child{
        role
        firstName
        lastName
        childDateOfBirth
        profilePic
        guardian{
          role
          id
          username
          firstName
          lastName
          email
          profilePic
        }
        childCarePlans{
          id
          childId
        }
      }
      assignments{
        id
        dateStart
        dateDue
        title
        description
        childCarePlan{
          childId
        }
        videos{
          id
          contentfulID
          completed
        }
      }
    }

    patientCarePlans {
      id
      allVideoStatus
      weeklyVideoStatus
      active
      level
      childId
      comments{
        id
        content
        createdAt
        videoId
      }
      child{
        id
        role
        firstName
        lastName
        childDateOfBirth
        profilePic
        assignMuted
        guardian{
          role
          id
          username
          firstName
          lastName
          email
          profilePic
          messagesMuted
          assignMuted
        }
        childCarePlans{
          childId
          id
        }
      }
      assignments{
        id
        dateStart
        dateDue
        title
        description
        videos{
          id
          contentfulID
          completed
        }
        childCarePlan{
          id
          childId
          child{
            id
            firstName
            lastName
          }
        }
      }
    }
    
    organizations {
      id
      organization{
        id
        name
        phoneNumber
      	organizationUsers{
          id
          userId
          user{
            firstName
            lastName
            email
            phoneNumber
            role
            children{
              id
              childCarePlans{
                childId
                therapist{
                  id
                }
              }
            }
          }
        }
      }
    }
    
    chatRooms {
      id
      users{
          firstName
          lastName
          title
          id
        }
      messages{
          id
          content
          createdAt
          sentAt
          sentBy
      }
    }
  }
}
`

const GET_MEETINGS = gql`
  query Query{
    getMeetings{
      id
      createdAt
      meetingDateTime
      title
      completed
      canceled
      type
      pendingApproval
      approved
      users{
        id
        firstName
        lastName
        role
        profilePic
      }
      meetingOwnerID
    }
  }
`

const GET_VIDEOS = gql`
  query Query{ 
    getAllVideoFiles{
      id
      level
      title
      description
      videoURL
      previewPictureURL
      
    }
  }
`

const GET_CHATS = gql`
  query Query{
    getUserChatRooms{
      id
      users{
          firstName
          lastName
          title
          id
        }
      messages{
          content
          createdAt
          sentAt
          sentBy
      }
    }
  }
`

const GET_CHAT_FROM_ID = gql`
query Query($id: String!) {
  getChatFromId(id: $id) {
    id
    users {
      id
      firstName
      lastName
      role
    }
    messages {
      createdAt
      content
      sentAt
      sentBy
    }
  }
}
`;

const GET_CHILD_VIDEO_STATISTICS = gql`
  query Query(
      $childID: String!,
  ){
    getChildVideoStatistics(
      childID: $childID
    )
  }
`

const GET_NOTIFICATIONS = gql `
  query Query{
    getNotifications{
      id
      createdAt
      title
      description
      toUserId
      fromUserId
    }
  }
`


//////////////////////////////////////////
//                                      //
//     LOGIN SIGNUP FORGOT-PASSWORD     //   
//                                      //
//////////////////////////////////////////
const USER_SIGN_UP = gql`
  mutation Mutation(
      $email: String!,
      $username: String,
      $password: String!,
      $firstName: String!,
      $lastName: String!,
      $phoneNumber: String,
      $role: String!,

      $childFirstName: String,
      $childLastName: String,
      $childDateOfBirth: String,
      
      $title: String,

      $organizationName:  String,
      $organizationType: String,

      $organizationInviteKey: String

    ){
    signUpUser( 
      email: $email, 
      username: $username, 
      password: $password,
      firstName: $firstName, 
      lastName: $lastName, 
      phoneNumber: $phoneNumber,
      role: $role,

      childFirstName: $childFirstName, 
      childLastName: $childLastName, 
      childDateOfBirth: $childDateOfBirth,

      title: $title,

      organizationName: $organizationName, 
      organizationType: $organizationType,

      organizationInviteKey: $organizationInviteKey
    ){
    token
    }
  }
`

const USER_LOGIN = gql`
  mutation Mutation(
    $username: String!, $password: String!
  ){
    loginUser(
      username: $username, password: $password
    ){
      token
    }
  }
`

const LOGOUT_USER = gql`
  mutation Mutation{
    logoutUser
  }
`

const SWAP_TO_CHILD_ACCOUNT = gql`
  mutation Mutation(
    $childUserID: String!
  ){
    swapToChildAccount(
      childUserID: $childUserID
    ){
      token
    }
  }
`

//////////////////////////////////////////
//                                      //
//         EDITORS AND SETTINGS         //   
//                                      //
//////////////////////////////////////////
const EDIT_USER = gql `
  mutation Mutation(
      $email: String
      $firstName: String
      $lastName: String
      $phoneNumber: String
      $title: String
      $username: String
      ){
      editUser( 
        email: $email,
        firstName: $firstName, 
        lastName: $lastName, 
        phoneNumber: $phoneNumber,
        title: $title,
        username: $username
      )
    }

`

const EDIT_CHILD_SETTINGS = gql`
  mutation Mutation(
    $childUserID: String!,
    $leaveApp: Boolean!,
    $accessMessages: Boolean!,
    $accessSettings: Boolean!
  ){
    editChildSettings(
      childUserID: $childUserID,
      leaveApp: $leaveApp,
      accessMessages: $accessMessages,
      accessSettings: $accessSettings
    )
  }
`

const EDIT_ORGANIZATION_SETTINGS = gql`
  mutation Mutation($name: String!, $phoneNumber: String!) {
    editOrganizationSettings(name: $name, phoneNumber: $phoneNumber) {
      id
    }
  }
`;

const EDIT_USER_NOTIFICATION_SETTINGS = gql`
  mutation Mutation(
    $muteMessageNotifications: Boolean!,
    $muteAssignmentNotifications: Boolean!
  ){
    editUserNotificationSettings(
      muteMessageNotifications: $muteMessageNotifications
      muteAssignmentNotifications: $muteAssignmentNotifications,
    ){
      id
      assignMuted
      messagesMuted
    }
  }
`

const CHANGE_USER_NOTIFICATIONS = gql`
  mutation Mutation(
    $userID: String!,
    $messagesMuted: Boolean!,
    $assignMuted: Boolean!
  ){
    changeUserNotifications(
      userID: $userID
      messagesMuted: $messagesMuted
      assignMuted: $assignMuted
    ){
      id
    }
  }
`

const CHANGE_PROFILE_PICTURE = gql`
  mutation Mutation(
    $profilePic: JSON!
  ){
    changeProfilePicture(
      profilePic: $profilePic
    ){
      id
      firstName
    }
  }
`

const EDIT_COLOR_SETTINGS = gql`
  mutation Mutation(
    $colorSettings: String!
  ){
    editColorSettings(
      colorSettings: $colorSettings
    )
  }
`

//////////////////////////////////////////
//                                      //
//              CREATORS                //   
//                                      //
//////////////////////////////////////////

const ADD_CHILD = gql`
  mutation Mutation(
    $childFirstName: String!
    $childLastName: String!
    $childUsername: String!
    $childDateOfBirth: String!
  ){
    addChild(
      childFirstName: $childFirstName
      childLastName: $childLastName
      childUsername: $childUsername
      childDateOfBirth: $childDateOfBirth
    ){
      id
      email
      username
      firstName
      lastName
      title
      password
      phoneNumber
      role
      createdAt
      childDateOfBirth
      colorSettings
      muteAllAssignments
      muteAllMessages
      children {
        id
        firstName
        lastName
        accessSettings
        accessMessages
        leaveApp
      }
      guardianId
      guardian{
        id
      }
      ownedOrganization {
        id
      }
      childCarePlans {
        id
        allVideoStatus
        weeklyVideoStatus
        active
        level
        childId
        child{
          firstName
          lastName
          childDateOfBirth
          profilePic
        }
        assignments{
          id
          dateStart
          dateDue
          title
          description
        }
      }
      patientCarePlans {
        id
      }
      organizations {
        id
      }
      chatRooms {
        id
      }
    }
  }
`

const INVITE_ORGANIZATION_USER = gql`
  mutation Mutation(
    $email: String!
    $role: String!
    $additionalInformation: JSON
  ){
    inviteOrganizationUser(
      email: $email,
      role: $role,
      additionalInformation: $additionalInformation
    )
  }
`

const CREATE_MEETING = gql`
  mutation Mutation(
    $title: String!,
    $meetingDateTime: Date!,
    $type: String!,
    $participantIDs: [String]!
  ){
    createMeeting(
      title: $title,
      meetingDateTime: $meetingDateTime
      type: $type
      participantIDs: $participantIDs
    ){
      id
    }
  }
`


//////////////////////////////////////////
//                                      //
//      MESSAGES AND NOTIFICATIONS      //   
//                                      //
//////////////////////////////////////////

const CREATE_CHATROOM = gql`
  mutation Mutation(
    $otherParticipantID: String!
  ){
    createChatRoom(
      otherParticipantID: $otherParticipantID
    ){
      id
    }
  }
`

const SEND_MESSAGE = gql`
  mutation Mutation(
    $content: String!
    $chatRoomID: String!
  ){
    sendMessage(
      content: $content,
      chatRoomID: $chatRoomID
    )
  }
`

const DISMISS_NOTIFICATION = gql`
  mutation Mutation(
    $notificationID: String!
  ){
    dismissNotification(
      notificationID: $notificationID
    )
  }
`

const CREATE_USER_TO_USER_NOTIFICATION = gql`
  mutation Mutation(
    $title: String!
    $description: String!,
    $type: String!
    $toUserId: String!
  ){
    createUserToUserNotification(
      title: $title
      description: $description
      type: $type
      toUserId: $toUserId
    )
  }
`

//////////////////////////////////////////
//                                      //
//              Security                //   
//                                      //
//////////////////////////////////////////

const REQUEST_RESET_PASSWORD = gql`
  mutation Mutation(
    $email: String!
  ){
    requestResetPassword(
      email: $email
    )
  }
`

const CHANGE_CHILD_PASSWORD = gql`
  mutation Mutation(
    $childUserID: String!
    $childPassword: String!
  ){
    changeChildPassword(
      childUserID: $childUserID,
      childPassword: $childPassword
    )
  }
`

const CONFIRM_PASSWORD = gql`
  mutation Mutation(
    $password: String!
  ){
    confirmPassword(
      password: $password
    )
  }
`

const UPDATE_PHONE_TOKEN = gql`
  mutation Mutation(
    $token: String!
  ){
    updatePhoneToken(
      token: $token
    )
  }
`

//////////////////////////////////////////
//                                      //
//        VIDEOS AND ASSIGNMENTS        //   
//                                      //
//////////////////////////////////////////

const SET_VIDEO_COMPLETED = gql`
  mutation Mutation(
    $videoID: String!,
    $medalType: String!
    $childID: String
  ){
    setVideoCompleted(
      videoID: $videoID,
      medalType: $medalType,
      childID: $childID
    ){
      id
    }
  }
`

const CREATE_ASSIGNMENT = gql`
  mutation Mutation(
    $childCarePlanID: String!
    $dateStart: String!
    $dateDue: String!
    $title: String!
    $description: String!
    $videoIDs: [String]!
  ){
    createAssignment(
      childCarePlanID: $childCarePlanID,
      dateStart: $dateStart,
      dateDue: $dateDue,
      title: $title,
      description: $description,
      videoIDs: $videoIDs
    )
  }
`

const CREATE_COMMENT = gql`
  mutation Mutation(
    $childCarePlanID: String!
    $commentContent: String!
    $videoID: String
    $assignmentID: String
  ){
    createComment(
      childCarePlanID: $childCarePlanID,
      commentContent: $commentContent,
      videoID: $videoID,
      assignmentID: $assignmentID
    ) {  
        id
        allVideoStatus
        weeklyVideoStatus
        active
        level
        childId
        comments{
          id
          content
          createdAt
          videoId
        }
        child{
          id
          role
          firstName
          lastName
          childDateOfBirth
          profilePic
          guardian{
            role
            id
            username
            firstName
            lastName
            email
            profilePic
          }
          childCarePlans{
            id
          }
        }
        assignments{
          id
          dateStart
          dateDue
          title
          description
          videos{
            id
            contentfulID
          }
          childCarePlan{
            id
            child{
              firstName
              lastName
            }
          }
        }
      }
    }
`

const TOGGLE_ASSGINMENT_SEEN = gql`
    mutation Mutation(
      $assignmentID: String!,
      $hasSeen: Boolean!
    ){
      toggleAssignmentSeen(
        assignmentID: $assignmentID,
        hasSeen: $hasSeen
      ){
        id
      }
    }
`

/////////////
// EXPORTS //
export {   //
  GET_USER,
  GET_MEETINGS,
  GET_VIDEOS,
  GET_CHATS,
  GET_CHAT_FROM_ID,
  GET_CHILD_VIDEO_STATISTICS,

  GET_NOTIFICATIONS,

  USER_SIGN_UP,
  USER_LOGIN,
  EDIT_USER,
  SWAP_TO_CHILD_ACCOUNT,

  ADD_CHILD,
  INVITE_ORGANIZATION_USER,

  LOGOUT_USER,
  
  EDIT_CHILD_SETTINGS,
  EDIT_ORGANIZATION_SETTINGS,
  CHANGE_USER_NOTIFICATIONS,
  EDIT_USER_NOTIFICATION_SETTINGS,
  CHANGE_PROFILE_PICTURE,
  EDIT_COLOR_SETTINGS,
  
  REQUEST_RESET_PASSWORD,
  CHANGE_CHILD_PASSWORD,
  CONFIRM_PASSWORD,
  UPDATE_PHONE_TOKEN,

  CREATE_CHATROOM,
  SEND_MESSAGE,
  DISMISS_NOTIFICATION,
  CREATE_USER_TO_USER_NOTIFICATION,

  CREATE_ASSIGNMENT,
  CREATE_MEETING,
  CREATE_COMMENT,

  SET_VIDEO_COMPLETED,
  TOGGLE_ASSGINMENT_SEEN
}



