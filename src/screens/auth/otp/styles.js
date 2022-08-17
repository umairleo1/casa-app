import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.whiteColor,
    borderRadius: 3,
  },
  buttonView: {
    marginHorizontal: 15,
  },
});
