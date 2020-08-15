import React from 'react';
import * as firebase from 'firebase';
import { auth } from '../utils/firebase';
import Button from '../components/Button';

const loginWithTwitter = () => {
  const provider = new firebase.auth.TwitterAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    console.log(result);
    if (auth.currentUser) {
      auth.currentUser.getIdToken(true).then((idToken) => {
        console.log(idToken);
      });
    }
  }).catch((error) => {
    console.error(error);
  });
};

const Home: React.FC = () => (
  <>
    <Button onClick={loginWithTwitter}>login</Button>
  </>
);

export default Home;
