import { Track } from '../../types';
import classes from './Cover.module.scss';
import TrackController from './TrackController';

interface Props {
  track: Track;
}

const Cover: React.FC<Props> = ({ track }) => {
  const color = track.album.images[0].dominantColor ?? 0xffffff;
  return (
    <section
      title={track.name}
      className={classes.container}
      style={{
        backgroundColor: `#${color.toString(16)}`,
      }}
    >
      <div className={`playing ${classes.progress}`} />
      <img className={classes.cover} src={track.album.images[0].url} alt="cover" />
      <TrackController />
    </section>
  );
};

export default Cover;
