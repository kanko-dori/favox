import Header from '@/components/Header';
import SongCovers from '@/components/SongCovers';
import { useRouter } from 'next/router';

const Playlist: React.FC = () => {
  const router = useRouter();
  const { playlistId } = router.query;

  return (
    <>
      <Header />
      <SongCovers songs={{}} />
    </>
  );
};

export default Playlist;
