import Header from '@/components/Header';
import User from '@/components/User';
import { useUser } from '@/lib/UserProvider';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MyPage: React.FC = () => {
  const router = useRouter();
  const user = useUser();
  useEffect(() => {
    if (!user?.uid && typeof window !== 'undefined') router.replace('/');
  }, [router, user]);

  return (
    <>
      <Header />
      <User />
    </>
  );
};

export default MyPage;
