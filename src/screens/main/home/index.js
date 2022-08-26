/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import PostStatus from 'src/components/post-card';

import Heart from 'assets/svg/Common/heart';
import Chart from 'assets/svg/Common/chat';

import PopUpModal from 'src/components/pop-up-modal';
import {postServices} from 'src/services/post-service';
import {showMessage} from 'react-native-flash-message';
import images from 'src/assets/images';
import moment from 'moment';
import {profileServices} from 'src/services/profile-services';
import {setUserProfile} from 'src/redux/profile/profile-actions';
import ActivityIndicator from 'src/components/loader/activity-indicator';
import colors from 'src/utils/themes/global-colors';

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [popUpModal, setPopUpModal] = useState(false);
  const [feeds, setFeeds] = React.useState([]);
  const [limit, setLimit] = React.useState({
    currentPage: 1,
    limit: 25,
    availablePages: 1,
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const userData = useSelector(state => state?.profile?.userProfile);
  const [status, setStatus] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    getAllFeeds();
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const res = await profileServices.getUserProfile();
      dispatch(setUserProfile(res));
    } catch (error) {
      console.log('error -------', error);
      showMessage({
        message: error.errMsg,
        type: 'danger',
      });
    }
  };

  const getAllFeeds = async () => {
    try {
      setIsLoading(true);
      const res = await postServices.getHomeAllPostApi(
        limit.currentPage,
        limit.limit,
      );

      setFeeds(res.posts);
      setLimit({...limit, availablePages: res?.totalPages});
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

  const loadMore = async () => {
    setLimit({...limit, currentPage: limit.currentPage + 1});
    try {
      const result = await postServices.getHomeAllPostApi(
        limit.currentPage + 1,
        limit.limit,
      );

      setFeeds([...feeds, ...result.posts]);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const res = await postServices.getHomeAllPostApi('1', limit.limit);
      setFeeds(res.posts);
      setLimit({...limit, availablePages: res?.totalPages});
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };

  const handlePost = async () => {
    if (status == '') {
      showMessage({
        message: 'Post must not be empty',
        type: 'danger',
      });
    } else {
      let formdata = new FormData();
      try {
        formdata.append('description', status);
        await postServices.addPost(formdata);

        getAllFeeds();
        setStatus('');
      } catch (error) {
        console.log('error -------', error);
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };

  const ListItem = ({item}) => {
    const [like, setLike] = useState(item?.isLiked);

    const likePost = async id => {
      try {
        const result = await postServices.likePostApi(id);
        console.log(result);
        setLike(!like);
        // getAllFeeds();
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
        </View>
        <Text style={styles.content}>{item?.description}</Text>
        {item?.files?.length > 0 && (
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
            <TouchableOpacity
              onPress={() => {
                likePost(item._id);
              }}>
              <Heart
                color={like ? colors.danger : '#BBB'}
                fillColor={like ? colors.danger : '#BBB'}
              />
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
                {item?.likes?.length > 1 && (
                  <Text style={[styles.likedMore, {color: '#BBBBBB'}]}>
                    {' '}
                    and {item?.postlikes - 2} more liked this.
                  </Text>
                )}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('COMMENTS', {
                data: item,
                render: onRefresh,
                isLiked: like,
              })
            }
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
      leftImage={images.blueAppLogo}
      rightIcon
      onPressChat={() => navigation.navigate('CHAT_TAB')}
      onPressBack={() => navigation.goBack()}>
      <ActivityIndicator visible={isLoading} />
      <FlatList
        data={feeds}
        ListHeaderComponent={
          <PostStatus
            onPressPostButton={() => handlePost()}
            postButtonText={'Post Status'}
            onChangeText={setStatus}
            value={status}
          />
        }
        renderItem={({item}) => <ListItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          marginHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', fontSize: 20, marginVertical: 50}}>
            No Feeds Yet
          </Text>
        }
        onEndReached={() => {
          limit.currentPage <= limit.availablePages && loadMore();
        }}
        onEndReachedThreshold={0.2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <PopUpModal
        iconPress={() => setPopUpModal(false)}
        visible={popUpModal}
        onPressDelPost={() => alert('delete post')}
        onPressEditPost={() => navigation.navigate('ADD_POST')}
        deleteText={'Delete Post'}
        editText={'Edit Post'}
      />
    </Header>
  );
}
