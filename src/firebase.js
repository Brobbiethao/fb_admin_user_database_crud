import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCuyF4LA-hhjSpBqRptOVStT1HB3YxQk-0",
  authDomain: "socialanimal-52a5b.firebaseapp.com",
  databaseURL: "https://socialanimal-52a5b.firebaseio.com",
  projectId: "socialanimal-52a5b",
  storageBucket: "socialanimal-52a5b.appspot.com",
  messagingSenderId: "1061261272119"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
