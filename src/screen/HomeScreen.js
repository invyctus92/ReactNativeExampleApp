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
import {postRepo} from '../domains/repo/ActionCreators';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkInputError: false,
    };
  }

  tryCheck = sendActive => {
    if (sendActive) {
      this.props.dispatch(
        postRepo(this.props.navigation.navigate('CompleteSendScreen')),
      );
    } else {
      this.setState({
        checkInputError: true,
      });
    }
  };

  render() {
    // vedo se l'utente è connesso
    const isNotConnected = !this.props.isConnected;
    // vedo se posso mandare la post se sono connesso user e name
    const sendActive =
      this.props.userRepo.length &&
      this.props.nameRepo.length &&
      this.props.isConnected;
    return (
      <View
        style={[
          styles.body,
          {
            backgroundColor:
              isNotConnected || this.state.checkInputError
                ? 'rgb(253,  172, 173)'
                : sendActive
                ? 'rgb(203, 254, 219 )'
                : 'white',
          },
        ]}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.ScreenView}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Set the repository address</Text>
            <Text style={styles.sectionDescription}>github.com</Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({checkInputError: false});
                this.props.navigation.navigate('InputScreen', {
                  typeInput: 'user',
                });
              }}>
              <Text style={styles.sectionDescription}>
                /
                {this.props.userRepo ? (
                  <Text style={styles.sectionDescription}>
                    {this.props.userRepo}
                  </Text>
                ) : (
                  <Text style={styles.sectionGrayDescription}>user</Text>
                )}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({checkInputError: false});
                this.props.navigation.navigate('InputScreen', {
                  typeInput: 'repo',
                });
              }}>
              <Text style={styles.sectionDescription}>
                /
                {this.props.nameRepo ? (
                  <Text style={styles.sectionDescription}>
                    {this.props.nameRepo}
                  </Text>
                ) : (
                  <Text style={styles.sectionGrayDescription}>repo</Text>
                )}
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
            {this.state.checkInputError ? (
              <View>
                <Text style={styles.paddingText}>
                  <Text style={styles.internetDescription}>Check your</Text>
                  <Text style={styles.internetBoldDescription}> username</Text>
                </Text>
                <Text>
                  <Text style={styles.internetDescription}>or your </Text>
                  <Text style={styles.internetBoldDescription}>repository</Text>
                  <Text style={styles.internetDescription}> name</Text>
                </Text>
              </View>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.sectionRightContainer}>
            <TouchableOpacity
              // disabled={!sendActive}
              onPress={() => this.tryCheck(sendActive)}>
              <Text style={styles.sectionDescription}>
                {sendActive ? 'SEND' : 'CHECK'}
              </Text>
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
    fontFamily: 'OpenSans-Regular',
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontFamily: 'OpenSans-Regular',
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
  },
  sectionGrayDescription: {
    marginTop: 8,
    fontFamily: 'OpenSans-Regular',
    fontSize: 30,
    fontWeight: '600',
    color: 'gray',
  },
  paddingText: {
    marginTop: 8,
  },
  internetDescription: {
    marginTop: 8,
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
  internetBoldDescription: {
    marginTop: 8,
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    fontWeight: '800',
    color: 'black',
  },
  highlight: {
    fontWeight: '700',
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
