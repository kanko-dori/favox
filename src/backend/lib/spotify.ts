import 'node-fetch';
import * as functions from 'firebase-functions';

import { SpotifyPlaylist, spotifyTokenResponse, SpotifyUserResponse } from '../../types';

const CLIENT_ID: string = functions.config().spotify?.client_id || 'CLIENT_ID';
const CLIENT_SECRET: string = functions.config().spotify?.client_secret || 'CLIENT_SECRET';
const REDIRECT_URI: string = functions.config().spotify?.redirect_uri || 'REDIRECT_URI';

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
  const userData = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json() as SpotifyUserResponse)
    .catch((e) => {
      console.error(e);
      throw new Error(e);
    });

  return userData;
};

export const getPlaylist = async (
  playlistId: string,
  accessToken: string
): Promise<SpotifyPlaylist> => {
  const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => resData as SpotifyPlaylist)
    .catch((e) => {
      console.error(e);
      throw new Error(e);
    });

  return playlistResponse;
};
