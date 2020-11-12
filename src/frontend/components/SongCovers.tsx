import Cover from '@/components/Cover';
import { Song } from '../../types';
import classes from './SongCovers.module.scss';

interface Props {
  songs: Song[];
}

const SongCovers: React.FC<Props> = (props: Props) => (
  <article className={classes.container}>
    {props.songs.map((song) => (
      <Cover key={song.songId} song={song} />
    ))}
  </article>
);

export default SongCovers;
