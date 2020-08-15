import React from 'react';
import { Item } from '../types/types';
import Modal from './Modal';

interface Props {
  item: Item;
  open: boolean;
  onClose: () => void;
}

const FavItemDetail: React.FC<Props> = (props: Props) => {
  const styles = {
    container: {
      display: 'flex',
      // flexWrap: 'wrap',
      // flexDirection: 'row-reverse',
      backgroundColor: props.item.color,
    },
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <article style={styles.container}>
        <div>
          <h3>{props.item.title}</h3>
          <p>{props.item.description}</p>
        </div>
        <div>
          <img src={props.item.imageUrl} alt={props.item.imageUrl} />
        </div>
      </article>
    </Modal>
  );
};
export default FavItemDetail;
