/* eslint-disable react/prop-types */
import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import colors from 'src/utils/themes/global-colors';
import images from 'src/assets/images';
import {TextInput} from 'react-native-gesture-handler';
import PostStatusButton from '../post-status';

export default function PostStatus({
  value,
  onChangeText,
  onPressPostButton,
  postButtonText,
}) {
  return (
    <>
      <View style={styles.borderLine} />
      <View style={styles.container}>
        <View style={styles.imageTextView}>
          <Image source={images.people} style={styles.image} />
          <TextInput
            placeholder="Share what you are thinking here..."
            style={styles.textInput}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
      </View>
      <View style={styles.borderLine} />
      <View style={styles.buttonView}>
        <PostStatusButton
          text={postButtonText}
          backgroundColor={colors.buttonColor}
          onPress={onPressPostButton}
        />
      </View>
      <View style={styles.borderLine} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingBottom: '35%',
  },
  image: {
    borderRadius: 42 / 2,
    height: 42,
    width: 42,
  },
  imageTextView: {
    flex: 1,
    flexDirection: 'row',
  },
  textInput: {
    paddingLeft: 10,
    fontSize: 13,
  },
  borderLine: {
    borderWidth: 0.5,
    marginTop: 5,
    borderColor: colors.innerBorder,
  },
  buttonView: {
    alignSelf: 'flex-end',
    height: 30,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
  },
});
