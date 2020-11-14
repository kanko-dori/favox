import UserInfo from '@/components/UserInfo';
import PlaylistItem from '@/components/PlaylistItem';
import classes from './User.module.scss';

const User: React.FC = () => {
  const playlists = ['My Playlist1', 'My Playlist2', '神曲'];
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
