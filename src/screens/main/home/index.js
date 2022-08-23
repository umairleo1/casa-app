/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import PostStatus from 'src/components/post-card';
import colors from 'src/utils/themes/global-colors';
import Heart from 'assets/svg/Common/heart';
import Chart from 'assets/svg/Common/chat';

export default function Home() {
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
                    {width: [0, 1].length > 1 ? `${100 / 2}%` : '100%'},
                  ]}
                />
              )}
            </>
          ))}
          {/* {[0, 1, 2].map(index => (
            <View style={{width: '50%'}}>
              {index <= 2 && (
                <Image
                  source={item.postImage}
                  style={[styles.postImage, {width: '100%', height: '50%'}]}
                />
              )}
            </View>
          ))} */}
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
              style={[styles.likeImg, {marginLeft: -8}]}
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
            <Chart />
            <Text style={[styles.text, {fontWeight: 'bold'}]}>6</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Header
      leftText="Company"
      rightIcon
      onPressBack={() => navigation.goBack()}>
      <FlatList
        data={dummyData}
        ListHeaderComponent={<PostStatus postButtonText={'Post Status'} />}
        renderItem={listItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          marginHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      />
    </Header>
  );
}
