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
  TextInput,
  Image,
} from 'react-native';

class CompleteSendScreen extends React.Component {
  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.body}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.ScreenView}>
          <View style={styles.sectionContainer}>
            <View style={styles.columnView}>
              <Text style={styles.sectionTitle}>All done!</Text>
              <Text style={styles.sectionTitle}>Repository sent.</Text>
            </View>
          </View>
          <View style={styles.sectionRightContainer}>
            <TouchableOpacity onPress={this.goBack}>
              <Text style={styles.sectionDescription}>COOL</Text>
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
  inputText: {
    // textDecorationColor: '#FFFFFF',
    color: 'gray',
    marginTop: 32,
    paddingBottom: 10,
    fontWeight: '400',
    textAlign: 'left',
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    width: Dimensions.get('window').width * 0.9,
    borderColor: 'black',
    borderBottomWidth: 2,
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 64,
    paddingHorizontal: 24,
  },
  columnView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddingImage: {
    alignContent: 'center',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sectionRightContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sectionTitle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 30,

    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontFamily: 'OpenSans-Regular',
    fontSize: 25,
    fontWeight: '600',
    color: 'black',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default CompleteSendScreen;
