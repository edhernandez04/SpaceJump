import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const ShipSelector = (props) => {
  return (
    <View style={styles.selectorContainer}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
      <TouchableOpacity
        onPress={() => {
          props.selectShip('bessie');
        }}
        style={
          props.ship === 'bessie'
            ? styles.selectedShipContainer
            : styles.shipContainer
        }>
        <Image
          source={require('../assets/bessie_ship3.png')}
          style={{height: 50, width: 100}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.selectShip('millenium');
        }}
        style={
          props.ship === 'millenium'
            ? styles.selectedShipContainer
            : styles.shipContainer
        }>
        <Image
          source={require('../assets/millenium_ship3.png')}
          style={{height: 50, width: 100}}
        />
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  selectorContainer: {
    margin: 20,
    flexDirection: 'row',
    backgroundColor: 'grey',
    width: '100%'
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
    backgroundColor: 'limegreen',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default ShipSelector;
