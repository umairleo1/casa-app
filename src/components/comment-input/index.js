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
  placeholder,
  secureTextEntry,
  onChange,
  onBlur,
  type,
  editable,
  onPressEmoji,
  onPressSend,
  onPressIn
}) {
  const [comment, setComment] = React.useState('');

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
          onChangeText={text => setComment(text)}
          onChange={onChange}
          value={comment}
          secureTextEntry={secureTextEntry}
          onBlur={onBlur}
          keyboardType={type}
          autoCapitalize={type == 'email-address' ? 'none' : 'sentences'}
          editable={editable}
          onPressIn={onPressIn}
        />
        <View>
          <TouchableOpacity onPress={onPressSend}>
            <SendIcon
              onPress={async () => {
                await onPressSend(comment);
                setComment('');
              }}
              height={26}
              width={26}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 50,
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
