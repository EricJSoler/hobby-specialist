import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAJZmY6jPfKBD7bOQNg-1ZTzoLyv8d4gyM",
    authDomain: "hobby-specialist.firebaseapp.com",
    databaseURL: "https://hobby-specialist.firebaseio.com",
    projectId: "hobby-specialist",
    storageBucket: "hobby-specialist.appspot.com",
    messagingSenderId: "249982959527"
};

var db = firebase.initializeApp(config);

export default db;