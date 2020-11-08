import { SpotifyUserResponse } from '../../types';
import { fireStore } from './firebase';
import { User } from '../../types';

export const saveUserAndSpotifyUser = async (
  uid: string,
  spotifyUserData: SpotifyUserResponse,
  accessToken: string,
  refreshToken: string
): Promise<unknown> => {
  const promises = [] as Promise<FirebaseFirestore.WriteResult>[];

  const userCollectionRef = fireStore.collection('Users');
  promises.push(
    userCollectionRef.doc(uid).set({
      spotifyId: spotifyUserData.id,
    })
  );

  const spotifyUserCollectionRef = fireStore.collection('SpotifyUsers');
  const spotifyUser: User = {
    uid: spotifyUserData.id,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  promises.push(spotifyUserCollectionRef.doc(spotifyUserData.id).set(spotifyUser));

  return Promise.all(promises);
};
