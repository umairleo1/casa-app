/* eslint-disable react/prop-types */
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React,{useRef} from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';
import Heart from 'assets/svg/Common/heart';
import Chart from 'assets/svg/Common/chat';

import {useNavigation, useRoute} from '@react-navigation/native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {showMessage} from 'react-native-flash-message';
import CommentInput from 'src/components/comment-input';
import images from 'src/assets/images';
import moment from 'moment';
import {postServices} from 'src/services/post-service';
import colors from 'src/utils/themes/global-colors';

export default function Comments() {
  const navigation = useNavigation();
  const route = useRoute();
  const ref = useRef();

  const [post, setPost] = React.useState(route?.params?.data);
  // const [comment, setComment] = React.useState('');

  const addComment = async comment => {
    Keyboard.dismiss();

    try {
      const result = await postServices.addCommentApi(
        route?.params?.data?._id,
        {commentText: comment},
      );

      setPost(result?.post1);
      route?.params?.render();
    } catch (error) {
      console.log(error);
      showMessage({
        message: error.errMsg,
        type: 'danger',
      });
    }
  };

  const likePost = async () => {
    try {
      const result = await postServices.likePostApi(route?.params?.data?._id);
      console.log(result);
      route?.params?.render();
    } catch (error) {
      console.log(error);
      showMessage({
        message: error.errMsg,
        type: 'danger',
      });
    }
  };

  const ListItem = ({item}) => {
    const [like, setLike] = React.useState(route?.params?.isLiked);
    const [isLoading, setIsLoading] = React.useState(false);
    const [likeValue, setLikeValue] = React.useState(
      route?.params?.data?.postlikes,
    );
    return (
      <View style={styles.mainContainer}>
        <View style={styles.flatlistView}>
          <View style={styles.flatlistView2}>
            <ImageMemoized
              src={
                item?.postedBy?.profileImage
                  ? {uri: item?.postedBy?.profileImage}
                  : images.profile
              }
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
          <View style={[styles.row, {justifyContent: 'center'}]}>
            {isLoading && (
              <ActivityIndicator style={{position: 'absolute', zIndex: 1}} />
            )}
            <Image
              source={{uri: item?.files[0]?.url}}
              style={[styles.postImage]}
              resizeMode="center"
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
            />
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                !like
                  ? setLikeValue(likeValue + 1)
                  : setLikeValue(likeValue - 1),
                  setLike(!like),
                  likePost();
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
                {item?.likes?.length > 1 && (
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

  const commentsList = ({item}) => {
    return (
      <View style={[styles.mainContainer, {marginHorizontal: 10}]}>
        <View style={styles.commentView}>
          <View style={styles.commentView2}>
            <Image
              source={
                item?.commentBy?.profileImage
                  ? {uri: item?.commentBy?.profileImage}
                  : images.people
              }
              style={styles.image}
            />
            <View style={styles.commentView3}>
              <Text style={styles.commentName}>
                {item?.commentBy?.firstName + ' ' + item?.commentBy?.lastName}
              </Text>
              <Text style={styles.commentTime}>
                {moment(item?.commentedAt).format('MMM DD h:mm')}
              </Text>
              <Text style={styles.commentContent}>{item?.text}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#E6ECF5',
        }}
      />
    );
  };

  const scrollToBottom = ()=>ref.current.scrollToEnd({ animated: true })

  return (
    <Header
      leftImage={images.blueAppLogo}
      rightIcon
      onPressBack={() => navigation.goBack()}>
      <ScrollView 
      ref={ref}          
      onContentSizeChange={() => scrollToBottom()}
      style={{ height: 500 }}>
        <View>
          {/* <FlatList
            data={dummyData}
            renderItem={listItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              marginHorizontal: 20,
            }}
            showsVerticalScrollIndicator={false}
          /> */}
          <ListItem item={post} />
        </View>
        <View style={styles.bottomLine} />
        <FlatList
          data={post?.comments}
          renderItem={commentsList}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginHorizontal: 20,
            paddingBottom: hp(8),
          }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemDivider}
        />
      </ScrollView>

      <View style={styles.footerView}>
        <CommentInput
          placeholder={'write a comment...'}
          onPressEmoji={undefined}
          onPressSend={comment => addComment(comment)}
          // onPressIn={()=>scrollToBottom()}
          // onChangeText={setComment}
          // value={comment}
        />
      </View>
    </Header>
  );
}

const ImageComp = ({src}) => {
  return <Image resizeMode="contain" style={styles.image} source={src} />;
};
const ImageMemoized = React.memo(
  ImageComp,
  (prev, next) => prev.src === next.src,
);
