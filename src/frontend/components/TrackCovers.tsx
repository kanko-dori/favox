import Cover from '@/components/Cover';
import { Track } from '../../types';
import classes from './TrackCovers.module.scss';

interface Props {
  tracks: Track[];
}

const TrackCovers: React.FC<Props> = (props: Props) => (
  <article className={classes.container}>
    {props.tracks.map((track) => (
      <Cover key={track.id} track={track} />
    ))}
  </article>
);

export default TrackCovers;
