import React, { useState, useEffect } from 'react';

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

const Favox: React.FC<Props> = (props: Props) => {
  const [data, setData] = useState<Array<Item>>([]);
  useEffect(() => {
    console.log('fetch', `/api/${props.match.params.username}`);
    fetch(`https://us-central1-favoxes.cloudfunctions.net/api/api/${props.match.params.username}`).then(
      (response) => response.json(),
    ).then(
      (newdata) => {
        console.log(newdata);
        setData(newdata);
      },
    ).catch((e) => console.error(e));
  }, [props.match.params.username]);
  const { username } = props.match.params;
  return (
    <>
      <UserHead username={props.match.params.username} />
      <Header username={props.match.params.username} />
      <div className={classes.container}>
        {
          (data !== []) && data.map((item) => <FavItem key={item.title} item={item} />)
        }
      </div>
      <PostItem />
      <ImportSpotify username={username} />
    </>
  );
};

export default Favox;
