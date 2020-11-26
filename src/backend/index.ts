import express from 'express';
import * as functions from 'firebase-functions';
import next from 'next';

import { addSpotifyPlaylistHandler, spotifyCallbackHandler } from './handler';
import { Album, Playlist, SpotifyPlaylist, Track } from '../types';
import { saveAlbum, savePlaylist, saveTrack } from './lib/firestore';
import { fireStore } from './lib/firebase';

const server = express();
const nextjsServer = next({
  conf: { distDir: 'lib/next' },
});
const nextjsHandle = nextjsServer.getRequestHandler();

server.get('/save', async (req, res) => {
  const data = {
    collaborative: false,
    description: '',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/5lclPHYBPxhQnoPUkMjLKZ',
    },
    followers: {
      href: null,
      total: 0,
    },
    href: 'https://api.spotify.com/v1/playlists/5lclPHYBPxhQnoPUkMjLKZ',
    id: '5lclPHYBPxhQnoPUkMjLKZ',
    images: [
      {
        height: 640,
        url:
          'https://mosaic.scdn.co/640/ab67616d0000b27353172aaf6f532e9e45cbb841ab67616d0000b2736213519c04357a17331ba23cab67616d0000b27389e3b38cb86ef8cfb0cd8defab67616d0000b273b8785210c437d5a58506827b',
        width: 640,
      },
      {
        height: 300,
        url:
          'https://mosaic.scdn.co/300/ab67616d0000b27353172aaf6f532e9e45cbb841ab67616d0000b2736213519c04357a17331ba23cab67616d0000b27389e3b38cb86ef8cfb0cd8defab67616d0000b273b8785210c437d5a58506827b',
        width: 300,
      },
      {
        height: 60,
        url:
          'https://mosaic.scdn.co/60/ab67616d0000b27353172aaf6f532e9e45cbb841ab67616d0000b2736213519c04357a17331ba23cab67616d0000b27389e3b38cb86ef8cfb0cd8defab67616d0000b273b8785210c437d5a58506827b',
        width: 60,
      },
    ],
    name: 'test playlist',
    owner: {
      display_name: 'Takamichi Omori',
      external_urls: {
        spotify: 'https://open.spotify.com/user/merrytaka',
      },
      href: 'https://api.spotify.com/v1/users/merrytaka',
      id: 'merrytaka',
      type: 'user',
      uri: 'spotify:user:merrytaka',
    },
    primary_color: null,
    public: true,
    snapshot_id: 'MTIsMTZjZTJhMWIzMWRkNjY5NzY0YTQ1N2UwOTM0MWEyYTU5NzI2MGIwYw==',
    tracks: {
      href:
        'https://api.spotify.com/v1/playlists/5lclPHYBPxhQnoPUkMjLKZ/tracks?offset=0&limit=100&market=ES',
      items: [
        {
          added_at: '2020-11-17T13:01:24Z',
          added_by: {
            external_urls: {
              spotify: 'https://open.spotify.com/user/merrytaka',
            },
            href: 'https://api.spotify.com/v1/users/merrytaka',
            id: 'merrytaka',
            type: 'user',
            uri: 'spotify:user:merrytaka',
          },
          is_local: false,
          primary_color: null,
          track: {
            album: {
              album_type: 'single',
              artists: [
                {
                  external_urls: {
                    spotify: 'https://open.spotify.com/artist/6mEQK9m2krja6X1cfsAjfl',
                  },
                  href: 'https://api.spotify.com/v1/artists/6mEQK9m2krja6X1cfsAjfl',
                  id: '6mEQK9m2krja6X1cfsAjfl',
                  name: 'Ado',
                  type: 'artist',
                  uri: 'spotify:artist:6mEQK9m2krja6X1cfsAjfl',
                },
              ],
              external_urls: {
                spotify: 'https://open.spotify.com/album/5msh7Lspyh1jGbDM2BxwAy',
              },
              href: 'https://api.spotify.com/v1/albums/5msh7Lspyh1jGbDM2BxwAy',
              id: '5msh7Lspyh1jGbDM2BxwAy',
              images: [
                {
                  height: 640,
                  url: 'https://i.scdn.co/image/ab67616d0000b27389e3b38cb86ef8cfb0cd8def',
                  width: 640,
                },
                {
                  height: 300,
                  url: 'https://i.scdn.co/image/ab67616d00001e0289e3b38cb86ef8cfb0cd8def',
                  width: 300,
                },
                {
                  height: 64,
                  url: 'https://i.scdn.co/image/ab67616d0000485189e3b38cb86ef8cfb0cd8def',
                  width: 64,
                },
              ],
              name: 'うっせぇわ',
              release_date: '2020-10-23',
              release_date_precision: 'day',
              total_tracks: 1,
              type: 'album',
              uri: 'spotify:album:5msh7Lspyh1jGbDM2BxwAy',
            },
            artists: [
              {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/6mEQK9m2krja6X1cfsAjfl',
                },
                href: 'https://api.spotify.com/v1/artists/6mEQK9m2krja6X1cfsAjfl',
                id: '6mEQK9m2krja6X1cfsAjfl',
                name: 'Ado',
                type: 'artist',
                uri: 'spotify:artist:6mEQK9m2krja6X1cfsAjfl',
              },
            ],
            disc_number: 1,
            duration_ms: 204920,
            episode: false,
            explicit: false,
            external_ids: {
              isrc: 'JPPO02002791',
            },
            external_urls: {
              spotify: 'https://open.spotify.com/track/6EzZn96uOc9JsVGNRpx06n',
            },
            href: 'https://api.spotify.com/v1/tracks/6EzZn96uOc9JsVGNRpx06n',
            id: '6EzZn96uOc9JsVGNRpx06n',
            is_local: false,
            is_playable: true,
            name: 'うっせぇわ',
            popularity: 54,
            preview_url:
              'https://p.scdn.co/mp3-preview/87569a99561939258a638a70275b544d34526820?cid=774b29d4f13844c495f206cafdad9c86',
            track: true,
            track_number: 1,
            type: 'track',
            uri: 'spotify:track:6EzZn96uOc9JsVGNRpx06n',
          },
          video_thumbnail: {
            url: '',
          },
        },
        {
          added_at: '2020-11-17T13:01:32Z',
          added_by: {
            external_urls: {
              spotify: 'https://open.spotify.com/user/merrytaka',
            },
            href: 'https://api.spotify.com/v1/users/merrytaka',
            id: 'merrytaka',
            type: 'user',
            uri: 'spotify:user:merrytaka',
          },
          is_local: false,
          primary_color: null,
          track: {
            album: {
              album_type: 'single',
              artists: [
                {
                  external_urls: {
                    spotify: 'https://open.spotify.com/artist/7GLKth0GUYwTRUDm217DHO',
                  },
                  href: 'https://api.spotify.com/v1/artists/7GLKth0GUYwTRUDm217DHO',
                  id: '7GLKth0GUYwTRUDm217DHO',
                  name: 'SEVENTHLINKS',
                  type: 'artist',
                  uri: 'spotify:artist:7GLKth0GUYwTRUDm217DHO',
                },
              ],
              external_urls: {
                spotify: 'https://open.spotify.com/album/4E0i4QbdgFbmaVgKX8H5k4',
              },
              href: 'https://api.spotify.com/v1/albums/4E0i4QbdgFbmaVgKX8H5k4',
              id: '4E0i4QbdgFbmaVgKX8H5k4',
              images: [
                {
                  height: 640,
                  url: 'https://i.scdn.co/image/ab67616d0000b273620b3a2bb3216b6d772923bd',
                  width: 640,
                },
                {
                  height: 300,
                  url: 'https://i.scdn.co/image/ab67616d00001e02620b3a2bb3216b6d772923bd',
                  width: 300,
                },
                {
                  height: 64,
                  url: 'https://i.scdn.co/image/ab67616d00004851620b3a2bb3216b6d772923bd',
                  width: 64,
                },
              ],
              name: 'p.h.',
              release_date: '2020-10-16',
              release_date_precision: 'day',
              total_tracks: 1,
              type: 'album',
              uri: 'spotify:album:4E0i4QbdgFbmaVgKX8H5k4',
            },
            artists: [
              {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/7GLKth0GUYwTRUDm217DHO',
                },
                href: 'https://api.spotify.com/v1/artists/7GLKth0GUYwTRUDm217DHO',
                id: '7GLKth0GUYwTRUDm217DHO',
                name: 'SEVENTHLINKS',
                type: 'artist',
                uri: 'spotify:artist:7GLKth0GUYwTRUDm217DHO',
              },
            ],
            disc_number: 1,
            duration_ms: 155429,
            episode: false,
            explicit: false,
            external_ids: {
              isrc: 'TCJPM2076635',
            },
            external_urls: {
              spotify: 'https://open.spotify.com/track/3v2NjvCyS5USfJU1EFHUst',
            },
            href: 'https://api.spotify.com/v1/tracks/3v2NjvCyS5USfJU1EFHUst',
            id: '3v2NjvCyS5USfJU1EFHUst',
            is_local: false,
            is_playable: true,
            linked_from: {
              external_urls: {
                spotify: 'https://open.spotify.com/track/3WxlfdEj9jL5PQiyFfQvcM',
              },
              href: 'https://api.spotify.com/v1/tracks/3WxlfdEj9jL5PQiyFfQvcM',
              id: '3WxlfdEj9jL5PQiyFfQvcM',
              type: 'track',
              uri: 'spotify:track:3WxlfdEj9jL5PQiyFfQvcM',
            },
            name: 'p.h.',
            popularity: 31,
            preview_url:
              'https://p.scdn.co/mp3-preview/c4604303adedc7c90f9663881422cfe25cc46a14?cid=774b29d4f13844c495f206cafdad9c86',
            track: true,
            track_number: 1,
            type: 'track',
            uri: 'spotify:track:3v2NjvCyS5USfJU1EFHUst',
          },
          video_thumbnail: {
            url: null,
          },
        },
        {
          added_at: '2020-11-17T13:01:44Z',
          added_by: {
            external_urls: {
              spotify: 'https://open.spotify.com/user/merrytaka',
            },
            href: 'https://api.spotify.com/v1/users/merrytaka',
            id: 'merrytaka',
            type: 'user',
            uri: 'spotify:user:merrytaka',
          },
          is_local: false,
          primary_color: null,
          track: {
            album: {
              album_type: 'single',
              artists: [
                {
                  external_urls: {
                    spotify: 'https://open.spotify.com/artist/7kOrrFIBIBc8uCu2zbxbLv',
                  },
                  href: 'https://api.spotify.com/v1/artists/7kOrrFIBIBc8uCu2zbxbLv',
                  id: '7kOrrFIBIBc8uCu2zbxbLv',
                  name: 'yama',
                  type: 'artist',
                  uri: 'spotify:artist:7kOrrFIBIBc8uCu2zbxbLv',
                },
              ],
              external_urls: {
                spotify: 'https://open.spotify.com/album/002POSVXei4zFN5FDF0YqQ',
              },
              href: 'https://api.spotify.com/v1/albums/002POSVXei4zFN5FDF0YqQ',
              id: '002POSVXei4zFN5FDF0YqQ',
              images: [
                {
                  height: 640,
                  url: 'https://i.scdn.co/image/ab67616d0000b273cccf5d223349faaca1c9a1b9',
                  width: 640,
                },
                {
                  height: 300,
                  url: 'https://i.scdn.co/image/ab67616d00001e02cccf5d223349faaca1c9a1b9',
                  width: 300,
                },
                {
                  height: 64,
                  url: 'https://i.scdn.co/image/ab67616d00004851cccf5d223349faaca1c9a1b9',
                  width: 64,
                },
              ],
              name: 'Haru wo Tsugeru',
              release_date: '2020-04-17',
              release_date_precision: 'day',
              total_tracks: 1,
              type: 'album',
              uri: 'spotify:album:002POSVXei4zFN5FDF0YqQ',
            },
            artists: [
              {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/7kOrrFIBIBc8uCu2zbxbLv',
                },
                href: 'https://api.spotify.com/v1/artists/7kOrrFIBIBc8uCu2zbxbLv',
                id: '7kOrrFIBIBc8uCu2zbxbLv',
                name: 'yama',
                type: 'artist',
                uri: 'spotify:artist:7kOrrFIBIBc8uCu2zbxbLv',
              },
            ],
            disc_number: 1,
            duration_ms: 196497,
            episode: false,
            explicit: false,
            external_ids: {
              isrc: 'TCJPK2087568',
            },
            external_urls: {
              spotify: 'https://open.spotify.com/track/5QseXDzPvtjdeaWNhYbm0m',
            },
            href: 'https://api.spotify.com/v1/tracks/5QseXDzPvtjdeaWNhYbm0m',
            id: '5QseXDzPvtjdeaWNhYbm0m',
            is_local: false,
            is_playable: true,
            linked_from: {
              external_urls: {
                spotify: 'https://open.spotify.com/track/2Gmyw5Vg2X5YW2lM3OC7nD',
              },
              href: 'https://api.spotify.com/v1/tracks/2Gmyw5Vg2X5YW2lM3OC7nD',
              id: '2Gmyw5Vg2X5YW2lM3OC7nD',
              type: 'track',
              uri: 'spotify:track:2Gmyw5Vg2X5YW2lM3OC7nD',
            },
            name: 'Haru wo Tsugeru',
            popularity: 61,
            preview_url:
              'https://p.scdn.co/mp3-preview/c76d1b570de6673599716969c5a7690083064399?cid=774b29d4f13844c495f206cafdad9c86',
            track: true,
            track_number: 1,
            type: 'track',
            uri: 'spotify:track:5QseXDzPvtjdeaWNhYbm0m',
          },
          video_thumbnail: {
            url: null,
          },
        },
        {
          added_at: '2020-11-17T13:01:48Z',
          added_by: {
            external_urls: {
              spotify: 'https://open.spotify.com/user/merrytaka',
            },
            href: 'https://api.spotify.com/v1/users/merrytaka',
            id: 'merrytaka',
            type: 'user',
            uri: 'spotify:user:merrytaka',
          },
          is_local: false,
          primary_color: null,
          track: {
            album: {
              album_type: 'single',
              artists: [
                {
                  external_urls: {
                    spotify: 'https://open.spotify.com/artist/7rpKUJ0AnklJ8q9nIPVSpZ',
                  },
                  href: 'https://api.spotify.com/v1/artists/7rpKUJ0AnklJ8q9nIPVSpZ',
                  id: '7rpKUJ0AnklJ8q9nIPVSpZ',
                  name: 'Reol',
                  type: 'artist',
                  uri: 'spotify:artist:7rpKUJ0AnklJ8q9nIPVSpZ',
                },
              ],
              external_urls: {
                spotify: 'https://open.spotify.com/album/6CTOnVKQhpsL1NeJQ3XyXF',
              },
              href: 'https://api.spotify.com/v1/albums/6CTOnVKQhpsL1NeJQ3XyXF',
              id: '6CTOnVKQhpsL1NeJQ3XyXF',
              images: [
                {
                  height: 640,
                  url: 'https://i.scdn.co/image/ab67616d0000b27353172aaf6f532e9e45cbb841',
                  width: 640,
                },
                {
                  height: 300,
                  url: 'https://i.scdn.co/image/ab67616d00001e0253172aaf6f532e9e45cbb841',
                  width: 300,
                },
                {
                  height: 64,
                  url: 'https://i.scdn.co/image/ab67616d0000485153172aaf6f532e9e45cbb841',
                  width: 64,
                },
              ],
              name: '第六感',
              release_date: '2020-07-27',
              release_date_precision: 'day',
              total_tracks: 1,
              type: 'album',
              uri: 'spotify:album:6CTOnVKQhpsL1NeJQ3XyXF',
            },
            artists: [
              {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/7rpKUJ0AnklJ8q9nIPVSpZ',
                },
                href: 'https://api.spotify.com/v1/artists/7rpKUJ0AnklJ8q9nIPVSpZ',
                id: '7rpKUJ0AnklJ8q9nIPVSpZ',
                name: 'Reol',
                type: 'artist',
                uri: 'spotify:artist:7rpKUJ0AnklJ8q9nIPVSpZ',
              },
            ],
            disc_number: 1,
            duration_ms: 191624,
            episode: false,
            explicit: false,
            external_ids: {
              isrc: 'JPVI02001689',
            },
            external_urls: {
              spotify: 'https://open.spotify.com/track/22sQUmLhT8umlEhQzDrzfJ',
            },
            href: 'https://api.spotify.com/v1/tracks/22sQUmLhT8umlEhQzDrzfJ',
            id: '22sQUmLhT8umlEhQzDrzfJ',
            is_local: false,
            is_playable: true,
            name: '第六感',
            popularity: 67,
            preview_url:
              'https://p.scdn.co/mp3-preview/f127e95dcc70be25b558a0d4a42e70ef53edb7a5?cid=774b29d4f13844c495f206cafdad9c86',
            track: true,
            track_number: 1,
            type: 'track',
            uri: 'spotify:track:22sQUmLhT8umlEhQzDrzfJ',
          },
          video_thumbnail: {
            url: null,
          },
        },
        {
          added_at: '2020-11-17T13:02:01Z',
          added_by: {
            external_urls: {
              spotify: 'https://open.spotify.com/user/merrytaka',
            },
            href: 'https://api.spotify.com/v1/users/merrytaka',
            id: 'merrytaka',
            type: 'user',
            uri: 'spotify:user:merrytaka',
          },
          is_local: false,
          primary_color: null,
          track: {
            album: {
              album_type: 'single',
              artists: [
                {
                  external_urls: {
                    spotify: 'https://open.spotify.com/artist/1k5LyiTCRzPjORzcgHqJxF',
                  },
                  href: 'https://api.spotify.com/v1/artists/1k5LyiTCRzPjORzcgHqJxF',
                  id: '1k5LyiTCRzPjORzcgHqJxF',
                  name: 'Kanaria',
                  type: 'artist',
                  uri: 'spotify:artist:1k5LyiTCRzPjORzcgHqJxF',
                },
              ],
              external_urls: {
                spotify: 'https://open.spotify.com/album/55F9mwBpB9DRA9g52b8ZGJ',
              },
              href: 'https://api.spotify.com/v1/albums/55F9mwBpB9DRA9g52b8ZGJ',
              id: '55F9mwBpB9DRA9g52b8ZGJ',
              images: [
                {
                  height: 640,
                  url: 'https://i.scdn.co/image/ab67616d0000b27309d2915d50e59087f339c17b',
                  width: 640,
                },
                {
                  height: 300,
                  url: 'https://i.scdn.co/image/ab67616d00001e0209d2915d50e59087f339c17b',
                  width: 300,
                },
                {
                  height: 64,
                  url: 'https://i.scdn.co/image/ab67616d0000485109d2915d50e59087f339c17b',
                  width: 64,
                },
              ],
              name: 'KING',
              release_date: '2020-08-01',
              release_date_precision: 'day',
              total_tracks: 1,
              type: 'album',
              uri: 'spotify:album:55F9mwBpB9DRA9g52b8ZGJ',
            },
            artists: [
              {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/1k5LyiTCRzPjORzcgHqJxF',
                },
                href: 'https://api.spotify.com/v1/artists/1k5LyiTCRzPjORzcgHqJxF',
                id: '1k5LyiTCRzPjORzcgHqJxF',
                name: 'Kanaria',
                type: 'artist',
                uri: 'spotify:artist:1k5LyiTCRzPjORzcgHqJxF',
              },
            ],
            disc_number: 1,
            duration_ms: 134750,
            episode: false,
            explicit: false,
            external_ids: {
              isrc: 'JPX562000062',
            },
            external_urls: {
              spotify: 'https://open.spotify.com/track/1y70lFnhDN7rPmrl15BtPd',
            },
            href: 'https://api.spotify.com/v1/tracks/1y70lFnhDN7rPmrl15BtPd',
            id: '1y70lFnhDN7rPmrl15BtPd',
            is_local: false,
            is_playable: true,
            linked_from: {
              external_urls: {
                spotify: 'https://open.spotify.com/track/5lojBXokpBOfuTDly9Bksx',
              },
              href: 'https://api.spotify.com/v1/tracks/5lojBXokpBOfuTDly9Bksx',
              id: '5lojBXokpBOfuTDly9Bksx',
              type: 'track',
              uri: 'spotify:track:5lojBXokpBOfuTDly9Bksx',
            },
            name: 'KING',
            popularity: 45,
            preview_url:
              'https://p.scdn.co/mp3-preview/815b3174c42dfc33e079a6b46c56adfe5da04b17?cid=774b29d4f13844c495f206cafdad9c86',
            track: true,
            track_number: 1,
            type: 'track',
            uri: 'spotify:track:1y70lFnhDN7rPmrl15BtPd',
          },
          video_thumbnail: {
            url: null,
          },
        },
      ],
      limit: 100,
      next: null,
      offset: 0,
      previous: null,
      total: 5,
    },
    type: 'playlist',
    uri: 'spotify:playlist:5lclPHYBPxhQnoPUkMjLKZ',
  } as SpotifyPlaylist;
  const tracks = data.tracks.items.map((item) => item.track);
  const albums = tracks.map((track) => track.album);

  const saveAlbumPromises = albums.map(saveAlbum);
  await Promise.all(saveAlbumPromises);
  tracks.forEach((track) => {
    track.albumRef = fireStore.doc(`Albums/${track.album.id}`);
  });

  const saveTrackPromises = tracks.map(saveTrack);
  await Promise.all(saveTrackPromises);

  data.songRef = (data.tracks.items.map((item) => {
    console.log(`ref: Tracks/${item.track.id}`);
    return fireStore.doc(`Tracks/${item.track.id}`);
  }) as unknown) as Track[];

  const playlist: Playlist = {
    id: data.id,
    songRef: data.songRef,
  };

  await savePlaylist(playlist);
  res.send('done');
});

