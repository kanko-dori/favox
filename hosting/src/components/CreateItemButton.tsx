import React from 'react';
import classes from './CreateItemButton.module.css';

interface Props {
  onClick: () => void;
}

const CreateItemButton: React.FC<Props> = (props: Props) => (
  <button
    className={classes.button}
    type="button"
    onClick={props.onClick}
    aria-hidden
  >
    <div className={classes.inner} />
  </button>
);
export default CreateItemButton;
