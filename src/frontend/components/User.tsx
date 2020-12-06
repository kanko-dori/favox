import PlaylistItem from '@/components/PlaylistItem';
import UserInfo from '@/components/UserInfo';
import { useFirebase } from '@/lib/firebase';
import { useSpotifyToken } from '@/lib/spotify';
import { useEffect } from 'react';
import classes from './User.module.scss';

const User: React.FC = () => {
  const { auth, firestore } = useFirebase();
  const token = useSpotifyToken(firestore, auth?.currentUser?.uid);
  const playlists = ['My Playlist1', 'My Playlist2', '神曲'];

  useEffect(() => console.log({ token }), [token]);
  return (
    <article className={classes.container}>
      <UserInfo />
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist} name={playlist} />
      ))}
    </article>
  );
};

export default User;
