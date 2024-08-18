import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index';

import FeedScreen from './main/Feed'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={FeedScreen} />
      </Tab.Navigator>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(null, mapDispatchToProps)(Main);
