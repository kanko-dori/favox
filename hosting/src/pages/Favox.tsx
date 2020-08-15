import React from 'react';

import Header from '../components/Header';

interface Props {
  match: {
    isExact: boolean;
    params: { [key: string]: string; }
    path: string;
    url: string;
  };
}

const Favox: React.FC<Props> = (props: Props) => (
  <>
    <Header username={props.match.params.username} />
  </>
);

export default Favox;
