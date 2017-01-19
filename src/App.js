/**
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

class App extends Component {

  state: {
      // selected: any;
      // draw: boolean;
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1, justifyContent: "space-around"}}>
        <Text style={{fontSize: 20, color:"black", alignSelf:"center"}}> This is a simple test for Animation</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App
