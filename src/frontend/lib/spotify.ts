import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { SpotifyIdMap, SpotifyPlaylistsResponse, SpotifyUserResponse, User } from '../../types';

const spotifyApiEndpoint = 'https://api.spotify.com';
const bearer = (token: string): string => `Bearer ${token}`;

export const useSpotifyToken = (
  firestore: firebase.firestore.Firestore | null,
  uid?: string
): string => {
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!firestore || !uid) return;
    firestore
      .collection('SpotifyIdMap')
      .doc(uid)
      .get()
      .then((snap) => snap.data() as SpotifyIdMap)
      .then(({ spotifyId }) => firestore.collection('Users').doc(spotifyId).get())
      .then((snap) => snap.data() as User)
      .then(({ accessToken }) => setToken(accessToken))
      .catch(console.error);
  }, [firestore, uid]);

  return token;
};

export type SpotifyUser = {
  name: string;
  image?: string;
};

export const useSpotifyUser = (token: string): SpotifyUser | undefined => {
  const [user, setUser] = useState<SpotifyUser | undefined>();

  useEffect(() => {
    if (token === '') return;
    fetch(`${spotifyApiEndpoint}/v1/me`, {
      headers: { Authorization: bearer(token) },
    })
      .then((res) => res.json() as Promise<SpotifyUserResponse>)
      .then((user) =>
        setUser({
          name: user.display_name,
          image: user.images[0]?.url,
        })
      )
      .catch(console.error);
  }, [token]);

  return user;
};

export type Playlist = {
  id: string;
  name: string;
};

export const usePlaylists = (token: string): Playlist[] => {
  const [playlistPage, setPlaylistPage] = useState<{
    next: string | null;
    playlists: Playlist[];
  }>({
    next: `${spotifyApiEndpoint}/v1/me/playlists`,
    playlists: [],
  });

  useEffect(() => {
    if (token === '') return;
    if (playlistPage.next == null) return;

    fetch(playlistPage.next, {
      headers: { Authorization: bearer(token) },
    })
      .then((res) => res.json() as Promise<SpotifyPlaylistsResponse>)
      .then((page) => {
        setPlaylistPage({
          next: page.next,
          playlists: [
            ...playlistPage.playlists,
            ...page.items.map((playlist) => ({
              id: playlist.id,
              name: playlist.name,
            })),
          ],
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, playlistPage]);

  return playlistPage.playlists;
};
