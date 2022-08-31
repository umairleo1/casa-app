import {StyleSheet} from 'react-native';
import fonts from 'src/utils/themes/fonts';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.whiteColor,
    borderRadius: 3,
    marginTop: 20,
    marginHorizontal: 20,

  },

  resetPassword: {
    color: colors.black,
    fontSize: hp(2),
    fontFamily: fonts.RobotoRegular,
    marginTop: 10,
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
  borderLine: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginTop: 12,
  },
  inputView: {
    marginHorizontal: 15,
    marginTop: hp(1),
  },
  buttonView: {
    marginTop: 10,
    marginBottom: 10,
  },
});
