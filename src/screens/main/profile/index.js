import React from 'react';
import Header from 'src/components/headerView';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Followers from './followers';
import Following from './following';
import {useNavigation} from '@react-navigation/native';

export default function Profile() {
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();

  return (
    <Header
      feather={'setting'}
      onPressBack={() => navigation.goBack()}
      onPress={() => navigation.navigate('SETTING')}>
      <Tab.Navigator>
        <Tab.Screen name="Followers" component={Followers} />
        <Tab.Screen name="Following" component={Following} />
      </Tab.Navigator>
    </Header>
  );
}
