import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi();
const token = '';

spotifyApi.setAccessToken(token);

export const getSpotifyPlaylist = async (
  playlistId: string
): Promise<SpotifyApi.SinglePlaylistResponse> => {
  const res = await spotifyApi.getPlaylist(playlistId);
  if (res.statusCode !== 200) {
    throw new Error('invalid response');
  }
  return res.body;
};
