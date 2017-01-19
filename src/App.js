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

    const imageFlexHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_FLEX_SCROLL_DISTANCE],
      outputRange: [100, 0],
      extrapolate: 'clamp',
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_FLEX_SCROLL_DISTANCE / 2, HEADER_FLEX_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const imageScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_FLEX_SCROLL_DISTANCE],
      outputRange: [100, 40],
      extrapolate: 'clamp',
    });

    const imageTranslateX = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_FLEX_SCROLL_DISTANCE],
      outputRange: [0, 150],
      extrapolate: 'clamp',
    });

    const imageTranslateY = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_FLEX_SCROLL_DISTANCE],
      outputRange: [0, 10],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>

        <Animated.View style={[styles.header, {flex: headerFlexHeight}]}>
          <View style={styles.header_lateral_column}>
            <Image
              style={styles.icon}
              resizeMode={Image.resizeMode.contain}
              source={require('./icons/back.png')}
            />
          </View>

          <View style={styles.header_central_column}>
            <Animated.View style={[styles.image_container, {flex: imageContainerFlexHeight}]}>
              <Animated.Image
                style={[
                  styles.backgroundImage,
                  { //opacity: imageOpacity,
                    width: imageScale,
                    height: imageScale,
                    transform: [{translateX: imageTranslateX}, {translateY: imageTranslateY}]},
                ]}
                source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
              />

            </Animated.View>
            <Animated.View style={[styles.bar, {flex: barFlexHeight}]}>
                <Text style={styles.title}>Title Title Title</Text>
            </Animated.View>
          </View>

          <View style={styles.header_lateral_column}>
            {/* <Image
              style={styles.icon}
              resizeMode={Image.resizeMode.contain}
              source={require('./icons/label.png')}
            /> */}
          </View>

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
    flexDirection: "row"
  },

  header_lateral_column: {
    flex:0.1,
    paddingTop: 20,
    paddingHorizontal: 5,
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "coral",
  },

  header_central_column: {
    flex: 0.8,
    // alignItems: "center"
  },

  bar: {
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
    // backgroundColor: "gold",
    alignItems: "center"
  },

  backgroundImage: {
    marginTop:5,
    borderRadius: 50,
  },

  icon: {
    width: 30,
    height: 30,
  },

});

export default App
