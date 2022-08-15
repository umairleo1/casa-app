import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';
import SearchInput from 'src/components/searchInput';
import colors from 'src/utils/themes/global-colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function FindPeople() {
  const dummyData = [
    {
      text: 'Jose Diaz',
      followers: '800',
      image: require('../../../assets/images/findpeople/people.png'),
    },
    {
      text: 'Maria Valdez',
      followers: '800',
      image: require('../../../assets/images/findpeople/people2.png'),
    },
    {
      text: 'Tomasa Lopez',
      followers: '800',
      image: require('../../../assets/images/findpeople/people3.png'),
    },
    {
      text: 'Luis Cortes',
      followers: '800',
      image: require('../../../assets/images/findpeople/people4.png'),
    },
    {
      text: 'Maria Valdez',
      followers: '800',
      image: require('../../../assets/images/findpeople/people5.png'),
    },
    {
      text: 'Maria Valdez',
      followers: '800',
      image: require('../../../assets/images/findpeople/people6.png'),
    },
  ];

  const listItem = ({item}) => {
    return (
      <View style={styles.flatlistView}>
        <TouchableOpacity>
          <Image source={item.image} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.plusIconView}>
          <Text style={styles.name}>{item.text}</Text>
          <TouchableOpacity>
            <FontAwesome5 name="plus" size={16} color={colors.black} />
          </TouchableOpacity>
        </View>
        <Text style={styles.follower}>{item.followers} Followers</Text>
      </View>
    );
  };

  return (
    <>
      <Header heading={'Find People'}>
        <View style={styles.searchInputView}>
          <SearchInput
            placeholder={'Search...'}
            placeholderTextColor={colors.black}
            icon={'search1'}
            iconSize={24}
          />
        </View>
        <FlatList
          data={dummyData}
          numColumns={2}
          renderItem={listItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginHorizontal: 20,
            marginTop: 15,
          }}
          showsVerticalScrollIndicator={false}
        />
      </Header>
    </>
  );
}
