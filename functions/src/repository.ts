import { Items } from './types/items';
import { db } from './utils/firebase';

// eslint-disable-next-line import/prefer-default-export
export const saveItems = (uid:string, items: Items):void => {
  const collectionRef = db.collection(uid);
  items.forEach((item) => collectionRef.add(item));
};
