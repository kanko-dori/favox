import { useAudioContext } from '@/lib/AudioContextProvider';
import { createGainedAudioNode } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import PlayButton from './PlayButton';
import classes from './TrackController.module.scss';

type Props = {
  audioSrc: string;
};

const DEFAULT_DURATION = 30;

let currentPlaying: HTMLAudioElement | null = null;

const TrackController: React.FC<Props> = ({ audioSrc }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);
  const context = useAudioContext();

  const pause = (): void => setPlaying(false);

  useEffect(() => {
    if (!context || !audioRef.current || gainNode) return;
    const nodes = createGainedAudioNode(context, 0.1, audioRef.current);
    nodes.gainNode.connect(context.destination);
    setGainNode(nodes.gainNode);
  }, [context, gainNode]);

  useEffect(() => {
    const audioElm = audioRef.current;
    if (!audioElm) return;
    if (!playing) {
      audioElm.pause();
      return;
    }

    currentPlaying?.pause();
    currentPlaying = audioElm;

    audioElm.currentTime = 0;
    audioElm.play();
    audioElm.addEventListener('ended', pause);
    audioElm.addEventListener('pause', pause);

    return () => {
      audioElm.removeEventListener('ended', pause);
      audioElm.removeEventListener('pause', pause);
    };
  }, [context, playing]);

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
      <audio className={classes.audio} ref={audioRef} src={audioSrc} crossOrigin="anonymous">
        <track kind="captions" />
      </audio>
    </div>
  );
};

export default TrackController;
