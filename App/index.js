import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Menu from './screens/Menu';

const HomeScreen = () => {
  return <Menu />;
};

const Stack = createStackNavigator();
const SpaceJumpStack = () => {
  return (
    <Stack.Navigator mode="modal"  headerMode='none'>
      <Stack.Screen name="Home" component={HomeScreen}/>
    </Stack.Navigator>
  );
};

export default function App() {
  return <NavigationContainer>{SpaceJumpStack()}</NavigationContainer>;
}
