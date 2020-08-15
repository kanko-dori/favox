import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';

import * as express from 'express';
import * as cors from 'cors';

import { ping } from './handler';

const app = express();
app.use(cors({}));
firebase.initializeApp();

app.get('/api/', ping);

exports.api = functions.https.onRequest(app);
