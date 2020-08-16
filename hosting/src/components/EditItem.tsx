import React/* , { useState } */ from 'react';
import { Item } from '../types/types';
import Modal from './Modal';
import classes from './EditItem.module.css';

interface Props {
  item?: Item;
  open: boolean;
  onClose: () => void;
}

const EditItem: React.FC<Props> = (props: Props) => {
  // const [image, setImageUrl] = useState('');
  const onSubmit = () => {
    console.log('onsubmit');
  };
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <section className={classes.container}>
        <div className={classes.header}>
          <h3>Post</h3>
          <div className={classes.spacer} />
          <div
            className={classes.close}
            onClick={props.onClose}
            role="button"
            aria-hidden
            aria-label="close"
          />
        </div>
        <form className={classes.form} onSubmit={onSubmit}>
          <div className={classes.textfields}>
            <h3><input type="text" placeholder="Title" className={classes.title} required defaultValue={props.item?.title} /></h3>
            <p><input type="text" placeholder="URL" className={classes.url} defaultValue={props.item?.url} /></p>
            <p><textarea placeholder="Why do you love this?" className={classes.description} required defaultValue={props.item?.description} /></p>
            <p className={classes.footer}>
              <div className={classes.uploader}>
                <label htmlFor="file_uploader">
                  画像を選択
                  <input type="file" id="file_uploader" required />
                </label>
              </div>
              <div className={classes.spacer} />
              <div><input type="submit" value="SEND" className={classes.submit} /></div>
            </p>
          </div>
        </form>
      </section>
    </Modal>
  );
};
EditItem.defaultProps = {
  item: {
    imageURL: '',
    url: '',
    title: '',
    description: '',
    color: '',
  },
};
export default EditItem;
