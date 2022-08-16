import {View, Image, ImageBackground} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import images from 'src/assets/images';
import {useNavigation} from '@react-navigation/native';
import SCREEN from 'utils/constants/index';

export default function Splash() {
  const navigations = useNavigation();

  const {SIGNUP} = SCREEN;

  useEffect(() => {
    getSplash();
  });

  const getSplash = () => {
    setTimeout(() => {
      navigations.replace(SIGNUP);
    }, 2000);
  };

  return (
    <ImageBackground source={images.background} style={styles.imageBackground}>
      <View style={styles.imageView}>
        <Image source={images.splash} style={styles.image} />
      </View>
    </ImageBackground>
  );
}
