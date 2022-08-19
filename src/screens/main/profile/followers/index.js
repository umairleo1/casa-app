/* eslint-disable react/prop-types */
import {Text, View, Image, FlatList, RefreshControl} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RemoveButton from 'src/components/remove-button';
import colors from 'src/utils/themes/global-colors';
import {profileServices} from 'src/services/profile-services';
import {useRoute} from '@react-navigation/native';

export default function Followers() {
  const route = useRoute();
  const [followers, setFollowers] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const defaultImage = require('assets/images/findpeople/people.png');

  React.useEffect(() => {
    getFollowers(route?.params?.id ? route?.params?.id : '');
  }, []);

  const getFollowers = async id => {
    try {
      const result = await profileServices.getFollowersApi('1', '25', id);
      console.log('Here are the followers ', result);
      setFollowers(result.followers);
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
        // contentContainerStyle={{
        //   marginHorizontal: 20,
        //   marginTop: 15,
        // }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<Text>No Followers Yet</Text>}
      />
    </View>
  );
}
