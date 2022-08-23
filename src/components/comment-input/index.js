/* eslint-disable react/prop-types */
import {TextInput, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Emoji} from 'src/assets/svg/emoji';
import SendIcon from 'src/assets/svg/Common/left-arrow';

export default function CommentInput({
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  onChange,
  onBlur,
  type,
  editable,
  onPressEmoji,
  onPressSend,
}) {
  return (
    <>
      <View style={styles.mainView}>
        <TouchableOpacity onPress={onPressEmoji}>
          <Emoji />
        </TouchableOpacity>
        <TextInput
          placeholderTextColor={colors.placeholderColor}
          style={styles.input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onChange={onChange}
          value={value}
          secureTextEntry={secureTextEntry}
          onBlur={onBlur}
          keyboardType={type}
          autoCapitalize={type == 'email-address' ? 'none' : 'sentences'}
          editable={editable}
        />
        <View>
          <TouchableOpacity onPress={onPressSend}>
            <SendIcon onPress={onPressSend} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: hp(7),
    padding: 10,
    borderWidth: 1,
    borderRadius: wp(10),
    borderColor: colors.innerBorder,
    margin: wp(2),
  },

  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: colors.innerBorder,
    height: hp(8),
    paddingHorizontal: wp(4),
  },
});
