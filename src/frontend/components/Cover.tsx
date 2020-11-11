import { Song } from '../../types';
import classes from './Cover.module.scss';
import SongController from './SongController';

interface Props {
  song: Song;
}

const Cover: React.FC<Props> = ({ song }) => {
  return (
    <section
      title={song.title}
      className={classes.container}
      style={{
        backgroundColor: `#${song.color.toString(16)}`,
      }}
    >
      <div className={`playing ${classes.progress}`} />
      <img className={classes.cover} src={song.coverUrl} alt="cover" />
      <SongController />
    </section>
  );
};

export default Cover;
