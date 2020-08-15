import React from 'react';

import Header from '../components/Header';
import { Item } from '../types/types';
import FavItem from '../components/FavItem';

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
    <div>
      {
        ([
          {
            title: 'test', description: 'this is my favorite things', imageUrl: 'https://img.cdn.nimg.jp/s/nicovideo/thumbnails/32687696/32687696.original/r1280x720l?key=323a59de649e570af7f7d5df1d656c6d3dd23e9d13db7ee182a710ea07675402', color: '#ff0000',
          },
        ] as Item[]).map((item) => <FavItem item={item} />)
      }
    </div>
  </>
);

export default Favox;
