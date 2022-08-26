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
    //  marginTop: 20,
    flex: 1,
    borderRadius: 3,
  },
  borderLine: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginTop: 12,
  },
  inputView: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 3,
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
  text2: {
    fontSize: hp(3),
    fontFamily: fonts.RobotoRegular,
    color: colors.whiteColor,
    marginTop: 20,
    lineHeight: 30,
  },
  text3: {
    fontSize: hp(2),
    color: colors.whiteColor,
    marginTop: 20,
    fontFamily: fonts.RobotoRegular,
  },
  view: {
    marginHorizontal: 20,
    marginBottom: 5,
  },
  image: {
    height: 50,
    width: 120,
    marginTop: 5,
  },
});
