import { Items } from './types/items';
import { db } from './utils/firebase';

// eslint-disable-next-line import/prefer-default-export
export const saveItems = (uid:string, newItems: Items):void => {
  const docRef = db.collection('users').doc(uid);
  // items.forEach((item) => collectionRef.add(item));
  db.runTransaction((transaction) => transaction.get(docRef).then((doc) => {
    console.log(newItems);
    if (!doc.data()) {
      transaction.set(docRef, { items: newItems });
    } else {
      const data = doc.data() as {items: Items} || [];
      const { items } = data;
      const concatedItems = items.concat(newItems);
      transaction.update(docRef, { items: concatedItems });
    }
  }).then(
    () => { console.log('Transaction successfully committed!'); },
  )).catch(
    (error) => console.error('Transaction failed: ', error),
  );
};
};
