import {Text, View, Image, FlatList, RefreshControl} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';
import {profileServices} from 'src/services/profile-services';
import images from 'src/assets/images';
import moment from 'moment';

export default function Notification() {
  const [notification, setNotification] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const dummyImg = images.people;

  React.useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      const result = await profileServices.getNotificationApi('1', '25');
      setNotification(result);
      console.log('Here are the notifications ', result);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const result = await profileServices.getNotificationApi('1', '25');
      setNotification(result);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };

  const listItem = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.flatlistView}>
          <View style={styles.flatlistView2}>
            <Image
              source={item?.picture ? {uri: item?.picture} : dummyImg}
              style={styles.image}
            />
            <View style={styles.flatlistView3}>
              <View style={styles.flatlistView4}>
                <Image
                  source={item?.picture ? {uri: item?.picture} : dummyImg}
                  style={styles.notiImage}
                />
                <Text style={styles.flatlistName}>{item?.title}</Text>
              </View>
              <Text style={styles.mail}>{item?.message}</Text>
            </View>
          </View>
          <Text style={styles.time}>
            {moment(item?.createdAt).format('DD MMM')}
          </Text>
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
      <Header heading={'Notification'}>
        <FlatList
          data={notification.notifications}
          renderItem={listItem}
          keyExtractor={item => item._id}
          contentContainerStyle={{
            marginHorizontal: 20,
            marginTop: 15,
          }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemDivider}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          // ListEmptyComponent={<Text>No Notifications Yet</Text>}
        />
      </Header>
    </View>
  );
}
