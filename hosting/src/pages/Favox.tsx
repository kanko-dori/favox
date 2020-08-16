import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import { Item } from '../types/types';
import FavItem from '../components/FavItem';
import classes from './Favox.module.css';
import PostItem from '../components/PostItem';
import ImportSpotify from '../components/ImportSpotify';

interface Props {
  match: {
    isExact: boolean;
    params: { [key: string]: string; }
    path: string;
    url: string;
  };
}


const Favox: React.FC<Props> = (props: Props) => {
  const [data, setData] = useState<Array<Item>>([])
  useEffect(() => {
    console.log('fetch',`/api/${props.match.params.username}`)
    fetch(`https://us-central1-favoxes.cloudfunctions.net/api/api/${props.match.params.username}`).then(
      response => response.json()
    ).then(
      data => {
        console.log(data)
        setData(data)
      }
    ).catch(e => console.error(e))
  },[])

  return (
  <>
    <Header username={props.match.params.username} />
    <div className={classes.container}>
      {console.log('daat',data)}
      {
        (data !== []) && data.map((item) => <FavItem key={item.title} item={item} />)
      }
    </div>
    <PostItem />
    <ImportSpotify username={props.match.params.username}/>
  </>
)};

export default Favox;
