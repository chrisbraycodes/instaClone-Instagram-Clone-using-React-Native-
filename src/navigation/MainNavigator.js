import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../components/main/Main';
import AddScreen from '../components/main/Add';

const Stack = createStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen
      name="Main"
      component={MainScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Add" component={AddScreen} />
  </Stack.Navigator>
);

export default MainNavigator;
