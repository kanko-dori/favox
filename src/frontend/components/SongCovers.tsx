import Cover from '@/components/Cover';
import { Songs } from '../../types';

interface Props {
  songs: Songs;
}

const SongCovers: React.FC<Props> = (props: Props) => (
  <>
    {Object.entries(props.songs).map(([id, song]) => (
      <Cover key={id} song={song} />
    ))}
  </>
);

export default SongCovers;
