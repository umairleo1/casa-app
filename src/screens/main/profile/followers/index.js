/* eslint-disable react/prop-types */
import {
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RemoveButton from 'src/components/remove-button';
import colors from 'src/utils/themes/global-colors';
import {profileServices} from 'src/services/profile-services';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

export default function Followers() {
  const route = useRoute();
  const navigation = useNavigation();

  const [followers, setFollowers] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [limit, setLimit] = React.useState({
    currentPage: 1,
    limit: 25,
    availablePages: 1,
  });

  const defaultImage = require('assets/images/findpeople/people.png');

  React.useEffect(() => {
    getFollowers(route?.params?.id ? route?.params?.id : '');
  }, []);

  const getFollowers = async id => {
    try {
      const result = await profileServices.getFollowersApi(
        limit?.currentPage,
        limit?.limit,
        id,
      );
      console.log('Here are the followers ', result);
      setFollowers(result.followers);
      setLimit({...limit, availablePages: result?.totalPages});
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      const result = await profileServices.getFollowersApi(
        limit?.currentPage + 1,
        limit?.limit,
        route?.params?.id ? route?.params?.id : '',
      );

      setFollowers([...followers, ...result.followers]);
      setLimit({...limit, currentPage: limit.currentPage + 1});
    } catch (error) {
      console.log(error);
    }
  };

  const removeFollowers = async id => {
    try {
      const result = await profileServices.removeFollowersApi(id);
      console.log('Here are the followers ', result);
      getFollowers();
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const result = await profileServices.getFollowersApi(
        '1',
        '25',
        route?.params?.id ? route?.params?.id : '',
      );
      console.log('Here are the followers ', result);
      setFollowers(result.followers);
      setLimit({...limit, availablePages: result?.totalPages, currentPage: 1});
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };

  const listItem = ({item}) => {
    return (
      <View style={styles.flatlistView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('USER_PROFILE', {id: item?._id})}
          style={styles.flatlistView2}>
          <Image
            source={
              item?.profileImage ? {uri: item?.profileImage} : defaultImage
            }
            style={styles.image}
          />
          <View style={styles.flatlistView3}>
            <Text
              style={
                styles.name
              }>{`${item?.firstName} ${item?.lastName}`}</Text>
            <Text style={styles.mail}>{item?.userName || 'No Username'}</Text>
          </View>
        </TouchableOpacity>
        {!route?.params?.id && (
          <RemoveButton
            onPress={() => removeFollowers(item?._id)}
            backgroundColor={colors.removeColor}
            text={'Remove'}
          />
        )}
      </View>
    );
  };
  return (
    <View style={styles.Container}>
      <FlatList
        data={followers}
        renderItem={listItem}
        keyExtractor={item => item.id}
        style={{marginBottom: 10, marginHorizontal: 20, marginTop: 15}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<Text>No Followers Yet</Text>}
        onEndReached={() => {
          limit.currentPage < limit.availablePages && loadMore();
        }}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
}
