import {
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Header from 'src/components/headerView';
import {styles} from './styles';
import colors from 'src/utils/themes/global-colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

export default function AddGroupName() {
  const navigation = useNavigation();
  const dummyData = [
    {
      text: 'Maria Valdez',
      count: '1',
      userImage: require('../../../../../assets/images/findpeople/people3.png'),
    },
    {
      text: 'Maria Valdez',
      count: '1',
      userImage: require('../../../../../assets/images/findpeople/people3.png'),
    },
    {
      text: 'Maria Valdez',
      count: '1',
      userImage: require('../../../../../assets/images/findpeople/people3.png'),
    },
    {
      text: 'Maria Valdez',
      count: '1',
      userImage: require('../../../../../assets/images/findpeople/people3.png'),
    },
  ];

  const listItem = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.flatlistView}>
          <View style={styles.flatlistView2}>
            <Image source={item.userImage} style={styles.image} />
            <View style={styles.flatlistView3}>
              <Text style={styles.flatlistName}>{item.text}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.crossIcon} onPress={undefined}>
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
    <Header heading={'Add Group Name'} onPressBack={() => navigation.goBack()}>
      <View style={styles.textInpiutView}>
        <Text style={styles.name}>NAME</Text>

        <TextInput
          placeholder="Choose a group chat name"
          placeholderTextColor={colors.black}
          style={styles.input}
        />
      </View>

      <View>
        <FlatList
          data={dummyData}
          renderItem={listItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={ItemDivider}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Text style={styles.text2}>5 members</Text>}
        />
      </View>
    </Header>
  );
}
