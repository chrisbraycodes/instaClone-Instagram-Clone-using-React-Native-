import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import rootReducer from './src/redux/reducers';
import LandingScreen from './src/components/Auth/Landing';
import RegisterScreen from './src/components/Auth/Register';
import LoginScreen from './src/components/Auth/Login';
import MainScreen from './src/components/Main';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaGRVDsDtFfpOMWjsaN8FHfyq5zPinfcg",
  authDomain: "instaclone-c9dad.firebaseapp.com",
  projectId: "instaclone-c9dad",
  storageBucket: "instaclone-c9dad.appspot.com",
  messagingSenderId: "199402134756",
  appId: "1:199402134756:web:26f243025ab738245820f1",
  measurementId: "G-4E2DFRC3QQ"
};

// Initialize Firebase if not already initialized
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Initialize Firebase Auth with persistence
const app = getApp();
const auth = initializeAuth(app);

// Configure store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
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
              <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
