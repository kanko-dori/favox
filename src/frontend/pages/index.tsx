import Header from '@/components/Header';
import Home from '@/components/Home';
import { useUser } from '@/lib/UserProvider';
import { useRouter } from 'next/router';

const Index: React.FC = () => {
  const router = useRouter();
  const user = useUser();
  if (user?.uid && typeof window !== 'undefined') router.replace('/my');

  return (
    <>
      <Header />
      <Home />
    </>
  );
};

export default Index;
