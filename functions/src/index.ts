import * as functions from 'firebase-functions';
import api from './api/api';
import { documentOnUpdate } from './firestore';

exports.api = functions.https.onRequest(api);

exports.useWildcard = functions.firestore
  .document('users/{userId}/items/{itemId}')
  .onWrite(documentOnUpdate);
