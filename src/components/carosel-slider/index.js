/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet,Image } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    image:require('../../assets/images/viewProfile/postImage.png')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    image:require('../../assets/images/viewProfile/postImage.png')
  },


];

const FlatListCustom = ({image,data}) => {

  const renderItem = ({ item }) => (
    <View style={{margin:4}}>
      <Image source={image} style={styles.image}/>
    </View>   
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        horizontal={true}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={{backgroundColor:'red',}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  title: {
    fontSize: 32,
  },
  image:{
    height:260,
    width:230,
    overflow: 'hidden',
    borderRadius: 3,
  }

});

export default FlatListCustom;
