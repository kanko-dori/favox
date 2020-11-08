export type Users = {
  [uid: string]: User;
};

export type Playlists = {
  [playlistId: string]: Playlist;
};

export type Songs = {
  [songId: string]: Song;
};

export type User = {
  uid: string;
  playlists?: Playlists;
  accessToken: string;
  refreshToken: string;
};

export type Playlist = {
  playlistId: string;
  songs: Songs;
};

export type Song = {
  songId: string;
  title: string;
  artist: string;
  color: number; // e.g. 0xFF00FF
  coverUrl: string;
};

export type spotifyTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

export type SpotifyUserResponse = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: ExplicitContent;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
};

type ExplicitContent = {
  filter_enabled: boolean;
  filter_locked: boolean;
};

type ExternalUrls = {
  spotify: string;
};

type Followers = {
  href: null;
  total: number;
};

type Image = {
  height: null;
  url: string;
  width: null;
};
