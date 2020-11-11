import Header from '@/components/Header';
import Home from '@/components/Home';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/router';

const Index: React.FC = () => {
  const router = useRouter();
  if (auth?.currentUser?.uid && typeof window !== 'undefined') router.replace('/my');

  return (
    <>
      <Header />
      <Home />
    </>
  );
};

export default Index;
