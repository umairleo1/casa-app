import {Text, View, Image, FlatList} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RemoveButton from 'src/components/remove-button';
import colors from 'src/utils/themes/global-colors';

export default function Following() {
  const dummyData = [
    {
      text: 'Francisco Diaz',
      mail: 'Francisco_diaz123',
      image: require('../../../../assets/images/findpeople/people.png'),
    },
    {
      text: 'Francisco Diaz',
      mail: 'Francisco_diaz123',
      image: require('../../../../assets/images/findpeople/people2.png'),
    },
    {
      text: 'Francisco Diaz',
      mail: 'Francisco_diaz123',
      image: require('../../../../assets/images/findpeople/people3.png'),
    },
    {
      text: 'Francisco Diaz',
      mail: 'Francisco_diaz123',
      image: require('../../../../assets/images/findpeople/people6.png'),
    },
    {
      text: 'Francisco Diaz',
      mail: 'Francisco_diaz123',
      image: require('../../../../assets/images/findpeople/people4.png'),
    },
    {
      text: 'Francisco Diaz',
      mail: 'Francisco_diaz123',
      image: require('../../../../assets/images/findpeople/people5.png'),
    },
    {
      text: 'Francisco Diaz',
      mail: 'Francisco_diaz123',
      image: require('../../../../assets/images/findpeople/people6.png'),
    },
    {
      text: 'Francisco Diaz',
      mail: 'Francisco_diaz123',
      image: require('../../../../assets/images/findpeople/people2.png'),
    },
    {
      text: 'Francisco Diaz',
      mail: 'Francisco_diaz123',
      image: require('../../../../assets/images/findpeople/people4.png'),
    },
  ];

  const listItem = ({item}) => {
    return (
      <View style={styles.flatlistView}>
        <View style={styles.flatlistView2}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.flatlistView3}>
            <Text style={styles.name}>{item.text}</Text>
            <Text style={styles.mail}>{item.mail}</Text>
          </View>
        </View>
        <RemoveButton backgroundColor={colors.removeColor} text={'Following'} />
      </View>
    );
  };
  return (
    <View style={styles.Container}>
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
    </View>
  );
}
