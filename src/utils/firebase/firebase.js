import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDUbYD9QL1tBGE2-J1fnAhMfmOVTb-slug",
    authDomain: "kidznmotion-43590.firebaseapp.com",    // Got it

    // The value of `databaseURL` depends on the location of the database
    // databaseURL: "mysql://2emlcedfw014:pscale_pw_xVqAkdjaNP0Xz5csmPVcDBetaH2pPjjcxd9A1nqHvsE@peq38f2dtrwz.us-east-1.psdb.cloud/kidsinmotion5?sslaccept=strict",
    projectId: "kidznmotion-43590",                     // Got it
    storageBucket: "kidznmotion-43590.appspot.com",     // Got it
    messagingSenderId: "848810672627",                  // Got it
    appId: "1:848810672627:ios:60184cc58707bef6d21286", // Got it

    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    measurementId: "G-MEASUREMENT_ID",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getFirebaseToken = (setTokenFound) => {
    return getToken(messaging, {vapidKey: 'BKF-pXuM1UX7Z6gTffOCSo9s1pb7sJv-7m4gsD7ibBujdCgRiUf5mJfieTv0qsbvtPt3MKtFK_W2FI3IOi0cb_g'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
}

