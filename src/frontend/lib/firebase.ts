import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyCzc664p6hxw01eU2pIzi6DPM3qmtfW4gY',
  authDomain: 'favoxes.firebaseapp.com',
  databaseURL: 'https://favoxes.firebaseio.com',
  projectId: 'favoxes',
  storageBucket: 'favoxes.appspot.com',
  messagingSenderId: '50642845232',
  appId: '1:50642845232:web:a564e69576d6f94985f7f5',
  measurementId: 'G-F8082WBXH9',
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();
