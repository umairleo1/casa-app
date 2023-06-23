import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import fonts from 'src/utils/themes/fonts';
import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  Container: {
    marginHorizontal: wp(5),
    paddingTop: hp(2),
  },
  GroupIconView: {
    flexDirection: 'row',
    marginHorizontal: wp(5),
    alignItems: 'center',
    marginTop: hp(3),
  },
  GroupIconView2: {
    flexDirection: 'row',
    marginHorizontal: wp(5),
    alignItems: 'center',
    marginTop: hp(1.5),
  },
  text: {
    color: '#7A7A7A',
    // fontWeight: 'bold',
    fontSize: RFValue(14),
    marginHorizontal: wp(3),
    fontFamily: fonts.RobotoMedium,
  },
  bottomLine: {
    borderWidth: 1,
    borderColor: '#E6ECF5',
    marginTop: hp(1),
  },
  text2: {
    marginTop: hp(2),
    fontSize: RFValue(13),
    fontFamily: fonts.RobotoMedium,
    marginHorizontal: wp(3),
    color: '#7A7A7A',
    marginVertical: 10,
  },
  //section list
  item: {
    // backgroundColor: '#f9c2ff',
    marginHorizontal: wp(5),
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: colors.lightgrey,
    marginHorizontal: wp(3),
    marginTop: hp(2),
  },
  title: {
    fontSize: RFValue(14),
    color: colors.black,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: RFValue(13),
    color: colors.lightgrey,
  },
  listImage: {
    height: 48,
    width: 48,
    borderRadius: 48 / 2,
  },
  itemView: {
    marginHorizontal: wp(2),
  },
});
