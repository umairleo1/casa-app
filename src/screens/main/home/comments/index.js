/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Linking,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';
import Heart from 'assets/svg/Common/heart';
import Chart from 'assets/svg/Common/chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';

import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {showMessage} from 'react-native-flash-message';
import CommentInput from 'src/components/comment-input';
import images from 'src/assets/images';
import moment from 'moment';
import {postServices} from 'src/services/post-service';
import colors from 'src/utils/themes/global-colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import {CommentsBottomSheet} from 'src/components/del-edit-bottomsheet';
import FlatListCustom from 'src/components/carosel-slider';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ZoomPicModal} from 'src/components/zoom-pic-modal';
import fonts from 'src/utils/themes/fonts';
import ActivityIndicator from 'src/components/loader/activity-indicator';

export default function Comments() {
  const navigation = useNavigation();
  const route = useRoute();
  const ref = useRef();
  const refRBSheet = useRef();

  const userProfile = useSelector(state => state?.profile?.userProfile);

  // const [post, setPost] = React.useState(route?.params?.data);
  const [post, setPost] = React.useState(null);
  const [selectedComment, setSelectedComent] = React.useState('');
  const [text, setText] = React.useState('');
  const [zoomPicModal, setZoomPicModal] = useState(false);
  const [profile, setProfile] = useState({dp: '', cover: ''});
  const [comment, setComment] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  var expression =
    /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;

  React.useEffect(() => {
    getPostByid(route?.params.postId);
  }, []);

  const getPostByid = async id => {
    try {
      const result = await postServices.getPostByIdApi(id);
      console.log('Here  is the post by id ', result);
      // console.log('Here  is the post by id ', route?.params?.data);
      setPost(result);
      setComment(result?.post?.comments);
      // route?.params?.render();
    } catch (error) {
      console.log(error);
      showMessage({
        message: error.errMsg,
        type: 'danger',
      });
    }
  };

  const addComment = async comment => {
    Keyboard.dismiss();
    console.log('comment==>', comment);
    try {
      const result = await postServices.addCommentApi(route?.params?.postId, {
        commentText: comment,
      });
      console.log('comment added ', result);
      setComment(result?.post1?.comments);
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
      // setIsLoading(true);
      const result = await postServices.likePostApi(route?.params?.postId);
      console.log(result);
      route?.params?.render();
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      showMessage({
        message: error.errMsg,
        type: 'danger',
      });
      setIsLoading(false);
    }
  };

  if (post == null) return;
  const ListItem = ({item}) => {
    console.log(item);
    const [like, setLike] = React.useState(
      post?.post?.isLiked || post?.post1?.isLiked,
    );

    const [likeValue, setLikeValue] = React.useState(post?.postlikes);
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

        <Text style={[styles.content]}>
          <Text>
            {item?.description?.split(item?.description?.match(expression))[0]}
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(item?.description?.match(expression)[0])
            }>
            <Text style={[styles.content, {fontWeight: 'bold'}]}>
              {item?.description?.match(expression)
                ? item?.description
                    ?.match(expression)[0]
                    ?.slice(0, 40)
                    ?.concat('...')
                : ''}
            </Text>
          </TouchableOpacity>
          <Text>
            {item?.description?.split(item?.description?.match(expression))[1]}
          </Text>
        </Text>

        {item?.files?.length > 0 && (
          <FlatListCustom
            setZoomPicModal={setZoomPicModal}
            setProfile={setProfile}
            data={item?.files}
          />
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
            <TouchableOpacity
              onPress={() => navigation.navigate('LIKES', {post: item})}
              style={{
                width: 130,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {item?.likes?.length > 0 && (
                <>
                  <Image
                    source={
                      item?.likes[0]?.likesBy?.profileImage
                        ? {uri: item?.likes[0].likesBy?.profileImage}
                        : images.people
                    }
                    style={styles.likeImg}
                  />
                  {item?.likes?.length > 1 && (
                    <Image
                      source={
                        item?.likes[1]?.likesBy?.profileImage
                          ? {uri: item?.likes[1].likesBy?.profileImage}
                          : images.people
                      }
                      style={[styles.likeImg, {marginLeft: -8}]}
                    />
                  )}
                  {item?.likes?.length > 2 && (
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

              <Text style={[styles.text]}>
                <Text style={[styles.likedMore, {fontWeight: 'bold'}]}>
                  {item?.likes[0]?.likesBy?.firstName}
                  {item?.likes[1] && ', '}
                  {item?.likes[1]?.likesBy?.firstName}
                </Text>
                {item?.likes?.length > 2 && (
                  <Text style={[styles.likedMore, {color: '#BBBBBB'}]}>
                    {' '}
                    and {item?.postlikes || 3 - 2} more liked this.
                  </Text>
                )}
              </Text>
            </TouchableOpacity>
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
    // console.log('xxxxfddfdfdf ', item);
    return (
      <View style={[styles.mainContainer, {marginHorizontal: 10}]}>
        <View style={styles.commentView}>
          <View style={styles.commentView2}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Profile', {
                  screen: 'USER_PROFILE',
                  params: {id: item?.commentBy?._id},
                })
              }>
              <Image
                source={
                  item?.commentBy?.profileImage
                    ? {uri: item?.commentBy?.profileImage}
                    : images.people
                }
                style={styles.image}
              />
            </TouchableOpacity>
            <View style={styles.commentView3}>
              <Text style={styles.commentName}>
                {item?.commentBy?.firstName + ' ' + item?.commentBy?.lastName}
              </Text>
              <Text style={styles.commentTime}>
                {moment(item?.commentedAt).format('MMM DD h:mm')}
              </Text>
              <Text style={styles.commentContent}>{item?.text}</Text>
            </View>

            {item?.commentBy?._id == userProfile?.user?._id && (
              <TouchableOpacity onPress={() => commentPress(item)}>
                <MaterialCommunityIcons
                  name="dots-vertical"
                  color="black"
                  size={20}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const commentPress = item => {
    refRBSheet.current.open();
    setSelectedComent(item);
    console.log(item);
  };

  const onEditCommentPress = async () => {
    refRBSheet.current.close();
    setText(selectedComment.text);
  };

  const editCommemt = async comment => {
    console.log('commentEdit', comment);
    try {
      const result = await postServices.editCommentApi(selectedComment._id, {
        commentText: comment,
      });

      result?.success && setComment(result?.post1?.comments);
      getPostByid(route?.params.postId);
      console.log(result);
      setSelectedComent('');
      setText('');
    } catch (error) {
      console.log(error);
      showMessage({
        message: error.errMsg,
        type: 'danger',
      });
    }
  };

  const onDeleteCommentPress = async () => {
    refRBSheet.current.close();

    try {
      const result = await postServices.deleteCommentApi(selectedComment._id);
      console.log('result', result);
      // setPost(result?.post1);
      setComment(result?.post1?.comments);
      getPostByid(route?.params.postId);
      setSelectedComent('');
      route?.params?.render();
    } catch (error) {
      console.log(error);
      showMessage({
        message: error.errMsg,
        type: 'danger',
      });
    }
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

  const scrollToBottom = () => ref.current.scrollToEnd({animated: true});

  return (
    <Header
      leftImage={images.blueAppLogo}
      rightIcon
      onPressBack={() => navigation.goBack()}>
      <ActivityIndicator visible={isLoading} />
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View style={{flex: 0.9}}>
          <View style={styles.bottomLine} />
          <FlatList
            data={comment}
            ref={ref}
            onContentSizeChange={() => scrollToBottom()}
            ListHeaderComponent={<ListItem item={post?.post} />}
            renderItem={commentsList}
            ListEmptyComponent={
              <Text style={{marginLeft: 20, fontFamily: fonts.RobotoRegular}}>
                No Comments Yet
              </Text>
            }
            keyExtractor={item => item?._id}
            contentContainerStyle={{
              marginHorizontal: 20,
            }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemDivider}
          />
        </View>
        <View style={{flex: 0.1}}>
          <View style={styles.footerView}>
            <CommentInput
              placeholder={'write a comment...'}
              onPressEmoji={undefined}
              onPressSend={comment => {
                console.log('commentIn put', comment);
                !text ? addComment(comment) : editCommemt(comment);
              }}
              value={text}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* <Emoji /> */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={120}
        customStyles={{
          wrapper: {
            backgroundColor: `rgba(0, 0, 0, 0.2)`,
          },
          container: {
            backgroundColor: colors.whiteColor,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <CommentsBottomSheet
          onPressEdit={() => onEditCommentPress()}
          onPressDel={() => onDeleteCommentPress()}
        />
      </RBSheet>
      <ZoomPicModal
        visible={zoomPicModal}
        iconPress={() => setZoomPicModal(false)}
        image={profile?.dp}
        imageStyle={{height: '60%', width: '90%', resizeMode: 'contain'}}
      />
    </Header>
  );
}

const ImageComp = ({src}) => {
  return <FastImage resizeMode="contain" style={styles.image} source={src} />;
};
const ImageMemoized = React.memo(
  ImageComp,
  (prev, next) => prev.src === next.src,
);
