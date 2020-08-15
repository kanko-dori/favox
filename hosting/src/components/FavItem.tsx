import React, { useState } from 'react';
import { Item } from '../types/types';
import FavItemDetail from './FavItemDetail';

interface Props {
  item: Item
}

const FavItem: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div title={props.item.title} role="button" onClick={() => setOpen(true)} aria-hidden="true">
        <img src={props.item.imageUrl} alt={props.item.title} />
      </div>
      <FavItemDetail open={open} onClose={() => setOpen(false)} item={props.item} />
    </>
  );
};
export default FavItem;
