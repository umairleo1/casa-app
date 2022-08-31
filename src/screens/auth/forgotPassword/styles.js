import {StyleSheet} from 'react-native';
import fonts from 'src/utils/themes/fonts';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontSize: 12,
    fontFamily: fonts.RobotoRegular,
    marginTop: 10,
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
  mainView: {
    backgroundColor: colors.whiteColor,
    marginTop: 20,
    borderRadius: 3,
    marginHorizontal: 20,

  },
  borderLine: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginTop: 12,
  },
  inputView: {
    marginHorizontal: 15,
    // marginTop: hp(5),
    marginTop: hp(1),
  },
  forgotPassword: {
    color: colors.black,
    fontSize: hp(2),
    fontFamily: fonts.RobotoRegular,
    marginTop: 10,
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
  buttonView: {
    marginTop: 10,
    marginBottom: 10,
  },
});
