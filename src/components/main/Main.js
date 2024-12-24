import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../redux/actions/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeedScreen from './Feed';
import ProfileScreen from './Profile';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => null;

class Main extends Component {
  componentDidMount() {
    console.log('Main Props:', this.props); // Debug props
    if (this.props.fetchUser) {
      this.props.fetchUser(); // Dispatch fetchUser to get current user data
    }
  }

  render() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        labeled={false}
        barStyle={{ backgroundColor: 'blue' }}
        activeColor="blue"
        inactiveColor="lightblue"
      >
        <Tab.Screen
  name="Feed"
  component={FeedScreen}
  options={{
    tabBarIcon: ({ color, ...rest }) => {
      console.log('Feed tab props:', { color, ...rest });
      return <MaterialCommunityIcons name="home" color={color} size={26} />;
    },
  }}
/>
<Tab.Screen
  name="AddContainer"
  component={EmptyScreen}
  listeners={({ navigation, key, ...rest }) => {
    console.log('Listeners Props:', { key, ...rest }); // Debug
    return {
      tabPress: (event) => {
        event.preventDefault();
        navigation.navigate('Add'); // Navigate to Add
      },
    };
  }}
  options={{
    tabBarIcon: ({ color, ...iconProps }) => {
      console.log('Tab Icon Props:', { color, ...iconProps }); // Debug
      return <MaterialCommunityIcons name="plus-box" color={color} size={26} />;
    },
  }}
/>
<Tab.Screen
  name="Profile"
  component={ProfileScreen}
  key="profile-screen" // Manually assign a key
  options={{
    tabBarIcon: ({ color }) => (
      <MaterialCommunityIcons name="account-circle" color={color} size={26} />
    ),
  }}
/>
      </Tab.Navigator>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(null, mapDispatchToProps)(Main);
