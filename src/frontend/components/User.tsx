import PlaylistItem from '@/components/PlaylistItem';
import UserInfo from '@/components/UserInfo';
import { useFirebase } from '@/lib/firebase';
import { usePlaylists, useSpotifyToken, useSpotifyUser } from '@/lib/spotify';
import classes from './User.module.scss';

const User: React.FC = () => {
  const { auth, firestore } = useFirebase();
  const token = useSpotifyToken(firestore, auth?.currentUser?.uid);
  const user = useSpotifyUser(token);
  const playlists = usePlaylists(token);

  return (
    <article className={classes.container}>
      <UserInfo user={user} />
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </article>
  );
};

export default User;
