import {StyleSheet} from 'react-native';

import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 80,
  },
  image: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    color: colors.pureBlack,
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: colors.lightgrey,
    marginTop: 20,
    fontWeight: 'bold',
  },
  buttonView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    width: '100%',
  },
});
