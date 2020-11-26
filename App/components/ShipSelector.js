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
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/space-jump-f89fa.appspot.com/o/tiny_ship3.png?alt=media&token=75f35e10-2f45-4c42-89e1-05949b7a3579' }}
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
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/space-jump-f89fa.appspot.com/o/falcon_ship3.png?alt=media&token=48a36da8-56d3-42ac-9135-36705f3305e0' }}
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
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/space-jump-f89fa.appspot.com/o/bessie_ship3.png?alt=media&token=7ce23a5f-0559-47ca-af49-111473abba76' }}
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
