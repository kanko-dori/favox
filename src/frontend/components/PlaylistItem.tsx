import { useFunctions } from '@/lib/firebase';
import { Playlist } from '@/lib/spotify';
import classes from './PlaylistItem.module.scss';

interface Props {
  playlist: Playlist;
}

const PlaylistItem: React.FC<Props> = ({ playlist }) => {
  const { saveSpotifyPlaylist } = useFunctions();
  return (
    <button
      className={classes.container}
      onClick={() => saveSpotifyPlaylist && saveSpotifyPlaylist({ playlistId: playlist.id })}
    >
      <h3>{playlist.name}</h3>
    </button>
  );
};

export default PlaylistItem;
