import Header from '@/components/Header';
import User from '@/components/User';
import { useUser } from '@/lib/UserProvider';
import { useRouter } from 'next/router';

const MyPage: React.FC = () => {
  const router = useRouter();
  const user = useUser();
  if (!user?.uid && typeof window !== 'undefined') router.replace('/');
  return (
    <>
      <Header />
      <User />
    </>
  );
};

export default MyPage;
