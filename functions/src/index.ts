import * as functions from 'firebase-functions';
import app from './api/api';
import { documentOnUpdate } from './firestore';

exports.api = functions.https.onRequest(app);

exports.useWildcard = functions.firestore
  .document('users/{userId}/items/{itemId}')
  .onWrite(documentOnUpdate);
