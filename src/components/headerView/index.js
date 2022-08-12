import {Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from 'src/utils/themes/global-colors';

export default function Header({children, heading}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <AntDesign name="arrowleft" size={24} color={colors.black} />
        <Text style={styles.text}>{heading}</Text>
        <Text></Text>
      </View>
      {children}
    </View>
  );
}
