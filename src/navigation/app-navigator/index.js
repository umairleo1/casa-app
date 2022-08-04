import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SCREEN from 'utils/constants';
import Screen1 from 'screens/screen1';
import Screen2 from 'screens/screen2';

const Stack = createStackNavigator();
const {SCREEN1, SCREEN2} = SCREEN;

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREEN1} component={Screen1} />
      <Stack.Screen name={SCREEN2} component={Screen2} />
    </Stack.Navigator>
  );
}
