import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import SearchInput from 'src/components/searchInput';
import colors from 'src/utils/themes/global-colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {chatServices} from 'src/services/chat-services';
import images from 'src/assets/images';

import moment from 'moment';
import ActivityIndicatorr from 'src/components/loader/activity-indicator';

export default function Chat() {
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [chatList, setChatList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchChat, setSearchChat] = React.useState('');

  useEffect(() => {
    let timeout = setTimeout(() => {
      getChatList(searchChat);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [isFocus, searchChat]);

  const getChatList = async searchChat => {
    try {
      setIsLoading(false);
      const result = await chatServices.getChatListApi(searchChat);
      // console.log('Here is the chat list   ===>>>> ', result);
      setChatList(
        result
          .sort(function (a, b) {
            return a.lastMessage.createdAt.localeCompare(
              b.lastMessage.createdAt,
            );
          })
          .reverse(),
      );
      setRefreshing(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setRefreshing(false);
      console.log(error);
    }
  };

  const listItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.flatlistView}
        onPress={() =>
          navigation.navigate('GIFTED_CHAT', {
            data: {
              user: {
                firstName: item?.firstName,
                lastName: item?.lastName,
                profileImage: item?.picture,
              },
            },
            userId: item?.secondUserId,
            getChatList: getChatList,
          })
        }>
        <View style={styles.flatlistView2}>
          <Image
            source={item?.picture ? {uri: item?.picture} : images.people}
            style={styles.image}
          />
          <View style={styles.flatlistView3}>
            <Text style={styles.flatlistName}>
              {item?.firstName + ' ' + item?.lastName}
            </Text>
            <Text numberOfLines={1} style={[styles.message]}>
              {item?.lastMessage?.message}
              {/* {item?.lastMessage?.message.length > 40
                ? item?.lastMessage?.message?.slice(0, 40)?.concat(' ...')
                : item?.lastMessage?.message} */}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '30%',
            height: '100%',

            alignItems: 'center',
            // justifyContent: 'center',
          }}>
          {item?.unreadCount > 0 ? (
            <View style={styles.countView}>
              <Text style={styles.count}>{item?.unreadCount}</Text>
            </View>
          ) : null}
          <Text style={styles.time}>
            {moment(item?.lastMessage?.createdAt).format('MMM DD YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
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
      <ActivityIndicatorr visible={isLoading} />
      <SearchInput
        placeholder={'Search...'}
        placeholderTextColor={colors.black}
        icon={'search1'}
        iconSize={24}
        onChangeText={text => setSearchChat(text)}
      />

      <FlatList
        data={chatList}
        renderItem={listItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemDivider}
        contentContainerStyle={{
          paddingBottom: 10,
          paddingTop: 10,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true), getChatList();
            }}
          />
        }
        ListFooterComponent={
          <>
            {chatList.length > 1 && (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                No More People
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          <>
            <Text
              style={{textAlign: 'center', fontSize: 20, marginVertical: 50}}>
              No Conversation Yet
            </Text>
          </>
        }
      />
    </View>
  );
}
