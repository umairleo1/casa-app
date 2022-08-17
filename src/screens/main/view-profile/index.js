import {Text, View, FlatList, ScrollView, Image} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';
import BackgroundImageWithImage from 'src/components/backgroundWithImage';
import PFF from 'src/components/pFF/Iindex';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import images from 'src/assets/images';
import colors from 'src/utils/themes/global-colors';
import FollowButton from 'src/components/followButton';
import {profileServices} from 'src/services/profile-services';
import {showMessage} from 'react-native-flash-message';

export default function ViewProfile({route}) {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);

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
      const res = await profileServices.getUserProfile(route?.params?.id);

      setData(res);
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
        <Text style={styles.name}>
          {data?.user?.firstName + ' ' + data?.user?.lastName}
        </Text>
        <Text style={styles.description}>
          hey I m isai founder of synkbooks
        </Text>
        <FollowButton
          text={data?.isFollowing ? 'Following' : 'Follow'}
          backgroundColor={colors.buttonColor}
        />

        <PFF
          postName={'Posts'}
          postPoints={data?.totalPosts}
          followersPoint={data?.totalFollowers}
          followersName={'Followers'}
          followingPoints={data?.totalFollowing}
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
