/* eslint-disable react/prop-types */
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import colors from 'src/utils/themes/global-colors';
import images from 'src/assets/images';
import {TextInput} from 'react-native-gesture-handler';
import PostStatusButton from '../post-status';
import AuthContext from 'src/utils/auth-context';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function PostStatus({
  value,
  onChangeText,
  onPressPostButton,
  postButtonText,
  onPressPlus,
}) {
  const authContext = useContext(AuthContext);
  return (
    <>
      <View style={styles.borderLine} />
      <View style={styles.container}>
        <View style={styles.imageTextView}>
          <Image
            source={
              authContext.userData?.user?.profileImage
                ? {uri: authContext.userData?.user?.profileImage}
                : images.people
            }
            style={styles.image}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Share what you are thinking here..."
            placeholderTextColor={colors.lightgrey}
            style={styles.textInput}
            value={value}
            onChangeText={text => onChangeText(text)}
            multiline
          />
        </View>
      </View>
      <View style={styles.borderLine} />
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.plusButton} onPress={onPressPlus}>
          <AntDesign name="pluscircle" color={colors.buttonColor} size={20} />
        </TouchableOpacity>
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
    marginRight: 20,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusButton: {
    marginRight: 10,
  },
});
