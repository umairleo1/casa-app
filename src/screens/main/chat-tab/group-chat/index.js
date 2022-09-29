import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef} from 'react';
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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {chatServices} from 'src/services/chat-services';
import images from 'src/assets/images';
import {KeyboardAwareListView} from 'react-native-keyboard-aware-scrollview';
import ActivityIndicator from 'src/components/loader/activity-indicator';
import AuthContext from 'src/utils/auth-context';
import {launchImageLibrary} from 'react-native-image-picker';

let cameraIs = false;

export default function GroupChat() {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const isFocus = useIsFocused();
  const aurhContext = useContext(AuthContext);

  const [search, setSearch] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(false);
  const [groupList, setGroupList] = React.useState([]);
  const [selectedGroup, setSelectedGroup] = React.useState('');
  const [groupPhoto, setGroupPhoto] = React.useState('');

  useEffect(() => {
    let timeout = setTimeout(() => {
      getChatGroups(search);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [isFocus, search]);

  const getChatGroups = async search => {
    // console.log();
    try {
      const result = await chatServices.getGroupChatListApi(search);
      console.log('Here ist he get group chat list ', result);
      setGroupList(result.reverse());
      setRefreshing(false);
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };

  const exitGroup = async () => {
    // console.log();
    try {
      setisLoading(true);
      refRBSheet.current.close();
      const [leaveGroup] = await Promise.all([
        chatServices.leaveGroupApi(selectedGroup?._id),
      ]);
      console.log('Here ist he leve group ', leaveGroup);
      setSelectedGroup('');
      getChatGroups();
    } catch (error) {
      console.log(error);

      setisLoading(false);
    }
  };

  const imagePickerFromGallery = () => {
    if (!cameraIs) {
      cameraIs = true;
      let options = {
        mediaType: 'mixed',
        selectionLimit: 1,
        includeBase64: true,
        quality: 0.5,
        videoQuality: Platform.OS == 'ios' ? 'low' : 'medium',
      };
      launchImageLibrary(options, res => {
        if (res.didCancel) {
          cameraIs = false;
        } else if (res.errorMessage) {
          cameraIs = false;
        } else {
          console.log('Selected from gallery ', res.assets);
          setGroupPhoto(res?.assets[0]?.base64);
          refRBSheet.current.close();
          cameraIs = false;
        }
      });
    }
  };

  const listItem = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.groupView}>
          <View style={{flexDirection: 'row'}}>
            {item?.userIds[0]?.profileImage && (
              <Image
                source={
                  item?.userIds[0]?.profileImage
                    ? {uri: item?.userIds[0]?.profileImage}
                    : images.people
                }
                style={styles.image}
              />
            )}
            {item?.userIds[1]?.profileImage && (
              <Image
                source={
                  item?.userIds[1]?.profileImage
                    ? {uri: item?.userIds[1]?.profileImage}
                    : images.people
                }
                style={[styles.image, {marginLeft: -40}]}
              />
            )}
            {item?.userIds[2]?.profileImage && (
              <Image
                source={
                  item?.userIds[1]?.profileImage
                    ? {uri: item?.userIds[2]?.profileImage}
                    : images.people
                }
                style={[styles.image, {marginLeft: -40}]}
              />
            )}
          </View>
          <Text style={[styles.groupName, {marginVertical: 10}]}>
            {item?.name}
          </Text>
          <Text style={styles.groupText}>
            {item?.userIds?.length + ' Friends in the Cuartos'}
          </Text>
          <View style={styles.groupImages}>
            {item?.userIds[0]?.profileImage && (
              <Image
                source={{uri: item?.userIds[0]?.profileImage}}
                style={[styles.groupImage, {marginLeft: wp(-2)}]}
              />
            )}
            {item?.userIds[1]?.profileImage && (
              <Image
                source={{uri: item?.userIds[1]?.profileImage}}
                style={[styles.groupImage, {marginLeft: wp(-2)}]}
              />
            )}
            {item?.userIds[2]?.profileImage && (
              <Image
                source={{uri: item?.userIds[2]?.profileImage}}
                style={[styles.groupImage, {marginLeft: -8}]}
              />
            )}
            {item?.userIds[3]?.profileImage && (
              <Image
                source={{uri: item?.userIds[3]?.profileImage}}
                style={[styles.groupImage, {marginLeft: -8}]}
              />
            )}
          </View>
          <View style={styles.buttonsView}>
            <DefaultButton
              text={'Edit Group'}
              onPress={() => {
                refRBSheet.current.open(), setSelectedGroup(item);
              }}
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
              onPress={() =>
                navigation.navigate('GIFTED_GROUP_CHAT', {
                  data: {
                    user: {groupName: item?.name, profileImage: item?.picture},
                  },
                  usersId: item?.userIds?.map(item => item?._id),
                  chatRoomId: item?._id,
                })
              }
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
      <ActivityIndicator visible={isLoading} />
      <SearchInput
        placeholder={'Search...'}
        placeholderTextColor={colors.black}
        icon={'search1'}
        iconSize={24}
        onChangeText={text => setSearch(text)}
      />
      <KeyboardAwareListView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true), getChatGroups();
            }}
          />
        }>
        <FlatList
          data={groupList}
          renderItem={listItem}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={ItemDivider}
          contentContainerStyle={{
            paddingBottom: hp(5),
            paddingTop: 10,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <>
              <Text
                style={{textAlign: 'center', fontSize: 20, marginVertical: 50}}>
                No Cuartos to Show Yet
              </Text>
            </>
          }
        />
      </KeyboardAwareListView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        // height={300}
        customStyles={{
          wrapper: {
            backgroundColor: `rgba(0, 0, 0, 0.2)`,
          },
          container: {
            backgroundColor: colors.whiteColor,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginBottom: 20,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <MembersSheet
          rightText
          onPressBack={() => refRBSheet.current.close()}
          onLeavePress={() => exitGroup()}
          data={selectedGroup}
          onPhotoPress={() => {
            imagePickerFromGallery();
          }}
          onAddPress={() => {
            refRBSheet.current.close(),
              aurhContext?.setSelectedMember(selectedGroup?.userIds);
            navigation.navigate('CREATE_GROUP', {
              data: selectedGroup,
              title: 'Update Cuartos Members',
              groupName: selectedGroup?.name,
              roomId: selectedGroup?._id,
            });
          }}
          onEditName={() => {
            refRBSheet.current.close(),
              aurhContext?.setSelectedMember(selectedGroup?.userIds);
            navigation.navigate('ADD_GROUP_NAME', {
              selectedMember: aurhContext?.selectedMember,
              setSelectedMember: aurhContext?.setSelectedMember,
              update: 'Update Cuartos Members',
              groupName: selectedGroup?.name,
              roomId: selectedGroup?._id,
              groupPhoto: groupPhoto,
            });
          }}
        />
      </RBSheet>
    </View>
  );
}
