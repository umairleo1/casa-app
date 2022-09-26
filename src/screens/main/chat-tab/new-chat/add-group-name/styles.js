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
  textInpiutView: {
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
    height: 58,
    margin: 5,
    borderBottomWidth: 1,
    borderColor: colors.placeholderColor,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    fontSize: RFValue(12),
    height: 40,
    margin: 5,
    borderColor: colors.placeholderColor,
    fontFamily: fonts.RobotoRegular,
  },
  name: {
    fontSize: RFValue(12),
    color: colors.black,
    fontFamily: fonts.RobotoRegular,
  },
  //
  image: {
    borderRadius: 42 / 2,
    height: 42,
    width: 42,
  },
  flatlistName: {
    fontSize: RFValue(13),
    color: colors.lightgrey,
  },
  message: {
    fontSize: RFValue(11),
    lineHeight: 14,
    color: colors.lightgrey,
  },
  flatlistView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: wp(2),
  },
  flatlistView2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 7,
  },
  flatlistView3: {
    marginHorizontal: 10,
  },
  mainContainer: {
    // alignItems: 'center',
    // paddingBottom: 10,
  },
  countView: {
    backgroundColor: colors.buttonColor,
    borderRadius: wp(5),
    flex: 1,
  },
  crossIcon: {
    marginRight: 7,
  },
  time: {
    fontSize: RFValue(11),
    color: '#7A7A7A',
    flex: 1,
  },
  text2: {
    marginTop: hp(1),
    fontSize: RFValue(13),
    fontWeight: 'bold',
    marginHorizontal: wp(5),
    fontFamily: fonts.RobotoRegular,
    color: '#7A7A7A',
    // color: colors.lightgrey,
  },
  title: {
    fontSize: RFValue(14),
    color: colors.black,
    fontWeight: 'bold',
  },
});
