import { Album, SpotifyIdMap, SpotifyUserResponse, Image, Track, Playlist } from '../../types';
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

export const saveAlbum = async (album: Album): Promise<Album> => {
  return new Promise((resolve, reject) => {
    const albumRef = fireStore.collection('Albums').doc(album.id);
    albumRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(`Album ${album.id} is already exists`);
          resolve(doc.data() as Album);
        }

        albumRef.set(album).then(() => {
          resolve(album);
        });
      })
      .catch(reject);
  });
};

export const updateAlbumImage = async (id: string, images: Image[]): Promise<Image[]> => {
  const albumRef = fireStore.collection('Albums').doc(id);
  return albumRef
    .get()
    .then((doc) => {
      if (!doc.exists) {
        throw new Error(`Album ${id} is doesn't exist`);
      }
      return albumRef.set({ images: images }, { merge: true });
    })
    .then(() => images);
};

export const saveTrack = async (track: Track): Promise<Track> => {
  // return new Promise((resolve, reject) => {
  const albumRef = fireStore.collection('Tracks').doc(track.id);
  return albumRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        throw new Error(`Track ${track.id} is already exist`);
      }
      return albumRef.set(track);
    })
    .then(() => track);
};

export const savePlaylist = async (playlist: Playlist): Promise<Playlist> => {
  return new Promise((resolve, reject) => {
    const albumRef = fireStore.collection('Playlists').doc(playlist.id);
    albumRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(`Playlists ${playlist.id} is already exists`);
          resolve(doc.data() as Playlist);
        }

        albumRef.set(playlist).then(() => {
          resolve(playlist);
        });
      })
      .catch((e) => reject(e));
  });
};

export const getSpotifyUserByUid = async (uid: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    const spotifyIdMapRef = fireStore.collection('SpotifyIdMap').doc(uid);
    spotifyIdMapRef
      .get()
      .then((spotifyIdMapDoc) => {
        if (!spotifyIdMapDoc.exists) {
          reject();
        }
        const spotifyIdMap = spotifyIdMapDoc.data() as SpotifyIdMap;
        const spotifyUserRef = fireStore.collection('Users').doc(spotifyIdMap.spotifyId);

        return spotifyUserRef.get();
      })
      .then((spotifyUserDoc) => {
        if (!spotifyUserDoc) {
          reject();
        }
        const spotifyUser = spotifyUserDoc.data() as User;

        resolve(spotifyUser);
      });
  });
};
