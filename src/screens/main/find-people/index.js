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

export default function FindPeople() {
  const navigation = useNavigation();

  const [search, setSearch] = React.useState('');
  const [peoples, setPeoples] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [limit, setLimit] = React.useState({
    currentPage: 1,
    limit: 25,
    availablePages: 1,
  });

  const defaultImage = require('assets/images/findpeople/people2.png');

  React.useEffect(() => {
    findPeople();
  }, [search]);

  const findPeople = async () => {
    try {
      const result = await peopleServices.findPeopleApi(
        search,
        '1',
        limit.limit,
      );
      // console.log('here are the peoples ', result, ' ', result.users.length);
      setPeoples(result?.users);
      setLimit({...limit, availablePages: result?.totalPages});
    } catch (error) {
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
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };

  const listItem = ({item}) => {
    return (
      <View style={styles.flatlistView}>
        <TouchableOpacity onPress={() => navigation.navigate('VIEW_PROFILE')}>
          <Image
            source={
              item?.profileImage ? {uri: item?.profileImage} : defaultImage
            }
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.plusIconView}>
          <Text
            style={styles.name}>{`${item?.firstName} ${item?.lastName}`}</Text>
          <TouchableOpacity>
            <FontAwesome5 name="plus" size={16} color={colors.black} />
          </TouchableOpacity>
        </View>
        <Text style={styles.follower}>
          {item?.followers}
          {peoples.length} Followers
        </Text>
      </View>
    );
  };

  return (
    <>
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
        />
      </Header>
    </>
  );
}
