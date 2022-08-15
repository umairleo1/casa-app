import {Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import colors from 'src/utils/themes/global-colors';

export default function Header({
  children,
  heading,
  onPress,
  feather,
  onPressBack,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <AntDesign
          name="arrowleft"
          size={24}
          color={colors.black}
          onPress={onPressBack}
        />
        <Text style={styles.text}>{heading}</Text>
        {feather ? (
          <Feather
            name="settings"
            size={24}
            color={colors.black}
            onPress={onPress}
          />
        ) : (
          <Text></Text>
        )}
      </View>
      {children}
    </View>
  );
}
