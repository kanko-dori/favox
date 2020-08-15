import React from 'react';
import { theme } from '../utils/constants';

const styles = {
  header: {
    backgroundColor: theme.main,
    color: 'white',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    width: '1px',
    height: '2em',
    margin: '0 1em',
    backgroundColor: 'white',
  },
};

interface Props {
  username: string;
}

const Header: React.FC<Props> = (props: Props) => (
  <header style={styles.header}>
    <h1>Favox</h1>
    <div style={styles.divider} />
    <p>{props.username}</p>
  </header>
);

export default Header;
