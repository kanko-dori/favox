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

  it('successfully redirected to /', async () => {
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

    const saveUserAndSpotifyUserSpy = jest
      .spyOn(firestore, 'saveUserAndSpotifyUser')
      .mockReturnValueOnce(Promise.all([Promise.resolve()]));

    await spotifyCallbackHandler((req as unknown) as Request, (res as unknown) as Response);

    expect(getTokenSpy).toHaveBeenCalled;
    expect(getUserInfomationSpy).toHaveBeenCalled;
    expect(saveUserAndSpotifyUserSpy).toHaveBeenCalled;
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
    const saveUserAndSpotifyUserSpyWithError = jest
      .spyOn(firestore, 'saveUserAndSpotifyUser')
      .mockReturnValueOnce(Promise.all([Promise.reject()]));

    await spotifyCallbackHandler((req as unknown) as Request, (res as unknown) as Response);

    expect(getTokenSpy).toHaveBeenCalled;
    expect(getUserInfomationSpy).toHaveBeenCalled;
    expect(saveUserAndSpotifyUserSpyWithError).toHaveBeenCalled;
    expect(res.send.mock.calls.length).toBe(1);
  });
});
