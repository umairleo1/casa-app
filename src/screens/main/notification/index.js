import {Text, View, Image, SectionList} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';

export default function Notification() {
  const dummyData = [
    {
      date: 'Today',
      data: [
        {
          notiImage: require('../../../assets/images/findpeople/people2.png'),
          mail: 'and 18 others like your post',
          name: 'Jose, Luis',
          userImage: require('../../../assets/images/findpeople/people.png'),
          content:
            'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
          postImage: require('../../../assets/images/viewProfile/postImage.png'),
          time: '3 min ago',
        },
        {
          notiImage: require('../../../assets/images/findpeople/people2.png'),
          mail: 'and 18 others like your post',
          name: 'Jose, Luis',
          userImage: require('../../../assets/images/findpeople/people.png'),
          content:
            'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
          postImage: require('../../../assets/images/viewProfile/postImage.png'),
          time: '3 min ago',
        },
        {
          notiImage: require('../../../assets/images/findpeople/people2.png'),
          mail: 'and 18 others like your post',
          name: 'Jose, Luis',
          userImage: require('../../../assets/images/findpeople/people.png'),
          content:
            'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
          postImage: require('../../../assets/images/viewProfile/postImage.png'),
          time: '3 min ago',
        },
        {
          notiImage: require('../../../assets/images/findpeople/people2.png'),
          mail: 'and 18 others like your post',
          name: 'Jose, Luis',
          userImage: require('../../../assets/images/findpeople/people.png'),
          content:
            'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
          postImage: require('../../../assets/images/viewProfile/postImage.png'),
          time: '3 min ago',
        },
        {
          notiImage: require('../../../assets/images/findpeople/people2.png'),
          mail: 'and 18 others like your post',
          name: 'Jose, Luis',
          userImage: require('../../../assets/images/findpeople/people.png'),
          content:
            'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
          postImage: require('../../../assets/images/viewProfile/postImage.png'),
          time: '3 min ago',
        },
        {
          notiImage: require('../../../assets/images/findpeople/people2.png'),
          mail: 'and 18 others like your post',
          name: 'Jose, Luis',
          userImage: require('../../../assets/images/findpeople/people.png'),
          content:
            'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
          postImage: require('../../../assets/images/viewProfile/postImage.png'),
          time: '3 min ago',
        },
      ],
    },
    {
      date: 'Yesterday',
      data: [
        {
          notiImage: require('../../../assets/images/findpeople/people2.png'),
          mail: 'and 18 others like your post',
          name: 'Jose, Luis',
          userImage: require('../../../assets/images/findpeople/people.png'),
          content:
            'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
          postImage: require('../../../assets/images/viewProfile/postImage.png'),
          time: '3 min ago',
        },
        {
          notiImage: require('../../../assets/images/findpeople/people2.png'),
          mail: 'and 18 others like your post',
          name: 'Jose, Luis',
          userImage: require('../../../assets/images/findpeople/people.png'),
          content:
            'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
          postImage: require('../../../assets/images/viewProfile/postImage.png'),
          time: '3 min ago',
        },
      ],
    },
  ];

  const listItem = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.flatlistView}>
          <View style={styles.flatlistView2}>
            <Image source={item.userImage} style={styles.image} />
            <View style={styles.flatlistView3}>
              <View style={styles.flatlistView4}>
                <Image source={item.notiImage} style={styles.notiImage} />
                <Text style={styles.flatlistName}>{item?.name}</Text>
              </View>
              <Text style={styles.mail}>{item?.mail}</Text>
            </View>
          </View>
          <Text style={styles.time}>{item.time}</Text>
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
    <View style={styles.Container}>
      <Header heading={'Notification'}>
        <SectionList
          sections={[...dummyData]}
          renderItem={listItem}
          renderSectionHeader={({section}) => (
            <Text style={styles.day}>{section.date}</Text>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginHorizontal: 20,
            marginTop: 15,
          }}
          ItemSeparatorComponent={ItemDivider}
        />
      </Header>
    </View>
  );
}
