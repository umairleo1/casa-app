/* eslint-disable no-unused-vars */
import {
  Text,
  View,
  ScrollView,
  Keyboard,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {styles} from './styles';
import Header from 'src/components/headerView';
import {useNavigation} from '@react-navigation/native';
import SearchInput from 'src/components/searchInput';
import CommentBox from 'src/components/comment-box';
import Button from 'src/components/button';
import colors from 'src/utils/themes/global-colors';
import BackgroundImageWithImage from 'src/components/backgroundWithImage';
import images from 'src/assets/images';

import {useDispatch, useSelector} from 'react-redux';
import {profileServices} from 'src/services/profile-services';
import {setUserProfile} from 'src/redux/profile/profile-actions';
import jwt_decode from 'jwt-decode';

import {showMessage} from 'react-native-flash-message';
import EditProfileModal from 'src/components/edit-profile-menu';
import ActivityIndicator from 'src/components/loader/activity-indicator';
import AuthContext from 'src/utils/auth-context';
import {useIsFocused} from '@react-navigation/native';
let cameraIs = false;
export default function ProfileSetting() {
  const focused = useIsFocused();
  const authContext = useContext(AuthContext);
  const [loader, setLoader] = useState(false);

  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');

  const [imageModal, setImageModal] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(false);

  const navigation = useNavigation();

  const userToken = useSelector(state => state?.auth?.userToken);

  useEffect(() => {
    getUserOnFocus();
  }, [focused]);
  useEffect(() => {
    setFirstName(authContext?.userData?.user?.firstName);
    setLastName(authContext?.userData?.user?.lastName);
  }, []);
  const getUserOnFocus = async () => {
    const res = await profileServices.getUserProfile();
    console.log('ressss', res);

    authContext.setUserData(res);
  };

  const handleSave = async () => {
    Keyboard.dismiss();
    setLoader(true);
    try {
      const result = await profileServices.savePersonalInfo(
        jwt_decode(userToken)?.userId,
        {
          firstName: firstName,
          lastName: lastName,
          password: password,
          bio: bio,
        },
      );
      console.log('here is the success ', result);

      const res = await profileServices.getUserProfile();
      authContext.setUserData(res);

      setLoader(false);
      showMessage({
        message: 'Profile updated successfully',
        type: 'success',
      });
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  const updateProfilePicture = async base64Image => {
    Keyboard.dismiss();
    setLoader(true);
    try {
      const result = await profileServices.updateProfilePicture(
        jwt_decode(userToken)?.userId,
        {
          profileImage: `data:image/jpeg;base64,${base64Image}`,
        },
      );
      console.log('here is the success  Profile ', result);

      const res = await profileServices.getUserProfile();
      console.log('res', res);

      authContext.setUserData({
        ...res,
        user: {
          ...res.user,
          profileImage: res.user.profileImage + '?a=' + Math.random(),
        },
      });
      setLoader(false);
      showMessage({
        message: 'Profile updated successfully',
        type: 'success',
      });
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  const updateCoverPicture = async base64Image => {
    Keyboard.dismiss();
    setLoader(true);
    try {
      const result = await profileServices.updateProfilePicture(
        jwt_decode(userToken)?.userId,
        {
          coverImage: `data:image/jpeg;base64,${base64Image}`,
        },
      );
      console.log('here is the success cover Profile ', result);

      const res = await profileServices.getUserProfile();
      authContext.setUserData({
        ...res,
        user: {
          ...res.user,
          coverImage: res.user.coverImage + '?a=' + Math.random(),
        },
      });
      setLoader(false);
      showMessage({
        message: 'Profile updated successfully',
        type: 'success',
      });
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  const imagePickerFromGallery = () => {
    setImageModal(false);
    if (!cameraIs) {
      cameraIs = true;
      let options = {
        mediaType: 'photo',
        selectionLimit: 1,
        includeBase64: true,
        quality: 0.5,
      };
      launchImageLibrary(options, res => {
        if (res.didCancel) {
          cameraIs = false;
        } else if (res.errorMessage) {
          cameraIs = false;
        } else {
          if (coverPhoto) {
            updateCoverPicture(res.assets[0].base64);
          } else {
            updateProfilePicture(res.assets[0].base64);
          }
          cameraIs = false;
        }
      });
    }
  };

  const imagePickerFromCamera = async () => {
    setImageModal(false);

    const granted =
      Platform.OS == 'ios' ||
      (await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'App Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }));
    if (granted) {
      if (!cameraIs) {
        cameraIs = true;

        let options = {
          mediaType: 'photo',
          includeBase64: true,
          quality: 0.5,
        };
        launchCamera(options, res => {
          if (res.didCancel) {
            cameraIs = false;
          } else if (res.errorMessage) {
            cameraIs = false;
          } else {
            if (res.assets) {
              if (coverPhoto) {
                updateCoverPicture(res.assets[0].base64);
              } else {
                updateProfilePicture(res.assets[0].base64);
              }
            }
            cameraIs = false;
          }
        });
      }
    }
  };

  return (
    <>
      <Header
        heading={'Profile Settings'}
        onPressBack={() => navigation.goBack()}>
        <ActivityIndicator visible={loader} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <BackgroundImageWithImage
            imageBackGround={authContext?.userData?.user?.coverImage}
            editImage={images.editImage}
            image={authContext?.userData?.user?.profileImage}
            editBackGround={() => {
              setCoverPhoto(true);
              setImageModal(true);
            }}
            onPressProfileImage={() => {
              setCoverPhoto(false);
              setImageModal(true);
            }}
          />
          <View style={styles.view}>
            <Text style={styles.text}>Personal Information</Text>
            <View style={styles.SearchInputView}>
              <SearchInput
                placeholder={'First Name'}
                editIcon={'edit-3'}
                editIconSize={16}
                editable={editFirstName}
                placeholderTextColor={
                  editPassword ? colors.black : colors.placeholderColor
                }
                editIconColor={
                  editFirstName ? colors.black : colors.placeholderColor
                }
                disableColor={
                  editFirstName ? colors.black : colors.placeholderColor
                }
                onPress={() => {
                  editFirstName
                    ? setEditFirstName(false)
                    : !editFirstName
                    ? setEditFirstName(true)
                    : editFirstName;
                }}
                value={firstName}
                onChangeText={setFirstName}
                borderColor={
                  editFirstName ? colors.pureBlack : colors.innerBorder
                }
              />
            </View>
            <View style={styles.SearchInputView}>
              <SearchInput
                placeholder={'Last Name'}
                editIcon={'edit-3'}
                editIconSize={16}
                editable={editLastName}
                placeholderTextColor={
                  editLastName ? colors.black : colors.placeholderColor
                }
                editIconColor={
                  editLastName ? colors.black : colors.placeholderColor
                }
                disableColor={
                  editLastName ? colors.black : colors.placeholderColor
                }
                onPress={() => {
                  editLastName
                    ? setEditLastName(false)
                    : !editLastName
                    ? setEditLastName(true)
                    : editLastName;
                }}
                value={lastName}
                onChangeText={setLastName}
                borderColor={
                  editLastName ? colors.pureBlack : colors.innerBorder
                }
              />
            </View>
            <View style={styles.SearchInputView}>
              <SearchInput
                placeholder={'Password'}
                editIcon={'edit-3'}
                editIconSize={16}
                editable={editPassword}
                placeholderTextColor={
                  editPassword ? colors.black : colors.placeholderColor
                }
                editIconColor={
                  editPassword ? colors.black : colors.placeholderColor
                }
                onPress={() => {
                  editPassword
                    ? setEditPassword(false)
                    : !editPassword
                    ? setEditPassword(true)
                    : editPassword;
                }}
                onChangeText={setPassword}
                borderColor={
                  editPassword ? colors.pureBlack : colors.innerBorder
                }
              />
            </View>
            <View style={styles.SearchInputView}>
              <CommentBox
                placeholder={
                  authContext?.userData?.user?.bio == ''
                    ? 'Write your bio..'
                    : authContext?.userData?.user?.bio
                }
                value={bio}
                onChangeText={setBio}
                placeholderTextColor={
                  bio.length > 0 ? colors.black : colors.placeholderColor
                }
                borderColor={
                  bio.length > 0 ? colors.pureBlack : colors.innerBorder
                }
              />
            </View>
          </View>
        </ScrollView>

        {/* <View style={styles.view}>
            <Text style={styles.text}>Personal Information</Text>
            <View style={styles.SearchInputView}>
              <SearchInput
                placeholder={
                  userData?.user?.firstName == ''
                    ? 'First Name'
                    : userData?.user?.firstName
                }
                editIcon={'edit-3'}
                placeholderTextColor={
                  editFirstName ? colors.black : colors.placeholderColor
                }
                editIconSize={16}
                editable={editFirstName}
                editIconColor={
                  editFirstName ? colors.black : colors.placeholderColor
                }
                onPress={() => {
                  editFirstName
                    ? setEditFirstName(false)
                    : !editFirstName
                    ? setEditFirstName(true)
                    : editFirstName;
                }}
                value={firstName}
                onChangeText={setFirstName}
                borderColor={
                  editFirstName ? colors.pureBlack : colors.innerBorder
                }
              />
            </View>
            <View style={styles.SearchInputView}>
              <SearchInput
                placeholder={
                  userData?.user.lastName == ''
                    ? 'Last Name'
                    : userData?.user.lastName
                }
                editIcon={'edit-3'}
                editIconSize={16}
                editable={editLastName}
                placeholderTextColor={
                  editLastName ? colors.black : colors.placeholderColor
                }
                editIconColor={
                  editLastName ? colors.black : colors.placeholderColor
                }
                onPress={() => {
                  editLastName
                    ? setEditLastName(false)
                    : !editLastName
                    ? setEditLastName(true)
                    : editLastName;
                }}
                value={lastName}
                onChangeText={setLastName}
                borderColor={
                  editLastName ? colors.pureBlack : colors.innerBorder
                }
              />
            </View>
            <View style={styles.SearchInputView}>
              <SearchInput
                placeholder={'Password'}
                editIcon={'edit-3'}
                editIconSize={16}
                editable={editPassword}
                placeholderTextColor={
                  editPassword ? colors.black : colors.placeholderColor
                }
                editIconColor={
                  editPassword ? colors.black : colors.placeholderColor
                }
                onPress={() => {
                  editPassword
                    ? setEditPassword(false)
                    : !editPassword
                    ? setEditPassword(true)
                    : editPassword;
                }}
                onChangeText={setPassword}
                borderColor={
                  editPassword ? colors.pureBlack : colors.innerBorder
                }
              />
            </View>
            <View style={styles.SearchInputView}>
              <CommentBox
                placeholder={
                  userData?.user?.bio == ''
                    ? 'Write your bio..'
                    : userData?.user?.bio
                }
                value={bio}
                onChangeText={setBio}
                placeholderTextColor={
                  bio.length > 0 ? colors.black : colors.placeholderColor
                }
                borderColor={
                  bio.length > 0 ? colors.pureBlack : colors.innerBorder
                }
              />
            </View>
          </View>
        </ScrollView> */}

        <EditProfileModal
          iconPress={() => setImageModal(false)}
          visible={imageModal}
          onPressGallery={() => imagePickerFromGallery()}
          onPressPhoto={() => imagePickerFromCamera()}
        />
      </Header>
      <View style={styles.buttonView}>
        <Button
          onPress={() => handleSave()}
          text="Save Changes"
          backgroundColor={colors.buttonColor}
        />
      </View>
    </>
  );
}
