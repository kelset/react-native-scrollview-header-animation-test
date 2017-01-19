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

import CustomScrollView from './CustomScrollView'

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const HEADER_MAX_FLEX = 300;
const HEADER_MIN_FLEX = 100;
const HEADER_FLEX_SCROLL_DISTANCE = HEADER_MAX_FLEX - HEADER_MIN_FLEX;

class App extends Component {

  state: {
    scrollY: any;
  };

  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  render() {
    // FLEX
    const headerFlexHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_FLEX_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_FLEX, HEADER_MIN_FLEX],
      extrapolate: 'clamp',
    });

    const imageContainerFlexHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_FLEX_SCROLL_DISTANCE],
      outputRange: [190, 0.1],
      extrapolate: 'clamp',
    });

    const barFlexHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_FLEX_SCROLL_DISTANCE],
      outputRange: [110, 300],
      extrapolate: 'clamp',
    });

    const imageOpacityViaFlex = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_FLEX_SCROLL_DISTANCE / 2, HEADER_FLEX_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const imageTranslateViaFlex = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_FLEX_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>

        <Animated.View style={[styles.header, {flex: headerFlexHeight}]}>
          <Animated.View style={[styles.image_container, {flex: imageContainerFlexHeight}]}>
            <Animated.Image
              style={[
                styles.backgroundImage,
                {opacity: imageOpacityViaFlex, transform: [{translateY: imageTranslateViaFlex}]},
              ]}
              source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
            />
          </Animated.View>
          <Animated.View style={[styles.bar, {flex: barFlexHeight}]}>
              <Text style={styles.title}>Title</Text>
          </Animated.View>
        </Animated.View>

        <View style={{flex: 700}}>
          <CustomScrollView
            animatedEventReference={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
            )}
          />
        </View>
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

  // HEADER RELATED
  header: {
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    // alignItems: "center"
  },

  bar: {
    // flex:150,
    // marginTop: 28,
    // height: 32,
    // backgroundColor: "red",
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },

  image_container: {
    // flex:150,
    // marginTop: 28,
    // height: 32,
    // backgroundColor: "gold",
    alignItems: 'center',
    justifyContent: 'center',
  },

  backgroundImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // flex:150,
  },
});

export default App
