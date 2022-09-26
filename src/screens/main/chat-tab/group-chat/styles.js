import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  Container: {
    marginHorizontal: wp(5),
    paddingTop: hp(2),
  },
  groupView: {
    alignItems: 'center',
    marginTop: hp(2),
    // backgroundColor: 'green',
    paddingTop: hp(1),
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 118 / 2,
    borderWidth: 2,
    borderColor: '#fff',
  },
  groupName: {
    color: colors.black,
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
  groupText: {
    fontSize: RFValue(11),
    color: colors.placeholderColor,
  },
  groupImages: {
    flexDirection: 'row',
    paddingTop: hp(1),
  },
  groupImage: {
    borderRadius: 28 / 2,
    height: 28,
    width: 28,
    marginLeft: 5,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  buttonsView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: hp(2.5),
    paddingBottom: hp(5),
  },
});
