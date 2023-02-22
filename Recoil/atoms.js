import { atom } from 'recoil';

import { COLORS, FONTS, SIZES, DEFAULT_AVATAR } from '../NutonConstants';

/////////////
// GENERAL //
/////////////

	// Determines the Active User. Duh
	export const userState = atom({
		key: 'userState',
		default: false,
	});

	// Determines the Token from Login or SignUp
	export const tokenState = atom({
		key: 'tokenState',
		default: false
	});

	// Tracks All Meetings (therapist and user)
	export const meetingState = atom({
		key: "meetingState",
		default: []
	});

	// Gets all Assignments
	export const assignState = atom({
		key: "assignState",
		default: []
	});

	// Tracks whether the app just opened or not
	export const firstOpen = atom({
		key: "firstOpen",
		default: true
	})

	// Tracks Subscription Status
	export const subscriptionstate = atom({
		key: "subscriptionState",
		default: true
	})

/////////////////////
// THERAPIST STATE //
/////////////////////

	// Holds Client List Data
	export const clientListState = atom({
		key: 'clientListState',
		default: false
	})

	// Only to be used when the USER is the Organization Owner
	export const organizationState = atom({
		key: "organizationState",
		default: false
	})

	export const selectedClientState = atom({
		key: "selectedClientState",
		default: false
	})

//////////////////
// MEDAL STATES //
//////////////////

	// Tracks all earned medals
	export const medalsDataState = atom({
		key: "medalDataState",
		default: []
	})

	// Tracks what type of medal you are currently looking at
	export const medalsTypeState = atom({
		key: "medalTypeState",
		default: false
	})

	// If Therapist, tracks which child is being viewed for Medals
	export const selectedClientForMedals = atom({
		key: "clientForMedals",
		default: false
	})

///////////////
// Chatrooms //
///////////////

	// Tracks the current chatroom
	export const activeChatroom = atom({
		key: 'activeChatroom',
		default: {}
	})

/////////////////
// VIDEO STATE //
/////////////////

	// Tracks all videos from API upon login
	export const videoDataState = atom({
		key: "videoDataState",
		default: []
	})

	// Tracks whether or not a single video has been accessed on this session
	export const firstVideoAccessState = atom({
		key: "firstVideoAccessState",
		default: false
	})

	export const accessibleVideos = atom({
		key: 'accessibleVideos',
		default: []
	})

/////////////////////////
// NOTIFICATIONS STATE //
/////////////////////////

	// Tracks the Message Related Notifications
	export const messageNotifications = atom({
		key: 'messageNotifications',
		default: []
	})

	//
	export const scheduleNotifications = atom({
		key: 'scheduleNotifications',
		default: []
	})

//////////////////
// STYLE STATES //
//////////////////

	// Determines the Color Layout for the Active User
	export const colorState = atom({
		key: 'colorState',
		default: {
			...COLORS.scheme0
		}
	})

	// Determines the Font Layout for the Active User (likely won't be used)
	export const fontState = atom({
		key: 'fontState',
		default: {
			...FONTS
		}
	})

	// Adjusts sizes for people who have stupid eyes
	export const sizeState = atom({
		key: 'sizeState',
		default: {
			...SIZES
		}
	})

	// Loads the props that determine the displayed avatar
	export const avatarState = atom({
		key: 'avatarState',
		default:{
			...DEFAULT_AVATAR
		}
	})