server.get('/getData', async (req, res) => {
  const playlistRef = fireStore.doc('Playlists/5lclPHYBPxhQnoPUkMjLKZ');
  const playlistDoc = await playlistRef.get();
  const playlist = playlistDoc.data() as Playlist;

  const songDocs = await Promise.all(playlist.songRef.map((ref) => ref.get()));
  playlist.songs = songDocs.map((songDoc) => songDoc.data()) as Track[];

  // const playlists = [];
  // for (let i = 0; i < playlist.songs.length; i++) {
  //   if (playlist.songs[i] === undefined) {
  //     return;
  //   }
  //   const albumDoc = await playlist.songs[i]?.albumRef.get();
  //   playlists.push(albumDoc?.data() as SpotifyPlaylist);
  //   playlist.songs[i].album = albumDoc?.data() as SpotifyAlbum;
  // }

  res.send(playlist);
});

server.get('/callback', spotifyCallbackHandler);
server.all('/**', (req, res, next) => {
  nextjsServer
    .prepare()
    .then(() => nextjsHandle(req, res))
    .then(next);
});

export const app = functions.https.onRequest(server);

export const saveSpotifyPlaylist = functions.https.onCall(addSpotifyPlaylistHandler);

export const generateDomonantColor = functions.firestore
  .document('albums/{songId}')
  .onCreate((change) => {
    const album = change.data() as Album;
    console.log(album.images);
    return album.images[0];
  });
