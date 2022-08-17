import {Text, View, Image, FlatList, RefreshControl} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RemoveButton from 'src/components/remove-button';
import colors from 'src/utils/themes/global-colors';
import {profileServices} from 'src/services/profile-services';

export default function Followers() {
  const [followers, setFollowers] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const defaultImage = require('assets/images/findpeople/people.png');

  React.useEffect(() => {
    getFollowers();
  }, []);

  const getFollowers = async () => {
    try {
      const result = await profileServices.getFollowersApi('1', '25');
      console.log('Here are the followers ', result);
      setFollowers(result.followers);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const result = await profileServices.getFollowersApi('1', '25');
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
        <RemoveButton backgroundColor={colors.removeColor} text={'Remove'} />
      </View>
    );
  };
  return (
    <View style={styles.Container}>
      <FlatList
        data={followers}
        renderItem={listItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          marginHorizontal: 20,
          marginTop: 15,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<Text>No Followers Yet</Text>}
      />
    </View>
  );
}
