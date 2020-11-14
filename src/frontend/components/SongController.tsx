import { useState } from 'react';
import classes from './SongController.module.scss';

const SongController: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={classes.container}>
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
    </div>
  );
};

export default SongController;
