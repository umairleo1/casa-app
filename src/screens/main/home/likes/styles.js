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
  //
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
  time: {
    fontSize: RFValue(11),
    color: colors.lightgrey,
    marginRight:10
  },
  text2: {
    marginTop: hp(1),
    fontSize: RFValue(13),
    fontWeight: 'bold',
    marginHorizontal: wp(5),
    color: colors.lightgrey,
  },
  totalLikes:{
    fontSize:RFValue(11),
    color:colors.black,
    marginHorizontal:wp(5),
    fontWeight:'bold'
  }
});
