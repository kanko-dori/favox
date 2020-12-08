import Header from '@/components/Header';
import TrackCovers from '@/components/TrackCovers';
import { Track } from '../../../types';

const Playlist: React.FC = () => {
  const tracks: Track[] = [];

  return (
    <>
      <Header />
      <TrackCovers tracks={tracks} />
    </>
  );
};

export default Playlist;
