import * as firebase from "firebase/app";
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBtHuqNEqQDhqw5HwaTXCA6edbdGnBqkes",
  authDomain: "music-player-f9307.firebaseapp.com",
  databaseURL: "https://music-player-f9307.firebaseio.com",
  projectId: "music-player-f9307",
  storageBucket: "music-player-f9307.appspot.com",
  messagingSenderId: "445150220287",
  appId: "1:445150220287:web:590db989f63ff13c0621ca",
  measurementId: "G-LY9PM3187T"
}
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export default db;