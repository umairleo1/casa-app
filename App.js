import 'react-native-gesture-handler';
import './shim';
import React, {useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import FlashMessage from 'react-native-flash-message';

import {NavigationContainer} from '@react-navigation/native';

import CasaVerseNavigator from 'src/navigation';
import colors from 'src/utils/themes/global-colors';
import {Store} from 'src/redux/store/index';
import AuthContext from 'src/utils/auth-context';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [user, setUser] = useState('');
  const [chatRoom, setChatRoom] = useState({});
  const [userData, setUserData] = useState({});
  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [selectedMember, setSelectedMember] = React.useState([]);

  LogBox.ignoreAllLogs(true);

  return (
    // <ErrorBoundary>

    <Provider store={Store}>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          userData,
          setUserData,
          setChatRoom,
          chatRoom,
          selectedMember,
          setSelectedMember,
        }}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={colors.whiteColor}
          />
          <NavigationContainer>
            <CasaVerseNavigator />
          </NavigationContainer>
          <FlashMessage position="top" />
        </SafeAreaView>
      </AuthContext.Provider>
    </Provider>

    // </ErrorBoundary>
  );
};

export default App;
