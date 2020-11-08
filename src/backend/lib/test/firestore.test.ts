import { saveUserAndSpotifyUser } from '../firestore';
import { SpotifyUserResponse } from '../../../types';

import * as admin from 'firebase-admin';

const update = jest.fn();
const set = jest.fn();
const doc = jest.fn(() => ({ update, set }));
const collection = jest
  .spyOn(admin.firestore(), 'collection')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .mockReturnValue(({ doc } as unknown) as any);

describe('saveUserAndSpotifyUser', () => {
  it('200', async () => {
    await saveUserAndSpotifyUser(
      'UID',
      ({ id: 'TEST_ID' } as unknown) as SpotifyUserResponse,
      'ACCESS_TOKEN',
      'REFRESH_TOKEN'
    );
    expect(collection).toHaveBeenCalledWith('Users');
    expect(collection).toHaveBeenCalledWith('SpotifyUsers');
    expect(set).toHaveBeenCalledWith({ spotifyId: 'TEST_ID' });
    expect(set).toHaveBeenCalledWith({
      uid: 'TEST_ID',
      twitterId: null,
      playlists: null,
      accessToken: 'ACCESS_TOKEN',
      refreshToken: 'REFRESH_TOKEN',
    });
  });
});
