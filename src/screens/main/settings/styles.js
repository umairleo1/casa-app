import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  searchInputView: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  settingSectionView: {
    marginHorizontal: 10,
    marginTop: hp(5),
  },
  settingSectionView2: {
    marginHorizontal: 10,
    marginVertical: hp(3),
  },
});
