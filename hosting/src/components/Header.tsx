import React, { CSSProperties } from 'react';
import { theme } from '../utils/constants';
import classes from './Header.module.css';
import { copyText } from '../utils/utils';

const styles = {
  header: {
    backgroundColor: theme.main,
  },
};

interface Props {
  username?: string;
  style?: CSSProperties;
}

const generateShareUrl = () => `${window.location.origin}/share${window.location.pathname}`;

const Header: React.FC<Props> = (props: Props) => (
  <header style={{ ...styles.header, ...props.style }} className={classes.header}>
    <h1>Favox</h1>
    {
      props.username && (
        <>
          <div className={classes.divider} />
          <p>{props.username}</p>
        </>
      )
    }
    <div className={classes.spacer} />
    <div
      className={classes.share}
      role="button"
      aria-hidden
      onClick={() => copyText(generateShareUrl())}
    >
      <img src="/assets/share.svg" alt="Share" />
    </div>
  </header>
);

Header.defaultProps = {
  username: undefined,
  style: {},
};

export default Header;
