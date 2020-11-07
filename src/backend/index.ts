import express from 'express';
import * as functions from 'firebase-functions';
import next from 'next';

import { getToken, getUserInfomation } from './lib/spotify';
import { fireStore } from './lib/firebase';
import { User } from '../types';

const server = express();
const nextjsServer = next({
  conf: { distDir: 'lib/next' },
});
const nextjsHandle = nextjsServer.getRequestHandler();

server.get('/callback', async (req, res, next) => {
  const code = req.query.code as string;
  const uid = req.query.state as string;
  try {
    const { accessToken, refreshToken } = await getToken(code);
    const userData = await getUserInfomation(accessToken);

    const userCollectionRef = fireStore.collection('Users');
    await userCollectionRef.doc(uid).set({
      spotifyId: userData.id,
    });

    const spotifyUserCollectionRef = fireStore.collection('SpotifyUsers');
    const spotifyUser: User = {
      uid: userData.id,
      twitterId: null,
      playlists: null,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    await spotifyUserCollectionRef.doc(userData.id).set(spotifyUser);


  } catch (e) {
    res.send(e);
    return;
  }
  res.redirect('/');
});

server.all('/**', (req, res, next) => {
  nextjsServer
    .prepare()
    .then(() => nextjsHandle(req, res))
    .then(next);
});

export const app = functions.https.onRequest(server);
