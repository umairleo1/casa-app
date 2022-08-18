import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  searchInputView: {
    marginHorizontal: 20,
    marginTop: 15,
    // backgroundColor: 'red',
  },
  settingSectionView: {
    // backgroundColor: 'red',
    marginHorizontal: 20,
    marginTop: hp(2),
  },
  settingSectionView2: {
    marginHorizontal: 20,
    marginVertical: hp(3),
  },
  logoutText: {
    color: colors.whiteColor,
    textAlign: 'center',
  },
  logoutButtonView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    width: '100%',
  },
});
