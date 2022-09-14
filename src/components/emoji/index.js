import {View} from 'react-native';
import React from 'react';

import EmojiSelector from 'react-native-emoji-selector';

export default function Emoji({setMessageText}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <EmojiSelector
        showSearchBar={false}
        onEmojiSelected={emoji => setMessageText(msg => `${msg}${emoji}`)}
      />
    </View>
  );
}
