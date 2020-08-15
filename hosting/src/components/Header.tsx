import React from 'react';
import { theme } from '../utils/constants';

const style = {
  backgroundColor: theme.main,
};

const Header: React.FC = () => (
  <header style={style}>
    <h1>Favox</h1>
  </header>
);

export default Header;
