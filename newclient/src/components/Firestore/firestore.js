import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD1tVv22r1X5HTRNYaW_tNdbz6VPqw-V7k",
    authDomain: "u2-electrical-contractor.firebaseapp.com",
    databaseURL: "https://u2-electrical-contractor.firebaseio.com",
    projectId: "u2-electrical-contractor",
    storageBucket: "u2-electrical-contractor.appspot.com",
    messagingSenderId: "594270629104",
    appId: "1:594270629104:web:2fbe6407dacb5d4006a635",
    measurementId: "G-SF1M26J50V"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

export default db;
export const functions = firebase.functions();