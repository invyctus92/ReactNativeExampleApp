/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

class HomeScreen extends React.Component {
  render() {
    const isNotConnected = !this.props.isConnected;
    return (
      <View
        style={[
          styles.body,
          {backgroundColor: isNotConnected ? 'red' : 'white'},
        ]}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.ScreenView}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Set the repository address</Text>
            <Text style={styles.sectionDescription}>github.com</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('InputScreen', {
                  typeInput: 'user',
                })
              }>
              <Text style={styles.sectionDescription}>
                /{this.props.userRepo ? this.props.userRepo : 'user'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('InputScreen', {
                  typeInput: 'repo',
                })
              }>
              <Text style={styles.sectionDescription}>
                /{this.props.nameRepo ? this.props.nameRepo : 'repo'}
              </Text>
            </TouchableOpacity>
            {isNotConnected ? (
              <Text style={styles.paddingText}>
                <Text style={styles.internetDescription}>Check your </Text>
                <Text style={styles.internetBoldDescription}>
                  internet connection
                </Text>
              </Text>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.sectionRightContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('InputScreen')}>
              <Text style={styles.sectionDescription}>CHECK</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ScreenView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionRightContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
  paddingText: {
    marginTop: 8,
  },
  internetDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
  internetBoldDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '800',
    color: 'black',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

const repoState = connect(state => {
  return {
    userRepo: state.repoState.userRepo,
    nameRepo: state.repoState.nameRepo,
    statusRequest: state.repoState.statusRequest,
    isConnected: state.connectState.isConnected,
  };
});

export default repoState(HomeScreen);
