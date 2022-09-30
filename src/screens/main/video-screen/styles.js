import {Dimensions, StyleSheet} from 'react-native';
import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.black,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  backgroundVideo: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
    // top: 70,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
    borderColor: '#ffffff',
  },
});
