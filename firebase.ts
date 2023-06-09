import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAIPEazd2FZ8jN2Xn1Dki9LFoudrKuncRI',
  authDomain: 'cine-chat.firebaseapp.com',
  projectId: 'cine-chat',
  storageBucket: 'cine-chat.appspot.com',
  messagingSenderId: '206703456947',
  appId: '1:206703456947:web:e9755f1f59001d75ea36c6',
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { auth, db };
