import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import CasaVerseNavigator from 'src/navigation';
import colors from 'src/utils/themes/global-colors';

import FlashMessage from 'react-native-flash-message';
import authStorage from 'utils/async-storage/index';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [userToken, setUserToken] = React.useState('');

  React.useEffect(() => {
    restoreToken();
    console.log(userToken);
  }, []);

  const restoreToken = async () => {
    const user = await authStorage.getToken();
    console.log('here is the user token', user);
    if (user) setUserToken(user);
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
