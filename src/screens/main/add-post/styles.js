import {StyleSheet} from 'react-native';

import colors from 'src/utils/themes/global-colors';

export const styles = StyleSheet.create({
  mainView: {
    marginTop: 20,
  },
  bottomLine: {
    borderWidth: 0.5,
    borderColor: '#E6ECF5',
    padding: 20,
  },
  descriptionView: {
    // backgroundColor: 'green',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#E6ECF5',
    paddingTop: 20,
    paddingBottom: 20,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.pureBlack,
    marginLeft: 20,
  },
  textInputView: {
    // backgroundColor: 'green',
    height: 150,
    marginTop: 18,
    marginHorizontal: 20,
    justifyContent: 'flex-start',
    padding: 10,
    paddingLeft: 10,
    textAlignVertical: 'top',
    fontSize: 13,
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
