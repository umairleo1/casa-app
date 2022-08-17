import {StyleSheet} from 'react-native';
import fonts from 'src/utils/themes/fonts';
import {heightPercentageToDP} from 'react-native-responsive-screen';
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
  },
  borderLine: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginTop: 12,
  },
  inputView: {
    marginHorizontal: 15,
    marginTop: heightPercentageToDP(5),
  },
  forgotPassword: {
    color: colors.black,
    fontSize: 12,
    fontFamily: fonts.RobotoRegular,
    marginTop: 10,
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
  buttonView: {
    marginTop: 80,
    marginBottom: 10,
  },
});
