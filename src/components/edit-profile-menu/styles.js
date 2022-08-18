import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  overLay: {
    position: 'absolute',
    backgroundColor: '#3D3D3D90',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    height: Dimensions.get('window').height,
  },
  view: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    paddingBottom: 30,
    marginBottom: 50,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    color: 'grey',
  },
  heading: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 5,
  },
});
export default styles;
