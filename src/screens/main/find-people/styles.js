import {StyleSheet} from 'react-native';

import fonts from 'src/utils/themes/fonts';
import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  searchInputView: {
    marginHorizontal: 20,
    marginTop: 1,
  },
  plusIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginTop: 5,
  },
  name: {
    flex: 1,
    fontSize: 18,
    lineHeight: 21,
    color: colors.pureBlack,
    fontFamily: fonts.RobotoRegular,
    fontWeight: 'bold',
  },
  image: {
    height: 160,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
  },
  follower: {
    flex: 1,
    fontSize: 11,
    marginHorizontal: 5,
    color: colors.placeholderColor,
    marginBottom: 5,
  },
  flatlistView: {
    flex: 1,
    top: 25,
    margin: 5,
    marginBottom: 20,
  },
});
