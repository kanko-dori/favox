import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { SpotifyIdMap, User } from '../../types';

export const useSpotifyToken = (
  firestore: firebase.firestore.Firestore | null,
  uid?: string
): string => {
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!firestore || !uid) return;
    firestore
      .collection('SpotifyIdMap')
      .doc(uid)
      .get()
      .then((snap) => snap.data() as SpotifyIdMap)
      .then(({ spotifyId }) => firestore.collection('Users').doc(spotifyId).get())
      .then((snap) => snap.data() as User)
      .then(({ accessToken }) => setToken(accessToken))
      .catch(console.error);
  }, [firestore, uid]);

  return token;
};
