import Header from '@/components/Header';
import Home from '@/components/Home';
import { useUser } from '@/lib/UserProvider';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Index: React.FC = () => {
  const router = useRouter();
  const user = useUser();
  useEffect(() => {
    if (user?.uid && typeof window !== 'undefined') router.replace('/my');
  }, [router, user]);

  return (
    <>
      <Header />
      <Home />
    </>
  );
};

export default Index;
