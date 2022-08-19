import {View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';
import images from 'src/assets/images';
import SettingSection from 'src/components/settingSection';
import {useNavigation} from '@react-navigation/native';

import asyncStorage from 'utils/async-storage/index';
import {useDispatch} from 'react-redux';
import {handleLogout} from 'src/redux/auth/auth-actions';
import Button from 'src/components/button';
import colors from 'src/utils/themes/global-colors';
import {profileServices} from 'src/services/profile-services';

export default function Settings() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const fcm = asyncStorage.getfcmToken();

  const logout = async () => {
    console.log('here is the fcm token ', fcm?._W);
    try {
      const result = await profileServices.logoutApi({
        notificationToken: fcm?._W,
      });
      console.log(result);
      asyncStorage.removeToken();
      dispatch(handleLogout(''));
      asyncStorage.removeFcmToken();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Header heading={'Settings'} onPressBack={() => navigation.goBack()}>
      {/* <View style={styles.searchInputView}>
        <SearchInput
          placeholder={'Search for a Setting'}
          icon={'search1'}
          iconSize={24}
          borderColor={colors.innerBorder}
        />
      </View> */}
      <View style={styles.settingSectionView}>
        <SettingSection
          leftIcon={images.profile}
          rightIcon={'arrow-right'}
          name={'Profile Settings'}
          rightIconSize={15}
          onPress={() => navigation.navigate('PROFILE_SETTING')}
        />
      </View>
      <View style={styles.settingSectionView2}>
        <SettingSection
          leftIcon={images.promoCode}
          rightIcon={'arrow-right'}
          name={'Promo Code'}
          rightIconSize={15}
        />
      </View>

      <View style={styles.logoutButtonView}>
        <Button
          text="Logout"
          backgroundColor={colors.buttonColor}
          onPress={() => {
            logout();
          }}
        />
      </View>
    </Header>
  );
}
