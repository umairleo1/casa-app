/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Pressable,
} from 'react-native';
import colors from 'src/utils/themes/global-colors';
// import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import {createThumbnail} from 'react-native-create-thumbnail';
import FastImage from 'react-native-fast-image';

const FlatListCustom = ({data, setZoomPicModal, setProfile}) => {
  const RenderItem = ({item}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [thumbnail, setThumbNail] = React.useState('');

    React.useEffect(() => {
      item?.myTypeOf.split('/')[0] == 'video' &&
        createThumbnail({
          url: item?.url,
          timeStamp: 10000,
        })
          .then(response => setThumbNail(response))
          .catch(err => console.log({err}));
    }, []);

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
              backgroundColor: '#F3F2EF',
            },
          ]}>
          {isLoading && (
            <ActivityIndicator
              style={{position: 'absolute', zIndex: 101}}
              size="small"
              color={colors.buttonColor}
            />
          )}

          {item?.myTypeOf.split('/')[0] !== 'video' ? (
            <Pressable
              onPress={() => {
                setProfile({dp: item?.url, cover: 'post'}),
                  setZoomPicModal(true);
              }}>
              <ImageMemoized
                setIsLoading={setIsLoading}
                data={data}
                src={{uri: item?.url}}
              />
            </Pressable>
          ) : (
            <VideoPlayer
              hideControlsOnStart={true}
              video={{
                uri: item?.url,
              }}
              videoWidth={1600}
              videoHeight={900}
              resizeMode="contain"
              thumbnail={{uri: thumbnail?.path}}
              style={[styles.image]}
            />
            // <Video
            //   source={{
            //     uri: item?.url,
            //   }} // Can be a URL or a local file.
            //   // ref={ref => {
            //   //   this.player = ref;
            //   // }} // Store reference
            //   // onBuffer={this.onBuffer} // Callback when remote video is buffering
            //   // onError={this.videoError} // Callback when video cannot be loaded
            //   controls={true}
            //   paused={true}
            //   playInBackground={false}
            //   playWhenInactive={false}
            //   resizeMode="contain"
            // style={{
            //   position: 'absolute',
            //   top: 0,
            //   left: 0,
            //   bottom: 0,
            //   right: 0,
            // }}
            // />
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
    <FastImage
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
