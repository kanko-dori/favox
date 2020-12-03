import Cover from '@/components/Cover';
import { Track } from '../../types';
import classes from './SongCovers.module.scss';

interface Props {
  songs: Track[];
}

const SongCovers: React.FC<Props> = (props: Props) => (
  <article className={classes.container}>
    {props.songs.map((song) => (
      <Cover key={song.id} track={song} />
    ))}
  </article>
);

export default SongCovers;
