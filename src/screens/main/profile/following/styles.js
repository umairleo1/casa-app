import {StyleSheet} from 'react-native';

import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  flatlistView: {
    // backgroundColor: 'red',
    flex: 1,
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
  name: {
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
});
