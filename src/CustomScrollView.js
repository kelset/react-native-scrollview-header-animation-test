/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const HEADER_MAX_HEIGHT = 200;

class CustomScrollView extends Component {

  state: {
    // scrollY: any;
  };

  constructor(props) {
    super(props);
  }

  _renderScrollViewContent() {
    const data = Array.from({length: 30});
    return (
      <View>
        {data.map((_, i) =>
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        )}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.fill}>
        <ScrollView
          style={styles.fill}
          scrollEventThrottle={16}
          onScroll={this.props.animatedEventReference}
        >
          {this._renderScrollViewContent()}
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },

  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default CustomScrollView
