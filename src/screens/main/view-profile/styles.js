import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
    marginVertical: 10,
  },
  content: {
    fontSize: 11,
    color: colors.pureBlack,
    textAlign: 'justify',
    marginTop: 10,
  },
  postImage: {
    width: '100%',
    marginTop: 15,
    overflow: 'hidden',
    borderRadius: 3,
  },
  followView: {
    width: 94,
    alignSelf: 'center',
    borderRadius: 3,
    backgroundColor: 'red',
  },
});
