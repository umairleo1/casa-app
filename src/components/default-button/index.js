/* eslint-disable react/prop-types */
import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator, View} from 'react-native';
import colors from 'src/utils/themes/global-colors';

export default function DefaultButton({
  text,
  onPress,
  disabled,
  loader,
  buttonStyle,
  buttonTextStyle,
}) {
  return (
    <>
      <TouchableOpacity
        style={buttonStyle}
        onPress={onPress}
        disabled={disabled}>
        <Text style={buttonTextStyle}>{text}</Text>
        <View style={{marginLeft: 2}}>
          {loader && <ActivityIndicator color={colors.whiteColor} />}
        </View>
      </TouchableOpacity>
    </>
  );
}
