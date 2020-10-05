import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ShipSelector = (props) => {
  return (
    <View style={styles.selectorContainer}>
      <TouchableOpacity
        onPress={() => {
          props.selectShip('tiny');
        }}
        style={
          props.ship === 'tiny'
            ? styles.selectedShipContainer
            : styles.shipContainer
        }>
        <Image
          source={require('../assets/tiny_ship3.png')}
          style={{height: 50, width: 100}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.selectShip('falcon');
        }}
        style={
          props.ship === 'falcon'
            ? styles.selectedShipContainer
            : styles.shipContainer
        }>
        <Image
          source={require('../assets/falcon_ship3.png')}
          style={{height: 50, width: 100}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  selectorContainer: {
    margin: 20,
    flexDirection: 'row',
  },
  shipContainer: {
    height: 100,
    width: 120,
    margin: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  selectedShipContainer: {
    height: 100,
    width: 120,
    margin: 10,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default ShipSelector;
