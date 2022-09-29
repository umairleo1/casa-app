import {View} from 'react-native';
import React from 'react';

import EmojiSelector from 'react-native-emoji-selector';

export default function Emoji({onEmojiSelected}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <EmojiSelector showSearchBar={false} onEmojiSelected={onEmojiSelected} />
    </View>
  );
}
