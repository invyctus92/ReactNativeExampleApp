import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/screen/HomeScreen';

const RootStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
    },
  },
  {
    mode: 'card',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(RootStack);

export default class AppNavigation extends React.Component {
  render() {
    return <AppContainer />;
  }
}
