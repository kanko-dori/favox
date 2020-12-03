import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
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

type FirebaseCallableFunctions = {
  saveSpotifyPlaylist: firebase.functions.HttpsCallable;
};

interface FirebaseContextValue {
  auth: firebase.auth.Auth | null;
  firestore: firebase.firestore.Firestore | null;
  functions: firebase.functions.Functions | null;
  callableFunctions: FirebaseCallableFunctions | null;
}

const FirebaseContext = createContext<FirebaseContextValue>({
  auth: null,
  firestore: null,
  functions: null,
  callableFunctions: null,
});

interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [contextValue, setContextValue] = useState<FirebaseContextValue>({
    auth: null,
    firestore: null,
    functions: null,
    callableFunctions: null,
  });

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    setContextValue({
      auth: firebase.auth(),
      firestore: firebase.firestore(),
      functions: firebase.functions(),
      callableFunctions: {
        saveSpotifyPlaylist: firebase.functions().httpsCallable('saveSpotifyPlaylist'),
      },
    });
    if (isDev) {
      firebase.functions().useEmulator('localhost', 5001);
    }
  }, []);

  return <FirebaseContext.Provider value={contextValue}>{children}</FirebaseContext.Provider>;
};

export const useFirebase = (): FirebaseContextValue => useContext(FirebaseContext);
