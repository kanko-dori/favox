import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

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

interface FirebaseContextValue {
  auth: firebase.auth.Auth | null;
  firestore: firebase.firestore.Firestore | null;
  functions: firebase.functions.Functions | null;
}

const FirebaseContext = createContext<FirebaseContextValue>({
  auth: null,
  firestore: null,
  functions: null,
});

interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [contextValue, setContextValue] = useState<FirebaseContextValue>({
    auth: null,
    firestore: null,
    functions: null,
  });

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    const auth = firebase.auth();
    const firestore = firebase.firestore();
    const functions = firebase.functions();
    setContextValue({ auth, firestore, functions });

    const { hostname } = location;
    if (hostname === 'localhost') {
      functions.useEmulator(hostname, 5001);
      firestore.useEmulator(hostname, 5002);
    }
  }, []);

  return <FirebaseContext.Provider value={contextValue}>{children}</FirebaseContext.Provider>;
};

export const useFirebase = (): FirebaseContextValue => useContext(FirebaseContext);
