import { useFirebase } from '@/lib/firebase';
import { logout } from '@/lib/auth';

const LogoutButton: React.FC = () => {
  const { auth } = useFirebase();
  const logoutWithFirebase = (): Promise<void> => logout(auth);
  return <button onClick={logoutWithFirebase}>Login with Spotify</button>;
};

export default LogoutButton;
