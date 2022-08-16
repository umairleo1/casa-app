import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import fonts from 'src/utils/themes/fonts';
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
    marginHorizontal: 15,
  },
  borderLine: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginTop: 12,
  },
  forgotPassword: {
    fontSize: hp(1.8),
    color: colors.black,
  },
  forgotPasswordView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonView: {
    marginTop: 80,
    marginBottom: 10,
  },
  scrollView: {
    backgroundColor: colors.whiteColor,
  },
});
