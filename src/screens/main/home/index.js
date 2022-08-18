/* eslint-disable react/prop-types */
import {Text, View, FlatList, ScrollView, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import PostStatus from 'src/components/post-card';
import colors from 'src/utils/themes/global-colors';

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
          <MaterialCommunityIcons
            name="dots-vertical"
            size={22}
            color={colors.placeholderColor}
          />
        </View>
        <Text style={styles.content}>{item.content}</Text>
        <Image source={item.postImage} style={styles.postImage} />
      </View>
    );
  };

  return (
    <Header onPressBack={() => navigation.goBack()}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PostStatus postButtonText={'Post Status'} />
        <FlatList
          data={dummyData}
          renderItem={listItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginHorizontal: 20,
            marginTop: 15,
          }}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </Header>
  );
}
