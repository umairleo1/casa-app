import {
  Text,
  View,
  TextInput,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import Header from 'src/components/headerView';
import {useNavigation} from '@react-navigation/native';
import UploadAddPost from 'src/components/upload-add-post';
import {styles} from './styles';
import Button from 'src/components/button';
import colors from 'src/utils/themes/global-colors';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import EditProfileModal from 'src/components/edit-profile-menu';
import images from 'src/assets/images';
import {postServices} from 'src/services/post-service';
import {showMessage} from 'react-native-flash-message';
import ActivityIndicator from 'src/components/loader/activity-indicator';

let cameraIs = false;

export default function AddPost() {
  const navigation = useNavigation();

  const [imageModal, setImageModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [addPost, setAddPost] = React.useState([]);
  const [description, setDescription] = React.useState('');

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
    if (description == '' || addPost.length == 0) {
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
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <Header onPressBack={() => navigation.goBack()} heading={'Add Post'}>
      <ActivityIndicator visible={isLoading} />
      <ScrollView>
        <View style={styles.mainView}>
          <UploadAddPost
            image={addPost?.uri ? {uri: addPost?.uri} : images.uploadImage}
            uploadImagetext={'Upload your image'}
            imageSize={'Max Size : 20 MB'}
            onPressUpload={() => setImageModal(true)}
            preview={addPost}
            onClosePress={() => {
              setAddPost([]), setDescription('');
            }}
          />
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.description}>Add Description</Text>
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
      </ScrollView>
      <View style={styles.buttonView}>
        <Button
          backgroundColor={colors.buttonColor}
          text={'Post'}
          onPress={() => handleAddNewPost()}
        />
      </View>
      <EditProfileModal
        iconPress={() => setImageModal(false)}
        visible={imageModal}
        onPressGallery={() => imagePickerFromGallery()}
        onPressPhoto={() => imagePickerFromCamera()}
        title="Add Post From"
      />
    </Header>
  );
}
