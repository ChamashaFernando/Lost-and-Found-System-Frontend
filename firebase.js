import { firebase } from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDKr5LD7MU58pMAtvCSKck069S3gsR2bv0",
  authDomain: "lostandfoundapp-e5cdf.firebaseapp.com",
  projectId: "lostandfoundapp-e5cdf",
  storageBucket: "lostandfoundapp-e5cdf.firebasestorage.app",
  messagingSenderId: "419776136785",
  appId: "1:419776136785:android:22f599a3e48c1854455a70"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
