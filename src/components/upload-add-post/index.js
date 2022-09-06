/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useRef} from 'react';
import colors from 'src/utils/themes/global-colors';
import UploadButton from '../upload-button';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Video from 'react-native-video';

import VideoPlayer from 'react-native-video-player';

export default function UploadAddPost({
  onPressUpload,
  image,
  uploadImagetext,
  imageSize,
  preview,
  onClosePress,
  setRemoved,
  removed,
}) {
  const RenderPreview = ({data}) => (
    <>
      <View style={{height: 185, width: 200, margin: 5}}>
        <TouchableOpacity
          onPress={() => {
            {
              data?.name
                ? (onClosePress(preview.filter(el => el.name !== data.name)),
                  setRemoved([
                    ...removed,
                    ...preview.filter(el => el.name == data.name),
                  ]),
                  console.log(
                    'Hahah ',
                    preview.filter(el => el.name !== data.name),
                  ))
                : onClosePress(
                    preview.filter(el => el.fileName !== data.fileName),
                  );
            }
          }}
          style={styles.closeIcon}>
          <AntDesign name={'close'} size={12} color={colors.black} />
        </TouchableOpacity>

        {data?.type == 'image/jpg' || data?.myTypeOf == 'image/jpeg' ? (
          <Image
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 5,
              overflow: 'hidden',
            }}
            source={{uri: data?.uri || data?.url}}
            resizeMode="cover"
          />
        ) : (
          <VideoPlayer
            video={{
              uri: data?.url || data?.uri,
            }}
            // videoWidth={1600}
            // videoHeight={900}
            // thumbnail={{uri: item?.url}}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 5,
              overflow: 'hidden',
            }}
          />
        )}
      </View>
    </>
  );

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: preview.length > 0 ? 'transparent' : '#F5F5F5'},
      ]}>
      {preview.length > 0 ? (
        <>
          <FlatList
            data={preview}
            horizontal
            renderItem={({item}) => <RenderPreview data={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </>
      ) : (
        <>
          <Image source={image} />
          <Text style={styles.text}>{uploadImagetext}</Text>
          <Text style={styles.size}>{imageSize}</Text>
          <View style={styles.uploadbutton}>
            <UploadButton uploadText={'Upload'} onPressUpload={onPressUpload} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.placeholderColor,
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 20,
  },
  size: {
    fontWeight: 'bold',
    color: colors.placeholderColor,
    fontSize: 11,
  },
  uploadbutton: {
    marginTop: 18,
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 100,
    top: 10,
    right: 10,
    backgroundColor: '#ffffff80',
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
