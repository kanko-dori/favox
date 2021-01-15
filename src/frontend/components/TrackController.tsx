import { useEffect, useRef, useState } from 'react';
import classes from './TrackController.module.scss';

type Props = {
  audioSrc: string;
};

const TrackController: React.FC<Props> = ({ audioSrc }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElm = audioRef.current;
    if (!audioElm) return;
    if (playing) {
      audioElm.currentTime = 0;
      audioElm.play();
      setTimeout(() => setPlaying(false), 30 * 1100);
    } else {
      audioElm.pause();
    }
  }, [playing]);

  return (
    <div className={classes.container}>
      <div className={`${playing ? classes.playing : ''} ${classes.progress}`} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100px"
        height="100px"
        viewBox="0 0 100 100"
        onClick={() => setPlaying(!playing)}
      >
        {!playing ? (
          <path d="M 13.4,0 L 100,50 L 13.4,100 z" />
        ) : (
          <>
            <path d="M 10,0 l 20,0 l 0,100 l -20,0 l 0,-100 z" />
            <path d="M 70,0 l 20,0 l 0,100 l -20,0 l 0,-100 z" />
          </>
        )}
      </svg>
      <audio className={classes.audio} ref={audioRef} src={audioSrc}>
        <track kind="captions" />
      </audio>
    </div>
  );
};

export default TrackController;
