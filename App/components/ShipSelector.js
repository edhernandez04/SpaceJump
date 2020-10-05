import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ShipSelector = (props) => {
  return (
    <View style={styles.selectorContainer}>
      <TouchableOpacity onPress={() => {props.selectShip('tiny')}}>
        <Image source={require('../assets/tiny_ship3.png')} style={{height: 50, width: 100}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {props.selectShip('falcon')}}>
        <Image source={require('../assets/falcon_ship3.png')} style={{height: 50, width: 100}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  selectorContainer: {
    margin: 20,
    flexDirection: 'row'
  },
});

export default ShipSelector;
