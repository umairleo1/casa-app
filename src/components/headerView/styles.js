import {StyleSheet} from 'react-native';
import fonts from 'src/utils/themes/fonts';
import colors from 'src/utils/themes/global-colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 22,
    color: colors.black,
    fontFamily: fonts.RobotoRegular,
  },
});
