import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDoSnXquw0VCEshV6yuUweVoEvew8ulblI",
    authDomain: "nauhenyosystem.firebaseapp.com",
    projectId: "nauhenyosystem",
    storageBucket: "nauhenyosystem.firebasestorage.app",
    messagingSenderId: "954332793298",
    appId: "1:954332793298:web:180993f99bcf3f5446a00b"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
