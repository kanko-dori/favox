import UserIcon from '@/components/UserIcon';
import classes from './UserInfo.module.scss';

const UserInfo: React.FC = () => {
  const username = 'ssssota';
  return (
    <section className={classes.info}>
      <UserIcon />
      <h3>{username}</h3>
    </section>
  );
};

export default UserInfo;
