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
  twitterId: string;
  playlists: Playlists;
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
