import React from 'react';
import Header from 'src/components/headerView';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Followers from './followers';
import Following from './following';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from 'src/utils/themes/global-colors';

export default function Profile() {
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();
  const route = useRoute();
  console.log('followers id ', route?.params?.id);

  return (
    <Header
      feather={'setting'}
      onPressBack={() => navigation.goBack()}
      onPress={() => navigation.navigate('SETTING')}>
      <Tab.Navigator
        initialRouteName={
          route?.params?.initial ? route?.params?.initial : 'Followers'
        }
        screenOptions={{
          unmountOnBlur: true,
          tabBarIndicatorStyle: {
            borderColor: colors.buttonColor,
            borderWidth: 1,
          },
        }}>
        <Tab.Screen
          initialParams={{id: route?.params?.id}}
          name="Followers"
          component={Followers}
        />
        <Tab.Screen
          initialParams={{id: route?.params?.id}}
          name="Following"
          component={Following}
        />
      </Tab.Navigator>
    </Header>
  );
}
