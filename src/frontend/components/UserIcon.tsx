import classes from './UserIcon.module.scss';

const UserIcon: React.FC = () => {
  const imageUrl = 'https://pbs.twimg.com/profile_images/1317017420192653314/0jh1tG2D_400x400.jpg';

  return <img className={classes.icon} src={imageUrl} alt="user icon" />;
};

export default UserIcon;
