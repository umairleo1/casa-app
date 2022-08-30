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
import {showMessage} from 'react-native-flash-message';

export default function Settings() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const fcm = asyncStorage.getfcmToken();

  const logout = async () => {
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
      showMessage({
        message: error.errMsg,
        type: 'danger',
      });
    }
  };

  return (
    <Header heading={'Settings'} onPressBack={() => navigation.goBack()}>
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
          onPress={() => navigation.navigate('PROMO_CODE')}
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
