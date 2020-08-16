export interface Playlist {
  href: string;
  items: Item[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface Item {
  addedAt: Date;
  addedBy: AddedBy;
  isLocal: boolean;
  primaryColor: null;
  track: Track;
  videoThumbnail: VideoThumbnail;
}

export interface AddedBy {
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  type: Type;
  uri: string;
  name?: string;
}

export interface ExternalUrls {
  spotify: string;
}

export enum Type {
  Artist = 'artist',
  User = 'user',
}

export interface Track {
  album: Album;
  artists: AddedBy[];
  availableMarkets: string[];
  discNumber: number;
  durationMS: number;
  episode: boolean;
  explicit: boolean;
  externalIds: ExternalIDS;
  // eslint-disable-next-line camelcase
  external_urls: ExternalUrls;
  href: string;
  id: string;
  isLocal: boolean;
  name: string;
  popularity: number;
  previewUrl: string;
  track: boolean;
  trackNumber: number;
  type: string;
  uri: string;
}

export interface Album {
  albumType: string;
  artists: AddedBy[];
  availableMarkets: string[];
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  releaseDate: Date;
  releaseDatePrecision: string;
  totalTracks: number;
  type: string;
  uri: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface ExternalIDS {
  isrc: string;
}

export interface VideoThumbnail {
  url: null;
}
