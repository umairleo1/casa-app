/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useRef} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Pressable,
} from 'react-native';
import colors from 'src/utils/themes/global-colors';
import {createThumbnail} from 'react-native-create-thumbnail';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
const RenderItem = ({item, data, setZoomPicModal, setProfile}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [thumbnail, setThumbNail] = React.useState('');
  const videoPlayer = useRef(null);

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
          item?.myTypeOf.split('/')[0] == 'video'
            ? {height: Dimensions.get('window').width * (9 / 16)}
            : styles.image,
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
              setProfile({dp: item?.url, cover: 'post'}), setZoomPicModal(true);
            }}>
            <ImageMemoized
              setIsLoading={setIsLoading}
              data={data}
              src={{uri: item?.url}}
            />
          </Pressable>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: '#ebebeb',
            }}>
            <Video
              //  onEnd={onEnd}
              //   onLoad={onLoad}
              //  onLoadStart={onLoadStart}
              //   onProgress={onProgress}
              //  paused={paused}
              controls={true}
              ref={videoPlayer}
              resizeMode={'center'}
              onFullScreen={true}
              source={{
                uri: item?.url,
              }}
              paused={true}
              style={[
                styles.mediaPlayer,
                {
                  width:
                    data.length == 1
                      ? Dimensions.get('window').width * 0.9
                      : 230,
                },
              ]}
              onError={er => {
                console.log('error', er);
              }}
              volume={10}
            />
          </View>
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
const FlatListCustom = ({data, setZoomPicModal, setProfile}) => {
  return (
    <FlatList
      data={data}
      horizontal={true}
      renderItem={({item}) => (
        <RenderItem
          item={item}
          data={data}
          setZoomPicModal={setZoomPicModal}
          setProfile={setProfile}
        />
      )}
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
  containerVideo: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * (9 / 16),
    backgroundColor: 'black',
  },
  mediaPlayer: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * (9 / 16),
    backgroundColor: 'black',
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
