/* eslint-disable import/prefer-default-export */
import * as firebase from 'firebase';

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
// Initialize firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth().useDeviceLanguage();

export const auth = firebaseApp.auth();
