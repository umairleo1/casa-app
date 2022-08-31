/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Text,
  ScrollView,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import moment from 'moment';
import {styles} from './styles';
import Header from 'src/components/headerView';
import BackgroundImageWithImage from 'src/components/backgroundWithImage';
import PFF from 'src/components/pFF/Iindex';

import {useIsFocused, useNavigation} from '@react-navigation/native';

import colors from 'src/utils/themes/global-colors';
import FollowButton from 'src/components/followButton';
import {profileServices} from 'src/services/profile-services';
import {showMessage} from 'react-native-flash-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Heart from 'assets/svg/Common/heart';
import Chart from 'assets/svg/Common/chat';
import {postServices} from 'src/services/post-service';
import images from 'src/assets/images';
import PopUpModal from 'src/components/pop-up-modal';
import AlertMessage from 'src/components/alert-message';
import ActivityIndicatorr from 'src/components/loader/activity-indicator';
import {
  ZoomBackgroundPicModal,
  ZoomPicModal,
} from 'src/components/zoom-pic-modal';

export default function ViewProfile({route}) {
  const navigation = useNavigation();
  const focused = useIsFocused();

  const [data, setData] = React.useState([]);
  const [loder, setLoader] = React.useState(false);
  const [myAllPosts, setAllPosts] = React.useState([]);
  const [userPosts, setUserPosts] = React.useState([]);
  const [popUpModal, setPopUpModal] = React.useState(false);
  const [selectedPostId, setSelectedPostId] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [showimage, setShowImage] = React.useState(false);
  const [showCover, setShowCover] = React.useState(false);

  const getProfile = async () => {
    // console.log('route?.params?.id', route?.params?.id);
    try {
      const res = await profileServices.getUserProfileById(
        route?.params?.id || '',
      );
      // console.log('res-------------', res);
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
      // console.log('res my all posts-------------', res);
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
  const onRefresh = async () => {
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

  useEffect(() => {
    getProfile();
    getMyAllPosts();
    route?.params?.id && getUsersAllPosts();
  }, [focused]);

  const deletePost = async id => {
    try {
      setIsLoading(true);
      const result = await postServices.deletePostApi(id);
      console.log(result);
      getMyAllPosts();
      setSelectedPostId('');
      setIsLoading(false);
    } catch (error) {
      console.log('error -------', error);
      showMessage({
        message: error.errMsg,
        type: 'danger',
      });
      setIsLoading(false);
    }
  };

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

      route?.params?.updater();

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

  const ListItem = ({item}) => {
    // console.log('check ==========> ', item);
    const [like, setLike] = React.useState(item?.isLiked);
    const [likeValue, setLikeValue] = React.useState(item?.postlikes);
    const [isLoading, setIsLoading] = React.useState(false);

    const likePost = async id => {
      try {
        const result = await postServices.likePostApi(id);
        console.log(result);
        route?.params?.id ? getUsersAllPosts() : getMyAllPosts();
        setLike(!like);
        !like ? setLikeValue(likeValue + 1) : setLikeValue(likeValue - 1);
      } catch (error) {
        console.log(error);
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    };

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
            <TouchableOpacity
              onPress={() => {
                setPopUpModal(true), setSelectedPostId(item);
              }}>
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
            {isLoading && (
              <ActivityIndicator
                style={{position: 'absolute', zIndex: 101}}
                size="small"
                color={colors.buttonColor}
              />
            )}
            <Image
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
              source={{uri: item?.files[0]?.url}}
              style={[styles.postImage]}
              resizeMode="contain"
            />
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                likePost(item._id);
              }}>
              <Heart color={like ? colors.danger : '#BBB'} />
            </TouchableOpacity>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>{likeValue}</Text>
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('COMMENTS', {
                data: item,
                render: onRefresh,
                isLiked: like,
              });
            }}
            style={styles.row}>
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
      <ActivityIndicatorr visible={isLoading} />
      <ZoomPicModal
        visible={showimage}
        iconPress={() => setShowImage(false)}
        image={data?.user?.profileImage}
        imageStyle={{height: '60%', width: '90%'}}
      />
      <ZoomBackgroundPicModal
        visible={showCover}
        iconPress={() => setShowCover(false)}
        image={data?.user?.coverImage}
        imageStyle={{height: '60%', width: '90%'}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackgroundImageWithImage
          imageBackGround={data?.user?.coverImage}
          image={data?.user?.profileImage}
          showEdit={false}
          onPressZoomProfile={() => setShowImage(true)}
          onPressBackgroundZoom={() => setShowCover(true)}
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
          renderItem={({item}) => <ListItem item={item} />}
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </ScrollView>
      <PopUpModal
        iconPress={() => setPopUpModal(false)}
        visible={popUpModal}
        onPressDelPost={() => {
          setAlertMessage(true), setPopUpModal(false);
        }}
        // onPressDelPost={() => {
        //   deletePost(selectedPostId), setPopUpModal(false);
        // }}
        onPressEditPost={() => {
          setPopUpModal(false);
          navigation.navigate('ADD_POST', {
            myPost: selectedPostId,
            btn: 'Update',
          });
        }}
        deleteText={'Delete Post'}
        editText={'Edit Post'}
      />
      <AlertMessage
        visible={alertMessage}
        onPressNo={() => setAlertMessage(false)}
        onPressYes={() => {
          deletePost(selectedPostId?._id), setAlertMessage(false);
        }}
      />
    </Header>
  );
}
