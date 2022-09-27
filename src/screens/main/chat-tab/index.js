import React from 'react';
import Header from 'src/components/headerView';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import colors from 'src/utils/themes/global-colors';
import Chat from './chat';
import GroupChat from './group-chat';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

export default function ChatTab() {
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();

  return (
    <Header
      heading="Chats"
      newChatIcon
      onPressBack={() => navigation.navigate('HOME')}
      onPressNewChat={() => navigation.navigate('NEW_CHAT')}>
      <Tab.Navigator
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        screenOptions={{
          tabBarStyle: {
            height: hp(6),
          },
          tabBarLabelStyle: {
            // fontWeight: 'bold',
            fontSize: RFValue(14),
            textTransform: 'none',
          },

          tabBarIndicatorStyle: {
            backgroundColor: '#0A2540',
          },

          tabBarInactiveTintColor: colors.placeholderColor,
        }}>
        <Tab.Screen name="Chats" component={Chat} />
        <Tab.Screen name="Cuartos" component={GroupChat} />
      </Tab.Navigator>
    </Header>
  );
}
