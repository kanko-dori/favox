import { Track } from '../../types';
import classes from './Cover.module.scss';
import SongController from './SongController';

interface Props {
  track: Track;
}

const Cover: React.FC<Props> = ({ track }) => {
  return (
    <section
      title={track.name}
      className={classes.container}
      style={{
        backgroundColor: `#${track.album.images[0].dominantColor.toString(16)}`,
      }}
    >
      <div className={`playing ${classes.progress}`} />
      <img className={classes.cover} src={track.album.images[0].url} alt="cover" />
      <SongController />
    </section>
  );
};

export default Cover;
