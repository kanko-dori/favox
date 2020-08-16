import React, { useState } from 'react';
import { Item } from '../types/types';
import FavItemDetail from './FavItemDetail';
import classes from './FavItem.module.css';

interface Props {
  item: Item
}

const FavItem: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  console.log(props.item.imageURL);
  return (
    <>
      <div
        className={classes.container}
        style={{ backgroundColor: props.item.color }}
        title={props.item.title}
        role="button"
        onClick={() => setOpen(true)}
        aria-hidden="true"
      >
        <img src={props.item.imageURL} alt={props.item.title} />
      </div>
      <FavItemDetail open={open} onClose={() => setOpen(false)} item={props.item} />
    </>
  );
};
export default FavItem;
