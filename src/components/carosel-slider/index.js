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
            },
          ]}>
          {isLoading && (
            <ActivityIndicator
              style={{position: 'absolute', zIndex: 101}}
              size="small"
              color={colors.buttonColor}
            />
          )}

          {
            item?.myTypeOf == 'image/jpeg' ? (
              <ImageMemoized
                setIsLoading={setIsLoading}
                data={data}
                src={{uri: item?.url}}
              />
            ) : null
            // <Video
            //   source={{
            //     uri: item?.url,
            //   }}
            //   controls={true}
            //   paused={true}
            //   style={styles.image}
            //   repeat={true}
            //   playWhenInactive={false}
            //   fullscreen={true}
            //   // onLoadStart={() => setIsLoading(true)}
            //   // onLoadEnd={() => setIsLoading(false)}
            //   resizeMode="cover"
            // />
          }
        </View>
      </>
    );
  };

  return (
    // <SafeAreaView style={styles.container}>
    <FlatList
      data={data}
      horizontal={true}
      renderItem={({item}) => <RenderItem item={item} />}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
    />
    // </SafeAreaView>
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
      // style={[
      //   styles.image,
      //   {
      //     width: data.length == 1 ? Dimensions.get('window').width * 0.9 : 230,
      //   },
      // ]}
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
