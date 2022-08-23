import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import fonts from 'src/utils/themes/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  flatlistView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    borderRadius: 42 / 2,
    height: 42,
    width: 42,
  },
  flatlistName: {
    fontSize: RFValue(15),
    lineHeight: 18,
    color: colors.pureBlack,
    fontWeight: 'bold',
  },
  mail: {
    fontSize: RFValue(12),
    lineHeight: 14,
    color: colors.lightgrey,
  },
  flatlistView2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatlistView3: {
    marginHorizontal: 10,
  },
  mainContainer: {
    marginBottom: 10,
  },
  content: {
    fontSize: wp(2.8),
    color: colors.pureBlack,
    textAlign: 'justify',
    marginTop: 10,
  },
  postImage: {
    marginTop: 15,
    overflow: 'hidden',
    borderRadius: 3,
    margin: 1,
  },
  followView: {
    width: 94,
    alignSelf: 'center',
    borderRadius: 3,
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: fonts.RobotoRegular,
    fontSize: wp(3.3),
    marginLeft: 5,
  },
  likeImg: {
    borderRadius: 22 / 2,
    height: 22,
    width: 22,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  bottomLine: {
    borderWidth: wp(0.1),
    borderColor: '#E6ECF5',
  },
  commentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  commentView2: {
    flexDirection: 'row',
  },
  commentView3: {
    marginHorizontal: 10,
    marginTop: 5,
    justifyContent: 'center',
    flex: 1,
  },
  commentName: {
    fontSize: RFValue(15),
    lineHeight: 18,
    color: colors.pureBlack,
    fontWeight: 'bold',
  },
  commentTime: {
    fontSize: RFValue(12),
    lineHeight: 14,
    color: colors.lightgrey,
  },
  commentContent: {
    fontSize: RFValue(9),
    color: colors.pureBlack,
    textAlign: 'justify',
    paddingTop: 5,
  },
  footerView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: colors.whiteColor,
  },
});
