import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDrRAxpT2uB2CMS_PLv1P5esz_yONJY3CA",
    authDomain: "instagramclone-fcfb0.firebaseapp.com",
    databaseURL: "https://instagramclone-fcfb0-default-rtdb.firebaseio.com",
    projectId: "instagramclone-fcfb0",
    storageBucket: "instagramclone-fcfb0.appspot.com",
    messagingSenderId: "26324444504",
    appId: "1:26324444504:web:18c7f27fb339b76738b12d",
    measurementId: "G-2JM2W1GKXT"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };