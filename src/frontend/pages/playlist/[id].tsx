import Header from '@/components/Header';
import TrackCovers from '@/components/TrackCovers';
import { firestore } from 'firebase-admin';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { Track, Playlist } from '../../../types';

type Props = {
  error?: Error;
  tracks: Track[];
};

export const getServerSideProps: GetServerSideProps = async (
  ctx
): Promise<GetServerSidePropsResult<Props>> => {
  const id = ctx.params?.id;
  if (typeof id !== 'string') return Promise.reject(new Error('Invalid URL'));
  return firestore()
    .collection('Playlists')
    .doc(id)
    .get()
    .then((snap) => {
      const playlist = snap.data() as Playlist | undefined;
      const trackRefs = playlist?.trackRefs;
      if (!trackRefs) return Promise.reject(new Error('Playlist has no track'));
      return Promise.all(
        trackRefs.map((trackRef) => trackRef.get().then((snap) => snap.data() as Track | undefined))
      );
    })
    .then((tracks) => ({
      props: {
        tracks: tracks.filter((track): track is Track => track != null),
      },
    }))
    .catch((error) => {
      console.error(error);
      return {
        props: { error, tracks: [] },
      };
    });
};

  return (
    <>
      <Header />
      <TrackCovers tracks={tracks} />
    </>
  );
};

export default Playlist;
