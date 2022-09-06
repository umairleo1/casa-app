/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import colors from 'src/utils/themes/global-colors';
// import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';

const FlatListCustom = ({data}) => {
  const RenderItem = ({item}) => {
    const [isLoading, setIsLoading] = React.useState(false);

    return (
      <>
        <View
          style={[
            styles.image,
            {
              margin: 4,
              alignItems: 'center',
              justifyContent: 'center',
              width:
                data.length == 1 ? Dimensions.get('window').width * 0.9 : 230,
            },
          ]}>
          {isLoading && (
            <ActivityIndicator
              style={{position: 'absolute', zIndex: 101}}
              size="small"
              color={colors.buttonColor}
            />
          )}

          {item?.myTypeOf == 'image/jpeg' ? (
            <ImageMemoized
              setIsLoading={setIsLoading}
              data={data}
              src={{uri: item?.url}}
            />
          ) : (
            <VideoPlayer
              hideControlsOnStart={true}
              video={{
                uri: item?.url,
              }}
              // video={{
              //   uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              // }}
              // videoWidth={1600}
              // videoHeight={900}
              thumbnail={{uri: item?.url}}
              style={[styles.image]}
            />
          )}
        </View>
      </>
    );
  };

  return (
    <FlatList
      data={data}
      horizontal={true}
      renderItem={({item}) => <RenderItem item={item} />}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  title: {
    fontSize: 32,
  },
  image: {
    height: 260,
    overflow: 'hidden',
    borderRadius: 3,
  },
});

const ImageComp = ({src, data, setIsLoading}) => {
  return (
    <Image
      onLoadStart={() => setIsLoading(true)}
      onLoadEnd={() => setIsLoading(false)}
      style={{
        height: '100%',
        width: data.length == 1 ? Dimensions.get('window').width * 0.9 : 230,
      }}
      resizeMode="contain"
      source={src}
    />
  );
};
const ImageMemoized = React.memo(
  ImageComp,
  (prev, next) => prev.src === next.src,
);

export default FlatListCustom;
