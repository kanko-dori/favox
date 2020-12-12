import { useFirebase, useFunctions } from '@/lib/firebase';
import { Playlist } from '@/lib/spotify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import classes from './PlaylistItem.module.scss';

interface Props {
  playlist: Playlist;
}

const PlaylistItem: React.FC<Props> = ({ playlist }) => {
  const router = useRouter();
  const { firestore } = useFirebase();
  const { saveSpotifyPlaylist } = useFunctions();
  const [playlistStatus, setPlaylistStatus] = useState<'pending' | 'unregistered' | 'registered'>(
    'pending'
  );
  const changeStatus = (registered: boolean): void =>
    setPlaylistStatus(registered ? 'registered' : 'unregistered');

  useEffect(() => {
    if (firestore == null) return;
    const playlistDocRef = firestore.collection('Playlists').doc(playlist.id);
    const unsubscribeHandler = playlistDocRef.onSnapshot((snap) => changeStatus(snap.exists));
    return unsubscribeHandler;
  }, [firestore, playlist.id]);

  const onClick = (): void => {
    switch (playlistStatus) {
      case 'pending':
        break;
      case 'registered':
        router.push(`/playlist/${playlist.id}`);
        break;
      case 'unregistered':
        if (!saveSpotifyPlaylist) break;
        saveSpotifyPlaylist({ playlistId: playlist.id });
        setPlaylistStatus('pending');
        break;
    }
  };

  return (
    <button className={classes.container} onClick={onClick}>
      <h3>
        {playlistStatus === 'pending' && (
          <img src="/images/loading.svg" alt="loading" className={classes.loading} />
        )}
        {playlistStatus === 'registered' && <img src="/images/registered.svg" alt="registered" />}
        {playlistStatus === 'unregistered' && (
          <img src="/images/unregistered.svg" alt="unregistered" />
        )}
        {' ' + playlist.name}
      </h3>
    </button>
  );
};

export default PlaylistItem;
