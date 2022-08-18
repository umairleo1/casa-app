import React from 'react';
import {View} from 'react-native';

import {BarIndicator} from 'react-native-indicators';
import colors from 'src/utils/themes/global-colors';

import styles from './styles';

export default function ActivityIndicator({visible = false, fontSize}) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overLay}>
      <BarIndicator
        color={colors.buttonColor}
        size={fontSize ? fontSize : 40}
      />
    </View>
  );
}
