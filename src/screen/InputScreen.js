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
import {addRepoUser, addRepoName} from '../../src/domains/repo/ActionCreators';
import {store} from '../../store';

class InputScreen extends React.Component {
  constructor(props) {
    super(props);

    const typeInput = this.props.route.params?.typeInput;
    let title = 'USER';
    if (typeInput == 'repo') {
      title = 'REPOSITORY';
    }

    this.state = {
      typeInput,
      title,
      placeholder: this.setPlaceholder(typeInput),
      valueInput: '',
    };
  }

  goBackAndSaveInput = () => {
    if (this.state.typeInput == 'repo') {
      store.dispatch(addRepoName(this.state.valueInput));
    } else {
      store.dispatch(addRepoUser(this.state.valueInput));
    }
    this.props.navigation.goBack();
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  setPlaceholder = typeInput => {
    if (typeInput == 'repo') {
      return 'Type your repository name';
    } else {
      return 'Type your github username';
    }
  };

  handleValue = text => {
    this.setState({valueInput: text});
  };

  render() {
    return (
      <View style={styles.body}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.ScreenView}>
          <View style={styles.sectionContainer}>
            <View style={styles.rowView}>
              <TouchableOpacity
                onPress={this.goBack}
                style={styles.paddingImage}>
                <View>
                  <Image
                    style={{width: 16, height: 13}}
                    source={require('../image/back_icon/back.png')}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.sectionTitle}>{this.state.title}</Text>
            </View>
            <TextInput
              value={this.state.valueInput}
              autoCapitalize="none"
              placeholder={this.state.placeholder}
              style={styles.inputText}
              onChangeText={this.handleValue}
              blurOnSubmit={false}
              onSubmitEditing={text => {
                this.goBackAndSaveInput();
              }}
              autoCorrect={false}
              returnKeyType={'next'}
              onBlur={() => {
                this.setState({
                  placeholder: this.setPlaceholder(this.state.typeInput),
                });
              }}
            />
          </View>
          <View style={styles.sectionRightContainer}>
            <TouchableOpacity onPress={this.goBackAndSaveInput}>
              <Text style={styles.sectionDescription}>DONE</Text>
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
    fontSize: 16,
    width: Dimensions.get('window').width * 0.9,
    borderColor: 'black',
    borderBottomWidth: 2,
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  rowView: {
    flexDirection: 'row',
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
    fontSize: 24,
    padding: 16,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
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

export default InputScreen;
