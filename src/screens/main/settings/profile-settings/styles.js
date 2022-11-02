import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import fonts from 'src/utils/themes/fonts';
import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  view: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  text: {
    color: colors.black,
    lineHeight: 17,
    fontFamily: fonts.RobotoRegular,
    fontSize: 15,
    marginTop: hp(8),
    fontWeight: 'bold',
  },
  SearchInputView: {
    marginVertical: 10,
  },
  buttonView: {
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: colors.whiteColor,
  },
});
