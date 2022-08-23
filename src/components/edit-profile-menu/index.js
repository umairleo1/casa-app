/* eslint-disable react/prop-types */
import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'src/utils/themes/global-colors';

//import { Button } from 'components/button';

import {styles} from './styles';

export default function EditProfileModal({
  visible = false,
  onPressPhoto,
  onPressGallery,
  iconPress,
  title,
}) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overLay}>
      <View style={styles.view}>
        <Text style={styles.heading}>{title || 'Change Profile Image'}</Text>
        <MaterialCommunityIcons
          name={'close'}
          size={28}
          style={{position: 'absolute', right: 20, top: 20}}
          onPress={iconPress}
        />
        <View style={{marginTop: 20}}>
          <TouchableOpacity onPress={onPressPhoto}>
            <View
              style={{
                backgroundColor: colors.buttonColor,
                marginTop: 10,
                height: 50,

                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
              labelStyle={{color: '#fff'}}>
              <Text style={{color: '#fff'}}>Take Photo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressGallery}>
            <View
              style={{
                backgroundColor: colors.buttonColor,
                marginTop: 10,
                height: 50,

                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={{color: '#fff'}}>Upload From Gallery</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
