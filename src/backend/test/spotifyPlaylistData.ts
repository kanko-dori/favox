import { Album, Track, SpotifyPlaylist } from '../../types';
export const playlistData: SpotifyPlaylist = {
  collaborative: false,
  description: 'Having friends over for dinner? Here´s the perfect playlist.',
  external_urls: {
    spotify: 'http://open.spotify.com/user/spotify/playlist/59ZbFPES4DQwEjBpWHzrtC',
  },
  followers: {
    href: null,
    total: 143350,
  },
  href: 'https://api.spotify.com/v1/users/spotify/playlists/59ZbFPES4DQwEjBpWHzrtC',
  id: '59ZbFPES4DQwEjBpWHzrtC',
  images: [
    {
      url: 'https://i.scdn.co/image/68b6a65573a55095e9c0c0c33a274b18e0422736',
      height: 100,
      width: 100,
    },
  ],
  name: 'Dinner with Friends',
  owner: {
    external_urls: {
      spotify: 'http://open.spotify.com/user/spotify',
    },
    href: 'https://api.spotify.com/v1/users/spotify',
    id: 'spotify',
    type: 'user',
    uri: 'spotify:user:spotify',
  },
  public: false,
  snapshot_id: 'bNLWdmhh+HDsbHzhckXeDC0uyKyg4FjPI/KEsKjAE526usnz2LxwgyBoMShVL+z+',
  tracks: {
    href: 'https://api.spotify.com/v1/users/spotify/playlists/59ZbFPES4DQwEjBpWHzrtC/tracks',
    items: [
      {
        added_at: '2014-09-01T04:21:28Z',
        added_by: {
          external_urls: {
            spotify: 'http://open.spotify.com/user/spotify',
          },
          href: 'https://api.spotify.com/v1/users/spotify',
          id: 'spotify',
          type: 'user',
          uri: 'spotify:user:spotify',
        },
        is_local: false,
        track: {
          album: {
            artists: [],
            release_date_precision: '',
            release_date: '',
            total_tracks: 1,
            album_type: 'single',
            external_urls: {
              spotify: 'https://open.spotify.com/album/5GWoXPsTQylMuaZ84PC563',
            },
            href: 'https://api.spotify.com/v1/albums/5GWoXPsTQylMuaZ84PC563',
            id: '5GWoXPsTQylMuaZ84PC563',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/47421900e7534789603de84c03a40a826c058e45',
                width: 640,
              },
              {
                height: 300,
                url: 'https://i.scdn.co/image/0d447b6faae870f890dc5780cc58d9afdbc36a1d',
                width: 300,
              },
              {
                height: 64,
                url: 'https://i.scdn.co/image/d926b3e5f435ef3ac0874b1ff1571cf675b3ef3b',
                width: 64,
              },
            ],
            name: "I'm Not The Only One",
            type: 'album',
            uri: 'spotify:album:5GWoXPsTQylMuaZ84PC563',
          },
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/2wY79sveU1sp5g7SokKOiI',
              },
              href: 'https://api.spotify.com/v1/artists/2wY79sveU1sp5g7SokKOiI',
              id: '2wY79sveU1sp5g7SokKOiI',
              name: 'Sam Smith',
              type: 'artist',
              uri: 'spotify:artist:2wY79sveU1sp5g7SokKOiI',
            },
          ],
          disc_number: 1,
          duration_ms: 204732,
          explicit: false,
          external_ids: {
            isrc: 'GBUM71403920',
          },
          external_urls: {
            spotify: 'https://open.spotify.com/track/4i9sYtSIlR80bxje5B3rUb',
          },
          href: 'https://api.spotify.com/v1/tracks/4i9sYtSIlR80bxje5B3rUb',
          id: '4i9sYtSIlR80bxje5B3rUb',
          name: "I'm Not The Only One - Radio Edit",
          popularity: 45,
          preview_url: 'https://p.scdn.co/mp3-preview/dd64cca26c69e93ea78f1fff2cc4889396bb6d2f',
          track_number: 1,
          type: 'track',
          uri: 'spotify:track:4i9sYtSIlR80bxje5B3rUb',
        },
      },
    ],
    limits: 100,
    next:
      'https://api.spotify.com/v1/users/spotify/playlists/59ZbFPES4DQwEjBpWHzrtC/tracks?offset=100&limit=100',
    offset: 0,
    previous: null,
    total: 105,
  },
  type: 'playlist',
  uri: 'spotify:user:spotify:playlist:59ZbFPES4DQwEjBpWHzrtC',
};

