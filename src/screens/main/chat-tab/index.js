import {StyleSheet} from 'react-native';
import React from 'react';
import Header from 'src/components/headerView';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import colors from 'src/utils/themes/global-colors';
import Chat from './chat';
import GroupChat from './group-chat';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function ChatTab() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Header heading="Chats">
      <Tab.Navigator
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        screenOptions={{
          tabBarStyle: {
            height: hp(6.5),
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
            fontSize: RFValue(16),
          },

          tabBarIndicatorStyle: {
            backgroundColor: '#0A2540',
          },

          tabBarInactiveTintColor: colors.placeholderColor,
        }}>
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Cuartos" component={GroupChat} />
      </Tab.Navigator>
    </Header>
  );
}

const styles = StyleSheet.create({});
