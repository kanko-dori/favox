import { MouseEvent } from 'react';
import classes from './PlayButton.module.scss';

type Props = {
  playing: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
};

const PlayButton: React.FC<Props> = ({ playing, onClick }) => (
  <button className={classes.button} onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100">
      {!playing ? (
        <path d="M 13.4,0 L 100,50 L 13.4,100 z" />
      ) : (
        <>
          <path d="M 10,0 l 20,0 l 0,100 l -20,0 l 0,-100 z" />
          <path d="M 70,0 l 20,0 l 0,100 l -20,0 l 0,-100 z" />
        </>
      )}
    </svg>
  </button>
);

export default PlayButton;
