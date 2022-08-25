/* eslint-disable react/prop-types */
import {Text, View, SectionList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';
import SearchInput from 'src/components/searchInput';
import colors from 'src/utils/themes/global-colors';
import {GroupIcon} from 'src/assets/svg/chat';

export default function NewChat() {
  const Dummydata = [
    {
      title: 'A',
      data: [
        {
          image: require('../../../../assets/images/chat/group.png'),
          title: 'Alvarado',
          subTitle: 'Stream test account',
        },
      ],
    },

    {
      title: 'B',
      data: [
        {
          image: require('../../../../assets/images/chat/group.png'),
          title: 'Bomasa Lopez',
          subTitle: 'Stream test account',
        },
        {
          image: require('../../../../assets/images/chat/group.png'),
          title: 'Bomasa Lopez',
          subTitle: 'Stream test account',
        },
      ],
    },

    {
      title: 'C',
      data: [
        {
          image: require('../../../../assets/images/chat/group.png'),
          title: 'Bomasa Lopez',
          subTitle: 'Stream test account',
        },
        {
          image: require('../../../../assets/images/chat/group.png'),
          title: 'Bomasa Lopez',
          subTitle: 'Stream test account',
        },
        {
          image: require('../../../../assets/images/chat/group.png'),
          title: 'Bomasa Lopez',
          subTitle: 'Stream test account',
        },
      ],
    },
  ];

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
    <Header heading={'New Chat'}>
      <SectionList
        sections={Dummydata}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item title={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
        ListHeaderComponent={
          <>
            <View style={styles.Container}>
              <SearchInput
                placeholder={'Search...'}
                placeholderTextColor={colors.black}
                icon={'search1'}
                iconSize={24}
              />
            </View>

            <TouchableOpacity style={styles.GroupIconView} onPress={undefined}>
              <GroupIcon />
              <Text style={styles.text}>Create a group</Text>
            </TouchableOpacity>
            <View style={styles.bottomLine} />

            <TouchableOpacity style={styles.GroupIconView2} onPress={undefined}>
              <GroupIcon />
              <Text style={styles.text}>Create new contact</Text>
            </TouchableOpacity>

            <Text style={styles.text2}>On the platform</Text>
          </>
        }
        ItemSeparatorComponent={ItemDivider}
        contentContainerStyle={{paddingBottom: 10}}
      />
    </Header>
  );
}
