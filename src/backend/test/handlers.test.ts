import { Request, Response } from 'express';
import * as functions from 'firebase-functions';

import { addSpotifyPlaylistHandler, spotifyCallbackHandler } from '../handler';

import * as spotify from '../lib/spotify';
import * as firestore from '../lib/firestore';

import { Playlist, SpotifyUserResponse } from '../../types';
import { spotifyPlaylistData, albumData, trackData } from './spotifyPlaylistData';

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

describe('addSpotifyPlaylistHandler', () => {
  const userData = {
    uid: ['UID'],
    accessToken: 'ACCESS_TOKEN',
    refreshToken: 'REFRESH_TOKEN',
  };
  const playlistData: Playlist = {
    id: 'ID',
    name: 'NAME',
    description: 'description',
    owner: {
      external_urls: { spotify: '' },
      href: '',
      id: '',
      type: 'user',
      uri: '',
    },
    trackRefs: [],
  };
  const getSpotifyIdMapSpy = jest
    .spyOn(firestore, 'getSpotifyUserByUid')
    .mockReturnValue(Promise.resolve(userData));
  const savePlaylistSpy = jest.spyOn(firestore, 'savePlaylist').mockResolvedValue(playlistData);
  const getPlaylistSpy = jest.spyOn(spotify, 'getPlaylist').mockResolvedValue(spotifyPlaylistData);
  const saveAlbumSpy = jest
    .spyOn(firestore, 'saveAlbum')
    .mockReturnValue(Promise.resolve(albumData));
  const saveTrackSpy = jest
    .spyOn(firestore, 'saveTrack')
    .mockReturnValue(Promise.resolve(trackData));

  it('should not cause an error like type error', async () => {
    const data = { playlistId: 'PLAYLIST_ID' };
    const context = ({ auth: 'UID' } as unknown) as functions.https.CallableContext;
    await addSpotifyPlaylistHandler(data, context);

    expect(getSpotifyIdMapSpy).toHaveBeenCalled;
    expect(getPlaylistSpy).toHaveBeenCalled;
    expect(saveAlbumSpy).toHaveBeenCalled;
    expect(saveTrackSpy).toHaveBeenCalled;
    expect(savePlaylistSpy).toHaveBeenCalled;
  });
});
