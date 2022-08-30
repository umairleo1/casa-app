/* eslint-disable react/prop-types */
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';
import SearchInput from 'src/components/searchInput';
import colors from 'src/utils/themes/global-colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {peopleServices} from 'src/services/people-services';
import images from 'src/assets/images';
import {profileServices} from 'src/services/profile-services';
import ActivityIndicatorr from 'src/components/loader/activity-indicator';

export default function FindPeople() {
  const navigation = useNavigation();
  const focus = useIsFocused();

  const [search, setSearch] = React.useState('');
  const [peoples, setPeoples] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loder, setLoader] = React.useState(false);

  const [limit, setLimit] = React.useState({
    currentPage: 1,
    limit: 25,
    availablePages: 1,
  });

  const defaultImage = images.people;

  React.useEffect(() => {
    findPeople();
  }, [search, focus]);

  const findPeople = async () => {
    try {
      setLoader(true);
      const result = await peopleServices.findPeopleApi(
        search,
        '1',
        limit.limit,
      );
      console.log('here are the peoples ', result, ' ', result.users.length);
      setPeoples(result?.users);
      setLimit({...limit, availablePages: result?.totalPages});
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const loadMore = async () => {
    setLimit({...limit, currentPage: limit.currentPage + 1});
    try {
      const result = await peopleServices.findPeopleApi(
        search,
        limit.currentPage + 1,
        limit.limit,
      );

      setPeoples([...peoples, ...result.users]);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const result = await peopleServices.findPeopleApi(
        search,
        '1',
        limit.limit,
      );
      setPeoples(result?.users);
      setLimit({...limit, availablePages: result?.totalPages});
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };

  const onPressFollowBtn = async data => {
    // setLoader(true);

    try {
      if (data?.follow) {
        const result = await profileServices.unFollowApiApi(data._id || '');
        console.log('unFollowApiApi==>', result);
        const res = await profileServices.getUserProfileById(data._id || '');
        console.log('resisF', res);

        // setData(res);
        // setLoader(false);
      } else {
        const result = await profileServices.followTo(data?._id || '');
        console.log('getFollowingApi==>', result);
        const res = await profileServices.getUserProfileById(data?._id || '');
        // setData(res);
        console.log('!resisF', res);
        // setLoader(false);
      }

      //getFollowing();
    } catch (error) {
      // setLoader(false);
      console.log('error', error);
      const res = await profileServices.getUserProfileById(data?._id || '');
      console.log('catchres', res);
      // setData(res);
    }
    findPeople();
  };

  const ListItem = ({item}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    return (
      <View style={styles.flatlistView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('VIEW_PROFILE', {id: item._id})}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          {isLoading && (
            <ActivityIndicator
              style={{position: 'absolute', zIndex: 101}}
              size="small"
              color={colors.buttonColor}
            />
          )}
          <Image
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            source={
              item?.profileImage ? {uri: item?.profileImage} : defaultImage
            }
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.plusIconView}>
          <Text
            style={styles.name}>{`${item?.firstName} ${item?.lastName}`}</Text>
          <TouchableOpacity
            onPress={() => {
              onPressFollowBtn(item);
            }}>
            <FontAwesome5
              name={item.follow ? 'check' : 'plus'}
              size={16}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.follower}>
          {item?.totalFollowers ? item?.totalFollowers : 0} Follower
          {item?.totalFollowers > 1 && 's'}
        </Text>
      </View>
    );
  };

  return (
    <>
      <ActivityIndicatorr visible={loder} />
      <Header onPressBack={() => navigation.goBack()} heading={'Mi Gente'}>
        <View style={styles.searchInputView}>
          <SearchInput
            placeholder={'Search...'}
            placeholderTextColor={colors.black}
            icon={'search1'}
            iconSize={24}
            onChangeText={setSearch}
          />
        </View>
        <FlatList
          data={peoples}
          numColumns={2}
          renderItem={({item}) => <ListItem item={item} />}
          keyExtractor={item => item._id}
          extraData={peoples}
          contentContainerStyle={{
            marginHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={() => {
            limit.currentPage <= limit.availablePages && loadMore();
          }}
          onEndReachedThreshold={0.2}
        />
      </Header>
    </>
  );
}
