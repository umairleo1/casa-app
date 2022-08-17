import {StyleSheet} from 'react-native';

import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  name: {
    fontSize: 26,
    color: colors.pureBlack,
    fontWeight: 'bold',
    marginTop: 10,
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
    marginTop: 15,
  },
  image: {
    borderRadius: 2,
    height: 42,
    width: 42,
  },
  notiImage: {
    borderRadius: 22 / 2,
    height: 22,
    width: 22,
  },
  flatlistName: {
    fontSize: 15,
    lineHeight: 18,
    color: colors.pureBlack,
    fontWeight: 'bold',
    marginHorizontal: 5,
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
  flatlistView4: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer: {
    marginBottom: 10,
    // marginVertical: 10,
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
  time: {
    fontSize: 14,
    color: '#7A7A7A',
  },
});
