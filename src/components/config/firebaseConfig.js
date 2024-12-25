import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native'; // Import Platform from react-native

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaGRVDsDtFfpOMWjsaN8FHfyq5zPinfcg",
  authDomain: "instaclone-c9dad.firebaseapp.com",
  projectId: "instaclone-c9dad",
  storageBucket: "instaclone-c9dad.appspot.com",
  messagingSenderId: "199402134756",
  appId: "1:199402134756:web:26f243025ab738245820f1",
  measurementId: "G-4E2DFRC3QQ",
};

// Initialize Firebase app if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth and Firestore
const auth =
  Platform.OS === 'web'
    ? getAuth(app) // Web-specific initialization
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage), // React Native persistence
      });

const firestore = getFirestore(app);

export { app, auth, firestore };
