import React from 'react';

import Header from '../components/Header';
import { Item } from '../types/types';
import FavItem from '../components/FavItem';
import classes from './Favox.module.css';
import PostItem from '../components/PostItem';
import ImportSpotify from '../components/ImportSpotify';
import UserHead from '../components/UserHead';

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
    <UserHead username={props.match.params.username} />
    <Header username={props.match.params.username} />
    <div className={classes.container}>
      {
        ([
          {
            title: 'test1', description: 'this is my favorite things', imageUrl: 'https://img.cdn.nimg.jp/s/nicovideo/thumbnails/32687696/32687696.original/r1280x720l?key=323a59de649e570af7f7d5df1d656c6d3dd23e9d13db7ee182a710ea07675402', color: '#ff0000',
          },
          {
            title: 'test2', description: 'this is my favorite things', imageUrl: 'https://img.cdn.nimg.jp/s/nicovideo/thumbnails/32687696/32687696.original/r1280x720l?key=323a59de649e570af7f7d5df1d656c6d3dd23e9d13db7ee182a710ea07675402', color: '#aaff00',
          },
          {
            title: 'test3', description: 'this is my favorite things', imageUrl: 'https://img.cdn.nimg.jp/s/nicovideo/thumbnails/32687696/32687696.original/r1280x720l?key=323a59de649e570af7f7d5df1d656c6d3dd23e9d13db7ee182a710ea07675402', color: '#ff00ff',
          },
          {
            title: 'test4', description: 'this is my favorite things', imageUrl: 'https://img.cdn.nimg.jp/s/nicovideo/thumbnails/32687696/32687696.original/r1280x720l?key=323a59de649e570af7f7d5df1d656c6d3dd23e9d13db7ee182a710ea07675402', color: '#ff00aa',
          },
          {
            title: 'test5', description: 'this is my favorite things', imageUrl: 'https://img.cdn.nimg.jp/s/nicovideo/thumbnails/32687696/32687696.original/r1280x720l?key=323a59de649e570af7f7d5df1d656c6d3dd23e9d13db7ee182a710ea07675402', color: '#ffffaa',
          },
        ] as Item[]).map((item) => <FavItem key={item.title} item={item} />)
      }
    </div>
    <PostItem />
    <ImportSpotify />
  </>
);

export default Favox;
