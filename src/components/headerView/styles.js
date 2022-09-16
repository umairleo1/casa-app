import {StyleSheet} from 'react-native';
import fonts from 'src/utils/themes/fonts';
import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    // paddingVertical: 20,
    height: 90,
  },
  text: {
    fontSize: 22,
    color: colors.black,
    fontFamily: fonts.RobotoRegular,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 22,
    color: colors.black,
    fontFamily: fonts.RobotoRegular,
    fontWeight: 'bold',
  },
  image: {
    height: 50,
    width: 120,
    marginTop: 5,
  },
  rightImage: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
});
