import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  Container: {
    // flex: 1,
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
  },

  groupView: {
    marginHorizontal: wp(3),
    // backgroundColor: 'blue',
    paddingTop: hp(1),
    paddingBottom: wp(2),
    alignItems: 'center',
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
  },
  crossIconView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: 8,
    right: 5,
  },
});
