import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import fonts from 'src/utils/themes/fonts';
import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  name: {
    fontSize: 26,
    color: colors.pureBlack,
    fontWeight: 'bold',
    marginTop: hp(10),
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    color: colors.pureBlack,
    fontSize: 12,
    lineHeight: 16,
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
    fontSize: 15,
    lineHeight: 18,
    color: colors.pureBlack,
    fontWeight: 'bold',
  },
  mail: {
    fontSize: 12,
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
    // marginVertical: 10,
  },
  content: {
    fontSize: wp(3),
    color: colors.pureBlack,
    textAlign: 'justify',
    marginTop: 10,
  },
  postImage: {
    marginTop: 15,
    overflow: 'hidden',
    borderRadius: 3,
    margin: 1,
    height: 250,
    width: '100%',
  },
  followView: {
    width: 94,
    alignSelf: 'center',
    borderRadius: 3,
    backgroundColor: 'red',
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
});
