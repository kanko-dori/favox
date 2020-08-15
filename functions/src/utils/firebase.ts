import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);
// eslint-disable-next-line import/prefer-default-export
export const db = admin.firestore();
