import { getToken, getUserInfomation } from '../spotify';
// import fetch from 'node-fetch';
// import * as sinon from 'sinon';
import { get, post, reset } from 'fetch-mock';
import { SpotifyUserResponse } from '../../../types';

describe('getToken', () => {
  beforeEach(() => {
    reset();
  });

  it('access_token と refresh_token が取得できる', async () => {
    post('https://accounts.spotify.com/api/token', {
      status: 200,
      body: {
        access_token: 'ACCESS_TOKEN',
        refresh_token: 'REFRESH_TOKEN',
      },
    });

    const { accessToken, refreshToken } = await getToken('CODE');
    expect(accessToken).toBe('ACCESS_TOKEN');
    expect(refreshToken).toBe('REFRESH_TOKEN');
  });

  it('失敗したときにエラーを返す', async () => {
    post('https://accounts.spotify.com/api/token', {
      status: 400,
    });
    const getTokenPromise = getToken('CODE');
    await expect(getTokenPromise).rejects.toThrow();
  });
});

describe('getUserInformation', () => {
  beforeEach(() => {
    reset();
  });

  it('userData を取得できる', async () => {
    get('https://api.spotify.com/v1/me', {
      status: 200,
      body: {
        id: 'TEST_USER_ID',
      },
    });

    const userData = (await getUserInfomation('CODE')) as SpotifyUserResponse;
    expect(userData.id).toBe('TEST_USER_ID');
  });

  it('失敗したときにエラーを返す', async () => {
    get('https://api.spotify.com/v1/me', {
      status: 400,
    });
    const getUserInfomationPromise = getUserInfomation('ACCESS_TOKEN');
    await expect(getUserInfomationPromise).rejects.toThrow();
  });
});
