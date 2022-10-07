/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Text, FlatList, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Header from 'src/components/headerView';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import images from 'src/assets/images';
import moment from 'moment';

export default function Likes() {
  const navigation = useNavigation();
  const route = useRoute();

  console.log('navigate ', route?.params?.post);

  const renderLikesList = ({item}) => {
    console.log('item ', item);
    return (
      <>
        <TouchableOpacity
          onPress={() =>
            // navigation.navigate('Profile', {
            //   screen: 'USER_PROFILE',
            //   params: {id: item?.likesBy?._id},
            // })
            navigation.navigate('USER_PROFILE', {
              id: item?.likesBy?._id,
            })
          }
          style={styles.mainContainer}>
          <View style={styles.flatlistView}>
            <View style={styles.flatlistView2}>
              <Image
                source={
                  item?.likesBy?.profileImage
                    ? {uri: item?.likesBy?.profileImage}
                    : images.people
                }
                style={styles.image}
              />
              <View style={styles.flatlistView3}>
                <Text style={styles.flatlistName}>
                  {item?.likesBy?.firstName + ' ' + item?.likesBy?.lastName}
                </Text>
              </View>
            </View>
            <Text style={styles.time}>
              {moment(item?.likedAt).format('MMM DD hh:mm A') || 'Month Ago'}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <Header onPressBack={() => navigation.goBack()} heading={'Liked'}>
      <FlatList
        data={route?.params?.post?.likes}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text style={styles.totalLikes}>
              All {route?.params?.post?.likes.length}
            </Text>
          </>
        }
        renderItem={renderLikesList}
        ListEmptyComponent={
          <>
            <Text
              style={{textAlign: 'center', fontSize: 20, marginVertical: 50}}>
              No Feeds Yet
            </Text>
          </>
        }
        // contentContainerStyle={{flex:1}}
      />
    </Header>
  );
}
