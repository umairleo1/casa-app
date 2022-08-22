import {Text, View, TextInput, ScrollView} from 'react-native';
import React from 'react';
import Header from 'src/components/headerView';
import {useNavigation} from '@react-navigation/native';
import UploadAddPost from 'src/components/upload-add-post';
import {styles} from './styles';
import Button from 'src/components/button';
import colors from 'src/utils/themes/global-colors';

export default function AddPost() {
  const navigation = useNavigation();
  return (
    <Header onPressBack={() => navigation.goBack()} heading={'Add Post'}>
      <ScrollView>
        <View style={styles.mainView}>
          <UploadAddPost
            image={require('../../../assets/images/addpost/defaultimage.png')}
            uploadImagetext={'Upload your image'}
            imageSize={'Max Size : 20 MB'}
            onPressUpload={undefined}
            imageBackGround={undefined}
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
          />
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button
          backgroundColor={colors.buttonColor}
          text={'Post'}
          onPress={undefined}
        />
      </View>
    </Header>
  );
}
