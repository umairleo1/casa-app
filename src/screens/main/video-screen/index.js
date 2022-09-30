import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Video from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from 'src/utils/themes/global-colors';
import {useNavigation} from '@react-navigation/native';
import convertToProxyURL from 'react-native-video-cache';

const VideoScreen = ({route}) => {
  const navigation = useNavigation();
  const [isPreloading, setIsPreloading] = React.useState(false);
  const [pause, setPause] = React.useState(false);
  return (
    <View style={styles.view}>
      <Entypo
        onPress={() => {
          setPause(true);
          navigation.goBack();
        }}
        name={'cross'}
        size={30}
        color={colors.whiteColor}
        style={{
          position: 'absolute',
          top: 10,
          left: 20,
          zIndex: 200,
        }}
      />
      {isPreloading && (
        <ActivityIndicator
          animating
          color={colors.whiteColor}
          size="large"
          style={{
            position: 'absolute',
            top: '50%',
            left: '45%',
            zIndex: 200,
          }}
        />
      )}
      <Video
        onLoadStart={() => setIsPreloading(true)}
        onReadyForDisplay={() => setIsPreloading(false)}
        source={{
          uri: convertToProxyURL(route.params.uri),
        }}
        controls={true}
        paused={pause}
        style={styles.backgroundVideo}
        repeat={true}
        playWhenInactive={true}
        resizeMode="contain"
        fullscreen={true}
      />
    </View>
  );
};

export default VideoScreen;
