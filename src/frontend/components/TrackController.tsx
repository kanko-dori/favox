import { useEffect, useRef, useState } from 'react';
import PlayButton from './PlayButton';
import classes from './TrackController.module.scss';

type Props = {
  audioSrc: string;
};

const DEFAULT_DURATION = 30;

const TrackController: React.FC<Props> = ({ audioSrc }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElm = audioRef.current;
    if (!audioElm) return;
    if (!playing) {
      audioElm.pause();
      return;
    }
    audioElm.currentTime = 0;
    audioElm.play();
    audioElm.addEventListener('ended', () => setPlaying(false));

    return () => audioElm.removeEventListener('ended', () => setPlaying(false));
  }, [playing]);

  return (
    <div className={classes.container}>
      {playing && (
        <div
          className={classes.progress}
          style={{
            animationDuration: `${audioRef.current?.duration ?? DEFAULT_DURATION}s`,
          }}
        />
      )}
      <PlayButton playing={playing} onClick={() => setPlaying(!playing)} />
      <audio className={classes.audio} ref={audioRef} src={audioSrc}>
        <track kind="captions" />
      </audio>
    </div>
  );
};

export default TrackController;
