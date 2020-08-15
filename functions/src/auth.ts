/* eslint-disable import/prefer-default-export */
import * as admin from 'firebase-admin';
import * as Express from 'express';

export const verifyRequest = (req:Express.Request, res: Express.Response, next: any):void => {
  const authorization = req.header('Authorization');
  if (authorization) {
    const token = authorization.split(' ');
    admin.auth().verifyIdToken(token[1])
      .then((decodedToken) => {
        console.log(decodedToken);
        res.locals.user = decodedToken;
        next();
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(401);
      });
  } else {
    console.log('Authorization header is not found');
    res.sendStatus(401);
  }
};
