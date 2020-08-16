import React from 'react';
import convert from 'color-convert';
import { Item } from '../types/types';
import Modal from './Modal';
import classes from './FavItemDetail.module.css';

interface Props {
  item: Item;
  open: boolean;
  onClose: () => void;
}

/**
 * isDarken
 * @param {string} color HEX color code. e.g. #ff00ca
 * @return {boolean} Return bool that color is darken
 */
const isDarken = (color: string): boolean => {
  if (!color.match(/^#[0-9a-f]{6}$/i)) throw new TypeError('Color must stats with #');
  const hsv = convert.hex.hsv(color.substring(1));
  const hue = Math.round(((hsv[0] + 135) % 360) / 360);
  const saturation = hsv[1] / 100;
  const value = hsv[2] / 100;
  const lightness = 0.5 * hue + -0.1 * saturation + 0.4 * value;
  return lightness < 0.5;
};

const FavItemDetail: React.FC<Props> = (props: Props) => {
  const styles = {
    container: {
      backgroundColor: props.item.color || '#c0ffee',
      color: isDarken(props.item.color || '#c0ffee') ? 'white' : 'black',
    },
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <article className={classes.container} style={styles.container}>
        <div className={classes.image}>
          <img src={props.item.imageURL} alt={props.item.imageURL} />
        </div>
        <div className={classes.info}>
          <h3>{props.item.title}</h3>
          {
            props.item.url
            && (
              <p className={classes.url}>
                <a
                  href={props.item.url}
                  rel="noreferrer noopener"
                  target="_blank"
                  style={{ color: isDarken(props.item.color || '#c0ffee') ? 'white' : 'black' }}
                >
                  {props.item.url}
                </a>
              </p>
            )
          }
          <p>{props.item.description}</p>
        </div>
      </article>
    </Modal>
  );
};
export default FavItemDetail;
