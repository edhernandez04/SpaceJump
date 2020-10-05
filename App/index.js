import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Game from './screens/Game';
import Menu from './screens/Menu';

const Stack = createStackNavigator();
const SpaceJumpStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Game" component={Game} headerMode="none" />
    </Stack.Navigator>
  );
};

export default function App() {
  return <NavigationContainer>{SpaceJumpStack()}</NavigationContainer>;
}
