import { Request, Response } from 'express';
import { getToken, getUserInfomation } from './lib/spotify';
import {
  saveUser,
  saveSpotifyUser,
  saveAlbum,
  savePlaylist,
  saveTrack,
  getSpotifyUserByUid,
} from './lib/firestore';

import { fireStore } from './lib/firebase';
import { Playlist } from '../types';
import { getPlaylist } from './lib/spotify';
import * as functions from 'firebase-functions';

export const spotifyCallbackHandler = async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code as string;
  const uid = req.query.state as string;
  try {
    const { accessToken, refreshToken } = await getToken(code);
    const userData = await getUserInfomation(accessToken);

    const promises = [] as Promise<unknown>[];
    promises.push(saveUser(uid, userData));
    promises.push(saveSpotifyUser(uid, userData.id, accessToken, refreshToken));
    await Promise.all(promises);
  } catch (e) {
    res.send(e); //FIXME: エラーのときにどうするか考える
    return;
  }
  res.redirect('/my');
};

export const addSpotifyPlaylistHandler = async (
  data: { playlistId: string },
  context: functions.https.CallableContext
): Promise<void> => {
  const { auth } = context;
  if (auth == null) {
    console.log('context.auth is null', auth);
    return;
  }
  const { uid } = auth;
  try {
    const spotifyUser = await getSpotifyUserByUid(uid);
    const playlistData = await getPlaylist(data.playlistId, spotifyUser.accessToken);
    const tracks = playlistData.tracks.items.map((item) => item.track);
    const albums = tracks.map((track) => track.album);

    const saveAlbumPromises = albums.map(saveAlbum);
    await Promise.all(saveAlbumPromises).catch(console.error);

    const trackCollections = tracks.map((track) => {
      return {
        ...track,
        albumRef: fireStore.doc(`Albums/${track.album.id}`),
      };
    });

    const saveTrackPromises = trackCollections.map(saveTrack);
    await Promise.all(saveTrackPromises).catch(console.error);

    const trackRefs = playlistData.tracks.items.map((item) => {
      console.log(`ref: Tracks/${item.track.id}`);
      return fireStore.doc(`Tracks/${item.track.id}`);
    });

    const playlist: Playlist = {
      id: playlistData.id,
      name: playlistData.name,
      owner: playlistData.owner,
      description: playlistData.description,
      trackRefs: trackRefs,
    };

    await savePlaylist(playlist).catch(console.error);
  } catch (e) {
    console.error;
  }
};
};
