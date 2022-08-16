import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import CasaVerseNavigator from 'src/navigation';
import colors from 'src/utils/themes/global-colors';

import FlashMessage from 'react-native-flash-message';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.whiteColor}
      />
      <CasaVerseNavigator />
      <FlashMessage position="top" />
    </SafeAreaView>
  );
};

export default App;
