import firebase from 'firebase/app';

export const login = (auth: firebase.auth.Auth | null): void => {
  if (!auth) throw new Error('Firebase is not initialized');
  auth.signInAnonymously().then(() => {
    openSpotifyLoginPage(auth.currentUser.uid);
  });
};

export const openSpotifyLoginPage = (uid: string): void => {
  const url = new URL('https://accounts.spotify.com/authorize');
  url.searchParams.set('client_id', '8c086f866655424db67aa2817d5ae0e9');
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('redirect_uri', `${location.origin}/callback`);
  url.searchParams.set('state', uid);
  url.searchParams.set('scope', 'user-read-private user-read-email');
  location.href = url.href;
};
