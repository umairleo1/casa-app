import {StyleSheet} from 'react-native';
import fonts from 'src/utils/themes/fonts';
import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontSize: 12,
    fontFamily: fonts.RobotoRegular,
    marginTop: 10,
    marginHorizontal: 15,
  },
  mainView: {
    marginHorizontal: 15,
  },
  borderLine: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginTop: 12,
  },
});
