/* eslint-disable react/prop-types */
import {
  Text,
  View,
  FlatList,
  Image,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Header from 'src/components/headerView';
import SearchInput from 'src/components/searchInput';
import colors from 'src/utils/themes/global-colors';
import {CrossIcon} from 'src/assets/svg/chat';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

export default function CreateGroup() {
  const navigation = useNavigation();
  const dummyData = [
    {
      name: 'Maria Sanchez',
      image: require('../../../../../assets/images/chat/group.png'),
    },
    {
      name: 'Maria Sanchez',
      image: require('../../../../../assets/images/chat/group.png'),
    },
    {
      name: 'Maria Sanchez',
      image: require('../../../../../assets/images/chat/group.png'),
    },
    {
      name: 'Maria Sanchez',
      image: require('../../../../../assets/images/chat/group.png'),
    },
  ];

  const listdata = [
    {
      title: 'A',
      data: [
        {
          image: require('../../../../../assets/images/chat/group.png'),
          title: 'Alvarado',
          subTitle: 'Stream test account',
        },
      ],
    },

    {
      title: 'B',
      data: [
        {
          image: require('../../../../../assets/images/chat/group.png'),
          title: 'Bomasa Lopez',
          subTitle: 'Stream test account',
        },
        {
          image: require('../../../../../assets/images/chat/group.png'),
          title: 'Bomasa Lopez',
          subTitle: 'Stream test account',
        },
      ],
    },

    {
      title: 'C',
      data: [
        {
          image: require('../../../../../assets/images/chat/group.png'),
          title: 'Bomasa Lopez',
          subTitle: 'Stream test account',
        },
        {
          image: require('../../../../../assets/images/chat/group.png'),
          title: 'Bomasa Lopez',
          subTitle: 'Stream test account',
        },
        {
          image: require('../../../../../assets/images/chat/group.png'),
          title: 'Bomasa Lopez',
          subTitle: 'Stream test account',
        },
      ],
    },
  ];
  const listItem = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.groupView}
          onPress={() => navigation.navigate('ADD_GROUP_NAME')}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.crossIconView}>
            <CrossIcon onPress={undefined} />
          </View>
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  //section list
  const Item = ({title}) => (
    <View style={styles.item}>
      <Image source={title.image} style={styles.listImage} />
      <View style={styles.itemView}>
        <Text style={styles.title}>{title.title}</Text>
        <Text style={styles.subTitle}>{title.subTitle}</Text>
      </View>
    </View>
  );
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
      heading={'Add Group Members'}
      onPressBack={() => navigation.goBack()}>
      <View style={styles.Container}>
        <SearchInput
          placeholder={'Search...'}
          placeholderTextColor={colors.black}
          icon={'search1'}
          iconSize={24}
          onChangeText={text => console.log(text)}
        />
      </View>

      <View>
        <FlatList
          data={dummyData}
          horizontal
          renderItem={listItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            paddingTop: heightPercentageToDP(2),
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <SectionList
        sections={listdata}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item title={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
        ListHeaderComponent={
          <>
            <Text style={styles.text2}>On the platform</Text>
          </>
        }
        ItemSeparatorComponent={ItemDivider}
        contentContainerStyle={{paddingBottom: 10}}
      />
    </Header>
  );
}
