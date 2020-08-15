/* eslint-disable import/prefer-default-export */
import * as functions from 'firebase-functions';

export const ping = (_request: functions.Request, response: functions.Response): void => {
  functions.logger.info('ping');
  response.sendStatus(200);
};
