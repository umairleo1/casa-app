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
  },
  mainView: {
    flex: 1,
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
  },
  signupButton: {
    backgroundColor: colors.inactive,
    width: '50%',
    height: 67,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    flexDirection: 'row',
  },
});
