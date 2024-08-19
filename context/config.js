import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBjf8JgKg72mQEIWi95fcxWX6AjyzhakHI',
  authDomain: 'YOUR-AUTH-DOMAIN',
  projectId: 'react-native111',
  storageBucket: 'react-native111.appspot.com',

  appId: '1:1072634665329:android:6f733106b5eba1eb10bed0',
  measurementId: 'YOUR_MEASUREMENT_ID',
};

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
export {firebase, authentication};
