import { Request, Response } from 'express';
import 'node-fetch';
import * as functions from 'firebase-functions';

import { spotifyTokenResponse, SpotifyUserResponse } from '../../types';

const CLIENT_ID = functions.config().spotify.client_id;
const CLIENT_SECRET = functions.config().spotify.client_secret;
const REDIRECT_URI = functions.config().spotify.redirect_uri;

export const handleLogin = async (req: Request, res: Response): Promise<void> => {
  console.log(req.query);
  const code = req.query.code as string;
  // const state = req.query.state as string;

  const { accessToken } = await getToken(code);
  const userData = await getUserInfomation(accessToken);
  console.log(userData);

  res.redirect('/');
};

export const getToken = async (
  code: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  const params = new URLSearchParams();
  params.append('code', code);
  params.append('redirect_uri', REDIRECT_URI);
  params.append('grant_type', 'authorization_code');
  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'post',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const responseBody = (await tokenResponse.json()) as spotifyTokenResponse;
    console.log(responseBody);
    const accessToken = responseBody.access_token;
    const refreshToken = responseBody.refresh_token;

    return { accessToken, refreshToken };
  } catch (e) {
    throw new Error(e);
  }
};

export const getUserInfomation = async (accessToken: string): Promise<SpotifyUserResponse> => {
  const userDataResponse = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return (await userDataResponse.json()) as SpotifyUserResponse;
};
