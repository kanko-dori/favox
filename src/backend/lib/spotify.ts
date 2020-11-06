import * as express from 'express';
import fetch from 'node-fetch';
import * as functions from 'firebase-functions';

const CLIENT_ID = functions.config().spotify.client_id;
const CLIENT_SECRET = functions.config().spotify.client_secret;
const REDIRECT_URI = functions.config().spotify.redirect_uri;

export const handleLogin = async (req: express.Request, res: express.Response): Promise<void> => {
  console.log(req.query);
  const code = req.query.code as string;
  // const state = req.query.state as string;

  const params = new URLSearchParams();
  params.append('code', code);
  params.append('redirect_uri', REDIRECT_URI);
  params.append('grant_type', 'authorization_code');

  fetch('https://accounts.spotify.com/api/token', {
    method: 'post',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      const accessToken = json.access_token;
      const refreshToken = json.refresh_token;
      console.log(`accessToken: ${accessToken}, refreshToken: ${refreshToken}`);

      res.redirect('/');
    });
};
