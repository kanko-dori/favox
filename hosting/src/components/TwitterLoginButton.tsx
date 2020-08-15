import React from 'react';
import classes from './TwitterLoginButton.module.css';

interface Props {
  onClick: () => void;
}

const TwitterLoginButton: React.FC<Props> = (props: Props) => (
  <div role="button" onClick={props.onClick} aria-hidden className={classes.button}>
    <p className={classes.buttoncontents}>
      <img className={classes.icon} src="/assets/twitter.svg" alt="twiiter" />
      login with twitter
    </p>
  </div>
);

export default TwitterLoginButton;
