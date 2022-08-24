import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';
import SearchInput from 'src/components/searchInput';
import colors from 'src/utils/themes/global-colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {peopleServices} from 'src/services/people-services';
import images from 'src/assets/images';
import {profileServices} from 'src/services/profile-services';
import ActivityIndicator from 'src/components/loader/activity-indicator';

export default function FindPeople() {
  const navigation = useNavigation();

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
  }, [search]);

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
    console.log('+++++++++++', data);
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

  const listItem = ({item}) => {
    return (
      <View style={styles.flatlistView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('VIEW_PROFILE', {id: item._id})}>
          <Image
            source={
              item?.profileImage ? {uri: item?.profileImage} : defaultImage
            }
            style={styles.image}
            // on
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
      <ActivityIndicator visible={loder} />
      <Header onPressBack={() => navigation.goBack()} heading={'Find People'}>
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
          renderItem={listItem}
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
