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
import {
  ZoomPicModal,
  ZoomBackgroundPicModal,
} from 'src/components/zoom-pic-modal';
import ActivityIndicator from 'src/components/loader/activity-indicator';
import AuthContext from 'src/utils/auth-context';
import {useIsFocused} from '@react-navigation/native';
import CountryPickerModal from 'src/components/country-picker';
import MultiSelect from 'react-native-multiple-select';
import MultiSelectPicker from 'src/components/multi-select-picker';
import CustomPicker from 'src/components/paper-dropdown';
import {getCountries, getStates} from 'src/utils/functions/location';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

let cameraIs = false;

export default function ProfileSetting() {
  const focused = useIsFocused();
  const authContext = useContext(AuthContext);
  const [loader, setLoader] = useState(false);

  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editUserName, setEditUserName] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');

  const [bio, setBio] = useState('');

  const [imageModal, setImageModal] = useState(false);
  const [zoomPicModal, setZoomPicModal] = useState(false);
  const [zoomBackPicModal, setZoomBackPicModal] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(false);

  const [profile, setProfile] = useState({dp: '', cover: ''});

  const navigation = useNavigation();
  const userToken = useSelector(state => state?.auth?.userToken);
  //

  const [heritage, setHeritage] = React.useState('');
  const [states, setStates] = React.useState([]);
  //
  const [values, setValues] = React.useState('');
  const [countryCode, setCountryCode] = React.useState('');
  const [DATA, setDAta] = React.useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const onSelect = Country => {
    console.log(Country);
    setCountryCode(Country.cca2);
    setValues(Country);
  };

  useEffect(() => {
    getUserOnFocus();
  }, [focused]);

  useEffect(() => {
    for (var i = 0; i < getCountries().length; i++) {
      DATA.push({label: getCountries()[i], value: i + 1});
    }
    setFirstName(authContext?.userData?.user?.firstName);
    setLastName(authContext?.userData?.user?.lastName);
    setUserName(authContext?.userData?.user?.userName);
    setCity(authContext?.userData?.user?.city);
    setValues(authContext?.userData?.user?.country);
    setCountryCode(authContext?.userData?.user?.country?.cca2 || 'US');
    setHeritage(authContext?.userData?.user?.state || 'Select States');
    setSelectedItems(
      authContext?.userData?.user?.heritage.map(e => parseInt(e)),
    );
    setBio(authContext?.userData?.user?.bio);
  }, []);

  useEffect(() => {
    setStates(getStates(values?.name ? values?.name : 'United States'));
  }, [values]);

  const getUserOnFocus = async () => {
    const res = await profileServices.getUserProfile();
    console.log('ressss', res);

    setProfile({dp: res?.user?.profileImage, cover: res?.user?.coverImage});

    authContext.setUserData(res);
  };

  const handleSave = async () => {
    // console.log('selectedItems ', selectedItems);
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
          userName,
          ...(values?.name && {
            country: {name: values?.name, cca2: values?.cca2},
          }),
          ...(city && {city}),
          ...(heritage && {state: heritage}),
          ...(selectedItems && {heritage: selectedItems}),
        },
      );
      console.log('here is the success ', result);
      setEditFirstName(false);
      setEditLastName(false);
      setEditPassword(false);
      setEditUserName(false);
      const res = await profileServices.getUserProfile();
      console.log('user prof    ===> ', res);
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
            setProfile({...profile, cover: res?.assets[0]?.uri});
            updateCoverPicture(res.assets[0].base64);
          } else {
            setProfile({...profile, dp: res?.assets[0]?.uri});
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
                setProfile({...profile, cover: res?.assets[0]?.uri});
                updateCoverPicture(res.assets[0].base64);
              } else {
                setProfile({...profile, dp: res?.assets[0]?.uri});
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
        <KeyboardAwareScrollView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <BackgroundImageWithImage
              imageBackGround={profile?.cover}
              editImage={images.editImage}
              image={profile?.dp}
              showEdit={true}
              editBackGround={() => {
                setCoverPhoto(true);
                setImageModal(true);
              }}
              onPressProfileImage={() => {
                setCoverPhoto(false);
                setImageModal(true);
              }}
              onPressZoomProfile={() => setZoomPicModal(true)}
              onPressBackgroundZoom={() => setZoomBackPicModal(true)}
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
                  placeholder={'User Name'}
                  editIcon={'edit-3'}
                  editIconSize={16}
                  editable={editUserName}
                  placeholderTextColor={
                    editUserName ? colors.black : colors.placeholderColor
                  }
                  editIconColor={
                    editUserName ? colors.black : colors.placeholderColor
                  }
                  disableColor={
                    editUserName ? colors.black : colors.placeholderColor
                  }
                  onPress={() => {
                    editUserName
                      ? setEditUserName(false)
                      : !editUserName
                      ? setEditUserName(true)
                      : editUserName;
                  }}
                  value={userName}
                  onChangeText={setUserName}
                  borderColor={
                    editUserName ? colors.pureBlack : colors.innerBorder
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
                <CountryPickerModal
                  onSelect={Country => onSelect(Country)}
                  countryText={
                    values?.name
                      ? values?.name
                      : authContext?.userData?.user?.country?.name
                  }
                  countryCode={countryCode}
                />
              </View>

              <View style={styles.SearchInputView}>
                <SearchInput
                  placeholder={'City'}
                  editIconSize={16}
                  placeholderTextColor={colors.placeholderColor}
                  onChangeText={setCity}
                  borderColor={colors.innerBorder}
                  value={city}
                />
              </View>

              <View style={styles.SearchInputView}>
                <CustomPicker
                  defaultValue={heritage}
                  onSelect={(value, name) => {
                    setHeritage(name), console.log('chacha ', value);
                  }}
                  options={states}
                />
              </View>

              <View>
                <MultiSelectPicker
                  multiSelect={selectedItems}
                  setMultiSelect={setSelectedItems}
                  data={DATA}
                />
              </View>

              <View style={styles.SearchInputView}>
                <CommentBox
                  placeholder={'Write your bio..'}
                  value={bio}
                  onChangeText={setBio}
                  placeholderTextColor={colors.black}
                  borderColor={
                    bio?.length > 0 ? colors.pureBlack : colors.innerBorder
                  }
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
        <EditProfileModal
          iconPress={() => setImageModal(false)}
          visible={imageModal}
          onPressGallery={() => imagePickerFromGallery()}
          onPressPhoto={() => imagePickerFromCamera()}
        />
        <ZoomPicModal
          visible={zoomPicModal}
          iconPress={() => setZoomPicModal(false)}
          image={profile?.dp}
          imageStyle={{height: '60%', width: '90%'}}
        />
        <ZoomBackgroundPicModal
          visible={zoomBackPicModal}
          iconPress={() => setZoomBackPicModal(false)}
          image={profile?.cover}
          imageStyle={{height: '60%', width: '90%'}}
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
