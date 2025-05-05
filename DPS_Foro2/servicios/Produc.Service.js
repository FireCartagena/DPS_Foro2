import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firebaseConfig } from '../firebase-config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export const getProductos = async () => {
  try {
    const productsCollection = await db.collection('StoreSv').get();
    const products = [];
    productsCollection.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return [];
  }
}; 