import express from 'express';
import * as functions from 'firebase-functions';
import next from 'next';
import cors from 'cors';
import {
  addSpotifyPlaylistHandler,
  spotifyCallbackHandler,
  generateDominantColorHandler,
} from './handler';

const server = express();
const nextjsServer = next({
  conf: { distDir: 'lib/next' },
});
const nextjsHandle = nextjsServer.getRequestHandler();
server.use(cors());

server.get('/callback', spotifyCallbackHandler);
server.all('/**', (req, res, next) => {
  nextjsServer
    .prepare()
    .then(() => nextjsHandle(req, res))
    .then(next);
});

export const app = functions.https.onRequest(server);
export const saveSpotifyPlaylist = functions.https.onCall(addSpotifyPlaylistHandler);
export const generateDominantColor = functions.firestore
  .document('Albums/{albumId}')
  .onCreate(generateDominantColorHandler);
