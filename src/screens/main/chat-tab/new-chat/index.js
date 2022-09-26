/* eslint-disable react/prop-types */
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from 'src/components/headerView';
import SearchInput from 'src/components/searchInput';
import colors from 'src/utils/themes/global-colors';
import {GroupIcon} from 'src/assets/svg/chat';
import {useNavigation} from '@react-navigation/native';
import {peopleServices} from 'src/services/people-services';
import images from 'src/assets/images';
import ActivityIndicator from 'src/components/loader/activity-indicator';

import AuthContext from 'src/utils/auth-context';

export default function NewChat() {
  const navigation = useNavigation();
  const authContext = React.useContext(AuthContext);

  const [search, setSearch] = React.useState('');
  const [loader, setLoader] = React.useState(false);
  const [limit, setLimit] = React.useState({
    currentPage: 1,
    limit: 25,
    availablePages: 1,
  });
  const [people, setPeople] = React.useState([]);

  React.useEffect(() => {
    let timeout = setTimeout(() => {
      getUsers(search);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  const getUsers = async search => {
    try {
      setLoader(true);
      const result = await peopleServices.findPeopleApi(
        search,
        '1',
        limit.limit,
        authContext?.userData?.user?._id,
      );

      // console.log('here are the peoples ', result, ' ', result.users.length);
      setPeople(result?.users);
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

      setPeople([...people, ...result.users]);
    } catch (error) {
      console.log(error);
    }
  };

  const Item = ({title}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('GIFTED_CHAT', {
          data: {
            user: {
              firstName: title?.firstName,
              lastName: title?.lastName,
              profileImage: title?.profileImage,
            },
          },
          userId: title?._id,
        })
      }
      // onPress={() => console.log(title)}
      style={styles.item}>
      <Image
        source={
          title?.profileImage ? {uri: title?.profileImage} : images.people
        }
        style={styles.listImage}
      />
      <View style={styles.itemView}>
        <Text style={styles.title}>
          {title?.firstName + ' ' + title?.lastName}
        </Text>
        <Text style={styles.subTitle}>@{title?.userName}</Text>
      </View>
    </TouchableOpacity>
  );

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
    <Header heading={'New Chat'} onPressBack={() => navigation.goBack()}>
      <ActivityIndicator visible={loader} />
      <FlatList
        data={people}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item title={item} />}
        onEndReached={() => {
          limit.currentPage <= limit.availablePages && loadMore();
        }}
        onEndReachedThreshold={0.2}
        ListHeaderComponent={
          <>
            <View style={styles.Container}>
              <SearchInput
                placeholder={'Search...'}
                placeholderTextColor={colors.black}
                icon={'search1'}
                iconSize={24}
                onChangeText={text => setSearch(text)}
              />
            </View>

            <TouchableOpacity
              style={styles.GroupIconView}
              onPress={() => navigation.navigate('CREATE_GROUP')}>
              <GroupIcon />
              <Text style={styles.text}>Create a group</Text>
            </TouchableOpacity>
            <View style={styles.bottomLine} />

            <TouchableOpacity style={styles.GroupIconView2} onPress={undefined}>
              <GroupIcon />
              <Text style={styles.text}>Create new contact</Text>
            </TouchableOpacity>
            <Text style={[styles.text2]}>On the platform</Text>
          </>
        }
        ItemSeparatorComponent={ItemDivider}
        contentContainerStyle={{paddingBottom: 10}}
      />
    </Header>
  );
}
