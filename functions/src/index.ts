import * as functions from 'firebase-functions';
import api from './api/api';
import share from './api/share';
import { documentOnUpdate } from './firestore';

exports.api = functions.https.onRequest(api);
exports.share = functions.https.onRequest(share);

exports.useWildcard = functions.firestore
  .document('users/{userId}/items/{itemId}')
  .onWrite(documentOnUpdate);
