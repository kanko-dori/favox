import React from 'react';
import classes from './ImportSpotifyButton.module.css';
import { theme } from '../utils/constants';

interface Props {
  onClick: () => void;
}

const ImportSpotifyButton: React.FC<Props> = (props: Props) => (
  <button
    className={classes.button}
    type="button"
    onClick={props.onClick}
    aria-hidden
    style={{ backgroundColor: theme.darken }}
  >
    <img src="/assets/spotify.svg" alt="Spotify" className={classes.inner} />
  </button>
);
export default ImportSpotifyButton;
