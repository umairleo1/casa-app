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
  const [addPost, setAddPost] = React.useState({
    source: '',
    type: '',
    description: '',
    fileName: '',
  });

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
          console.log('Selected from gallery ', res.assets[0]);

          setAddPost({
            ...addPost,
            source: res.assets[0].uri,
            type: res.assets[0].type,
            fileName: res.assets[0].fileName,
          });
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
              console.log('reee', res.assets[0]);
              setAddPost({
                ...addPost,
                source: res.assets[0].uri,
                type: res.assets[0].type,
                fileName: res.assets[0].fileName,
              });
            }
            cameraIs = false;
          }
        });
      }
    }
  };

  const handleAddNewPost = async () => {
    console.log({addPost});
    if (addPost.description == '' || addPost.source == '') {
      showMessage({
        message: 'Post and description must not be empty',
        type: 'danger',
      });
    } else {
      let formdata = new FormData();
      try {
        setIsLoading(true);
        // const res = await fetch(addPost.source);

        // const name =
        //   addPost.source.split('/')[addPost.source.split('/').length - 1];
        // const blob = await res.blob();
        // console.log('blob', blob);
        formdata.append('myFiles', {
          uri: addPost.source,
          type: addPost.type,
          name: addPost.type == 'video/mp4' ? 'video.mp4' : addPost.fileName,
        });
        formdata.append('description', addPost.description);

        const result = await postServices.addPost(formdata);
        console.log('Success add post ', result);
        setAddPost({
          source: '',
          type: '',
          description: '',
          fileName: '',
        });
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
            image={addPost.source ? {uri: addPost.source} : images.uploadImage}
            uploadImagetext={'Upload your image'}
            imageSize={'Max Size : 20 MB'}
            onPressUpload={() => setImageModal(true)}
            preview={addPost}
            onClosePress={() => setAddPost({...addPost, source: '', type: ''})}
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
            onChangeText={text => setAddPost({...addPost, description: text})}
            value={addPost.description}
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
