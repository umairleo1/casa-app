/* eslint-disable react/prop-types */
import {Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BottomSheetButton from 'src/components/bottom-sheet-buttons';
import {CrossIcon, AddIcon} from 'src/assets/svg/chat';

import {styles} from './styles';
import colors from 'src/utils/themes/global-colors';
import images from 'src/assets/images';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export default function MembersSheet({onPressBack, rightText, onLeavePress}) {
  const dummyData = [
    {
      name: 'Maria Sanchez',
      image: require('../../../../assets/images/chat/group.png'),
    },
    {
      name: 'Maria Sanchez',
      image: require('../../../../assets/images/chat/group.png'),
    },
  ];

  const listItem = ({item}) => {
    if (item.id == 'add-new') {
      return (
        <View style={styles.groupView}>
          <AddIcon />
          <Text style={styles.name}>Add Member</Text>
        </View>
      );
    }
    return (
      <View style={styles.mainContainer}>
        <View style={styles.groupView}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.crossIconView}>
            <CrossIcon onPress={undefined} />
          </View>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.Container}>
      <View style={styles.topView}>
        <AntDesign
          name="arrowleft"
          size={24}
          color={colors.black}
          onPress={onPressBack}
        />
        <Text style={styles.memberName}>Maria, Isabel, Mario, +9</Text>
        {rightText && <Text style={styles.memberName}>{rightText}</Text>}
      </View>
      <Text style={styles.membersCount}>11 Members</Text>

      <View>
        <FlatList
          data={[...dummyData, {id: 'add-new'}]}
          horizontal
          renderItem={listItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            // backgroundColor: 'red',
            // flex: 1,
            paddingTop: heightPercentageToDP(0.2),
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.buttonView}>
        <BottomSheetButton
          image={images.editGroupPhoto}
          text={'Edit Group Photo'}
          onPress={undefined}
        />
        <BottomSheetButton
          image={images.editGroupPhoto}
          text={'Edit Group Name'}
          onPress={undefined}
        />
        <BottomSheetButton
          image={images.editGroupPhoto}
          text={'Leave Group'}
          onPress={onLeavePress}
        />
      </View>
    </View>
  );
}
