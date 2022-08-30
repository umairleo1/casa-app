import {FlatList, Image, Text, View} from 'react-native';
import React, {useRef} from 'react';
import SearchInput from 'src/components/searchInput';
import colors from 'src/utils/themes/global-colors';
import {styles} from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DefaultButton from 'src/components/default-button';
import RBSheet from 'react-native-raw-bottom-sheet';
import MembersSheet from '../bottom-sheet';
import {useNavigation} from '@react-navigation/native';

export default function GroupChat() {
  const navigation = useNavigation();
  const refRBSheet = useRef();

  const dummyData = [
    {
      groupName: 'Technologies',
      groupText: '30 Friends in the Group',
      image: require('../../../../assets/images/chat/chat.png'),
      groupImage: require('../../../../assets/images/findpeople/people3.png'),
      groupImage2: require('../../../../assets/images/findpeople/people4.png'),
      groupImage3: require('../../../../assets/images/findpeople/people5.png'),
      groupImage4: require('../../../../assets/images/findpeople/people2.png'),
    },
    {
      groupName: 'Best Friends',
      groupText: '4 Friends in the Group',
      image: require('../../../../assets/images/chat/chat1.png'),
      groupImage: require('../../../../assets/images/findpeople/people3.png'),
      groupImage2: require('../../../../assets/images/findpeople/people4.png'),
      groupImage3: require('../../../../assets/images/findpeople/people5.png'),
      groupImage4: require('../../../../assets/images/findpeople/people2.png'),
    },
  ];

  const listItem = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.groupView}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.groupName}>{item.groupName}</Text>
          <Text style={styles.groupText}>{item.groupText}</Text>
          <View style={styles.groupImages}>
            <Image source={item.groupImage} style={styles.groupImage} />
            <Image
              source={item.groupImage2}
              style={[styles.groupImage, {marginLeft: wp(-2)}]}
            />
            <Image
              source={item.groupImage3}
              style={[styles.groupImage, {marginLeft: -8}]}
            />
            <Image
              source={item.groupImage4}
              style={[styles.groupImage, {marginLeft: -8}]}
            />
          </View>
          <View style={styles.buttonsView}>
            <DefaultButton
              text={'Edit Group'}
              onPress={() => refRBSheet.current.open()}
              buttonStyle={{
                borderWidth: 1.5,
                borderColor: colors.buttonColor,
                backgroundColor: colors.whiteColor,
                borderRadius: 3,
                padding: hp(0.8),
                paddingHorizontal: wp(3),
              }}
              buttonTextStyle={{color: colors.buttonColor}}
            />
            <DefaultButton
              text={'Open Chat'}
              onPress={() => navigation.navigate('GIFTED_CHAT')}
              buttonStyle={{
                borderWidth: 1.5,
                backgroundColor: colors.buttonColor,
                borderRadius: 3,
                padding: hp(0.8),
                paddingHorizontal: wp(5),
              }}
              buttonTextStyle={{color: colors.whiteColor}}
            />
          </View>
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
      <SearchInput
        placeholder={'Search...'}
        placeholderTextColor={colors.black}
        icon={'search1'}
        iconSize={24}
        onChangeText={text => console.log(text)}
      />
      <FlatList
        data={dummyData}
        renderItem={listItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemDivider}
        contentContainerStyle={{
          paddingBottom: hp(5),
          paddingTop: 10,
        }}
        showsVerticalScrollIndicator={false}
      />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        // height={300}
        customStyles={{
          wrapper: {
            backgroundColor: `rgba(0, 0, 0, 0.2)`,
          },
          container: {
            backgroundColor: colors.whiteColor,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <MembersSheet
          rightText
          onPressBack={() => refRBSheet.current.close()}
        />
      </RBSheet>
    </View>
  );
}
