import {Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import SearchInput from 'src/components/searchInput';
import colors from 'src/utils/themes/global-colors';

export default function Chat() {
  // const navigation = useNavigation();
  // const dummyData = [
  //   {
  //     text: 'Maria Valdez',
  //     count: '1',
  //     message: 'The weather will be perfect for the st...',
  //     userImage: require('../../../../assets/images/findpeople/people3.png'),
  //     time: '2:14 PM',
  //     content:
  //       'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
  //   },
  //   {
  //     text: 'Maria Valdez',
  //     count: '1',
  //     message: 'The weather will be perfect for the st...',
  //     userImage: require('../../../../assets/images/findpeople/people4.png'),
  //     time: '2:14 PM',
  //     content:
  //       'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
  //   },
  //   {
  //     text: 'Maria Valdez',
  //     count: '1',
  //     message: 'The weather will be perfect for the st...',
  //     userImage: require('../../../../assets/images/findpeople/people5.png'),
  //     time: '2:14 PM',
  //     content:
  //       'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
  //   },
  //   {
  //     text: 'Maria Valdez',
  //     count: '1',
  //     message: 'The weather will be perfect for the st...',
  //     userImage: require('../../../../assets/images/findpeople/people6.png'),
  //     time: '2:14 PM',
  //     content:
  //       'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
  //   },
  //   {
  //     text: 'Maria Valdez',
  //     count: '1',
  //     message: 'The weather will be perfect for the st...',
  //     userImage: require('../../../../assets/images/findpeople/people4.png'),
  //     time: '2:14 PM',
  //     content:
  //       'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
  //   },
  //   {
  //     text: 'Maria Valdez',
  //     count: '1',
  //     message: 'The weather will be perfect for the st...',
  //     userImage: require('../../../../assets/images/findpeople/people2.png'),
  //     time: '2:14 PM',
  //     content:
  //       'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
  //   },
  //   {
  //     text: 'Maria Valdez',
  //     count: '1',
  //     message: 'The weather will be perfect for the st...',
  //     userImage: require('../../../../assets/images/findpeople/people5.png'),
  //     time: '2:14 PM',
  //     content:
  //       'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
  //   },
  //   {
  //     text: 'Maria Valdez',
  //     count: '1',
  //     message: 'The weather will be perfect for the st...',
  //     userImage: require('../../../../assets/images/findpeople/people6.png'),
  //     time: '2:14 PM',
  //     content:
  //       'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
  //   },
  //   {
  //     text: 'Maria Valdez',
  //     count: '1',
  //     message: 'The weather will be perfect for the st...',
  //     userImage: require('../../../../assets/images/findpeople/people6.png'),
  //     time: '2:14 PM',
  //     content:
  //       'Hey Cindi, you should really check out this new song by Iron Maid. The next time they come to the city we should totally go!',
  //   },
  // ];

  // const listItem = ({item}) => {
  //   return (
  //     <View style={styles.mainContainer}>
  //       <TouchableOpacity
  //         style={styles.flatlistView}
  //         onPress={() => navigation.navigate('GIFTED_CHAT')}>
  //         <View style={styles.flatlistView2}>
  //           <Image source={item.userImage} style={styles.image} />
  //           <View style={styles.flatlistView3}>
  //             <Text style={styles.flatlistName}>{item.text}</Text>
  //             <Text style={styles.message}>{item.message}</Text>
  //           </View>
  //         </View>
  //         <View>
  //           <View style={styles.countView}>
  //             <Text style={styles.count}>{item.count}</Text>
  //           </View>
  //           <Text style={styles.time}>{item.time}</Text>
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  // const ItemDivider = () => {
  //   return (
  //     <View
  //       style={{
  //         height: 1,
  //         width: '100%',
  //         backgroundColor: '#E6ECF5',
  //       }}
  //     />
  //   );
  // };

  return (
    <View style={styles.Container}>
      <SearchInput
        placeholder={'Search...'}
        placeholderTextColor={colors.black}
        icon={'search1'}
        iconSize={24}
        onChangeText={text => console.log(text)}
      />

      <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
         <Text style={{fontSize:18}}>No Chats</Text>
      </View>
      {/* <FlatList
        data={dummyData}
        renderItem={listItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemDivider}
        contentContainerStyle={{
          paddingBottom: 10,
          paddingTop: 10,
        }}
        showsVerticalScrollIndicator={false}
      /> */}
    </View>
  );
}
