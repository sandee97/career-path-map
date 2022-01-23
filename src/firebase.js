import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyDdDhcmZfmc-pRGMvO7O5IjqJxW4sqz1-s",
    authDomain: "careerpathmap.firebaseapp.com",
    projectId: "careerpathmap",
    storageBucket: "careerpathmap.appspot.com",
    messagingSenderId: "965135340240",
    appId: "1:965135340240:web:25c35ec695d3518b7c84d5",
    measurementId: "G-0D0HYDTRLE"
})

export const auth = app.auth()
export default app
export const db = app.firestore();