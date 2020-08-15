import * as functions from 'firebase-functions';
import app from './api/api';

exports.api = functions.https.onRequest(app);
