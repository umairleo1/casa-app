import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Heart from 'assets/svg/Common/heart';
import Chart from 'assets/svg/Common/chat';
import colors from 'src/utils/themes/global-colors';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CommentInput from 'src/components/comment-input';

export default function Comments() {
  const navigation = useNavigation();

  const dummyData = [
    {
      text: 'Maria Valdez',
      mail: 'March 4 at 2:00pm',
      userImage: require('../../../../assets/images/findpeople/people.png'),
      content:
        'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
      postImage: require('../../../../assets/images/viewProfile/postImage.png'),
    },
  ];

  const commentsData = [
    {
      text: 'Maria Valdez',
      time: '3 hrs ago',
      userImage: require('../../../../assets/images/findpeople/people.png'),
      content:
        'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
      postImage: require('../../../../assets/images/viewProfile/postImage.png'),
    },
    {
      text: 'Maria Valdez',
      time: '3 hrs ago',
      userImage: require('../../../../assets/images/findpeople/people.png'),
      content:
        'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
      postImage: require('../../../../assets/images/viewProfile/postImage.png'),
    },
  ];

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
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={22}
              color={colors.placeholderColor}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.content}>{item.content}</Text>
        <View style={styles.row}>
          {[0, 1, 2].map(index => (
            <>
              {index == 0 && (
                <Image
                  source={item.postImage}
                  style={[
                    styles.postImage,
                    {width: [0, 1].length > 1 ? `${100 / 1}%` : '100%'},
                  ]}
                />
              )}
            </>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.row}>
            <TouchableOpacity>
              <Heart />
            </TouchableOpacity>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>18</Text>
            <Image source={item.userImage} style={styles.likeImg} />
            <Image
              source={item.userImage}
              style={[styles.likeImg, {marginLeft: wp(-2)}]}
            />
            <Image
              source={item.userImage}
              style={[styles.likeImg, {marginLeft: -8}]}
            />
            <View style={{width: 130}}>
              <Text style={[styles.text]}>
                <Text style={{fontWeight: 'bold'}}>Luis, Franco</Text>
                <Text style={{color: '#BBBBBB'}}> and 18 more liked this</Text>
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Chart onPress={() => navigation.navigate('COMMENTS')} />
            <Text style={[styles.text, {fontWeight: 'bold'}]}>6</Text>
          </View>
        </View>
      </View>
    );
  };

  const commentsList = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.commentView}>
          <View style={styles.commentView2}>
            <Image source={item.userImage} style={styles.image} />
            <View style={styles.commentView3}>
              <Text style={styles.commentName}>{item.text}</Text>
              <Text style={styles.commentTime}>{item.time}</Text>
              <Text style={styles.commentContent}>{item.content}</Text>
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

  return (
    <Header
      leftText="Company"
      rightIcon
      onPressBack={() => navigation.goBack()}>
      <ScrollView>
        <View>
          <FlatList
            data={dummyData}
            renderItem={listItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              marginHorizontal: 20,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.bottomLine}></View>
        <FlatList
          data={commentsData}
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
          onPressSend={undefined}
        />
      </View>
    </Header>
  );
}
