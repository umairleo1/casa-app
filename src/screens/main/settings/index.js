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

import ActivityIndicator from 'src/components/loader/activity-indicator';
import {useMetaMask} from 'src/utils/functions/useMetaMask';

export default function Settings() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isMetaLoading, setIsMetaLoading] = React.useState(false);

  const {connecMM} = useMetaMask({setIsMetaLoading});

  const logout = async () => {
    const fcm = await asyncStorage.getfcmToken();

    try {
      const result = await profileServices.logoutApi({
        notificationToken: fcm,
      });
      console.log(result);
      await asyncStorage.removeFcmToken();
      await asyncStorage.removeToken();
      dispatch(handleLogout(''));
    } catch (error) {
      console.log(error);
      // showMessage({
      //   message: error.errMsg,
      //   type: 'danger',
      // });
      asyncStorage.removeFcmToken();
      asyncStorage.removeToken();
      dispatch(handleLogout(''));
    }
  };

  return (
    <Header heading={'Settings'} onPressBack={() => navigation.goBack()}>
      <ActivityIndicator visible={isMetaLoading} />
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
          name={'Referral Invite'}
          rightIconSize={15}
          onPress={() => navigation.navigate('PROMO_CODE')}
        />
      </View>
      <View style={styles.settingSectionView}>
        <SettingSection
          imgStyle={{height: 20, width: 20}}
          leftIcon={images.mM}
          rightIcon={'arrow-right'}
          name={'Connect With Metamask'}
          rightIconSize={15}
          onPress={() => connecMM()}
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
