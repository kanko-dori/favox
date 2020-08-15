import { Items, Item } from '../types/items';
import { db } from '../utils/firebase';

export const saveItems = async (uid:string, newItems: Items):Promise<any> => {
  console.log(newItems);
  const collectionRef = db.collection('users').doc(uid).collection('items');
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line max-len
    const promises:Array<Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>> = [];
    newItems.forEach((item) => {
      console.log(item.title);
      promises.push(collectionRef.add(item));
    });

    Promise.all(promises).then(
      (result) => {
        const documentPath = result.map((item) => item.id);
        const docRef = db.collection('users').doc(uid);
        docRef.set({ order: documentPath });
        resolve(newItems);
      },
    ).catch((e) => reject(e));
  });
};

export const getItems = (uid: string): Promise<Items> => {
  const docRef = db.collection('users').doc(uid);
  return new Promise((resolve, reject) => {
    docRef.get().then((doc) => {
      // eslint-disable-next-line max-len
      const promises: Array<Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>> = [];
      const { order } = doc.data() as {order: string[]};
      const collectionRef = db.collection('users').doc(uid).collection('items');
      order.forEach((collectionID) => {
        promises.push(collectionRef.doc(collectionID).get());
      });
      Promise.all(promises).then(
        (result) => {
          const data = result.map((r) => r.data() as Item);
          console.log(data);
          resolve(data);
        },
      ).catch((e) => reject(e));
    });
  });
};

export const updateItem = (uid:string, newItem: Item, orderNum: number):Promise<Item> => {
  const docRef = db.collection('users').doc(uid);
  return new Promise((resolve, reject) => {
    docRef.get().then((doc) => {
      const { order } = doc.data() as {order: string[]};
      const collectionRef = db.collection('users').doc(uid).collection('items');
      collectionRef.doc(order[orderNum])
        .set(newItem)
        .then(
          () => resolve(newItem),
        ).catch((e) => reject(e));
    });
  });
};

export const deleteItem = (uid:string, orderNum: number):Promise<boolean> => {
  const docRef = db.collection('users').doc(uid);
  // items.forEach((item) => collectionRef.add(item));
  return new Promise((resolve, reject) => {
    docRef.get().then((doc) => {
      const { order } = doc.data() as {order: string[]};
      // const collectionRef = db.collection('users').doc(uid).collection('items');
      // collectionRef.doc(order[orderNum]).delete();
      order.splice(orderNum, 1);
      docRef.set({ order }).then(
        () => resolve(true),
      ).catch(
        (e) => reject(e),
      );
    });
  });
};
