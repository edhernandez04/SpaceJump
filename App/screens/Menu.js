import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ShipSelector from '../components/ShipSelector';
import LeaderBoard from '../components/LeaderBoard';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

const Menu = (props) => {
  const [player, changePlayer] = useState();
  const [refId, changeRefId] = useState('');
  const [name, changeName] = useState('');
  const [password, changePassword] = useState('');
  const [ship, selectShip] = useState('');

  const checkUser = async () => {
    const currentPlayer = await firestore()
      .collection('users')
      .where('name', '==', name)
      .get();
    currentPlayer._docs && currentPlayer._docs.length > 0
      ? currentPlayer._docs[0]._data.password === password
        ? updateUseState(
          currentPlayer._docs[0]._data,
          currentPlayer._docs[0]._ref._documentPath._parts[1],
        )
        : alert('Incorrect Login Information')
      : Alert.alert(
        'No Player Data',
        'Would You Like to Create a New Player With This Information?',
        [
          { text: 'Cancel', onPress: () => null, style: 'cancel' },
          { text: 'OK', onPress: () => addUser() },
        ],
      );
  };

  const addUser = async () => {
    name && password
      ? await firestore().collection('users').add({
        name: name,
        password: password,
        highScore: 0,
      })
      : alert('Missing Login Information');
    checkUser();
  };

  const updateUseState = (player, reference) => {
    changePlayer(player);
    changeRefId(reference);
  };

  const removePlayer = () => {
    changePlayer(undefined);
  };

  if (player) {
    return (
      <View style={styles.fullScreenMenu}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.subHeadingText}>Welcome, {player.name}</Text>
        <LeaderBoard player={player} />
        <ShipSelector ship={ship} selectShip={selectShip} />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() =>
              ship
                ? props.navigation.navigate('Game', {
                  ship: ship,
                  player: player,
                  refId: refId,
                })
                : alert('Please Select A Ship Before Launching')
            }
            style={styles.enterButton}>
            <Text style={styles.subHeadingText}>START</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => removePlayer()}
            style={styles.enterButton}>
            <Text style={styles.subHeadingText}>BACK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (player === undefined) {
    return (
      <SafeAreaView>
        <View style={styles.fullScreenMenu}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/space-jump-f89fa.appspot.com/o/banner.png?alt=media&token=0603ab4a-0cd0-4423-9982-e9efa0a7100e' }}
            style={styles.banner}
          />
          <StatusBar barStyle="light-content" />
          <View style={{ width: '95%', alignItems: 'center' }}>
            <TextInput
              color="white"
              fontSize={30}
              value={name}
              onChangeText={changeName}
              placeholder="ENTER NAME"
              placeholderTextColor="white"
              textAlign="center"
              autoCapitalize="none"
              borderBottomWidth={2}
              maxLength={12}
              style={{ width: '80%', height: 100 }}
            />
            <TextInput
              color="white"
              fontSize={30}
              value={password}
              onChangeText={changePassword}
              placeholder="PASSWORD"
              placeholderTextColor="white"
              autoCapitalize="none"
              secureTextEntry={true}
              textAlign="center"
              borderBottomWidth={2}
              style={{ width: '80%', height: 100 }}
            />
            <TouchableOpacity
              onPress={() => checkUser()}
              style={styles.enterButton}>
              <Text style={styles.subHeadingText}>ENTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  fullScreenMenu: {
    position: 'absolute',
    height: Constants.MAX_HEIGHT,
    width: Constants.MAX_WIDTH,
    flex: 1,
    backgroundColor: '#3e3e3e',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeadingText: {
    color: 'white',
    fontSize: 24,
  },
  banner: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 250,
  },
  enterButton: {
    width: 150,
    margin: 20,
    padding: 15,
    backgroundColor: 'tomato',
    borderRadius: 15,
    alignItems: 'center',
  },
});

export default Menu;
