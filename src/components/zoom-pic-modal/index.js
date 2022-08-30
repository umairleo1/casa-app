/* eslint-disable react/prop-types */
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import images from 'src/assets/images';

const ZoomPicModal = ({visible = false, iconPress, image, imageStyle}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={'close'}
        size={28}
        style={{position: 'absolute', right: 20, top: 20}}
        onPress={iconPress}
        color={'white'}
      />
      {isLoading && (
        <ActivityIndicator
          style={{position: 'absolute', zIndex: 101}}
          size="large"
        />
      )}
      <Image
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        source={image ? {uri: image} : images.people}
        style={imageStyle}
      />
    </View>
  );
};

const ZoomBackgroundPicModal = ({
  visible = false,
  iconPress,
  image,
  imageStyle,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={'close'}
        size={28}
        style={{position: 'absolute', right: 20, top: 20}}
        onPress={iconPress}
        color={'white'}
      />
      {isLoading && (
        <ActivityIndicator
          style={{position: 'absolute', zIndex: 101}}
          size="large"
        />
      )}
      <Image
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        source={image ? {uri: image} : images.people}
        style={imageStyle}
      />
    </View>
  );
};

export {ZoomPicModal, ZoomBackgroundPicModal};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: `rgba(0, 0, 0, 0.7)`,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    height: Dimensions.get('window').height,
  },
});
