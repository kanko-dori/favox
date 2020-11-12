import { login } from '@/lib/login';
import classes from './LoginButton.module.scss';

const LoginButton: React.FC = () => {
  return (
    <button onClick={login} className={classes.button}>
      Login with Spotify
    </button>
  );
};

export default LoginButton;
