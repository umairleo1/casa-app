/* eslint-disable react/prop-types */
import {Text, View, FlatList, Image, Pressable} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BottomSheetButton from 'src/components/bottom-sheet-buttons';
import {AddIcon} from 'src/assets/svg/chat';

import {styles} from './styles';
import colors from 'src/utils/themes/global-colors';
import images from 'src/assets/images';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import AuthContext from 'src/utils/auth-context';

export default function MembersSheet({
  onPressBack,
  rightText,
  onLeavePress,
  data,
  onAddPress,
  onEditName,
  onPhotoPress,
  onPhotoCameraPress,
}) {
  const authContext = React.useContext(AuthContext);

  const listItem = ({item}) => {
    if (item?.id == 'add-new') {
      if (data?.chatInitiator == authContext?.userData?.user?._id) {
        return (
          <View style={styles.groupView}>
            <AddIcon onPress={onAddPress} />
            <Text style={styles.name}>Add Member</Text>
          </View>
        );
      }
    }
    return (
      <Pressable style={styles.mainContainer}>
        <View style={styles.groupView}>
          <Image
            source={
              item?.profileImage ? {uri: item?.profileImage} : images.people
            }
            style={styles.image}
          />

          <Text style={styles.name}>
            {item?.firstName + ' ' + item?.lastName || 'Name'}
          </Text>
        </View>
      </Pressable>
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
        <Text style={styles.memberName}>
          {data?.userIds[0]?.firstName}, {data?.userIds[1]?.firstName}
          {data?.userIds?.length > 2 && ', '}
          {data?.userIds[3]?.firstName}
          {data?.userIds?.length > 3 && `, +${data?.userIds?.length - 3}`}
        </Text>
        {rightText && <Text style={styles.memberName}>{rightText}</Text>}
      </View>
      <Text style={styles.membersCount}>{data?.userIds?.length} Members</Text>

      <View>
        <FlatList
          data={[...data?.userIds, {id: 'add-new'}]}
          horizontal
          style={{marginVertical: 10}}
          renderItem={listItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            // zIndex: 1000,

            paddingTop: heightPercentageToDP(0.2),
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.buttonView}>
        <BottomSheetButton
          image={images.editGroupPhoto}
          text={'Edit Cuarto Photo from Gallery'}
          onPress={onPhotoPress}
        />
        <BottomSheetButton
          image={images.editGroupPhoto}
          text={'Edit Cuarto Photo form Camera'}
          onPress={onPhotoCameraPress}
        />
        {data?.chatInitiator == authContext?.userData?.user?._id && (
          <BottomSheetButton
            image={images.editGroupPhoto}
            text={'Edit Cuarto Name'}
            onPress={onEditName}
          />
        )}
        <BottomSheetButton
          image={images.editGroupPhoto}
          text={'Leave Cuarto'}
          onPress={onLeavePress}
        />
      </View>
    </View>
  );
}
