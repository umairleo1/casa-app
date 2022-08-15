import {Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';
import {useNavigation} from '@react-navigation/native';
import SearchInput from 'src/components/searchInput';

export default function ProfileSetting() {
  const navigation = useNavigation();
  return (
    <Header heading={'Profile Settings'} onPress={() => navigation.goBack()}>
      <View style={styles.view}>
        <Text style={styles.text}>Personal Information</Text>

        <View style={styles.SearchInputView}>
          <SearchInput
            placeholder={'First Name'}
            editIcon={'edit-3'}
            editIconSize={16}
          />
        </View>

        <View style={styles.SearchInputView}>
          <SearchInput
            placeholder={'Last Name'}
            editIcon={'edit-3'}
            editIconSize={16}
          />
        </View>

        <View style={styles.SearchInputView}>
          <SearchInput
            placeholder={'Password'}
            editIcon={'edit-3'}
            editIconSize={16}
          />
        </View>
      </View>
    </Header>
  );
}
