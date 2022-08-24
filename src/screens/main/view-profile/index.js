/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Text,
  ScrollView,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import moment from 'moment';
import {styles} from './styles';
import Header from 'src/components/headerView';
import BackgroundImageWithImage from 'src/components/backgroundWithImage';
import PFF from 'src/components/pFF/Iindex';

import {useNavigation} from '@react-navigation/native';

import colors from 'src/utils/themes/global-colors';
import FollowButton from 'src/components/followButton';
import {profileServices} from 'src/services/profile-services';
import {showMessage} from 'react-native-flash-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Heart from 'assets/svg/Common/heart';
import Chart from 'assets/svg/Common/chat';
import {postServices} from 'src/services/post-service';
import images from 'src/assets/images';

export default function ViewProfile({route}) {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const [loder, setLoader] = React.useState(false);
  const [myAllPosts, setAllPosts] = React.useState([]);
  const [userPosts, setUserPosts] = React.useState([]);

  const getProfile = async () => {
    console.log('route?.params?.id', route?.params?.id);
    try {
      const res = await profileServices.getUserProfileById(
        route?.params?.id || '',
      );
      console.log('res-------------', res);
      setData(res);
    } catch (error) {
      console.log('error -------', error);
      showMessage({
        message: error.errMsg,
        type: 'danger',
      });
    }
  };

  const getMyAllPosts = async () => {
    try {
      const res = await postServices.getAllMyPostApi();
      console.log('res my all posts-------------', res);
      setAllPosts(res);
    } catch (error) {
      console.log('error -------', error);
      showMessage({
        message: error.errMsg,
        type: 'danger',
      });
    }
  };

  const getUsersAllPosts = async () => {
    try {
      const res = await postServices.getUsersAllPostApi(route?.params?.id);
      console.log('user all posts-------------', res);
      setUserPosts(res.post);
    } catch (error) {
      console.log('error -------', error);
      showMessage({
        message: error.errMsg,
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    getProfile();
    getMyAllPosts();
    route?.params?.id && getUsersAllPosts();
  }, []);

  const onPressFollowBtn = async () => {
    setLoader(true);
    try {
      if (data?.isFollowing) {
        const result = await profileServices.unFollowApiApi(
          route?.params?.id || '',
        );
        console.log('unFollowApiApi==>', result);
        const res = await profileServices.getUserProfileById(
          route?.params?.id || '',
        );
        console.log('resisF', res);
        setData(res);
        setLoader(false);
      } else {
        const result = await profileServices.followTo(route?.params?.id || '');
        console.log('getFollowingApi==>', result);
        const res = await profileServices.getUserProfileById(
          route?.params?.id || '',
        );
        setData(res);
        console.log('!resisF', res);
        setLoader(false);
      }

      //getFollowing();
    } catch (error) {
      setLoader(false);
      console.log('error', error);
      const res = await profileServices.getUserProfileById(
        route?.params?.id || '',
      );
      console.log('catchres', res);
      setData(res);
    }
  };

  const listItem = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.flatlistView}>
          <View style={styles.flatlistView2}>
            <Image
              source={
                item?.postedBy?.profileImage
                  ? {uri: item?.postedBy?.profileImage}
                  : images.profile
              }
              style={styles.image}
            />
            <View style={styles.flatlistView3}>
              <Text style={styles.flatlistName}>
                {item?.postedBy?.firstName + ' ' + item?.postedBy?.lastName}
              </Text>
              <Text style={styles.mail}>
                {moment(item?.createdAt).format('MMM DD YYYY')}
              </Text>
            </View>
          </View>
          {!route?.params?.id && (
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color={colors.placeholderColor}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.content}>{item?.description}</Text>
        {item?.files.length > 0 && (
          <View style={styles.row}>
            <Image
              source={{uri: item?.files[0]?.url}}
              style={[styles.postImage]}
              resizeMode="cover"
            />
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.row}>
            <TouchableOpacity>
              <Heart />
            </TouchableOpacity>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>
              {item?.postlikes}
            </Text>
            <Image source={images.people} style={styles.likeImg} />
            <Image
              source={images.people}
              style={[styles.likeImg, {marginLeft: -8}]}
            />
            <Image
              source={images.people}
              style={[styles.likeImg, {marginLeft: -8}]}
            />
            <View style={{width: 130}}>
              <Text style={[styles.text]}>
                <Text style={[styles.likedMore, {fontWeight: 'bold'}]}>
                  {item?.likes[0]?.likesBy?.firstName}
                  {item?.likes[1] && ', '}
                  {item?.likes[1]?.likesBy?.firstName}
                </Text>
                {item?.likes.length > 1 && (
                  <Text style={[styles.likedMore, {color: '#BBBBBB'}]}>
                    {' '}
                    and {item?.postlikes - 2} more liked this.
                  </Text>
                )}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.row}>
            <Chart />
            <Text style={[styles.text, {fontWeight: 'bold'}]}>
              {item?.comments?.length}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Header
      onPressBack={() => navigation.goBack()}
      feather={'setting'}
      onPress={() => navigation.navigate('SETTING')}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackgroundImageWithImage
          imageBackGround={data?.user?.coverImage}
          image={data?.user?.profileImage}
        />
        <Text style={styles.name}>
          {(data?.user?.firstName || '') + ' ' + (data?.user?.lastName || '')}
        </Text>
        <Text style={styles.description}>{data?.user?.bio}</Text>
        {route?.params?.id && (
          <FollowButton
            onPress={() => onPressFollowBtn()}
            text={data?.isFollowing ? 'Following' : 'Follow'}
            backgroundColor={colors.buttonColor}
            loder={loder}
          />
        )}
        <PFF
          postName={'Posts'}
          postPoints={data?.totalPosts}
          followersPoint={data?.totalFollowers}
          followersName={'Followers'}
          followingPoints={data?.totalFollowing}
          followingName={'Following'}
          onPressFollowing={() =>
            navigation.navigate('Profile', {
              id: route?.params?.id || '',
              initial: 'Following',
            })
          }
          onPressFollower={() =>
            navigation.navigate('Profile', {
              id: route?.params?.id || '',
              initial: 'Followers',
            })
          }
        />

        <FlatList
          data={route?.params?.id ? userPosts : myAllPosts}
          renderItem={listItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginHorizontal: 20,
            marginTop: 15,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text
              style={{textAlign: 'center', fontSize: 20, marginVertical: 50}}>
              No Post Yet
            </Text>
          }
        />
      </ScrollView>
    </Header>
  );
}
