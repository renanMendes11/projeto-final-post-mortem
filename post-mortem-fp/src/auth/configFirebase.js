import firebase from 'firebase/app';
import 'firebase/auth';

export const authConfig = firebase.initializeApp({
    apiKey: "AIzaSyDgRSfWE_ooxt8hJZjJN4VXw66XgRGgdPA",
    authDomain: "post-mortem-314021.firebaseapp.com",
    projectId: "post-mortem-314021",
    storageBucket: "post-mortem-314021.appspot.com",
    messagingSenderId: "197834114436",
    appId: "1:197834114436:web:e335caf2a0bec979a409d1",
    measurementId: "G-X2BRR2R93X"
});