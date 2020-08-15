import React from 'react';
import { Item } from '../types/types';
import Modal from './Modal';
import classes from './FavItemDetail.module.css';

interface Props {
  item: Item;
  open: boolean;
  onClose: () => void;
}

const FavItemDetail: React.FC<Props> = (props: Props) => {
  const styles = {
    container: {
      backgroundColor: props.item.color,
    },
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <article className={classes.container} style={styles.container}>
        <div className={classes.info}>
          <h3>{props.item.title}</h3>
          <p>{props.item.description}</p>
        </div>
        <div className={classes.image}>
          <img src={props.item.imageUrl} alt={props.item.imageUrl} />
        </div>
      </article>
    </Modal>
  );
};
export default FavItemDetail;
