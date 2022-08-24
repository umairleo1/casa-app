import {StyleSheet, View} from 'react-native';
import React from 'react';
import {FlatListSlider} from 'react-native-flatlist-slider';

export default function Slider({data, component}) {
  const images = [
    {
      image:
        'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      desc: 'Silent Waters in the mountains in midst of Himilayas',
    },
    {
      image:
        'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
      desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
    },
  ];
  return (
    <View style={{height: 100, width: 200}}>
      <FlatListSlider
        data={data}
        // width={200}
        // height={300}
        component={component}
        onPress={item => alert(JSON.stringify(item))}
        indicatorActiveWidth={20}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
      />
    </View>
  );
}

// const styles = StyleSheet.create({});
