import { getSpotifyPlaylist } from '../getPlaylist';

describe('getPlaylist', () => {
  it('正しいplaylistIdからPlaylistを取得できる', async () => {
    const data = await getSpotifyPlaylist('3hGFpoPXIJmlnd75t68UMz');
    expect(data).toMatchSnapshot();
  });

  it('不正なplaylistIdからPlaylistを取得できない', () => {
    expect(getSpotifyPlaylist('watamokosan')).rejects.toThrow('Invalid playlist Id');
  });
});
