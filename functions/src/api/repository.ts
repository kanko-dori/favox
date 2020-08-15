import { Items, Item } from '../types/items';
import { db } from '../utils/firebase';

// eslint-disable-next-line import/prefer-default-export
export const saveItems = (uid:string, newItems: Items):void => {
  console.log(newItems);
  const docRef = db.collection('users').doc(uid);
  db.runTransaction((transaction) => transaction.get(docRef).then((doc) => {
    console.log('start transaction');
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
    (error) => { throw new Error(error); },
  );
};

export const getItems = (uid: string): Promise<Items> => {
  const docRef = db.collection('users').doc(uid);
  return docRef.get().then((doc) => {
    const data = doc.data() as {items: Items};
    if (data) {
      return data.items;
    }
    return [];
  });
};

export const updateItem = (uid:string, newItem: Item, order: number):void => {
  const docRef = db.collection('users').doc(uid);
  // items.forEach((item) => collectionRef.add(item));
  db.runTransaction((transaction) => transaction.get(docRef).then((doc) => {
    console.log(newItem);
    if (!doc.data()) {
      transaction.set(docRef, { items: newItem });
    } else {
      const data = doc.data() as {items: Items} || [];
      const { items } = data;
      items[order] = newItem;
      transaction.update(docRef, { items });
    }
  }).then(
    () => { console.log('Transaction successfully committed!'); },
  )).catch(
    (error) => { throw new Error(error); },
  );
};

export const deleteItem = (uid:string, order: number):void => {
  const docRef = db.collection('users').doc(uid);
  // items.forEach((item) => collectionRef.add(item));
  db.runTransaction((transaction) => transaction.get(docRef).then((doc) => {
    if (!doc.data()) {
      throw new Error("document doesn't exist");
    } else {
      const data = doc.data() as {items: Items} || [];
      const { items } = data;
      items.splice(order, 1);
      transaction.update(docRef, { items });
    }
  }).then(
    () => { console.log('Transaction successfully committed!'); },
  )).catch(
    (error) => { throw new Error(error); },
  );
};
