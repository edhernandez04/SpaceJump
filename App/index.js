import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Game from './screens/Game';
import Menu from './screens/Menu'

const GameScreen = () => {
  return <Game />;
};

const MenuScreen = () => {
  return <Menu />;
};

const Stack = createStackNavigator();
const SpaceJumpStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Game" component={GameScreen} headerMode="none" />
    </Stack.Navigator>
  );
};

export default function App() {
  return <NavigationContainer>{SpaceJumpStack()}</NavigationContainer>;
}
