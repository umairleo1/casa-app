import {StyleSheet} from 'react-native';
import fonts from 'src/utils/themes/fonts';
import colors from 'src/utils/themes/global-colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontSize: hp(2),
    fontFamily: fonts.RobotoRegular,
    marginTop: 10,
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
  mainView: {
    marginHorizontal: 15,
    flex: 1,
  },
  borderLine: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginTop: 12,
  },
  scrollView: {
    backgroundColor: colors.whiteColor,
    marginHorizontal: 20,
  },
  promoCode: {
    fontSize: RFValue(12),
    color: colors.placeholderColor,
    marginBottom: hp(1),
  },
  promoCodeView: {
    alignSelf: 'flex-end',
    marginTop: hp(1),
  },
  SearchInputView: {
    marginVertical: 10,
  },
});
