import { getSpotifyPlaylist } from '../getPlaylist';

import SpotifyWebApi from 'spotify-web-api-node';
// import { SinglePlaylistResponse } from 'spotify-web';
describe('getPlaylist', () => {
  it('正しいplaylistIdからPlaylistを取得できる', async () => {
    const singlePlaylistRes = {
      body: { name: 'Test_playlist' } as SpotifyApi.SinglePlaylistResponse,
      headers: {},
      statusCode: 200,
    };
    const getPlaylistSpy = jest
      .spyOn(SpotifyWebApi.prototype, 'getPlaylist')
      .mockReturnValueOnce(Promise.resolve(singlePlaylistRes));

    const data = await getSpotifyPlaylist('VAILD_PLAYLIST_ID');
    expect(data.name).toBe('Test_playlist');
    expect(getPlaylistSpy).toHaveBeenCalled();
  });

  it('不正なplaylistIdからPlaylistを取得できない', () => {
    const singlePlaylistRes = {
      body: { name: 'Test_playlist' } as SpotifyApi.SinglePlaylistResponse,
      headers: {},
      statusCode: 200,
    };
    const getPlaylistSpy = jest
      .spyOn(SpotifyWebApi.prototype, 'getPlaylist')
      .mockReturnValueOnce(Promise.reject(singlePlaylistRes));

    expect(getSpotifyPlaylist('INVALID_PLAYLIST_ID')).rejects.toThrow('Invalid playlist Id');
    expect(getPlaylistSpy).toHaveBeenCalled();
  });
});
