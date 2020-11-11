import Header from '@/components/Header';
import User from '@/components/User';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/router';

const MyPage: React.FC = () => {
  const router = useRouter();
  if (!auth?.currentUser?.uid && typeof window !== 'undefined') router.replace('/');
  return (
    <>
      <Header />
      <User />
    </>
  );
};

export default MyPage;
