import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

import { ping } from './handler';
import { verifyRequest } from './auth';

firebase.initializeApp();

const app = express();
app.use(cors({}));

app.get('/api/', ping);

app.get('/api/secure/', verifyRequest, ping);

exports.api = functions.https.onRequest(app);
