import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBtPtkbKqF5Thh7mbMX-M4sNMpuAQNJTiM",
  authDomain: "imagestore-512a6.firebaseapp.com",
  databaseURL: "https://imagestore-512a6.firebaseio.com",
  projectId: "imagestore-512a6",
  storageBucket: "imagestore-512a6.appspot.com",
  messagingSenderId: "741051422008",
  appId: "1:741051422008:web:5c775031ff35c00a3cddcd",
  measurementId: "G-B9NBMX7WYG",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
