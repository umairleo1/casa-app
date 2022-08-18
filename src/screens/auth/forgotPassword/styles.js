import {StyleSheet} from 'react-native';
import fonts from 'src/utils/themes/fonts';
<<<<<<< HEAD
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
=======
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
>>>>>>> 6e4aa8de840dcd7221fdadeef77f6ae995c41f9b
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
<<<<<<< HEAD
    marginTop: hp(5),
=======
    marginTop: hp(1),
>>>>>>> 6e4aa8de840dcd7221fdadeef77f6ae995c41f9b
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
