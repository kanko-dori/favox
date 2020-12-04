import Header from '@/components/Header';
import TrackCovers from '@/components/TrackCovers';
import { useRouter } from 'next/router';

const Playlist: React.FC = () => {
  const router = useRouter();
  const { playlistId } = router.query;
  const tracks = [];

  return (
    <>
      <Header />
      <TrackCovers tracks={tracks} />
    </>
  );
};

export default Playlist;
