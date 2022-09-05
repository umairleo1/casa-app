/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Text, FlatList,View,Image} from 'react-native';
import React, {useState} from 'react';
import Header from 'src/components/headerView';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';


export default function Likes() {
    const navigation = useNavigation();

    const listData=[
        {
            text: 'Maria Valdez',
            time: '3 min ago',
            userImage: require('../../../../assets/images/findpeople/people3.png'),
          },
          {
            text: 'Maria Valdez',
            time: '3 min ago',
            userImage: require('../../../../assets/images/findpeople/people2.png'),
          },
          {
            text: 'Maria Valdez',
            time: '3 min ago',
            userImage: require('../../../../assets/images/findpeople/people3.png'),
          },
          {
            text: 'Maria Valdez',
            time: '3 min ago',
            userImage: require('../../../../assets/images/findpeople/people2.png'),
          },
          {
            text: 'Maria Valdez',
            time: '3 min ago',
            userImage: require('../../../../assets/images/findpeople/people5.png'),
          },
          {
            text: 'Maria Valdez',
            time: '3 min ago',
            userImage: require('../../../../assets/images/findpeople/people6.png'),
          },
          {
            text: 'Maria Valdez',
            time: '3 min ago',
            userImage: require('../../../../assets/images/findpeople/people3.png'),
          },
          {
            text: 'Maria Valdez',
            time: '3 min ago',
            userImage: require('../../../../assets/images/findpeople/people5.png'),
          },
    ]

    const renderLikesList=({item})=>{
        return(
    <>
        <View style={styles.mainContainer}>
        <View style={styles.flatlistView}>
          <View style={styles.flatlistView2}>
            <Image source={item.userImage} style={styles.image} />
            <View style={styles.flatlistView3}>
              <Text style={styles.flatlistName}>{item.text}</Text>
            </View>
          </View>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
 </>
        )
    }

  return (
    <Header onPressBack={() => navigation.goBack()} heading={'Liked'}>
       <FlatList
        data={listData}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text style={styles.totalLikes}>All 200</Text>
          </>
        }
        // contentContainerStyle={{flex:1}}
        renderItem={renderLikesList}
      />

    </Header>
  );
}
