import React from 'react';
import { theme } from '../utils/constants';
import classes from './Header.module.css';

const styles = {
  header: {
    backgroundColor: theme.main,
  },
};

interface Props {
  username?: string;
}

const Header: React.FC<Props> = (props: Props) => (
  <header style={styles.header} className={classes.header}>
    <h1>Favox</h1>
    {
      props.username && (
        <>
          <div className={classes.divider} />
          <p>{props.username}</p>
        </>
      )
    }
  </header>
);

Header.defaultProps = {
  username: undefined,
};

export default Header;
