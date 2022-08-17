import {
  Text,
  View,
  ScrollView,
  Keyboard,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
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
let cameraIs = false;
export default function ProfileSetting() {
  const dispatch = useDispatch();

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

  const userData = useSelector(state => state?.profile?.userProfile);
  const userToken = useSelector(state => state?.auth?.userToken);

  const handleSave = async () => {
    Keyboard.dismiss();

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

      const res = await profileServices.getUserProfile(
        jwt_decode(userToken)?.userId,
      );

      dispatch(setUserProfile(res));

      showMessage({
        message: 'Profile updated successfully',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateProfilePicture = async base64Image => {
    Keyboard.dismiss();

    try {
      const result = await profileServices.updateProfilePicture(
        jwt_decode(userToken)?.userId,
        {
          profileImage: `data:image/jpeg;base64,${base64Image}`,
        },
      );
      console.log('here is the success  Profile ', result);

      const res = await profileServices.getUserProfile(
        jwt_decode(userToken)?.userId,
      );

      dispatch(setUserProfile(res));

      showMessage({
        message: 'Profile updated successfully',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateCoverPicture = async base64Image => {
    Keyboard.dismiss();

    try {
      const result = await profileServices.updateProfilePicture(
        jwt_decode(userToken)?.userId,
        {
          coverImage: `data:image/jpeg;base64,${base64Image}`,
        },
      );
      console.log('here is the success cover Profile ', result);

      const res = await profileServices.getUserProfile(
        jwt_decode(userToken)?.userId,
      );

      dispatch(setUserProfile(res));

      showMessage({
        message: 'Profile updated successfully',
        type: 'success',
      });
    } catch (error) {
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
    <Header
      heading={'Profile Settings'}
      onPressBack={() => navigation.goBack()}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackgroundImageWithImage
          imageBackGround={images.viewProfile}
          editImage={images.editImage}
          image={images.people}
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
              placeholder={
                userData?.firstName == '' ? 'First Name' : userData.firstName
              }
              editIcon={'edit-3'}
              editIconSize={16}
              editable={editFirstName}
              editIconColor={
                editFirstName ? colors.black : colors.placeholderColor
              }
              onPress={() => setEditFirstName(true)}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.SearchInputView}>
            <SearchInput
              placeholder={
                userData.lastName == '' ? 'Last Name' : userData.lastName
              }
              editIcon={'edit-3'}
              editIconSize={16}
              editable={editLastName}
              editIconColor={
                editLastName ? colors.black : colors.placeholderColor
              }
              onPress={() => setEditLastName(true)}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <View style={styles.SearchInputView}>
            <SearchInput
              placeholder={'Password'}
              editIcon={'edit-3'}
              editIconSize={16}
              editable={editPassword}
              editIconColor={
                editPassword ? colors.black : colors.placeholderColor
              }
              onPress={() => setEditPassword(true)}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.SearchInputView}>
            <CommentBox
              placeholder={
                userData?.bio == '' ? 'Write your bio..' : userData?.bio
              }
              value={bio}
              onChangeText={setBio}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonView}>
        <Button
          onPress={() => handleSave()}
          text="Save Changes"
          backgroundColor={colors.buttonColor}
        />
      </View>
      <EditProfileModal
        iconPress={() => setImageModal(false)}
        visible={imageModal}
        onPressGallery={() => imagePickerFromGallery()}
        onPressPhoto={() => imagePickerFromCamera()}
      />
    </Header>
  );
}
