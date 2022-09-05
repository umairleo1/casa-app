import {Text, View, Image, TouchableOpacity, Pressable} from 'react-native';
import React, {useState, memo} from 'react';
import {postServices} from 'src/services/post-service';
import {showMessage} from 'react-native-flash-message';
import images from 'src/assets/images';
import moment from 'moment';

import {useNavigation} from '@react-navigation/native';
import FlatListCustom from '../carosel-slider';
import {styles} from './styles';

import Heart from 'assets/svg/Common/heart';
import Chart from 'assets/svg/Common/chat';
import colors from 'src/utils/themes/global-colors';

const PostView = ({item, onRefresh}) => {
  const navigation = useNavigation();

  const [like, setLike] = useState(item?.isLiked);
  const [likeValue, setLikeValue] = React.useState(item?.postlikes);

  const likePost = async id => {
    try {
      const result = await postServices.likePostApi(id);
      console.log(result);
      !like ? setLikeValue(likeValue + 1) : setLikeValue(likeValue - 1);

      // await getAllFeeds();
      setLike(!like);
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Profile', {
                screen: 'USER_PROFILE',
                params: {id: item?.postedBy?._id},
              })
            }>
            <Image
              source={
                item?.postedBy?.profileImage
                  ? {uri: item?.postedBy?.profileImage}
                  : images.people
              }
              style={styles.image}
            />
          </TouchableOpacity>
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
      {item?.files?.length > 0 && <FlatListCustom data={item?.files} />}

      <View style={styles.footer}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              likePost(item._id);
            }}>
            <Heart color={like ? colors.danger : '#BBB'} />
          </TouchableOpacity>
          <Text style={[styles.text, {fontWeight: 'bold'}]}>{likeValue}</Text>
          {item?.likes.length > 0 && (
            <>
              <Image
                source={
                  item?.likes[0]?.likesBy?.profileImage
                    ? {uri: item?.likes[0].likesBy?.profileImage}
                    : images.people
                }
                style={styles.likeImg}
              />
              {item?.likes.length > 1 && (
                <Image
                  source={
                    item?.likes[1]?.likesBy?.profileImage
                      ? {uri: item?.likes[1].likesBy?.profileImage}
                      : images.people
                  }
                  style={[styles.likeImg, {marginLeft: -8}]}
                />
              )}
              {item?.likes.length > 2 && (
                <Image
                  source={
                    item?.likes[2]?.likesBy?.profileImage
                      ? {uri: item?.likes[2].likesBy?.profileImage}
                      : images.people
                  }
                  style={[styles.likeImg, {marginLeft: -8}]}
                />
              )}
            </>
          )}
          <Pressable
            style={{width: 130}}
            onPress={() => navigation.navigate('LIKES', {post: item})}>
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
          </Pressable>
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

export default memo(PostView);
