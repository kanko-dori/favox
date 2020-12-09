import UserIcon from '@/components/UserIcon';
import classes from './UserInfo.module.scss';
import { SpotifyUser } from '@/lib/spotify';

interface Props {
  user?: SpotifyUser;
}

const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <section className={classes.info}>
      <UserIcon url={user?.image} />
      <h3>{user?.name}</h3>
    </section>
  );
};

export default UserInfo;
