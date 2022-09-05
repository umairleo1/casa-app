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
import Header from 'src/components/headerView';
import {profileServices} from 'src/services/profile-services';
import images from 'src/assets/images';
import moment from 'moment';
import ActivityIndicator from 'src/components/loader/activity-indicator';
import colors from 'src/utils/themes/global-colors';
import {RFValue} from 'react-native-responsive-fontsize';

export default function Notification() {
  const [notification, setNotification] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loder, setLoader] = React.useState(false);
  const [limit, setLimit] = React.useState({
    currentPage: 1,
    limit: 25,
    availablePages: 1,
  });

  const dummyImg = images.people;

  React.useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      setLoader(true);
      const result = await profileServices.getNotificationApi('1', '25');
      console.log('Her are the notifications ', result);
      setNotification(result?.notifications);
      setLimit({...limit, availablePages: result?.totalPages});

      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      const result = await profileServices.getNotificationApi(
        limit.currentPage + 1,
        limit.limit,
      );
      console.log('Her are more notifications ', result);

      setNotification([...notification, ...result?.notifications]);
      setLimit({...limit, currentPage: limit.currentPage + 1});
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const result = await profileServices.getNotificationApi('1', limit.limit);
      setNotification(result.notifications);
      setLimit({...limit, availablePages: result?.totalPages, currentPage: 1});
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };

  const onPressFollowBtn = async item => {
    // setLoader(true);
    try {
      const result = await profileServices.followTo(item?.fromUser?._id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const ListItem = ({item}) => {
    const [isFollow, setIsFollow] = React.useState(item?.isFollowing);
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
              {item?.type == 'follow' && isFollow == false && (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <TouchableOpacity
                    style={{
                      // width: 61,
                      backgroundColor: colors.whiteColor,
                      borderRadius: 3,
                      borderColor: colors.buttonColor,
                      borderWidth: 1,
                      marginTop: 8,
                      paddingHorizontal: 5,
                      padding: 5,
                    }}>
                    <Text
                      style={{
                        color: colors.buttonColor,
                        fontSize: RFValue(10),
                      }}>
                      Discrad
                    </Text>
                  </TouchableOpacity> */}

                  <TouchableOpacity
                    onPress={() => {
                      onPressFollowBtn(item), setIsFollow(!isFollow);
                    }}
                    style={{
                      // width: 61,
                      backgroundColor: colors.buttonColor,
                      borderRadius: 3,
                      borderWidth: 1,
                      marginTop: 8,
                      paddingHorizontal: 5,
                      padding: 5,
                      marginLeft: 5,
                    }}>
                    <Text
                      style={{color: colors.whiteColor, fontSize: RFValue(10)}}>
                      Follow Back
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
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
      <ActivityIndicator visible={loder} />
      <Header heading={'Notification'}>
        <FlatList
          data={notification}
          keyExtractor={item => item._id}
          renderItem={({item}) => <ListItem item={item} />}
          contentContainerStyle={{
            marginHorizontal: 20,
            marginTop: 15,
          }}
          ListEmptyComponent={
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Text style={{fontSize: 15}}>No Notifications Yet</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemDivider}
          onEndReached={() => {
            limit.currentPage < limit.availablePages && loadMore();
          }}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          // ListEmptyComponent={<Text>No Notifications Yet</Text>}
        />
      </Header>
    </View>
  );
}
