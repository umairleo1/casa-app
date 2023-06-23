/* eslint-disable react/prop-types */
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';
import {CopyIcon} from 'src/assets/svg/promo-code';

export default function InvitationLink({onPress, linkText, text}) {
  return (
    <>
      <Text style={styles.link}>{text}</Text>
      <View style={styles.mainView}>
        <Text style={styles.text}>{linkText}</Text>
        <TouchableOpacity onPress={onPress}>
          <CopyIcon />
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#D9D9D9',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderRadius: 3,
    marginTop: 5,
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#959595',
    flex: 1,
  },
  link: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.pureBlack,
    marginTop: 20,
  },
});
