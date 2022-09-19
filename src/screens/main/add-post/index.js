/* eslint-disable no-unused-vars */
import {
  Text,
  View,
  TextInput,
  Platform,
  PermissionsAndroid,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import Header from 'src/components/headerView';
import {useNavigation, useRoute} from '@react-navigation/native';
import UploadAddPost from 'src/components/upload-add-post';
import {styles} from './styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from 'src/utils/themes/global-colors';
import AuthContext from 'src/utils/auth-context';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import EditProfileModal from 'src/components/edit-profile-menu';
import images from 'src/assets/images';
import {postServices} from 'src/services/post-service';
import {showMessage} from 'react-native-flash-message';

import ActivityIndicator from 'src/components/loader/activity-indicator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {AddPostBottomSheet} from 'src/components/add-post-bottom-sheet';
import {Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

let cameraIs = false;

export default function AddPost() {
  const navigation = useNavigation();
  const route = useRoute();
  const refRBSheet = React.useRef();
  const authContext = useContext(AuthContext);

  const [imageModal, setImageModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [addPost, setAddPost] = React.useState([]);
  const [removed, setRemoved] = React.useState([]);
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    // console.log(' UseEffect ', authContext?.userData?.user);
    route?.params?.myPost && setDescription(route?.params?.myPost?.description);
    route?.params?.myPost && setAddPost(route?.params?.myPost?.files);
    !route?.params?.myPost && refRBSheet?.current?.open();
  }, []);

  const imagePickerFromGallery = () => {
    setImageModal(false);
    if (!cameraIs) {
      cameraIs = true;
      let options = {
        mediaType: 'mixed',
        selectionLimit: 8,
        includeBase64: true,
        quality: 0.5,
        videoQuality: Platform.OS == 'ios' ? 'low' : 'medium',
      };
      launchImageLibrary(options, res => {
        if (res.didCancel) {
          cameraIs = false;
        } else if (res.errorMessage) {
          cameraIs = false;
        } else {
          console.log('Selected from gallery ', res.assets);
          refRBSheet.current.close();
          setAddPost(res.assets);

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
              console.log('reee', res.assets);
              setAddPost(res.assets);
            }
            cameraIs = false;
          }
        });
      }
    }
  };

  const handleAddNewPost = async () => {
    Keyboard.dismiss();
    if (description == '') {
      showMessage({
        message: 'Post and description must not be empty',
        type: 'danger',
      });
    } else {
      let formdata = new FormData();
      try {
        setIsLoading(true);

        for (var i = 0; i < addPost.length; i++) {
          formdata.append('myFiles', {
            uri: addPost[i]?.uri,
            type: addPost[i]?.type,
            name:
              addPost[i]?.type == 'video/mp4'
                ? 'video.mp4'
                : addPost[i]?.fileName,
          });
        }

        formdata.append('description', description);

        const result = await postServices.addPost(formdata);
        console.log('Success add post ', result);
        setAddPost([]);
        setDescription('');
        navigation.navigate('Home');
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };

  const handleEditPost = async () => {
    if (description == '') {
      showMessage({
        message: 'Post and description must not be empty',
        type: 'danger',
      });
    } else {
      let formdata = new FormData();
      try {
        setIsLoading(true);
        //add new files
        for (var i = 0; i < addPost.length; i++) {
          formdata.append('myFiles', {
            uri: addPost[i]?.uri,
            type: addPost[i]?.type,
            name:
              addPost[i]?.type == 'video/mp4'
                ? 'video.mp4'
                : addPost[i]?.fileName,
          });
        }

        // remove files
        formdata.append(
          'removeFiles',
          JSON.stringify([...removed.map(e => e.name)]),
        );
        // JSON.stringify
        formdata.append('description', description);
        console.log(formdata);
        const result = await postServices.editPost(
          route?.params?.myPost?._id,
          formdata,
        );
        console.log('Success edit post ', result);
        setAddPost([]);
        setDescription('');
        navigation.goBack();
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
        navigation.goBack();
      }
    }
  };

  return (
    <Header
      description={description}
      onPressBack={() => navigation.goBack()}
      heading={'Add Post'}
      rightText={route?.params?.btn ? route?.params?.btn : 'Post'}
      onPostPress={() =>
        route?.params?.btn ? handleEditPost() : handleAddNewPost()
      }>
      <ActivityIndicator visible={isLoading} />
      {/* <ScrollView> */}
      <KeyboardAwareScrollView>
        <UploadAddPost
          image={addPost?.uri ? {uri: addPost?.uri} : images.uploadImage}
          uploadImagetext={'Upload your image'}
          imageSize={'Max Size : 20 MB'}
          // onPressUpload={() => setImageModal(true)}
          onPressUpload={() => refRBSheet.current.open()}
          preview={addPost}
          onClosePress={setAddPost}
          setRemoved={setRemoved}
          removed={removed}
        />

        <View
          style={[
            styles.descriptionView,
            {flexDirection: 'row', alignItems: 'center', paddingLeft: 10},
          ]}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '80%'}}>
            <Image
              source={
                authContext?.userData?.user?.profileImage
                  ? {uri: authContext?.userData?.user?.profileImage}
                  : images.people
              }
              style={{height: 40, width: 40, borderRadius: 20}}
            />
            <Text style={styles.description}>
              {authContext?.userData?.user?.firstName +
                ' ' +
                authContext?.userData?.user?.lastName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => refRBSheet?.current?.open()}
            style={{
              width: '20%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Entypo name={'plus'} size={18} color={colors.black} />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={styles.textInputView}
            placeholder="Your text goes here..."
            placeholderTextColor={colors.placeholderColor}
            multiline={true}
            onChangeText={text => setDescription(text)}
            value={description}
          />
        </View>
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
      {/* <View style={styles.buttonView}>
        <Button
          backgroundColor={colors.buttonColor}
          text={route?.params?.btn ? route?.params?.btn : 'Post'}
          onPress={() =>
            route?.params?.btn ? handleEditPost() : handleAddNewPost()
          }
        />
      </View> */}
      {/* <EditProfileModal
        iconPress={() => setImageModal(false)}
        visible={imageModal}
        onPressGallery={() => imagePickerFromGallery()}
        onPressPhoto={() => imagePickerFromCamera()}
        title="Add Post From"
      /> */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={150}
        customStyles={{
          wrapper: {
            backgroundColor: `rgba(0, 0, 0, 0.2)`,
          },
          container: {
            backgroundColor: colors.whiteColor,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <AddPostBottomSheet
          onPhotoPress={() => imagePickerFromGallery()}
          onVideoPress={() => imagePickerFromGallery()}
        />
      </RBSheet>
    </Header>
  );
}
