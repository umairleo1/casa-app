/* eslint-disable react/prop-types */
import {Text, View, Image, FlatList, RefreshControl} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RemoveButton from 'src/components/remove-button';
import colors from 'src/utils/themes/global-colors';
import {profileServices} from 'src/services/profile-services';

export default function Following({route}) {
  const [following, setFolowings] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const defaultImage = require('assets/images/findpeople/people.png');
  console.log('following id ', route?.params?.id);

  React.useEffect(() => {
    getFollowing(route?.params?.id ? route?.params?.id : '');
  }, []);

  const getFollowing = async id => {
    try {
      const result = await profileServices.getFollowingApi(id);
      // console.log('Here are the followings ', result);
      setFolowings(result.following);
    } catch (error) {
      console.log(error);
    }
  };

  const unFollow = async id => {
    try {
      const result = await profileServices.unFollowApiApi(id);
      getFollowing();
      console.log('Here is unfollow ', result);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const result = await profileServices.getFollowingApi(
        route?.params?.id ? route?.params?.id : '',
      );
      console.log('Here are the followings ', result);
      setFolowings(result.following);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };

  const listItem = ({item}) => {
    return (
      <View style={styles.flatlistView}>
        <View style={styles.flatlistView2}>
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
            <Text style={styles.mail}>{item?.email}</Text>
          </View>
        </View>
        {!route?.params?.id && (
          <RemoveButton
            onPress={() => unFollow(item?._id)}
            backgroundColor={colors.removeColor}
            text={'Unfollow'}
          />
        )}
      </View>
    );
  };
  return (
    <View style={styles.Container}>
      <FlatList
        data={following}
        renderItem={listItem}
        keyExtractor={item => item.id}
        style={{marginBottom: 10, marginHorizontal: 20, marginTop: 15}}
        // contentContainerStyle={{
        //   marginHorizontal: 20,
        //   marginTop: 15,
        //   // backgroundColor: 'red',
        // }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<Text>No Followings Yet</Text>}
      />
    </View>
  );
}
