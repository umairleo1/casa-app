/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Text, FlatList, RefreshControl} from 'react-native';
import React, {useState} from 'react';

import Header from 'src/components/headerView';

import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import PostStatus from 'src/components/post-card';

import PopUpModal from 'src/components/pop-up-modal';
import {postServices} from 'src/services/post-service';
import {showMessage} from 'react-native-flash-message';
import images from 'src/assets/images';

import {profileServices} from 'src/services/profile-services';
import {setUserProfile} from 'src/redux/profile/profile-actions';
import ActivityIndicatorr from 'src/components/loader/activity-indicator';

import PostView from 'src/components/post-view';

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

  const getAllFeeds = async page => {
    try {
      setIsLoading(true);
      const res = await postServices.getHomeAllPostApi(
        page ? page : limit.currentPage,
        limit.limit,
      );
      console.log('Aho feeds    =====> ', res);
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
    try {
      const result = await postServices.getHomeAllPostApi(
        limit.currentPage + 1,
        limit.limit,
      );
      console.log('load more at ', limit.currentPage + 1, ' ', result);
      setFeeds([...feeds, ...result.posts]);
      setLimit({...limit, currentPage: limit.currentPage + 1});
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const res = await postServices.getHomeAllPostApi('1', limit.limit);
      setFeeds(res.posts);
      setLimit({...limit, availablePages: res?.totalPages, currentPage: 1});
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

        getAllFeeds(1);
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

  return (
    <Header
      leftImage={images.blueAppLogo}
      rightIcon
      onPressChat={() => navigation.navigate('CHAT_TAB')}
      onPressBack={() => navigation.goBack()}>
      <ActivityIndicatorr visible={isLoading} />

      <FlatList
        data={feeds}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <PostStatus
            onPressPostButton={() => handlePost()}
            postButtonText={'Post Status'}
            onChangeText={setStatus}
            value={status}
          />
        }
        renderItem={({item}) => <PostView onRefresh={onRefresh} item={item} />}
        contentContainerStyle={{
          marginHorizontal: 20,
        }}
        onEndReached={() => {
          limit.currentPage < limit.availablePages && loadMore();
        }}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <>
            <Text
              style={{textAlign: 'center', fontSize: 20, marginVertical: 50}}>
              No Feeds Yet
            </Text>
          </>
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
