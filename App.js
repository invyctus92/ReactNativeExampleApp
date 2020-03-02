/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {Provider} from 'react-redux';
import {store} from './store';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screen/HomeScreen';
import InputScreen from './src/screen/InputScreen';
import CompleteSendScreen from './src/screen/CompleteSendScreen';

import NetInfo from '@react-native-community/netinfo';
import {changeConnectionStatus} from './src/domains/connection/ActionCreators';

const Stack = createStackNavigator();
let unsubscribe = () => {};
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(isConnected) {
    store.dispatch(changeConnectionStatus(isConnected));
  }

  componentDidMount() {
    unsubscribe = NetInfo.addEventListener(state => {
      this.handleChange(state);
    });
  }

  componentWillUnmount() {
    unsubscribe();
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="InputScreen"
              component={InputScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CompleteSendScreen"
              component={CompleteSendScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
