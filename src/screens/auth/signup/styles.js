import {StyleSheet} from 'react-native';
import fonts from 'src/utils/themes/fonts';
import colors from 'src/utils/themes/global-colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  mainView: {
    marginTop: 20,
    borderRadius: 2,
    backgroundColor: colors.whiteColor,
    marginBottom: hp(1),
  },
  signup: {
    fontSize: 17,
    color: colors.black,
    lineHeight: 16,
    fontFamily: fonts.RobotoRegular,
    fontWeight: 'bold',
  },
  login: {
    fontSize: 17,
    color: colors.disable,
    lineHeight: 16,
    fontFamily: fonts.RobotoRegular,
  },
  signupButton: {
    backgroundColor: colors.whiteColor,
    width: '50%',
    height: 67,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: colors.disable,
    borderTopLeftRadius: 2,
  },
  loginButton: {
    backgroundColor: colors.inactive,
    width: '50%',
    height: 67,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 2,
  },
  buttonView: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: colors.disable,
  },
});
