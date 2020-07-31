import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCvn1j44WZg8xZZkP6NwzcSrcUTGWRdoxc",
    authDomain: "humanresource-d66ee.firebaseapp.com",
    databaseURL: "https://humanresource-d66ee.firebaseio.com",
    projectId: "humanresource-d66ee",
    storageBucket: "humanresource-d66ee.appspot.com",
    messagingSenderId: "698343968088",
    appId: "1:698343968088:web:4fcbf78eca04be11e8e92d"
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();


  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    })
  }

  