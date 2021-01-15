import { useFirebase } from '@/lib/firebase';
import { numToHexColor } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Album, Track } from '../../types';
import classes from './Cover.module.scss';
import TrackController from './TrackController';

interface Props {
  track: Track;
}

const Cover: React.FC<Props> = ({ track }) => {
  const [color, setColor] = useState('#f5f5f5');
  const { firestore } = useFirebase();
  const delay = Math.random() * 2;

  useEffect(() => {
    const albumRef = firestore?.collection('Albums').doc(track.album.id);
    return albumRef?.onSnapshot((snap) => {
      const album = snap.data() as Album | undefined;
      const colorNum = album?.images[0].dominantColor;
      if (!colorNum) return;
      try {
        setColor(numToHexColor(colorNum));
      } catch (e) {
        console.error(e);
      }
    });
  }, [firestore, track.album.id]);

  return (
    <section
      title={track.name}
      className={classes.container}
      style={{ backgroundColor: color, transitionDelay: `${delay}s` }}
    >
      <img className={classes.cover} src={track.album.images[0].url} alt="cover" />
      <TrackController audioSrc={track.preview_url} />
    </section>
  );
};

export default Cover;
