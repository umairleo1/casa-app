import {Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';
import {useNavigation} from '@react-navigation/native';
import SearchInput from 'src/components/searchInput';
import CommentBox from 'src/components/comment-box';
import Button from 'src/components/button';
import colors from 'src/utils/themes/global-colors';
import BackgroundImageWithImage from 'src/components/backgroundWithImage';
import images from 'src/assets/images';

export default function ProfileSetting() {
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const navigation = useNavigation();
  return (
    <Header
      heading={'Profile Settings'}
      onPressBack={() => navigation.goBack()}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackgroundImageWithImage
          imageBackGround={images.viewProfile}
          editImage={images.editImage}
          image={images.people}
        />
        <View style={styles.view}>
          <Text style={styles.text}>Personal Information</Text>
          <View style={styles.SearchInputView}>
            <SearchInput
              placeholder={'First Name'}
              editIcon={'edit-3'}
              editIconSize={16}
              editable={editFirstName}
              editIconColor={
                editFirstName ? colors.black : colors.placeholderColor
              }
              onPress={() => setEditFirstName(true)}
            />
          </View>
          <View style={styles.SearchInputView}>
            <SearchInput
              placeholder={'Last Name'}
              editIcon={'edit-3'}
              editIconSize={16}
              editable={editLastName}
              editIconColor={
                editLastName ? colors.black : colors.placeholderColor
              }
              onPress={() => setEditLastName(true)}
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
            />
          </View>
          <View style={styles.SearchInputView}>
            <CommentBox placeholder={'Write your bio..'} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonView}>
        <Button text="Save Changes" backgroundColor={colors.buttonColor} />
      </View>
    </Header>
  );
}
