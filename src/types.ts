import { DocumentReference, DocumentData } from '@google-cloud/firestore';

export type SpotifyIdMap = {
  spotifyId: string;
};

export type Users = {
  [uid: string]: User;
};

export type Playlists = {
  [playlistId: string]: Playlist;
};

export type Playlist = {
  id: string;
  name: string;
  description: string;
  owner: Owner;
  trackRefs: DocumentReference<DocumentData>[];
};

export type Tracks = {
  [trackId: string]: Track;
};

export type User = {
  uid: string[];
  playlists?: Playlists;
  accessToken: string;
  refreshToken: string;
};

export type Albums = {
  [albumId: string]: Album;
};

export type Album = {
  album_type: string;
  artists: Artist[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

type SpotifyPaging<T> = {
  href: string;
  items: T[];
  limits: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

export type SpotifyPlaylistsResponse = SpotifyPaging<SpotifyPlaylist>;

export type SpotifyPlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color?: null;
  public: boolean;
  snapshot_id: string;
  tracks: PlaylistTracks;
  type: string;
  uri: string;
};

export type PlaylistTracks = SpotifyPaging<PlaylistItem>;

export type PlaylistItem = {
  added_at: string;
  added_by: Owner;
  is_local: boolean;
  primary_color?: null;
  track: Track;
  trackRef?: string;
  video_thumbnail?: VideoThumbnail;
};

type VideoThumbnail = {
  url?: string;
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

type Followers = {
  href: null;
  total: number;
};

export type Image = {
  height: number;
  url: string;
  width: number;
  dominantColor: number;
};

export type Track = {
  album: SpotifyAlbum;
  albumRef?: DocumentReference<DocumentData>;
  artists: Owner[];
  disc_number: number;
  duration_ms: number;
  episode?: boolean;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local?: boolean;
  is_playable?: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track?: boolean;
  track_number: number;
  type: ownerType;
  uri: string;
  linked_from?: Owner;
};

export type SpotifyAlbum = {
  album_type: string;
  artists: Artist[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type ExternalUrls = {
  spotify: string;
};

type ExternalIDS = {
  isrc: string;
};

type Owner = {
  display_name?: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: ownerType;
  uri: string;
  name?: string;
};

type ownerType = 'artist' | 'track' | 'user';
