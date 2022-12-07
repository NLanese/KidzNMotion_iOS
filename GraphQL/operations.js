import { gql } from '@apollo/client';


//////////////////////////////////////////
//                                      //
//                QUERIES               //   
//                                      //
//////////////////////////////////////////


const GET_USER = gql`
# Write your query or mutation here
query Query{
    getUser{
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
        leaveApp
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
            videos{
              id
              contentfulID
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
        }
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
      allVideoStatus
      weeklyVideoStatus
      active
      level
      childId
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
      }
    }
    
    organizations {
      id
      organization{
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
            childCarePlans{
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
  query Query(
    $id: String
  ){
    getChatFromId(
      id: String
    ){
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

const GET_CHILD_VIDEO_STATISTICS = gql`
  query Query(
      $childID: String!,
  ){
    getChildVideoStatistics(
      childID: $childID
    )
  }
`

// const GET_CHILD_VIDEO_STATISTICS = gql`
//   query Query{
//     getChildVideoStatistics(
//       childID: $childID
//     )
//   }
// `


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
  mutation Mutation(
    $name: String,
    $phoneNumber: String
  ){
    editOrganizationSettings(
      name: $name,
      phoneNumber: $phoneNumber
    )
  }
`

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
//              MESSAGES                //   
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

//////////////////////////////////////////
//                                      //
//              Security                //   
//                                      //
//////////////////////////////////////////

const REQUEST_RESET_PASSWORD = gql`
  mutation Mutation(
    $email: String!
  ){
    request_reset_password(
      email: $email
    ){
      Boolean
    }
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



/////////////
// EXPORTS //
export {   //
  GET_USER,
  GET_MEETINGS,
  GET_VIDEOS,
  GET_CHATS,
  GET_CHAT_FROM_ID,
  GET_CHILD_VIDEO_STATISTICS,

  USER_SIGN_UP,
  USER_LOGIN,
  EDIT_USER,
  SWAP_TO_CHILD_ACCOUNT,

  ADD_CHILD,
  INVITE_ORGANIZATION_USER,

  LOGOUT_USER,
  
  EDIT_CHILD_SETTINGS,
  EDIT_ORGANIZATION_SETTINGS,
  EDIT_USER_NOTIFICATION_SETTINGS,
  CHANGE_PROFILE_PICTURE,
  EDIT_COLOR_SETTINGS,
  
  REQUEST_RESET_PASSWORD,
  CHANGE_CHILD_PASSWORD,
  CONFIRM_PASSWORD,

  CREATE_CHATROOM,
  SEND_MESSAGE,

  CREATE_ASSIGNMENT,
  CREATE_MEETING,

  SET_VIDEO_COMPLETED
}



