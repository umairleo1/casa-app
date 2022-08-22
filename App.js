import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import FlashMessage from 'react-native-flash-message';

import CasaVerseNavigator from 'src/navigation';
import colors from 'src/utils/themes/global-colors';
import {Store} from 'src/redux/store/index';
import AuthContext from 'src/utils/auth-context';
// import ErrorBoundary from 'src/components/error-boundaries';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [user, setUser] = useState('');
  const [userData, setUserData] = useState({});
  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  LogBox.ignoreAllLogs(true);

  return (
    // <ErrorBoundary>
    <Provider store={Store}>
      <AuthContext.Provider value={{user, setUser, userData, setUserData}}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={colors.whiteColor}
          />
          <CasaVerseNavigator />
          <FlashMessage position="top" />
        </SafeAreaView>
      </AuthContext.Provider>
    </Provider>
    // </ErrorBoundary>
  );
};

export default App;
