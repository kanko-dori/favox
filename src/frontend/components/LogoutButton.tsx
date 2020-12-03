import { useFirebase } from '@/lib/firebase';
import { logout } from '@/lib/auth';

const LogoutButton: React.FC = () => {
  const { auth } = useFirebase();
  const logoutWithFirebase = (): Promise<void> => logout(auth);
  return (
    <button onClick={logoutWithFirebase}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="100px"
        height="100px"
        stroke="#cccccc"
        fill="none"
        strokeWidth="5px"
      >
        <path d="M 60,20 L 25,20 L 25,80 L 60,80" />
        <path d="M 45,50 L 80,50" />
        <path d="M 65,35 L 80,50 L 65,65" />
      </svg>
    </button>
  );
};

export default LogoutButton;
