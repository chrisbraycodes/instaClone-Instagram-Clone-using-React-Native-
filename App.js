import React, { useState, useEffect } from 'react';
import { Platform, View, Text } from 'react-native';
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  browserLocalPersistence,
  setPersistence,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import AddScreen from './src/components/main/Add';

import rootReducer from './src/redux/reducers';
import LandingScreen from './src/components/Auth/Landing';
import RegisterScreen from './src/components/Auth/Register';
import LoginScreen from './src/components/Auth/Login';
import MainScreen from './src/components/main/Main';

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

// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Firebase Auth initialization with platform-specific persistence
let auth;
if (Platform.OS === 'web') {
  auth = getAuth(getApp());
  setPersistence(auth, browserLocalPersistence);
} else {
  auth = initializeAuth(getApp(), {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Configure Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

const Stack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Auth state changed:', user); // Debug auth state
      setLoggedIn(!!user);
      setLoaded(true);
    });
    return unsubscribe;
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Add" component={AddScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
