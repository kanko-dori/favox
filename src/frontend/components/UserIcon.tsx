import classes from './UserIcon.module.scss';

interface Props {
  url?: string;
}

const UserIcon: React.FC<Props> = ({ url }) => (
  <img className={classes.icon} src={url ?? '/images/dummyicon.svg'} alt="user icon" />
);
export default UserIcon;
