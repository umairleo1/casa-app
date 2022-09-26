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
    flex: 1,
    marginHorizontal: wp(5),
    paddingTop: hp(2),
  },
  image: {
    borderRadius: 42 / 2,
    height: 42,
    width: 42,
  },
  flatlistName: {
    fontSize: 15,
    lineHeight: 18,
    color: colors.pureBlack,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontSize: RFValue(11),
    lineHeight: 14,
    color: colors.lightgrey,
    // marginTop: 5,
  },
  flatlistView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 10,
    paddingVertical: 15,
    height: 70,
  },
  flatlistView2: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'green',
    width: '70%',
    height: '100%',
    // overflow: 'hidden',
    // backgroundColor: 'red',
  },
  flatlistView3: {
    marginLeft: 10,
    // backgroundColor: 'red',
    width: '70%',
    height: '100%',
    // justifyContent: 'center',
    // height: 50,
  },
  mainContainer: {
    // alignItems: 'center',
    // paddingBottom: 10,
    backgroundColor: 'red',
  },
  countView: {
    backgroundColor: colors.buttonColor,
    borderRadius: wp(5),
    // paddingVertical: 1,
    width: 40,
    marginBottom: 5,
  },
  count: {
    color: colors.whiteColor,
    textAlign: 'center',
    fontFamily: fonts.PoppinsRegular,
    fontSize: 14,
  },
  time: {
    fontSize: RFValue(11),
    color: '#7A7A7A',
    flex: 1,
  },
});
