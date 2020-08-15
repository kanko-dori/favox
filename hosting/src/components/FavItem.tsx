import React from 'react';
import { Item } from '../types/types';

interface Props {
  item: Item
}

const FavItem: React.FC<Props> = (props: Props) => (
  <>
    <div title={props.item.title}>
      <img src={props.item.imageUrl} alt={props.item.title} />
    </div>
  </>
);

export default FavItem;
