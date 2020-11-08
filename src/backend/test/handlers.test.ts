import { Request, Response } from 'express';
import { spotifyCallbackHandler } from '../handler';

import * as spotify from '../lib/spotify';
import * as firestore from '../lib/firestore';

import { SpotifyUserResponse } from '../../types';

describe('spotifyCallbackHandler', () => {
  const getTokenSpy = jest
    .spyOn(spotify, 'getToken')
    .mockReturnValueOnce(
      Promise.resolve({ accessToken: 'ACCESS_TOKEN', refreshToken: 'REFRESH_TOKEN' })
    );
  const getUserInfomationSpy = jest
    .spyOn(spotify, 'getUserInfomation')
    .mockReturnValueOnce(Promise.resolve({ id: 'TEST_ID' } as SpotifyUserResponse));

  it('successfully redirected to /loading', async () => {
    const req = {
      query: {
        code: 'TEST_CODE',
        state: 'RANDOM_GENERETED_STRING',
      },
    };
    const res = {
      redirect: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };

    const saveUser = jest
      .spyOn(firestore, 'saveUser')
      .mockReturnValueOnce(Promise.resolve({ spotifyId: 'TEST_ID' }));
    const saveSpotyUser = jest.spyOn(firestore, 'saveSpotifyUser').mockReturnValueOnce(
      Promise.resolve({
        uid: ['TEST_ID'],
        spotifyId: 'TEST_SPOTIFY_ID',
        accessToken: 'ACCESS_TOKEN',
        refreshToken: 'REFRESH_TOKEN',
      })
    );

    await spotifyCallbackHandler((req as unknown) as Request, (res as unknown) as Response);

    expect(getTokenSpy).toHaveBeenCalled;
    expect(getUserInfomationSpy).toHaveBeenCalled;
    expect(saveUser).toHaveBeenCalled;
    expect(saveSpotyUser).toHaveBeenCalled;
    expect(res.redirect.mock.calls.length).toBe(1);
  });

  it('send error when something is failed', async () => {
    const req = {
      query: {
        code: 'TEST_CODE',
        state: 'RANDOM_GENERETED_STRING',
      },
    };
    const res = {
      redirect: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    const saveUser = jest
      .spyOn(firestore, 'saveUser')
      .mockReturnValueOnce(Promise.resolve({ spotifyId: 'TEST_ID' }));
    const saveSpotyUser = jest.spyOn(firestore, 'saveSpotifyUser').mockReturnValueOnce(
      Promise.resolve({
        uid: ['TEST_ID'],
        spotifyId: 'TEST_SPOTIFY_ID',
        accessToken: 'ACCESS_TOKEN',
        refreshToken: 'REFRESH_TOKEN',
      })
    );

    await spotifyCallbackHandler((req as unknown) as Request, (res as unknown) as Response);

    expect(getTokenSpy).toHaveBeenCalled;
    expect(getUserInfomationSpy).toHaveBeenCalled;
    expect(saveUser).toHaveBeenCalled;
    expect(saveSpotyUser).toHaveBeenCalled;
    expect(res.send.mock.calls.length).toBe(1);
  });
});
