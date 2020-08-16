/* eslint-disable import/prefer-default-export */
import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
import { logger } from 'firebase-functions';

export const verifyRequest = (req: Request, res: Response, next: NextFunction):void => {
  const authorization = req.header('Authorization');
  if (authorization) {
    const token = authorization.split(' ');
    admin.auth().verifyIdToken(token[1])
      .then((decodedToken) => {
        logger.log(decodedToken);
        res.locals.user = decodedToken;
        next();
      })
      .catch((err) => {
        logger.log(err);
        res.sendStatus(401);
      });
  } else {
    logger.log('Authorization header is not found');
    res.sendStatus(401);
  }
};
