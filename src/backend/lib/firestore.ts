import { SpotifyIdMap, SpotifyUserResponse } from '../../types';
import { fireStore } from './firebase';
import { User } from '../../types';

export const saveUser = async (
  uid: string,
  spotifyUserData: SpotifyUserResponse
): Promise<SpotifyIdMap> =>
  new Promise((resolve, reject) => {
    const userDocRef = fireStore.collection('SpotifyIdMap').doc(uid);
    userDocRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data() as SpotifyIdMap);
        }
        const data: SpotifyIdMap = {
          spotifyId: spotifyUserData.id,
        };
        userDocRef.set(data).then(() => {
          resolve(data);
        });
      })
      .catch((e) => reject(e));
  });

export const saveSpotifyUser = async (
  uid: string,
  spotifyId: string,
  accessToken: string,
  refreshToken: string
): Promise<User> =>
  new Promise((resolve, reject) => {
    const spotifyUserDocRef = fireStore.collection('Users').doc(spotifyId);
    spotifyUserDocRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const spotifyUser = doc.data() as User;
          spotifyUser.uid.push(uid);
          spotifyUserDocRef.update(spotifyUser).then(() => {
            resolve(spotifyUser);
            return;
          });
        }

        const spotifyUser: User = {
          uid: [uid],
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
        spotifyUserDocRef.set(spotifyUser).then(() => {
          resolve(spotifyUser);
          return;
        });
      })
      .catch((e) => reject(e));
  });
