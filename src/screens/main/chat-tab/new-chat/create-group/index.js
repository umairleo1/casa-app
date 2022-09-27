/* eslint-disable react/prop-types */
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from 'src/components/headerView';
import SearchInput from 'src/components/searchInput';
import colors from 'src/utils/themes/global-colors';
import {CrossIcon} from 'src/assets/svg/chat';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {peopleServices} from 'src/services/people-services';
import AuthContext from 'src/utils/auth-context';
import images from 'src/assets/images';
import ActivityIndicator from 'src/components/loader/activity-indicator';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function CreateGroup() {
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
  // const [selectedMember, setSelectedMember] = React.useState([]);
  React.useEffect(() => {
    authContext?.setSelectedMember([]);
  }, []);

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

      console.log('here are the peoples ', result, ' ', result.users.length);
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

  const ListItem = ({title}) => {
    return (
      <View style={styles.mainContainer}>
        <View
          style={styles.groupView}
          // onPress={() => navigation.navigate('ADD_GROUP_NAME')}
        >
          <View>
            <Image
              source={
                title?.profileImage ? {uri: title?.profileImage} : images.people
              }
              style={styles.listImage}
            />
            <View style={styles.crossIconView}>
              <CrossIcon
                onPress={() =>
                  authContext?.setSelectedMember(
                    authContext?.selectedMember?.filter(
                      value => value !== title,
                    ),
                  )
                }
              />
            </View>
          </View>
          <Text style={styles.subTitle}>@{title?.userName}</Text>
        </View>
      </View>
    );
  };

  //section list
  const Item = ({title}) => (
    <TouchableOpacity
      onPress={() => {
        authContext?.selectedMember?.includes(title)
          ? authContext?.setSelectedMember(
              authContext?.selectedMember?.filter(value => value !== title),
            )
          : authContext?.setSelectedMember(prev => [...prev, title]);
      }}
      style={styles.item}>
      {authContext?.selectedMember?.includes(title) ? (
        <View
          style={[
            styles.listImage,
            {
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <AntDesign size={20} name="check" />
        </View>
      ) : (
        <Image
          source={
            title?.profileImage ? {uri: title?.profileImage} : images.people
          }
          style={styles.listImage}
        />
      )}

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
    <Header
      heading={'Add Group Members'}
      onPressBack={() => navigation.goBack()}
      rightText={authContext?.selectedMember?.length > 1 && 'Create'}
      onPostPress={() =>
        navigation.navigate('ADD_GROUP_NAME', {
          selectedMember: authContext?.selectedMember,
          setSelectedMember: authContext?.setSelectedMember,
        })
      }>
      <ActivityIndicator visible={loader} />
      <View style={styles.Container}>
        <SearchInput
          placeholder={'Search...'}
          placeholderTextColor={colors.black}
          icon={'search1'}
          iconSize={24}
          onChangeText={text => setSearch(text)}
        />
      </View>

      <View>
        <FlatList
          data={authContext?.selectedMember}
          extraData={authContext?.selectedMember}
          horizontal
          renderItem={({item}) => <ListItem title={item} />}
          keyExtractor={item => item._id}
          contentContainerStyle={{
            paddingTop: heightPercentageToDP(2),
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        data={people}
        keyExtractor={(item, index) => item?._id + index}
        renderItem={({item}) => <Item title={item} />}
        extraData={authContext?.selectedMember}
        onEndReached={() => {
          limit.currentPage <= limit.availablePages && loadMore();
        }}
        onEndReachedThreshold={0.2}
        ListHeaderComponent={
          <>
            <Text style={styles.text2}>On the platform</Text>
          </>
        }
        ItemSeparatorComponent={ItemDivider}
        contentContainerStyle={{paddingBottom: 10}}
        ListEmptyComponent={
          <>
            <Text
              style={{textAlign: 'center', fontSize: 20, marginVertical: 50}}>
              No Groups Members to Show
            </Text>
          </>
        }
      />
    </Header>
  );
}
