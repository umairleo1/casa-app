import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  Container: {
    marginHorizontal: wp(5),
    paddingTop: hp(2),
  },
  mainContainer: {
    marginHorizontal: wp(3),
  },
  groupView: {
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
    marginTop: heightPercentageToDP(1),
  },
  crossIconView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: 8,
    right: widthPercentageToDP(2),
  },
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
  text2: {
    marginTop: hp(2),
    fontSize: RFValue(13),
    fontWeight: 'bold',
    marginHorizontal: wp(3),
    color: colors.lightgrey,
  },
});
