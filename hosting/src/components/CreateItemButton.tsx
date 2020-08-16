import React from 'react';
import classes from './CreateItemButton.module.css';
import { theme } from '../utils/constants';

interface Props {
  onClick: () => void;
}

const CreateItemButton: React.FC<Props> = (props: Props) => (
  <button
    className={classes.button}
    type="button"
    onClick={props.onClick}
    aria-hidden
    style={{ backgroundColor: theme.darken }}
  >
    <div className={classes.inner} />
  </button>
);
export default CreateItemButton;
