import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import { isDev } from './utils';

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

export default firebase;
export let auth: firebase.auth.Auth | undefined;
export let firestore: firebase.firestore.Firestore | undefined;
export let functions: firebase.functions.Functions | undefined;
export let saveSpotifyPlaylist: firebase.functions.HttpsCallable | undefined;

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  auth = firebase.auth();
  firestore = firebase.firestore();
  functions = firebase.functions();
  saveSpotifyPlaylist = functions.httpsCallable('saveSpotifyPlaylist');
  if (isDev) {
    functions.useEmulator('localhost', 5001);
  }
}
