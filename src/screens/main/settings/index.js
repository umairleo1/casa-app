import {Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';
import images from 'src/assets/images';
import SearchInput from 'src/components/searchInput';
import SettingSection from 'src/components/settingSection';
import {useNavigation} from '@react-navigation/native';

export default function Settings() {
  const navigation = useNavigation();
  return (
    <Header heading={'Settings'} onPressBack={() => navigation.goBack()}>
      <View style={styles.searchInputView}>
        <SearchInput
          placeholder={'Search for a Setting'}
          icon={'search1'}
          iconSize={24}
        />
      </View>

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
    </Header>
  );
}
