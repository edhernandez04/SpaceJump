import React from 'react';
import Images from '../assets/Images';
import { View, Image, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

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
            source={Images.tiny3}
            style={{ height: 50, width: 100 }}
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
            source={Images.falcon3}
            style={{ height: 50, width: 100 }}
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
            source={Images.bessie3}
            style={{ height: 50, width: 100 }}
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
