import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import fonts from 'src/utils/themes/fonts';
import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    // backgroundColor: 'grey',
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp(3),
    // backgroundColor: 'grey',
  },
  memberName: {
    fontSize: RFValue(16),
    color: colors.black,
    fontWeight: 'bold',
  },
  membersCount: {
    fontSize: RFValue(12),
    textAlign: 'center',
    color: colors.lightgrey,
    fontFamily: fonts.RobotoRegular,
  },
  mainContainer: {
    marginHorizontal: wp(3),
  },
  groupView: {
    // backgroundColor: 'blue',
    paddingTop: hp(1),
    paddingBottom: wp(2),
    alignItems: 'center',
    flex: 1,
  },
  image: {
    height: 63,
    width: 63,
    borderRadius: 63 / 2,
  },
  name: {
    fontSize: RFValue(12),
    color: colors.black,
    textAlign: 'center',
    fontFamily: fonts.RobotoRegular,
  },
  crossIconView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: 8,
    right: widthPercentageToDP(2),
  },
  buttonView: {
    // marginTop: 10,
  },
});
