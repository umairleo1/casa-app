import {
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import Header from 'src/components/headerView';
import {styles} from './styles';
import colors from 'src/utils/themes/global-colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import images from 'src/assets/images';

import AuthContext from 'src/utils/auth-context';
import {showMessage} from 'react-native-flash-message';
import {chatServices} from 'src/services/chat-services';
import ActivityIndicator from 'src/components/loader/activity-indicator';

export default function AddGroupName() {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const [groupName, setGroupName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCreatePress = async () => {
    console.log(
      'xxxx ',
      authContext?.selectedMember.map(item => item?._id),
    );
    if (groupName == '') {
      showMessage({
        message: 'Group Name is Required',
        type: 'danger',
        floating: true,
      });
    } else {
      try {
        setIsLoading(true);
        const result = await chatServices.createGroupApi({
          name: groupName,
          picture: '',
          description: '',
          members: authContext?.selectedMember?.map(item => item?._id),
        });
        console.log('Here is the create group success ', result);
        authContext.setSelectedMember([]);
        navigation.navigate('CHAT_TAB');
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  const ListItem = ({title}) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.flatlistView}>
          <View style={styles.flatlistView2}>
            <Image
              source={
                title?.profileImage ? {uri: title?.profileImage} : images.people
              }
              style={styles.image}
            />
            <View style={styles.flatlistView3}>
              <Text style={styles.title}>
                {title?.firstName + ' ' + title?.lastName}
              </Text>

              <Text style={styles.flatlistName}>@{title?.userName}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.crossIcon}
            onPress={() => {
              authContext?.setSelectedMember(
                authContext?.selectedMember.filter(value => value !== title),
              );
            }}>
            <Entypo
              name="cross"
              color={colors.black}
              style={styles.crossIcon}
              size={21}
            />
          </TouchableOpacity>
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
    <Header
      heading={'Add Group Name'}
      rightText={authContext?.selectedMember?.length > 1 && 'Create'}
      onPostPress={() => handleCreatePress()}
      onPressBack={() => navigation.goBack()}>
      <ActivityIndicator visible={isLoading} />
      <View style={styles.textInpiutView}>
        <Text style={styles.name}>Name</Text>

        <TextInput
          placeholder="Choose a group chat name"
          placeholderTextColor={colors.black}
          style={styles.input}
          value={groupName}
          onChangeText={text => setGroupName(text)}
        />
      </View>

      <View style={{flex: 1}}>
        <FlatList
          data={authContext?.selectedMember}
          renderItem={({item}) => <ListItem title={item} />}
          keyExtractor={item => item._id}
          extraData={authContext?.selectedMember}
          ItemSeparatorComponent={ItemDivider}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={[styles.text2, {marginVertical: 10}]}>
              {authContext?.selectedMember?.length} members
            </Text>
          }
        />
      </View>
    </Header>
  );
}