export const albumData: Album = {
  album_type: 'single',
  artists: [],
  release_date: '',
  release_date_precision: '',
  total_tracks: 1,
  external_urls: {
    spotify: 'https://open.spotify.com/album/5GWoXPsTQylMuaZ84PC563',
  },
  href: 'https://api.spotify.com/v1/albums/5GWoXPsTQylMuaZ84PC563',
  id: '5GWoXPsTQylMuaZ84PC563',
  images: [
    {
      height: 640,
      url: 'https://i.scdn.co/image/47421900e7534789603de84c03a40a826c058e45',
      width: 640,
    },
    {
      height: 300,
      url: 'https://i.scdn.co/image/0d447b6faae870f890dc5780cc58d9afdbc36a1d',
      width: 300,
    },
    {
      height: 64,
      url: 'https://i.scdn.co/image/d926b3e5f435ef3ac0874b1ff1571cf675b3ef3b',
      width: 64,
    },
  ],
  name: "I'm Not The Only One",
  type: 'album',
  uri: 'spotify:album:5GWoXPsTQylMuaZ84PC563',
};

export const trackData: Track = {
  album: {
    total_tracks: 1,
    album_type: 'single',
    artists: [
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/6sFIWsNpZYqfjUpaCgueju',
        },
        href: 'https://api.spotify.com/v1/artists/6sFIWsNpZYqfjUpaCgueju',
        id: '6sFIWsNpZYqfjUpaCgueju',
        name: 'Carly Rae Jepsen',
        type: 'artist',
        uri: 'spotify:artist:6sFIWsNpZYqfjUpaCgueju',
      },
    ],
    external_urls: {
      spotify: 'https://open.spotify.com/album/0tGPJ0bkWOUmH7MEOR77qc',
    },
    href: 'https://api.spotify.com/v1/albums/0tGPJ0bkWOUmH7MEOR77qc',
    id: '0tGPJ0bkWOUmH7MEOR77qc',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/966ade7a8c43b72faa53822b74a899c675aaafee',
        width: 640,
      },
      {
        height: 300,
        url: 'https://i.scdn.co/image/107819f5dc557d5d0a4b216781c6ec1b2f3c5ab2',
        width: 300,
      },
      {
        height: 64,
        url: 'https://i.scdn.co/image/5a73a056d0af707b4119a883d87285feda543fbb',
        width: 64,
      },
    ],
    name: 'Cut To The Feeling',
    release_date: '2017-05-26',
    release_date_precision: 'day',
    type: 'album',
    uri: 'spotify:album:0tGPJ0bkWOUmH7MEOR77qc',
  },
  artists: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/6sFIWsNpZYqfjUpaCgueju',
      },
      href: 'https://api.spotify.com/v1/artists/6sFIWsNpZYqfjUpaCgueju',
      id: '6sFIWsNpZYqfjUpaCgueju',
      name: 'Carly Rae Jepsen',
      type: 'artist',
      uri: 'spotify:artist:6sFIWsNpZYqfjUpaCgueju',
    },
  ],
  disc_number: 1,
  duration_ms: 207959,
  explicit: false,
  external_ids: {
    isrc: 'USUM71703861',
  },
  external_urls: {
    spotify: 'https://open.spotify.com/track/11dFghVXANMlKmJXsNCbNl',
  },
  href: 'https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl',
  id: '11dFghVXANMlKmJXsNCbNl',
  is_local: false,
  name: 'Cut To The Feeling',
  popularity: 63,
  preview_url:
    'https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86',
  track: true,
  track_number: 1,
  type: 'track',
  uri: 'spotify:track:11dFghVXANMlKmJXsNCbNl',
};
