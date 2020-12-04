import { useFirebase } from '@/lib/firebase';
import { login } from '@/lib/auth';
import classes from './LoginButton.module.scss';

const LoginButton: React.FC = () => {
  const { auth } = useFirebase();
  const loginWithFirebase = (): void => login(auth);
  return (
    <button onClick={loginWithFirebase} className={classes.button}>
      Login with Spotify
    </button>
  );
};

export default LoginButton;
