import {Text, View, FlatList, ScrollView, Image} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';
import BackgroundImageWithImage from 'src/components/backgroundWithImage';
import PFF from 'src/components/pFF/Iindex';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import jwt_decode from 'jwt-decode';
import {useNavigation} from '@react-navigation/native';

import images from 'src/assets/images';
import colors from 'src/utils/themes/global-colors';
import FollowButton from 'src/components/followButton';
import {useDispatch, useSelector} from 'react-redux';
import {profileServices} from 'src/services/profile-services';
import {showMessage} from 'react-native-flash-message';

export default function ViewProfile() {
  const userToken = useSelector(state => state?.auth?.userToken);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const dummyData = [
    {
      text: 'Maria Valdez',
      mail: 'March 4 at 2:00pm',
      userImage: require('../../../assets/images/findpeople/people.png'),
      content:
        'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
      postImage: require('../../../assets/images/viewProfile/postImage.png'),
    },
    {
      text: 'Maria Valdez',
      mail: 'March 4 at 2:00pm',
      userImage: require('../../../assets/images/findpeople/people.png'),
      content:
        'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
      postImage: require('../../../assets/images/viewProfile/postImage.png'),
    },
    {
      text: 'Maria Valdez',
      mail: 'March 4 at 2:00pm',
      userImage: require('../../../assets/images/findpeople/people.png'),
      content:
        'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
      postImage: require('../../../assets/images/viewProfile/postImage.png'),
    },
  ];
  const getProfile = async value => {
    try {
      const res = await profileServices.getUserProfile(
        jwt_decode(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmZjZGE3YjliYjY0NWUzZDhjNGEwNjUiLCJpYXQiOjE2NjA3Mzk1NTcsImV4cCI6MTY5MjI5NzE1N30.ZFhCXgsuf24JoBY_kyertPJENiKmO6aIJjfxf-SvAhk',
        ),
      );

      console.log('result', res);
    } catch (error) {
      console.log('error', error);
      showMessage({
        message: error.errMsg,
        type: 'danger',
      });
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  const listItem = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.flatlistView}>
          <View style={styles.flatlistView2}>
            <Image source={item.userImage} style={styles.image} />
            <View style={styles.flatlistView3}>
              <Text style={styles.flatlistName}>{item.text}</Text>
              <Text style={styles.mail}>{item.mail}</Text>
            </View>
          </View>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={22}
            color={colors.placeholderColor}
          />
        </View>
        <Text style={styles.content}>{item.content}</Text>
        <Image source={item.postImage} style={styles.postImage} />
      </View>
    );
  };

  return (
    <Header onPressBack={() => navigation.goBack()} feather={'setting'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackgroundImageWithImage
          imageBackGround={images.viewProfile}
          image={images.people}
        />
        <Text style={styles.name}>Maria Valdez</Text>
        <Text style={styles.description}>
          hey I m isai founder of synkbooks
        </Text>
        <FollowButton text="Follow" backgroundColor={colors.buttonColor} />

        <PFF
          postName={'Posts'}
          postPoints={`1.5k`}
          followersPoint={200}
          followersName={'Followers'}
          followingPoints={230}
          followingName={'Following'}
        />
        <FlatList
          data={dummyData}
          renderItem={listItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginHorizontal: 20,
            marginTop: 15,
          }}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </Header>
  );
}
